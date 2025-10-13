<template>
  <div>
    <button @click="exportToPDF" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
      Download as PDF (Letter)
    </button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  name: 'Html2CanvasExporter',
  props: {
    targetRef: {
      type: Object,
      required: true
    }
  },
  methods: {
    async exportToPDF() {
      if (!this.targetRef) return;

      this.$emit('export-start');

      try {
        const dpi = 300; // High resolution for better quality
        const scale = dpi / 96;
        const letterWidthMM = 215.9; // 8.5 inches
        const letterHeightMM = 279.4; // 11 inches
        const letterWidthPx = (letterWidthMM * dpi) / 25.4;
        const letterHeightPx = (letterHeightMM * dpi) / 25.4;

        // Temporarily adjust the element's style for letter-size rendering
        const element = this.targetRef.$el;
        const originalStyle = {
          width: element.style.width,
          transform: element.style.transform,
          transformOrigin: element.style.transformOrigin
        };

        element.style.width = `${letterWidthMM}mm`;
        element.style.transform = 'none';
        element.style.transformOrigin = 'top left';

        // Capture the entire content
        const canvas = await html2canvas(element, {
          scale,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          windowWidth: letterWidthPx,
          width: letterWidthPx,
          scrollX: 0,
          scrollY: 0
        });

        // Restore original styles
        element.style.width = originalStyle.width;
        element.style.transform = originalStyle.transform;
        element.style.transformOrigin = originalStyle.transformOrigin;

        const pdf = new jsPDF('p', 'mm', 'letter');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Calculate page breaks dynamically
        let heightLeft = imgHeight;
        let positionY = 0;
        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        // Add first page
        pdf.addImage(imgData, 'JPEG', 0, positionY, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;

        // Add additional pages with proper offsets
        while (heightLeft > 0) {
          pdf.addPage();
          positionY = -heightLeft;
          pdf.addImage(imgData, 'JPEG', 0, positionY, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= pageHeight;
        }

        pdf.save('resume_letter.pdf');
      } catch (error) {
        console.error('PDF export failed:', error);
      } finally {
        this.$emit('export-end');
      }
    }
  }
};
</script>

<style scoped>
button {
  font-size: 14px;
  font-weight: 500;
}
</style>