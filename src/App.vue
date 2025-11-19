<template>
  <div
    id="app"
    class="bg-white w-[210mm] min-h-[297mm] mx-auto p-[20mm] shadow-md text-gray-800
           print:shadow-none print:mx-0 print:p-0 print:bg-white"
  >


<!-- LOADING OVERLAY -->
<div
  v-if="isExporting"
  class="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
>
  <div class="bg-white px-6 py-4 rounded-lg shadow text-gray-700 font-medium animate-pulse">
    Exporting PDF, please wait...
  </div>
</div>

<!-- RESUME CONTENT -->
<div ref="resume">

  <!-- Header -->
  <div class="flex items-center border-b-4 border-gray-600 pb-4 mb-6">
    <img
  :src="photo"
  alt="Sreyneath Rom"
  class="w-32 h-32 rounded-full object-cover mr-5 border-4 border-gray-600 print:w-40 print:h-40 print:border-8"
/>
    <div>
      <h1 class="text-3xl font-bold text-black">{{ name }}</h1>
      <h2 class="text-lg text-gray-600 mt-1 font-normal">{{ title }}</h2>
    </div>
  </div>

  <!-- Columns -->
  <div class="flex">

    <!-- LEFT COLUMN -->
    <div class="w-1/3 pr-4 bg-gray-200 p-3 print:bg-gray-200">

     <!-- Contact Section -->
<div class="mb-5">
  <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">
    Contact
  </h3>

  <!-- Phone -->
  <div class="flex items-center text-sm mb-1">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 flex-shrink-0 text-gray-800" viewBox="0 0 640 640">
      <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/>
    </svg>
    <span class="align-middle leading-none">{{ phone }}</span>
  </div>

  <!-- Email -->
  <div class="flex items-center text-sm mb-1">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 flex-shrink-0 text-gray-800" viewBox="0 0 640 640">
      <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/>
    </svg>
    <span class="align-middle leading-none">{{ email }}</span>
  </div>

  <!-- Location -->
  <div class="flex items-center text-sm mb-1">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 flex-shrink-0 text-gray-700" viewBox="0 0 640 640">
      <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
    </svg>
    <span class="align-middle leading-none">{{ address }}</span>
  </div>
</div>


      <!-- Education -->
      <div class="mb-5">
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">
          Education
        </h3>
        <div
          v-for="edu in education"
          :key="edu.degree"
          class="text-sm mb-3"
        >
          <strong>{{ edu.degree }}</strong><br />
          {{ edu.institution }}<br />
          <span class="italic text-gray-600">{{ edu.years }}</span>
        </div>
      </div>

      <!-- Technical Tools -->
      <div class="mb-5">
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">
          Technical Tools
        </h3>
        <ul class="list-disc pl-5 text-sm">
          <li v-for="tool in technicalTools" :key="tool">{{ tool }}</li>
        </ul>
      </div>

      <!-- Languages -->
      <div class="mb-5">
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">
          Languages
        </h3>
        <ul class="list-disc pl-5 text-sm">
          <li v-for="lang in languages" :key="lang">{{ lang }}</li>
        </ul>
      </div>

      <!-- Hard Skills -->
      <div class="mb-5">
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">
          Hard Skills
        </h3>
        <ul class="list-disc pl-5 text-sm">
          <li v-for="skill in hardSkills" :key="skill">{{ skill }}</li>
        </ul>
      </div>

      <!-- Soft Skills -->
      <div class="mb-5">
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">
          Soft Skills
        </h3>
        <ul class="list-disc pl-5 text-sm">
          <li v-for="skill in softSkills" :key="skill">{{ skill }}</li>
        </ul>
      </div>

      <!-- Hobbies -->
      <div class="mb-5">
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">
          Hobbies / Interests
        </h3>
        <ul class="list-disc pl-5 text-sm">
          <li v-for="hobby in hobbies" :key="hobby">{{ hobby }}</li>
        </ul>
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div class="w-2/3 pl-4">
      <!-- About, Work Experience, Workshops, References remain the same as previous full code -->
      <!-- About Me -->
      <div class="mb-6">
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">About Me</h3>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div><strong>Full Name:</strong> {{ about.fullName }}</div>
          <div><strong>Gender:</strong> {{ about.gender }}</div>
          <div><strong>Date of birth:</strong> {{ about.dob }}</div>
          <div><strong>Nationality:</strong> {{ about.nationality }}</div>
          <div><strong>Place of birth:</strong> {{ about.placeOfBirth }}</div>
          <div><strong>Status:</strong> {{ about.status }}</div>
        </div>
      </div>

      <!-- Work Experience -->
      <div class="mb-6">
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-3">Work Experience</h3>
        <div v-for="exp in workExperience" :key="exp.title" class="mb-5">
          <h4 class="text-base font-semibold">
            {{ exp.title }}
            <span class="italic text-gray-600 text-sm">({{ exp.date }})</span>
          </h4>
          <div class="font-semibold text-sm">Role: {{ exp.role }}</div>
          <ul class="list-disc pl-5 text-sm">
            <li v-for="desc in exp.descriptions" :key="desc">{{ desc }}</li>
          </ul>
        </div>
      </div>

      <div class="page-break"></div>

      <!-- Technical Workshops -->
      <div class="mb-6">
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-3">Technical Workshops</h3>
        <div v-for="workshop in technicalWorkshops" :key="workshop.title" class="mb-5">
          <h4 class="text-base font-semibold">
            {{ workshop.title }}
            <span class="italic text-gray-600 text-sm">({{ workshop.date }})</span>
          </h4>
          <ul class="list-disc pl-5 text-sm">
            <li v-for="desc in workshop.descriptions" :key="desc">{{ desc }}</li>
          </ul>
        </div>
      </div>

      <!-- References -->
      <div>
        <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-3">References</h3>
        <div v-for="ref in references" :key="ref.name" class="mb-4 text-sm">
          <h4 class="text-base font-semibold">{{ ref.name }}</h4>
          <div>{{ ref.position }}</div>
          <div>Phone: {{ ref.phone }}</div>
          <div>Email: {{ ref.email }}</div>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- EXPORT BUTTONS -->
