<template>
  <div>
    <button 
      @click="exportToPDF" 
      :disabled="isExporting"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500"
    >
      <svg v-if="!isExporting" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {{ isExporting ? 'Exporting...' : 'Download as PDF (Letter)' }}
    </button>
  </div>
</template>

<script>
import { nextTick } from 'vue'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  name: 'Html2CanvasExporter',
  props: {
    targetRef: {
      type: Object,
      required: true
    },
    isExporting: {
      type: Boolean,
      default: false
    }
  },
  emits: ['export-start', 'export-end'],
  methods: {
    async exportToPDF() {
      if (!this.targetRef || this.isExporting) return;

      this.$emit('export-start');

      // Wait for DOM to update after emit
      await nextTick();

      try {
        const dpi = 300; // High DPI for crisp output
        const scale = dpi / 72; // Use 72 as base for print
        const letterWidthMM = 215.9;
        const letterHeightMM = 279.4;
        const letterWidthPx = Math.floor((letterWidthMM / 25.4) * dpi);
        const letterHeightPx = Math.floor((letterHeightMM / 25.4) * dpi);

        const element = this.targetRef.$el;
        const originalStyle = {
          width: element.style.width,
          height: element.style.height,
          transform: element.style.transform,
          transformOrigin: element.style.transformOrigin,
          position: element.style.position
        };

        // Temporarily set styles for accurate letter-sized capture
        element.style.width = `${letterWidthMM}mm`;
        element.style.height = 'auto';
        element.style.transform = 'none';
        element.style.transformOrigin = 'top left';
        element.style.position = 'relative';
        element.style.maxHeight = 'none';

        // Force reflow
        element.offsetHeight;

        // Capture with optimized options
        const canvas = await html2canvas(element, {
          scale: scale,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: letterWidthPx,
          height: letterHeightPx,
          windowWidth: letterWidthPx,
          windowHeight: letterHeightPx,
          scrollX: 0,
          scrollY: 0,
          logging: false,
          letterRendering: true,
          removeContainer: false
        });

        // Restore original styles
        Object.keys(originalStyle).forEach(key => {
          element.style[key] = originalStyle[key];
        });

        // Wait again for restore
        await nextTick();

        // Create PDF
        const pdf = new jsPDF('p', 'mm', [letterWidthMM, letterHeightMM]);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/png', 1.0); // PNG for better quality

        let position = 0;
        let heightLeft = imgHeight;

        // Add pages dynamically
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft * -1;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('Sreyneath_Rom_Resume.pdf');
      } catch (error) {
        console.error('PDF Export failed:', error);
        // Optionally emit error event
      } finally {
        this.$emit('export-end');
        await nextTick();
      }
    }
  }
};
</script>

<style scoped>
button {
  font-size: 14px;
  line-height: 1.4;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>