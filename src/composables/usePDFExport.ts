import { ref } from 'vue';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// This composable handles all the logic for exporting a DOM element to a PDF.
// It takes a Vue ref pointing to the element that needs to be captured.
export function usePDFExport(elementToCapture) {
  const isExporting = ref(false);

  async function exportToPDF() {
    if (!elementToCapture.value) {
      console.error("Target element for PDF export is not available!");
      return;
    }
    isExporting.value = true;

    try {
      const originalClasses = elementToCapture.value.className;
      elementToCapture.value.classList.remove('shadow-2xl');
      await new Promise(resolve => setTimeout(resolve, 50));

      const canvas = await html2canvas(elementToCapture.value, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      elementToCapture.value.className = originalClasses;

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const imgWidth = pdfWidth;
      const imgHeight = imgWidth / ratio;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Sreyneath_Rom_CV_Professional.pdf');

    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setTimeout(() => {
        isExporting.value = false;
      }, 1000);
    }
  }

  // Expose the state and the function to the component using this composable
  return {
    isExporting,
    exportToPDF,
  };
}
