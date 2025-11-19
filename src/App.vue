<template>
  <div id="app" class="bg-white w-[210mm] min-h-[297mm] mx-auto p-[20mm] shadow-md text-gray-800 print:shadow-none print:mx-0 print:p-0 print:bg-white">

    <!-- LOADING OVERLAY -->
    <div v-if="isExporting" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div class="bg-white px-6 py-4 rounded-lg shadow text-gray-700 font-medium animate-pulse">
        Exporting PDF, please wait...
      </div>
    </div>

    <!-- RESUME CONTENT -->
    <div ref="resume">
      <!-- Header -->
      <div class="flex items-center border-b-4 border-gray-600 pb-4 mb-6">
        <img :src="photo" alt="Sreyneath Rom" class="w-32 h-32 rounded-full object-cover mr-5 border-4 border-gray-600" />
        <div>
          <h1 class="text-3xl font-bold text-black">{{ name }}</h1>
          <h2 class="text-lg text-gray-600 mt-1 font-normal">{{ title }}</h2>
        </div>
      </div>

      <!-- Columns -->
      <div class="flex">
        <!-- LEFT COLUMN -->
        <div class="w-1/3 pr-4 bg-gray-200 p-3 print:bg-gray-200">

          <!-- Contact -->
          <div class="mb-5">
            <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">Contact</h3>
            <div class="text-sm mb-1"> {{ phone }}</div>
            <div class="text-sm mb-1"> {{ email }}</div>
            <div class="text-sm mb-1"> {{ address }}</div>
          </div>

          <!-- Education -->
          <div class="mb-5">
            <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">Education</h3>
            <div v-for="edu in education" :key="edu.degree" class="text-sm mb-3">
              <strong>{{ edu.degree }}</strong><br />
              {{ edu.institution }}<br />
              <span class="italic text-gray-600">{{ edu.years }}</span>
            </div>
          </div>

          <!-- Technical Tools -->
          <div class="mb-5">
            <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">Technical Tools</h3>
            <ul class="list-disc pl-5 text-sm">
              <li v-for="tool in technicalTools" :key="tool">{{ tool }}</li>
            </ul>
          </div>

          <!-- Languages -->
          <div class="mb-5">
            <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">Languages</h3>
            <ul class="list-disc pl-5 text-sm">
              <li v-for="lang in languages" :key="lang">{{ lang }}</li>
            </ul>
          </div>

          <!-- Hard Skills -->
          <div class="mb-5">
            <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">Hard Skills</h3>
            <ul class="list-disc pl-5 text-sm">
              <li v-for="skill in hardSkills" :key="skill">{{ skill }}</li>
            </ul>
          </div>

          <!-- Soft Skills -->
          <div class="mb-5">
            <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">Soft Skills</h3>
            <ul class="list-disc pl-5 text-sm">
              <li v-for="skill in softSkills" :key="skill">{{ skill }}</li>
            </ul>
          </div>

          <!-- Hobbies -->
          <div class="mb-5">
            <h3 class="bg-gray-700 text-white px-3 py-1 rounded text-sm uppercase tracking-wide mb-2">Hobbies / Interests</h3>
            <ul class="list-disc pl-5 text-sm">
              <li v-for="hobby in hobbies" :key="hobby">{{ hobby }}</li>
            </ul>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="w-2/3 pl-4">

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
                <span class="italic text-gray-600 text-sm">({{ exp.date }}) {{ exp.extra || '' }}</span>
              </h4>
              <div class="font-semibold text-sm">Role: {{ exp.role }}</div>
              <ul class="list-disc pl-5 text-sm">
                <li v-for="desc in exp.descriptions" :key="desc">{{ desc }}</li>
              </ul>
            </div>
          </div>

          <!-- Page Break -->
          <div class="page-break my-4 print:break-after-page"></div>

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

    <!-- DOWNLOAD BUTTONS -->
    <div class="mt-6 print:hidden flex gap-3">
      <button 
        @click="downloadPDF('high')"
        class="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-lg shadow hover:shadow-lg transition">
        📄 Export HD (Recommended)
      </button>

      <button 
        @click="downloadPDF('fast')"
        class="inline-flex items-center gap-2 px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow hover:shadow transition">
        ⚡ Fast Export
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import photoFile from '@/assets/isme.png';
import html2pdf from 'html2pdf.js';

// Reference
const resume = ref(null);

// Loading state
const isExporting = ref(false);

