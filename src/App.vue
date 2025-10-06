<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <header class="bg-white rounded-xl shadow-md overflow-hidden -mt-6 mb-6">
        <div class="md:flex items-center gap-6 p-6">
          <div class="flex-shrink-0 mx-auto md:mx-0">
            <img
              :src="personalInfo.photo"
              alt="Profile Photo"
              class="w-36 h-36 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
          </div>

          <div class="text-center md:text-left flex-1 mt-4 md:mt-0">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-800">{{ personalInfo.name }}</h1>
            <p class="mt-1 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {{ personalInfo.position }}
            </p>

            <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-center md:justify-start text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>{{ personalInfo.email }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h2.586a1 1 0 01.707.293L12 6l3.707-2.707A1 1 0 0116.414 3H19a2 2 0 012 2v4a10 10 0 11-18 0V5z"/>
                </svg>
                <span>{{ personalInfo.phone }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C8.13 2 5 5.13 5 9c0 6.63 7 13 7 13s7-6.37 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span>{{ personalInfo.address }}</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="md:flex md:gap-6">
        <!-- Sidebar -->
        <aside class="md:w-1/3 space-y-4 md:sticky md:top-8">
          <section class="bg-white p-4 rounded-xl shadow">
            <h3 class="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">EDUCATION</h3>
            <div v-for="(edu, index) in education" :key="index" class="mb-3">
              <h4 class="font-medium text-gray-800">{{ edu.degree }}</h4>
              <p class="text-sm text-gray-500">{{ edu.institution }}</p>
              <p class="text-xs text-gray-400">{{ edu.period }}</p>
            </div>
          </section>

          <section class="bg-white p-4 rounded-xl shadow">
            <h3 class="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">TECHNICAL TOOLS</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tool, i) in technicalTools"
                :key="i"
                class="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full shadow-sm"
              >
                {{ tool }}
              </span>
            </div>
          </section>

          <section class="bg-white p-4 rounded-xl shadow">
            <h3 class="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">LANGUAGES</h3>
            <ul class="space-y-2">
              <li v-for="(lang, index) in languages" :key="index" class="flex items-center justify-between">
                <div>
                  <span class="font-medium text-gray-800">{{ lang.lang }}</span>
                  <div class="text-xs text-gray-400">{{ lang.level }}</div>
                </div>
                <div class="w-24 h-2 bg-gray-200 rounded overflow-hidden ml-3">
                  <div
                    class="h-full bg-gradient-to-r from-green-400 to-green-600"
                    :style="{ width: languageLevelWidth(lang.level) }"
                  ></div>
                </div>
              </li>
            </ul>
          </section>

          <section class="bg-white p-4 rounded-xl shadow">
            <h3 class="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">HARD SKILLS</h3>
            <div class="space-y-3">
              <div v-for="(skill, index) in hardSkills" :key="index" class="text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-800">{{ skill }}</span>
                  <span class="text-xs text-gray-400">{{ getSkillPercent(skill) }}%</span>
                </div>
                <div class="w-full h-2 bg-gray-200 rounded mt-2 overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-indigo-400 to-purple-500"
                    :style="{ width: getSkillPercent(skill) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white p-4 rounded-xl shadow">
            <h3 class="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">SOFT SKILLS</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="(skill, i) in softSkills" :key="i" class="text-xs bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full">
                {{ skill }}
              </span>
            </div>
          </section>

          <section class="bg-white p-4 rounded-xl shadow">
            <h3 class="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">HOBBIES</h3>
            <ul class="list-disc list-inside text-sm space-y-1 text-gray-700">
              <li v-for="(hobby, i) in hobbies" :key="i">{{ hobby }}</li>
            </ul>
          </section>
        </aside>

        <!-- Main -->
        <main class="md:w-2/3 mt-6 md:mt-0 space-y-6">
          <section class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-lg font-semibold mb-3 text-gray-800">About Me</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div class="space-y-2">
                <div class="flex justify-between"><span class="font-medium">Full Name</span><span>{{ aboutMe.fullName }}</span></div>
                <div class="flex justify-between"><span class="font-medium">Date of birth</span><span>{{ aboutMe.dob }}</span></div>
                <div class="flex justify-between"><span class="font-medium">Place of birth</span><span>{{ aboutMe.pob }}</span></div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between"><span class="font-medium">Gender</span><span>{{ aboutMe.gender }}</span></div>
                <div class="flex justify-between"><span class="font-medium">Nationality</span><span>{{ aboutMe.nationality }}</span></div>
                <div class="flex justify-between"><span class="font-medium">Status</span><span>{{ aboutMe.status }}</span></div>
              </div>
            </div>
          </section>

          <section class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-lg font-semibold mb-4 text-gray-800">Work Experience</h3>
            <div class="space-y-6">
              <div v-for="(exp, index) in workExperience" :key="index" class="relative pl-6">
                <div class="absolute left-0 top-1">
                  <span class="block w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white"></span>
                </div>
                <div class="text-sm">
                  <div class="flex items-baseline justify-between">
                    <h4 class="font-medium text-gray-800">{{ exp.title }}</h4>
                    <span class="text-xs text-gray-400">{{ exp.period }}</span>
                  </div>
                  <div class="text-xs text-gray-500 mb-1">{{ exp.type ? exp.type + ' • ' : '' }}Role: <span class="font-medium text-gray-700">{{ exp.role }}</span></div>
                  <ul class="list-disc list-inside text-gray-600 space-y-1">
                    <li v-for="(desc, di) in exp.descriptions" :key="di">{{ desc }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-lg font-semibold mb-4 text-gray-800">Technical Workshops</h3>
            <div class="space-y-4">
              <div v-for="(workshop, i) in workshops" :key="i" class="p-3 rounded border border-gray-100">
                <div class="flex justify-between items-baseline">
                  <h4 class="font-medium text-gray-800">{{ workshop.title }}</h4>
                  <div class="text-xs text-gray-400">{{ workshop.date }}</div>
                </div>
                <div v-if="workshop.facilitator" class="text-xs text-gray-500 mb-2">Facilitator: {{ workshop.facilitator }}</div>
                <ul class="list-disc list-inside text-gray-600">
                  <li v-for="(d, di) in workshop.descriptions" :key="di">{{ d }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-lg font-semibold mb-4 text-gray-800">References</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="(ref, index) in references" :key="index" class="p-3 border rounded">
                <div class="font-medium text-gray-800">{{ ref.name }}</div>
                <div class="text-sm text-gray-500">{{ ref.position }}</div>
                <div class="text-sm text-gray-600 mt-2">Phone: <span class="font-medium">{{ ref.phone }}</span></div>
                <div class="text-sm text-gray-600">Email: <span class="font-medium">{{ ref.email }}</span></div>
              </div>
            </div>
          </section>

        </main>
      </div>
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
  methods: {
    // derive a numeric percentage for skills (simple heuristic)
    getSkillPercent(skill) {
      const s = skill.toLowerCase();
      if (s.includes('html') || s.includes('css') || s.includes('tailwind') || s.includes('bootstrap')) return 90;
      if (s.includes('javascript') || s.includes('vue')) return 85;
      if (s.includes('php') || s.includes('laravel')) return 75;
      if (s.includes('node') || s.includes('python')) return 70;
      if (s.includes('data') || s.includes('analytics') || s.includes('power bi')) return 65;
      if (s.includes('mysql') || s.includes('firebase')) return 70;
      return 60;
    },
    languageLevelWidth(level) {
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
/* subtle improvements for better readability on different screen sizes */
@media (min-width: 768px) {
  header img {
    transform: translateY(-4px);
  }
}
</style>
