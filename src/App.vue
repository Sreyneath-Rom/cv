<template>
  <div class="bg-slate-100 py-12 px-4 font-sans">
    <!-- Export Button -->
    <div class="max-w-4xl mx-auto text-right mb-6 print:hidden">
      <button
        @click="exportToPDF"
        :disabled="isExporting"
        class="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        <svg v-if="!isExporting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.75V6.25m0 11.5v1.5M17.25 6.75l-1.06 1.06M7.81 16.19l-1.06 1.06M6.75 12l-1.5 0M18.75 12l-1.5 0M16.19 7.81l1.06-1.06M7.81 7.81l-1.06-1.06"></path>
        </svg>
        <span>{{ isExporting ? 'Exporting...' : 'Download as PDF (A4)' }}</span>
      </button>
    </div>

    <!-- CV Container -->
    <div ref="cvContainer" class="a4-container shadow-2xl overflow-hidden rounded-lg">
      <div class="cv-content">
        <CVHeader :personal-info="personalInfo" :contact="primaryContact" />

        <main class="grid grid-cols-12 gap-x-12 mt-8">
          <!-- Left Column -->
          <aside class="col-span-4 space-y-8">
            <CVSkills :hard-skills="hardSkills" :technical-tools="technicalTools" :soft-skills="softSkills" />
            <CVEducation :education-data="education" />
             <CVLanguages :languages="languages" />
          </aside>

          <!-- Right Column -->
          <div class="col-span-8">
            <CVSection title="Professional Summary">
               <p class="mt-4 text-sm text-slate-700 leading-relaxed">
                Dynamic Web Developer Intern with 1+ year of project-based experience in full-stack development, specializing in responsive UI/UX and agile workflows. Proven in building scalable apps using Vue.js, Laravel, and AWS, with a 25% efficiency gain in team projects. Eager to leverage technical skills and collaborative mindset to drive innovative solutions at a forward-thinking tech firm.
              </p>
            </CVSection>
            <CVExperience :experience-data="workExperience" />
            <CVProfessionalDevelopment :development-data="workshops" />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Import Composables
import { useCVData } from '@/composables/useCVData';
import { usePDFExport } from '@/composables/usePDFExport';

// Import Components
import CVHeader from '@/components/CVHeader.vue';
import CVSection from '@/components/CVSection.vue';
import CVSkills from '@/components/CVSkills.vue';
import CVEducation from '@/components/CVEducation.vue';
import CVLanguages from '@/components/CVLanguages.vue';
import CVExperience from '@/components/CVExperience.vue';
import CVProfessionalDevelopment from '@/components/CVProfessionalDevelopment.vue';


// --- State Management ---
// Get all CV data from our composable
const { 
  personalInfo, 
  primaryContact, 
  education, 
  technicalTools, 
  languages, 
  workExperience, 
  hardSkills, 
  softSkills, 
  workshops 
} = useCVData();

// --- PDF Export Logic ---
// The ref for the DOM element to be captured
const cvContainer = ref(null); 
// Get export state and function from our composable
const { isExporting, exportToPDF } = usePDFExport(cvContainer);
</script>

<style>
/* Global styles for the CV - can be moved to a separate CSS file */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.a4-container {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  background: white;
  box-sizing: border-box;
}

.cv-content {
  padding: 18mm;
  color: #374151; /* gray-700 */
}

@media print {
  body, .a4-container {
    margin: 0;
    padding: 0;
    box-shadow: none !important;
  }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