<div class="mt-8 print:hidden flex flex-col sm:flex-row gap-4">
  <button @click="downloadPDF" :disabled="isExporting"
    class="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-3 disabled:opacity-70">
    <span v-if="!isExporting">⬇️ Download PDF (Best for emailing)</span>
    <span v-else>Generating HD PDF...</span>
  </button>

  <button @click="printPDF"
    class="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-3">
    🖨️ Save/Print as PDF (Perfect quality)
  </button>
</div>


  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import photoFile from '@/assets/isme.png'
import html2pdf from 'html2pdf.js'

const resume = ref(null)
const isExporting = ref(false)
// Resume data
const photo = photoFile;
const name = 'SREYNEATH ROM';
const title = 'WEB DEVELOPER';
const phone = '+855 96 250 4227';
const email = 'romsreyneath4@gmail.com';
const address = 'Phum Tropeang Chhuk (Borey Sorla), Street 371, Phnom Penh, Cambodia';

const about = { fullName:'Sreyneath ROM', dob:'May 05, 2004', placeOfBirth:'Siem Reap Province', gender:'Female', nationality:'Khmer', status:'Single' };
const education = [
  { degree:'Associate Degree', institution:'Passerelles Numériques Cambodia', years:'2024-Present' },
  { degree:'High School Diploma', institution:'Varin High School', years:'2020 - 2023' }
];
const technicalTools = ['Figma (Design)','Canva','Jira','Git/GitHub','Postman','Linux (Ubuntu)','AWS (EC2)','MS Office','AI Tools (ChatGPT, Gemini)','Power BI'];
const languages = ['Khmer (Excellent)', 'English (Intermediate)'];
const hardSkills = ['HTML/CSS/SASS','Bootstrap 5','Tailwind CSS','JavaScript','PHP','Node.js (REST API)','Python (Algorithm)','MySQL','OOP (TypeScript)','Vue.js','Laravel','Data Analytics','Firebase','WordPress'];
const softSkills = ['Problem Solving','Adaptability','Teamwork','Time Management','Task Management','Communication','Critical Thinking','Creative'];
const hobbies = ['Researching','Coding Practice','Web Design'];
const workExperience = [
  { title:'Pos System', date:'Feb 10, 2025 - May 02, 2025', role:'DevOps', descriptions:['Monitored server performance and resolved issues.','Configured environments for development & production.','Designed responsive UI using HTML, CSS, Bootstrap.','Fetched backend data using PHP + Database.'] },
  { title:'Inventory Management App', date:'Jan 14, 2025 - Jan 29, 2025', role:'Designer', descriptions:['Designed UI with HTML, CSS, and Bootstrap.','Created mockups using Figma.','Ensured consistent front-end behavior.','Handled data with JavaScript.'] },
  { title:'Video Download', date:'Nov 18, 2024 – Nov 28, 2024', role:'Team Leader', descriptions:['Led a development team of 3 members.','Planned project structure and task assignment.','Integrated JSON-based configuration logic.'] },
  { title:'Bakery Shop', date:'Oct 21, 2024 – Nov 5, 2024', role:'Designer', descriptions:['Built a modern bakery website using SASS.','Improved responsive design and layout consistency.'] },
  { title:'Brochure Design', date:'June 18, 2024 – Aug 16, 2024', role:'Designer', descriptions:['Designed marketing brochures using Figma.','Applied visual hierarchy and branding principles.'] }
];
const technicalWorkshops = [
  { title:'Product Owner', date:'Jan 18 & 25, 2025', descriptions:['Wrote user stories using agile methods.','Used Jira for sprint tracking.','Simulated PO, Scrum Master, Dev collaboration.'] },
  { title:'UX/UI Design', date:'Feb 7 & Mar 14, 2025', descriptions:['Created wireframes and prototypes.','Applied UX principles for better experience.','Participated in design review.'] },
  { title:'Data Analytics', date:'Mar 19, 2025', descriptions:['Cleaned datasets using Python.','Built BI dashboards in Power BI.','Presented data insights.'] },
  { title:'Project Management', date:'Feb 8, 2025 — Felix Leuker', descriptions:['Practiced agile planning.','Used Jira & GitHub for workflow.','Simulated sprint activities.'] }
];
const references = [
  { name:'Mr. Rady Y', position:'PNC IT Coordinator', phone:'+855 12 251 803', email:'rady.y@passerellesnumeriques.org' },
  { name:'Ms. Sovanchansreyleap KHENG', position:'PNC English Trainer', phone:'+855 78 819 152', email:'sovanchansreyleap.kheng@passerellesnumeriques.org' },
  { name:'Mr. Puthy KRY', position:'PNC Professional Life Trainer', phone:'+855 12 376 863', email:'puthy.kry@passerellesnumeriques.org' }
];
const downloadPDF = async () => {
  if (!resume.value) return

  isExporting.value = true
  await document.fonts.ready
  await nextTick()

  // 1. Deep clone the resume
  const clone = resume.value.cloneNode(true)

  // 2. Inject a style tag that forces old-safe hex colors (kills oklch/lab/lch forever)
  const safeStyles = document.createElement('style')
  safeStyles.textContent = `
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    .bg-gray-200   { background-color: #e5e7eb !important; }
    .bg-gray-700   { background-color: #374151 !important; }
    .text-gray-600 { color: #4b5563 !important; }
    .text-gray-700 { color: #374151 !important; }
    .text-gray-800 { color: #1f2937 !important; }
    .border-gray-600 { border-color: #4b5563 !important; }
    .border-b-4 { border-bottom-width: 4px !important; }
    .border-4 { border-width: 4px !important; }
  `
  clone.prepend(safeStyles)

  const opt = {
    margin: 0,
    filename: 'Sreyneath_Rom_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    enableLinks: true,
    html2canvas: {
      scale: 4,
      useCORS: true,
      backgroundColor: '#ffffff',
      letterRendering: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 2480,
      // Double insurance: inject the same fix inside html2canvas's cloned document
      onclone: (doc) => {
        const extraFix = doc.createElement('style')
        extraFix.textContent = safeStyles.textContent
        doc.head.appendChild(extraFix)
      }
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: false
    }
  }

  try {
    await html2pdf().set(opt).from(clone).save()
  } catch (err) {
    console.error('html2pdf failed → fallback to browser print', err)
    alert('High-quality export failed — using perfect browser print instead.')
    setTimeout(() => window.print(), 300)
  } finally {
    isExporting.value = false
  }
}

// Perfect vector PDF (recommended for most recruiters)
const printPDF = () => window.print()
</script>

<style>
* { -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; }
.page-break { page-break-after: always; }
@media print {
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; image-rendering: optimizeQuality; }
  #app button { display: none !important; }
  .page-break { page-break-after: always; }
}
</style>
