<template>
  <div class="max-w-6xl mx-auto p-6 bg-gray-50">
    <header class="text-center bg-gray-200 p-6 rounded-lg">
      <img :src="personalInfo.photo" alt="Profile Photo" class="w-36 h-36 rounded-full object-cover mx-auto">
      <h1 class="text-3xl font-bold mt-4">{{ personalInfo.name }}</h1>
      <h2 class="text-xl text-gray-600">{{ personalInfo.position }}</h2>
    </header>

    <section class="text-center my-6 space-y-1">
      <p class="text-sm text-gray-700"><span class="mr-2"></span>{{ personalInfo.phone }}</p>
      <p class="text-sm text-gray-700"><span class="mr-2"></span>{{ personalInfo.email }}</p>
      <p class="text-sm text-gray-700"><span class="mr-2"></span>{{ personalInfo.address }}</p>
    </section>

    <div class="md:flex md:gap-6">
      <aside class="md:w-1/3 space-y-4">
        <section class="bg-gray-100 p-4 rounded">
          <h3 class="text-sm font-semibold border-b pb-2 mb-2">EDUCATION</h3>
          <div v-for="(edu, index) in education" :key="index" class="mb-3">
            <h4 class="font-medium">{{ edu.degree }}</h4>
            <p class="text-sm text-gray-600">{{ edu.institution }}</p>
            <p class="text-sm text-gray-500">{{ edu.period }}</p>
          </div>
        </section>

        <section class="bg-gray-100 p-4 rounded">
          <h3 class="text-sm font-semibold border-b pb-2 mb-2">TECHNICAL TOOLS</h3>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li v-for="(tool, index) in technicalTools" :key="index">{{ tool }}</li>
          </ul>
        </section>

        <section class="bg-gray-100 p-4 rounded">
          <h3 class="text-sm font-semibold border-b pb-2 mb-2">LANGUAGES</h3>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li v-for="(lang, index) in languages" :key="index">{{ lang.lang }} ({{ lang.level }})</li>
          </ul>
        </section>

        <section class="bg-gray-100 p-4 rounded">
          <h3 class="text-sm font-semibold border-b pb-2 mb-2">HARD SKILLS</h3>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li v-for="(skill, index) in hardSkills" :key="index">{{ skill }}</li>
          </ul>
        </section>

        <section class="bg-gray-100 p-4 rounded">
          <h3 class="text-sm font-semibold border-b pb-2 mb-2">SOFT SKILLS</h3>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li v-for="(skill, index) in softSkills" :key="index">{{ skill }}</li>
          </ul>
        </section>

        <section class="bg-gray-100 p-4 rounded">
          <h3 class="text-sm font-semibold border-b pb-2 mb-2">HOBBIES/INTERESTS</h3>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li v-for="(hobby, index) in hobbies" :key="index">{{ hobby }}</li>
          </ul>
        </section>
      </aside>

      <main class="md:w-2/3 space-y-6 mt-6 md:mt-0">
        <section class="bg-white p-4 rounded shadow-sm">
          <h3 class="text-lg font-semibold mb-3">About Me</h3>
          <table class="table-auto w-full text-sm">
            <tbody>
              <tr>
                <td class="border px-3 py-2 font-medium w-1/3">Full Name:</td>
                <td class="border px-3 py-2">{{ aboutMe.fullName }}</td>
              </tr>
              <tr>
                <td class="border px-3 py-2 font-medium">Date of birth:</td>
                <td class="border px-3 py-2">{{ aboutMe.dob }}</td>
              </tr>
              <tr>
                <td class="border px-3 py-2 font-medium">Place of birth:</td>
                <td class="border px-3 py-2">{{ aboutMe.pob }}</td>
              </tr>
              <tr>
                <td class="border px-3 py-2 font-medium">Gender:</td>
                <td class="border px-3 py-2">{{ aboutMe.gender }}</td>
              </tr>
              <tr>
                <td class="border px-3 py-2 font-medium">Nationality:</td>
                <td class="border px-3 py-2">{{ aboutMe.nationality }}</td>
              </tr>
              <tr>
                <td class="border px-3 py-2 font-medium">Status:</td>
                <td class="border px-3 py-2">{{ aboutMe.status }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="bg-white p-4 rounded shadow-sm">
          <h3 class="text-lg font-semibold mb-3">WORK EXPERIENCE</h3>
          <div v-for="(exp, index) in workExperience" :key="index" class="mb-4">
            <h4 class="font-medium">{{ exp.title }} <span class="text-sm text-gray-500">({{ exp.period }})</span></h4>
            <p v-if="exp.type" class="text-sm text-gray-600">{{ exp.type }}</p>
            <p class="text-sm">Role: <span class="font-medium">{{ exp.role }}</span></p>
            <ul class="list-disc list-inside text-sm mt-2">
              <li v-for="(desc, descIndex) in exp.descriptions" :key="descIndex">{{ desc }}</li>
            </ul>
          </div>
        </section>

        <section class="bg-white p-4 rounded shadow-sm">
          <h3 class="text-lg font-semibold mb-3">Technical Workshops</h3>
          <div v-for="(workshop, index) in workshops" :key="index" class="mb-4">
            <h4 class="font-medium">{{ workshop.title }} <span class="text-sm text-gray-500">({{ workshop.date }})</span></h4>
            <ul class="list-disc list-inside text-sm mt-2">
              <li v-for="(desc, descIndex) in workshop.descriptions" :key="descIndex">{{ desc }}</li>
            </ul>
          </div>
        </section>

        <section class="bg-white p-4 rounded shadow-sm">
          <h3 class="text-lg font-semibold mb-3">REFERENCES</h3>
          <div v-for="(ref, index) in references" :key="index" class="mb-4">
            <h4 class="font-medium">{{ ref.name }}</h4>
            <p class="text-sm text-gray-600">{{ ref.position }}</p>
            <p class="text-sm">Phone: {{ ref.phone }}</p>
            <p class="text-sm">Email: {{ ref.email }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import profilePhoto from '@/assets/image.jpg';

export default {
  name: 'Resume',
  data() {
    return {
      personalInfo: {
        name: 'SREYNEATH ROM',
        position: 'WEB DEVELOPER INTERN',
        phone: '+855 96 250 4227',
        email: 'sreyneath.rom@student.passerellesnumeriques.org',
        address: 'Phum Tropeang Chhuk (Borey Sorla), Street 371, Phnom Penh, Cambodia',
        photo: profilePhoto
      },
      aboutMe: {
        fullName: 'Sreyneath ROM',
        dob: 'May 05, 2004',
        pob: 'Siem Reap Province',
        gender: 'Female',
        nationality: 'Khmer',
        status: 'Single'
      },
      education: [
        { degree: 'Associate Degree', institution: 'Passerelles Numériques Cambodia', period: '2024-Present' },
        { degree: 'High School Diploma', institution: 'Varin High School', period: '2020 - 2023' }
      ],
      technicalTools: [
        'Figma (Design)',
        'Canva',
        'Jira',
        'Git/GitHub',
        'Postman',
        'Linux(Ubuntu)',
        'AWS(EC2)',
        'MS Office (Word, Excel, PowerPoint)',
        'AI Tools (ChatGPT, Gemini , etc.)',
        'Power BI'
      ],
      languages: [
        { lang: 'Khmer', level: 'Excellent' },
        { lang: 'English', level: 'Intermediate' }
      ],
      workExperience: [
        {
          title: 'Pos System',
          period: 'Feb 10, 2025 - May 02, 2025',
          type: 'School Project',
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
          period: 'Jan 14, 2025 - Jan 29, 2025',
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
          period: 'Nov 18, 2024 – Nov 28, 2024',
          role: 'Team Leader',
          descriptions: [
            'Led a team of 3 members to develop a video downloader tool.',
            'Structured the project workflow and delegated tasks.',
            'Integrated JSON for dynamic configuration and settings.'
          ]
        },
        {
          title: 'Bakery Shop',
          period: 'Oct 21, 2024 – Nov 5, 2024',
          role: 'Designer',
          descriptions: [
            'Designed a visually appealing bakery website using SASS.',
            'Enhanced layout responsiveness for a better user experience.',
            'Maintained design consistency across pages.'
          ]
        },
        {
          title: 'Brochure Design',
          period: 'June 18, 2024 – Aug 16, 2024',
          role: 'Designer',
          descriptions: [
            'Created professional marketing brochures using Figma.',
            'Applied branding guidelines and visual design principles.',
            'Presented final designs to stakeholders for feedback and approval.'
          ]
        }
      ],
      hardSkills: [
        'HTML/CSS/SASS',
        'Bootstrap 5',
        'Tailwind CSS',
        'JavaScript',
        'PHP',
        'Node.js (Basic REST API)',
        'Python (Algorithm )',
        'Database (MySQL)',
        'OOP (TypeScript)',
        'Vue.js',
        'Laravel',
        'Data Analytics ',
        'Firebase',
        'WordPress'
      ],
      softSkills: [
        'Problem solving ',
        'Adaptability',
        'Teamwork',
        'Time Management',
        'Task Management',
        'Communication',
        'Critical Thinking',
        'Creative'
      ],
      hobbies: [
        'Researching ',
        'Coding practice',
        'Designing a Website On Trend'
      ],
      workshops: [
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
          date: 'Feb 8, 2025 —Felix Leuker',
          descriptions: [
            'Explored project management fundamentals using agile methodologies.',
            'Worked with tools such as Jira, Git, and GitHub to manage project workflows.',
            'Simulated agile ceremonies (sprint planning, reviews, stand-ups) for real-world application.'
          ]
        }
      ],
      references: [
        {
          name: 'Mr. Rady Y',
          position: 'PNC IT Coordinator',
          phone: '+855 12 251 803',
          email: 'rady.y@passerellesnumeriques.org'
        },
        {
          name: 'Ms. Sovanchansreyleap KHENG',
          position: 'PNC English trainer',
          phone: '+855 78 819 152',
          email: 'sovanchansreyleap.kheng@passerellesnumeriques.org'
        },
        {
          name: 'Mr. Puthy KRY',
          position: 'PNC Professional life trainer',
          phone: '+855 12 376 863',
          email: 'puthy.kry@passerellesnumeriques.org'
        }
      ]
    };
  }
};
</script>
