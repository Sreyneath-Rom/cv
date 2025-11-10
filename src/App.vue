<template>
  <div id="app">
    <div ref="resume">
      <!-- Header -->
      <div class="header">
        <img :src="photo" alt="Sreyneath Rom" />
        <div>
          <h1>{{ name }}</h1>
          <h2>{{ title }}</h2>
        </div>
      </div>

      <!-- Columns -->
      <div class="columns">
        <!-- LEFT COLUMN -->
        <div class="left-column">
          <div class="section">
            <h3>Contact</h3>
            <div class="contact-item phone">{{ phone }}</div>
            <div class="contact-item email">{{ email }}</div>
            <div class="contact-item address">{{ address }}</div>
          </div>

          <div class="section">
            <h3>Education</h3>
            <div v-for="edu in education" :key="edu.degree">
              <strong>{{ edu.degree }}</strong><br />
              {{ edu.institution }}<br />
              <span class="date">{{ edu.years }}</span><br /><br />
            </div>
          </div>

          <div class="section">
            <h3>Technical Tools</h3>
            <ul><li v-for="tool in technicalTools" :key="tool">{{ tool }}</li></ul>
          </div>

          <div class="section">
            <h3>Languages</h3>
            <ul><li v-for="lang in languages" :key="lang">{{ lang }}</li></ul>
          </div>

          <div class="section">
            <h3>Hard Skills</h3>
            <ul><li v-for="skill in hardSkills" :key="skill">{{ skill }}</li></ul>
          </div>

          <div class="section">
            <h3>Soft Skills</h3>
            <ul><li v-for="skill in softSkills" :key="skill">{{ skill }}</li></ul>
          </div>

          <div class="section">
            <h3>Hobbies/Interests</h3>
            <ul><li v-for="hobby in hobbies" :key="hobby">{{ hobby }}</li></ul>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="right-column">
          <div class="section">
            <h3>About Me</h3>
            <div class="about-me">
              <div><strong>Full Name:</strong> {{ about.fullName }}</div>
              <div><strong>Gender:</strong> {{ about.gender }}</div>
              <div><strong>Date of birth:</strong> {{ about.dob }}</div>
              <div><strong>Nationality:</strong> {{ about.nationality }}</div>
              <div><strong>Place of birth:</strong> {{ about.placeOfBirth }}</div>
              <div><strong>Status:</strong> {{ about.status }}</div>
            </div>
          </div>

          <div class="section">
            <h3>Work Experience</h3>
            <div v-for="exp in workExperience" :key="exp.title" class="experience-item">
              <h4>{{ exp.title }} <span class="date">({{ exp.date }}) {{ exp.extra || '' }}</span></h4>
              <div class="role">Role: {{ exp.role }}</div>
              <ul><li v-for="desc in exp.descriptions" :key="desc">{{ desc }}</li></ul>
            </div>
          </div>

          <!-- Optional page break (if needed) -->
          <div class="page-break"></div>

          <div class="section">
            <h3>Technical Workshops</h3>
            <div v-for="workshop in technicalWorkshops" :key="workshop.title" class="experience-item">
              <h4>{{ workshop.title }} <span class="date">({{ workshop.date }})</span></h4>
              <ul><li v-for="desc in workshop.descriptions" :key="desc">{{ desc }}</li></ul>
            </div>
          </div>

          <div class="section">
            <h3>References</h3>
            <div v-for="ref in references" :key="ref.name" class="experience-item">
              <h4>{{ ref.name }}</h4>
              <span>{{ ref.position }}</span><br />
              Phone: {{ ref.phone }}<br />
              Email: {{ ref.email }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Download Button -->
    <button class="export-btn" @click="downloadPDF">
      📄 Download as PDF (A4)
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import photoFile from '@/assets/isme.png'; // ✅ proper image import

const resume = ref(null);

// ✅ Improved multi-page PDF export function
const downloadPDF = async () => {
  const element = resume.value;

  const canvas = await html2canvas(element, {
    scale: window.devicePixelRatio * 2, // sharper
    useCORS: true,
    backgroundColor: "#fff",
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const pageHeight = 297;
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("Sreyneath_Rom_Resume.pdf");
};

// 🧾 Resume Data
const photo = photoFile;
const name = 'SREYNEATH ROM';
const title = 'WEB DEVELOPER';
const phone = '+855 96 250 4227';
const email = 'romsreyneath4@gmail.com';
const address = 'Phum Tropeang Chhuk (Borey Sorla), Street 371, Phnom Penh, Cambodia';

const about = {
  fullName: 'Sreyneath ROM',
  dob: 'May 05, 2004',
  placeOfBirth: 'Siem Reap Province',
  gender: 'Female',
  nationality: 'Khmer',
  status: 'Single'
};

const education = [
  { degree: 'Associate Degree', institution: 'Passerelles Numériques Cambodia', years: '2024-Present' },
  { degree: 'High School Diploma', institution: 'Varin High School', years: '2020 - 2023' }
];

const technicalTools = [
  'Figma (Design)',
  'Canva',
  'Jira',
  'Git/GitHub',
  'Postman',
  'Linux (Ubuntu)',
  'AWS (EC2)',
  'MS Office (Word, Excel, PowerPoint)',
  'AI Tools (ChatGPT, Gemini, etc.)',
  'Power BI'
];

const languages = [
  'Khmer (Excellent)',
  'English (Intermediate)'
];

const hardSkills = [
  'HTML/CSS/SASS',
  'Bootstrap 5',
  'Tailwind CSS',
  'JavaScript',
  'PHP',
  'Node.js (Basic REST API)',
  'Python (Algorithm)',
  'Database (MySQL)',
  'OOP (TypeScript)',
  'Vue.js',
  'Laravel',
  'Data Analytics',
  'Firebase',
  'WordPress'
];

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

const hobbies = [
  'Researching',
  'Coding Practice',
  'Designing a Website On Trend'
];

const workExperience = [
  {
    title: 'Pos System',
    date: 'Feb 10, 2025 - May 02, 2025',
    extra: 'School Project',
    role: 'DevOps',
    descriptions: [
      'Monitored server performance and resolved infrastructure issues.',
      'Configured environments for development, testing, and production.',
      'Designed responsive user interfaces with HTML, CSS, JavaScript, and Bootstrap 5.',
      'Fetched and processed data using PHP and a connected database.'
    ]
  },
  {
    title: 'Inventory Management App',
    date: 'Jan 14, 2025 - Jan 29, 2025',
    role: 'Designer',
    descriptions: [
      'Designed responsive user interfaces with HTML, CSS, and Bootstrap 5.',
      'Created wireframes and mockups using Figma.',
      'Collaborated with developers to ensure design consistency.',
      'Fetched and handled data using JavaScript.'
    ]
  },
  {
    title: 'Video Download',
    date: 'Nov 18, 2024 – Nov 28, 2024',
    role: 'Team Leader',
    descriptions: [
      'Led a team of 3 members to develop a video downloader tool.',
      'Structured the project workflow and delegated tasks.',
      'Integrated JSON for dynamic configuration and settings.'
    ]
  },
  {
    title: 'Bakery Shop',
    date: 'Oct 21, 2024 – Nov 5, 2024',
    role: 'Designer',
    descriptions: [
      'Designed a visually appealing bakery website using SASS.',
      'Enhanced layout responsiveness for a better user experience.',
      'Maintained design consistency across pages.'
    ]
  },
  {
    title: 'Brochure Design',
    date: 'June 18, 2024 – Aug 16, 2024',
    role: 'Designer',
    descriptions: [
      'Created professional marketing brochures using Figma.',
      'Applied branding guidelines and visual design principles.',
      'Presented final designs to stakeholders for feedback and approval.'
    ]
  }
];

const technicalWorkshops = [
  {
    title: 'Product Owner',
    date: 'Jan 18 & 25, 2025',
    descriptions: [
      'Practiced defining product requirements and writing user stories.',
      'Utilized Jira to manage and track tasks in an agile environment.',
      'Collaborated in simulated roles (PO, Scrum Master, Dev Team) to understand agile team dynamics.',
      'Applied agile principles to a mini-project for practical learning.'
    ]
  },
  {
    title: 'UX/UI Design',
    date: 'Feb 7 & Mar 14, 2025',
    descriptions: [
      'Translated user requirements into wireframes and interactive prototypes.',
      'Applied design logic to improve usability and visual appeal.',
      'Conducted user-centered design exercises and design reviews.'
    ]
  },
  {
    title: 'Data Analytics',
    date: 'Mar 19, 2025',
    descriptions: [
      'Prepared and cleaned datasets using Python for analysis.',
      'Visualized insights using Power BI dashboards.',
      'Explored data storytelling techniques to communicate findings effectively.'
    ]
  },
  {
    title: 'Project Management',
    date: 'Feb 8, 2025 — Felix Leuker',
    descriptions: [
      'Explored project management fundamentals using agile methodologies.',
      'Worked with tools such as Jira, Git, and GitHub to manage project workflows.',
      'Simulated agile ceremonies (sprint planning, reviews, stand-ups) for real-world application.'
    ]
  }
];

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
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 20px;
  background: #f5f6fa;
}
#app {
  background: #fff;
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  padding: 20mm;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #333;
}
.header {
  display: flex;
  align-items: center;
  border-bottom: 3px solid #6c757d;
  padding-bottom: 15px;
  margin-bottom: 20px;
}
.header img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  border: 3px solid #6c757d;
}
.header h1 {
  font-size: 2em;
  margin: 0;
  color: #000;
}
.header h2 {
  margin: 4px 0 0 0;
  color: #555;
  font-weight: normal;
  font-size: 1.1em;
}
.columns {
  display: flex;
}
.left-column {
  width: 30%;
  padding-right: 15px;
  background-color: #e9ecef;
}
.right-column {
  width: 70%;
  padding-left: 15px;
}
.section {
  margin-bottom: 20px;
}
.section h3 {
  font-size: 1.1em;
  background-color: #6c757d;
  color: #fff;
  padding: 6px 10px;
  margin: 0 0 10px 0;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.95em;
}
.contact-item::before {
  margin-right: 10px;
}
.contact-item.phone::before {
  content: "📞";
}
.contact-item.email::before {
  content: "✉️";
}
.contact-item.address::before {
  content: "🏠";
}
ul {
  list-style-type: disc;
  padding-left: 18px;
  margin: 0;
}
.experience-item {
  margin-bottom: 15px;
}
.experience-item h4 {
  margin: 0;
  font-size: 1em;
  color: #111;
}
.experience-item .date {
  font-style: italic;
  color: #666;
  font-size: 0.9em;
}
.experience-item .role {
  font-weight: bold;
  color: #333;
}
.about-me {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.about-me div {
  font-size: 0.95em;
}
.about-me strong {
  font-weight: bold;
}
/* Export Button */
.export-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(to right, #6c757d, #adb5bd);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}
.export-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
/* Optional manual page-break */
.page-break {
  page-break-before: always;
  margin-top: 20px;
}
@media print {
  @page {
    size: A4;
    margin: 0;
  }
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background: white;
  }
  .export-btn {
    display: none;
  }
  #app {
    box-shadow: none;
    margin: 0;
  }
  .left-column {
    background-color: #e9ecef !important;
  }
}
</style>