const downloadPDF = async (mode = "high") => {
  if (!resume.value) return;

  isExporting.value = true;

  // Wait for fonts to load to avoid fallback font issues
  await document.fonts.ready;

  const config = {
    high: { scale: 4, quality: 0.98 }, // High-quality
    fast: { scale: 2, quality: 0.92 }  // Faster
  }[mode];

  const element = resume.value;

  const options = {
    margin: 0,
    filename: 'Sreyneath_Rom_CV.pdf',
    image: { type: 'png', quality: config.quality },
    html2canvas: {
      scale: config.scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      windowWidth: 210 * 3.7795, // 210mm → px
      windowHeight: element.scrollHeight,
      // Ensure all elements are captured
      logging: false
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    await html2pdf().set(options).from(element).save();
  } catch (err) {
    console.error("PDF Export Error:", err);
    alert("PDF export failed. Try using Ctrl+P in the browser.");
  } finally {
    isExporting.value = false;
  }
};

// Resume Data
const photo = photoFile;
const name = 'SREYNEATH ROM';
const title = 'WEB DEVELOPER';
const phone = '+855 96 250 4227';
const email = 'romsreyneath4@gmail.com';
const address = 'Phum Tropeang Chhuk (Borey Sorla), Street 371, Phnom Penh, Cambodia';

// About
const about = {
  fullName: 'Sreyneath ROM',
  dob: 'May 05, 2004',
  placeOfBirth: 'Siem Reap Province',
  gender: 'Female',
  nationality: 'Khmer',
  status: 'Single'
};

// Education
const education = [
  { degree: 'Associate Degree', institution: 'Passerelles Numériques Cambodia', years: '2024-Present' },
  { degree: 'High School Diploma', institution: 'Varin High School', years: '2020 - 2023' }
];

// Technical Tools
const technicalTools = [
  'Figma (Design)',
  'Canva',
  'Jira',
  'Git/GitHub',
  'Postman',
  'Linux (Ubuntu)',
  'AWS (EC2)',
  'MS Office',
  'AI Tools (ChatGPT, Gemini)',
  'Power BI'
];

// Languages
const languages = ['Khmer (Excellent)', 'English (Intermediate)'];

// Hard Skills
const hardSkills = [
  'HTML/CSS/SASS',
  'Bootstrap 5',
  'Tailwind CSS',
  'JavaScript',
  'PHP',
  'Node.js (REST API)',
  'Python (Algorithm)',
  'MySQL',
  'OOP (TypeScript)',
  'Vue.js',
  'Laravel',
  'Data Analytics',
  'Firebase',
  'WordPress'
];

// Soft Skills
const softSkills = [
  'Problem Solving',
  'Adaptability',
  'Teamwork',
  'Time Management',
  'Task Management',
  'Communication',
  'Critical Thinking',
  'Creative'
];

// Hobbies
const hobbies = ['Researching', 'Coding Practice', 'Web Design'];

// Work Experience
const workExperience = [
  {
    title: 'Pos System',
    date: 'Feb 10, 2025 - May 02, 2025',
    extra: 'School Project',
    role: 'DevOps',
    descriptions: [
      'Monitored server performance and resolved infrastructure issues.',
      'Configured environments for development, testing, and production.',
      'Designed responsive UIs using HTML, CSS, JavaScript, Bootstrap 5.',
      'Fetched and processed backend data using PHP + Database.'
    ]
  },
  {
    title: 'Inventory Management App',
    date: 'Jan 14, 2025 - Jan 29, 2025',
    role: 'Designer',
    descriptions: [
      'Designed UI with HTML, CSS, and Bootstrap 5.',
      'Created mockups using Figma.',
      'Ensured consistent front-end behavior.',
      'Fetched and handled data with JavaScript.'
    ]
  },
  {
    title: 'Video Download',
    date: 'Nov 18, 2024 – Nov 28, 2024',
    role: 'Team Leader',
    descriptions: [
      'Led a development team of 3 members.',
      'Planned project structure and task assignment.',
      'Integrated JSON-based configuration logic.'
    ]
  },
  {
    title: 'Bakery Shop',
    date: 'Oct 21, 2024 – Nov 5, 2024',
    role: 'Designer',
    descriptions: [
      'Built a modern bakery website using SASS.',
      'Improved responsive design and layout consistency.'
    ]
  },
  {
    title: 'Brochure Design',
    date: 'June 18, 2024 – Aug 16, 2024',
    role: 'Designer',
    descriptions: [
      'Designed marketing brochures using Figma.',
      'Applied visual hierarchy and branding principles.'
    ]
  }
];

// Technical Workshops
const technicalWorkshops = [
  {
    title: 'Product Owner',
    date: 'Jan 18 & 25, 2025',
    descriptions: [
      'Wrote user stories using agile methods.',
      'Used Jira for sprint task tracking.',
      'Simulated PO, Scrum Master, Dev team collaboration.'
    ]
  },
  {
    title: 'UX/UI Design',
    date: 'Feb 7 & Mar 14, 2025',
    descriptions: [
      'Created wireframes and prototypes.',
      'Applied UX principles for better user experience.',
      'Participated in design review sessions.'
    ]
  },
  {
    title: 'Data Analytics',
    date: 'Mar 19, 2025',
    descriptions: [
      'Cleaned and prepared datasets using Python.',
      'Built BI dashboards using Power BI.',
      'Presented insights using storytelling techniques.'
    ]
  },
  {
    title: 'Project Management',
    date: 'Feb 8, 2025 — Felix Leuker',
    descriptions: [
      'Practiced agile project planning.',
      'Used tools like Jira & GitHub for workflow.',
      'Simulated sprint planning and standup meetings.'
    ]
  }
];

// References
const references = [
  {
    name: 'Mr. Rady Y',
    position: 'PNC IT Coordinator',
    phone: '+855 12 251 803',
    email: 'rady.y@passerellesnumeriques.org'
  },
  {
    name: 'Ms. Sovanchansreyleap KHENG',
    position: 'PNC English Trainer',
    phone: '+855 78 819 152',
    email: 'sovanchansreyleap.kheng@passerellesnumeriques.org'
  },
  {
    name: 'Mr. Puthy KRY',
    position: 'PNC Professional Life Trainer',
    phone: '+855 12 376 863',
    email: 'puthy.kry@passerellesnumeriques.org'
  }
];
</script>
<style>
.page-break {
  page-break-after: always;   /* Forces new page after this element */
  /* Remove any height/margin if you don't want extra blank space */
  /* height: 0; */
}

/* Keep your existing @media print block, just add the color adjust inside it */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page-break {
    page-break-after: always;
  }

  img {
    max-width: 100%;
  }
}
</style>
