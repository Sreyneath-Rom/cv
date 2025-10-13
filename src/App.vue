<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div ref="cvContent" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8" role="banner" aria-label="Profile header">
        <div class="md:flex items-center gap-6 p-6 lg:p-8">
          <div class="flex-shrink-0 mx-auto md:mx-0">
            <img
              :src="personalInfo.photo"
              :alt="`${personalInfo.name} — profile photo`"
              class="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover ring-4 ring-indigo-100 shadow-md"
              loading="lazy"
            />
          </div>

          <div class="text-center md:text-left flex-1 mt-6 md:mt-0">
            <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">{{ personalInfo.name }}</h1>
            <p class="mt-2 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
              {{ personalInfo.position }}
            </p>

            <div class="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-6 justify-center md:justify-start text-sm text-gray-600 space-y-3 sm:space-y-0" aria-label="Contact information">
              <div class="flex items-center gap-3" v-if="primaryContact.email">
                <svg class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span class="font-medium">{{ primaryContact.email }}</span>
              </div>
              <div class="flex items-center gap-3" v-if="primaryContact.phone">
                <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h2.586a1 1 0 01.707.293L12 6l3.707-2.707A1 1 0 0116.414 3H19a2 2 0 012 2v4a10 10 0 11-18 0V5z"/>
                </svg>
                <span class="font-medium">{{ primaryContact.phone }}</span>
              </div>
              <div class="flex items-center gap-3" v-if="primaryContact.address">
                <svg class="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C8.13 2 5 5.13 5 9c0 6.63 7 13 7 13s7-6.37 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span class="font-medium">{{ primaryContact.address }}</span>
              </div>
            </div>
            <div class="mt-6 flex justify-center md:justify-start">
              <button @click="exportToJPG" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-200">Download as JPG (A4)</button>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div :class="['lg:grid lg:grid-cols-3 lg:gap-8', { 'flex flex-col gap-8': isExporting }]">
        <!-- Sidebar -->
        <aside :class="['lg:col-span-1 space-y-6', { 'w-full': isExporting }]" aria-label="Sidebar" :style="{ position: isExporting ? 'static' : '' }">
          <section class="bg-white p-5 rounded-2xl shadow-md" role="region" aria-label="About Me">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">About Me</h3>
            <div class="grid grid-cols-1 gap-3 text-sm text-gray-700">
              <div class="flex justify-between"><span class="font-medium">Full Name</span><span>{{ aboutMe.fullName }}</span></div>
              <div class="flex justify-between"><span class="font-medium">Date of Birth</span><span>{{ aboutMe.dob }}</span></div>
              <div class="flex justify-between"><span class="font-medium">Place of Birth</span><span>{{ aboutMe.pob }}</span></div>
              <div class="flex justify-between"><span class="font-medium">Gender</span><span>{{ aboutMe.gender }}</span></div>
              <div class="flex justify-between"><span class="font-medium">Nationality</span><span>{{ aboutMe.nationality }}</span></div>
              <div class="flex justify-between"><span class="font-medium">Status</span><span>{{ aboutMe.status }}</span></div>
            </div>
          </section>

          <section class="bg-white p-5 rounded-2xl shadow-md" role="region" aria-label="Education">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Education</h3>
            <div v-for="edu in education" :key="edu.degree + edu.institution" class="mb-4 last:mb-0">
              <h4 class="font-medium text-gray-800">{{ edu.degree }}</h4>
              <p class="text-sm text-gray-600">{{ edu.institution }}</p>
              <p class="text-xs text-gray-500">{{ edu.period }}</p>
            </div>
          </section>

          <section class="bg-white p-5 rounded-2xl shadow-md" role="region" aria-label="Languages">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Languages</h3>
            <ul class="space-y-4">
              <li v-for="lang in languages" :key="lang.lang" class="flex items-center justify-between">
                <div>
                  <span class="font-medium text-gray-800">{{ lang.lang }}</span>
                  <div class="text-xs text-gray-500">{{ lang.level }}</div>
                </div>
                <div class="w-32 h-2 bg-gray-200 rounded-full overflow-hidden ml-4" :aria-hidden="true">
                  <div
                    class="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                    :style="{ width: languageLevelWidth(lang.level) }"
                  ></div>
                </div>
              </li>
            </ul>
          </section>

          <section class="bg-white p-5 rounded-2xl shadow-md" role="region" aria-label="Hard Skills">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Hard Skills</h3>
            <div class="space-y-4">
              <div v-for="skill in hardSkills" :key="skill" class="text-sm">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-gray-800 font-medium">{{ skill }}</span>
                  <span class="text-xs text-gray-500">{{ getSkillPercent(skill) }}%</span>
                </div>
                <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden" :aria-hidden="true">
                  <div
                    class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    :style="{ width: getSkillPercent(skill) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white p-5 rounded-2xl shadow-md" role="region" aria-label="Soft Skills">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Soft Skills</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in softSkills" :key="skill" class="text-xs bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full font-medium">
                {{ skill }}
              </span>
            </div>
          </section>

          <section class="bg-white p-5 rounded-2xl shadow-md" role="region" aria-label="Technical Tools">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Technical Tools</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tool in technicalTools"
                :key="tool"
                class="text-xs bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full font-medium"
              >
                {{ tool }}
              </span>
            </div>
          </section>

          <section class="bg-white p-5 rounded-2xl shadow-md" role="region" aria-label="Hobbies">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Hobbies</h3>
            <ul class="list-disc list-inside text-sm space-y-2 text-gray-700">
              <li v-for="hobby in hobbies" :key="hobby">{{ hobby }}</li>
            </ul>
          </section>
        </aside>

        <!-- Main -->
        <main :class="['lg:col-span-2 mt-8 lg:mt-0 space-y-8', { 'w-full mt-0': isExporting }]" aria-label="Main content">
          <section class="bg-white p-6 rounded-2xl shadow-md" role="region" aria-labelledby="work-title">
            <h3 id="work-title" class="text-xl font-semibold mb-6 text-gray-900 border-b pb-3">Work Experience</h3>
            <div class="space-y-8 relative before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200 before:z-0">
              <div v-for="exp in workExperience" :key="exp.title" class="relative pl-10 z-10">
                <div class="absolute left-0 top-2">
                  <span class="block w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-white shadow-sm" aria-hidden="true"></span>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div class="flex items-baseline justify-between mb-1">
                    <h4 class="font-semibold text-gray-900">{{ exp.title }}</h4>
                    <span class="text-sm text-gray-500">{{ exp.period }}</span>
                  </div>
                  <div class="text-sm text-gray-600 mb-3">{{ exp.type ? exp.type + ' • ' : '' }}Role: <span class="font-medium text-gray-800">{{ exp.role }}</span></div>
                  <ul class="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li v-for="(desc, di) in exp.descriptions" :key="di">{{ desc }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white p-6 rounded-2xl shadow-md" role="region" aria-labelledby="workshops-title">
            <h3 id="workshops-title" class="text-xl font-semibold mb-6 text-gray-900 border-b pb-3">Technical Workshops</h3>
            <div class="space-y-6">
              <div v-for="workshop in workshops" :key="workshop.title" class="p-4 rounded-lg border border-gray-100 shadow-sm bg-white">
                <div class="flex justify-between items-baseline mb-1">
                  <h4 class="font-semibold text-gray-900">{{ workshop.title }}</h4>
                  <div class="text-sm text-gray-500">{{ workshop.date }}</div>
                </div>
                <div v-if="workshop.facilitator" class="text-sm text-gray-600 mb-3">Facilitator: {{ workshop.facilitator }}</div>
                <ul class="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li v-for="(d, di) in workshop.descriptions" :key="di">{{ d }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="bg-white p-6 rounded-2xl shadow-md" role="region" aria-labelledby="references-title">
            <h3 id="references-title" class="text-xl font-semibold mb-6 text-gray-900 border-b pb-3">References</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="ref in references" :key="ref.email" class="p-4 border rounded-lg shadow-sm bg-white">
                <div class="font-semibold text-gray-900 mb-1">{{ ref.name }}</div>
                <div class="text-sm text-gray-600 mb-3">{{ ref.position }}</div>
                <div class="text-sm text-gray-700 flex items-center gap-2"><span class="font-medium">Phone:</span> {{ ref.phone }}</div>
                <div class="text-sm text-gray-700 flex items-center gap-2"><span class="font-medium">Email:</span> {{ ref.email }}</div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import profilePhoto from '@/assets/isme.png';
import html2canvas from 'html2canvas';

export default {
  name: 'Resume',
  data() {
    return {
      isExporting: false,
      personalInfo: {
        name: 'SREYNEATH ROM',
        position: 'WEB DEVELOPER INTERN',
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

      // Primary contact list (keeps canonical contact data)
      contact: [
        {
          phone: '+855 96 250 4227',
          email: 'romsreyneath4@gmail.com',
          address: 'Phum Tropeang Chhuk (Borey Sorla), Street 371, Phnom Penh, Cambodia'
        }
      ],

      education: [
        { degree: 'Associate Degree', institution: 'Passerelles Numériques Cambodia', period: '2024-Present' },
        { degree: 'High School Diploma', institution: 'Varin High School', period: '2020 - 2023' }
      ],
      technicalTools: [
        'Figma', 'Canva', 'Jira', 'Git/GitHub', 'Postman', 'Linux', 'AWS', 'MS Office', 'AI Tools', 'Power BI'
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
        'Node.js',
        'Python',
        'MySQL',
        'TypeScript (OOP)',
        'Vue.js',
        'Laravel',
        'Data Analytics',
        'Firebase',
        'WordPress'
      ],
      softSkills: [
        'Problem solving',
        'Adaptability',
        'Teamwork',
        'Time Management',
        'Task Management',
        'Communication',
        'Critical Thinking',
        'Creative'
      ],
      hobbies: [
        'Researching',
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
          date: 'Feb 8, 2025',
          facilitator: 'Felix Leuker',
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
  },
  computed: {
    // primary contact to be used in header
    primaryContact() {
      return this.contact && this.contact.length ? this.contact[0] : {};
    }
  },
  methods: {
    async exportToJPG() {
      this.isExporting = true;
      await this.$nextTick();

      const element = this.$refs.cvContent;
      const scale = 3; // Higher scale for better resolution suitable for A4 print (approx 300dpi)

      const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'resume_a4.jpg';
      link.click();

      this.isExporting = false;
    },
    // improved keyword-driven skill percent mapping
    getSkillPercent(skill) {
      if (!skill) return 60;
      const s = skill.toLowerCase();

      // mapping of keywords to percents (order matters - more specific first)
      const rules = [
        { keywords: ['html', 'css', 'sass', 'tailwind', 'bootstrap'], percent: 90 },
        { keywords: ['javascript', 'vue', 'typescript'], percent: 85 },
        { keywords: ['php', 'laravel'], percent: 75 },
        { keywords: ['node', 'python', 'firebase'], percent: 70 },
        { keywords: ['mysql'], percent: 70 },
        { keywords: ['data analytics', 'data', 'power bi'], percent: 65 },
        { keywords: ['wordpress'], percent: 60 }
      ];

      for (const rule of rules) {
        for (const kw of rule.keywords) {
          if (s.includes(kw)) return rule.percent;
        }
      }
      return 60; // default
    },

    languageLevelWidth(level) {
      if (!level) return '50%';
      const l = level.toLowerCase();
      if (l.includes('excellent')) return '95%';
      if (l.includes('advanced')) return '85%';
      if (l.includes('intermediate')) return '65%';
      if (l.includes('basic')) return '40%';
      return '50%';
    }
  }
};
</script>

<style scoped>
/* Enhanced styles for better readability and modern look */
</style>