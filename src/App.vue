<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-end mb-6">
        <html2-canvas-exporter 
          :target-ref="$refs.cvContainer" 
          :is-exporting="isExporting"
          @export-start="isExporting = true" 
          @export-end="isExporting = false" 
        />
      </div>
      <div 
        ref="cvContainer" 
        class="bg-white shadow-lg overflow-hidden rounded-lg a4-container print:shadow-none print:rounded-none"
      >
        <div class="cv-content">
          <!-- Header -->
          <header class="border-b border-gray-200 mb-8 pb-6">
            <div class="flex flex-col md:flex-row items-center gap-6">
              <div class="flex-shrink-0">
                <img
                  :src="personalInfo.photo"
                  :alt="`${personalInfo.name} — profile photo`"
                  class="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-2 ring-gray-200 shadow-md print:ring-0 print:shadow-none"
                  loading="lazy"
                />
              </div>
              <div class="text-center md:text-left flex-1">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {{ personalInfo.name }}
                </h1>
                <p class="mt-2 text-lg text-gray-600 font-medium">
                  {{ personalInfo.position }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Portfolio: <a href="https://github.com/yourusername" class="text-blue-600 hover:underline">github.com/yourusername</a>
                </p>
              </div>
            </div>
          </header>

          <!-- Content Layout -->
          <div :class="[
            'grid lg:grid-cols-12 gap-6',
            { 'flex flex-col gap-6': isExporting || $mq === 'print' }
          ]">
            <!-- Sidebar -->
            <aside class="lg:col-span-4 space-y-5 print:w-full print:col-span-full" 
                   :aria-label="`Sidebar with personal details`"
                   :style="{ position: isExporting ? 'static' : '' }">
              
              <!-- Contact -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact
                </h3>
                <div class="space-y-2 text-sm text-gray-700">
                  <div v-if="primaryContact.phone" class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="font-medium">{{ primaryContact.phone }}</span>
                  </div>
                  <div v-if="primaryContact.email" class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium break-all">{{ primaryContact.email }}</span>
                  </div>
                  <div v-if="primaryContact.address" class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-sm leading-relaxed">{{ primaryContact.address }}</span>
                  </div>
                </div>
              </section>

              <!-- Education -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-8.303a7 7 0 00-14 0" />
                  </svg>
                  Education
                </h3>
                <div class="space-y-3">
                  <div v-for="edu in education" :key="edu.degree" class="pt-2 border-t border-gray-100 last:border-t-0">
                    <h4 class="font-semibold text-gray-900 text-sm">{{ edu.degree }}</h4>
                    <p class="text-gray-600 text-xs mt-0.5">{{ edu.institution }}</p>
                    <p class="text-gray-500 text-xs">{{ edu.period }}</p>
                  </div>
                </div>
              </section>

              <!-- Languages -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Languages
                </h3>
                <ul class="space-y-3">
                  <li v-for="lang in languages" :key="lang.lang" class="flex items-center justify-between py-1">
                    <div class="flex-1">
                      <span class="font-medium text-gray-900 text-sm">{{ lang.lang }}</span>
                      <div class="text-xs text-gray-500 capitalize">{{ lang.level }}</div>
                    </div>
                    <div class="w-20 h-1.5 bg-gray-200 rounded-full ml-3 overflow-hidden">
                      <div class="h-full bg-blue-600 rounded-full transition-all duration-300" 
                           :style="{ width: languageLevelWidth(lang.level) }"></div>
                    </div>
                  </li>
                </ul>
              </section>

              <!-- Key Skills -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Skills
                </h3>
                <div class="space-y-3">
                  <div v-for="skill in hardSkills" :key="skill" class="text-xs">
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-medium text-gray-900">{{ skill }}</span>
                      <span class="text-xs text-gray-500 font-medium">{{ getSkillPercent(skill) }}%</span>
                    </div>
                    <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-blue-600 rounded-full transition-all duration-300" 
                           :style="{ width: getSkillPercent(skill) + '%' }"></div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Tools -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Tools
                </h3>
                <div class="flex flex-wrap gap-1">
                  <span v-for="tool in technicalTools" :key="tool" 
                        class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                    {{ tool }}
                  </span>
                </div>
              </section>

              <!-- Soft Skills -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Soft Skills
                </h3>
                <div class="flex flex-wrap gap-1">
                  <span v-for="skill in softSkills" :key="skill" 
                        class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                    {{ skill }}
                  </span>
                </div>
              </section>

              <!-- Personal Details -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal
                </h3>
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div v-for="(value, key) in aboutMe" :key="key" class="space-y-1">
                    <dt class="font-medium text-gray-500 capitalize">{{ key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }}:</dt>
                    <dd class="text-gray-900">{{ value }}</dd>
                  </div>
                </div>
              </section>

              <!-- Interests -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2H5a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485a2 2 0 01-2.828 0l-2.829-2.829a2 2 0 010-2.828L11 7.343z" />
                  </svg>
                  Interests
                </h3>
                <ul class="space-y-1 text-xs text-gray-700 list-disc list-inside pl-2">
                  <li v-for="hobby in hobbies" :key="hobby">{{ hobby }}</li>
                </ul>
              </section>
            </aside>

            <!-- Main Content -->
            <main class="lg:col-span-8 space-y-6 print:w-full print:col-span-full" aria-label="Main content">
              
              <!-- Professional Summary -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Professional Summary
                </h3>
                <p class="text-sm text-gray-700 leading-relaxed">
                  Dynamic Web Developer Intern with 1+ year of project-based experience in full-stack development, specializing in responsive UI/UX and agile workflows. Proven in building scalable apps using Vue.js, Laravel, and AWS, with a 25% efficiency gain in team projects. Eager to leverage technical skills and collaborative mindset to drive innovative solutions at a forward-thinking tech firm.
                </p>
              </section>

              <!-- Professional Experience -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Professional Experience
                </h3>
                <div class="space-y-4">
                  <div v-for="(exp, index) in workExperience" :key="index" class="pt-3 border-t border-gray-100 first:border-t-0">
                    <div class="flex items-start justify-between mb-2">
                      <h4 class="font-semibold text-gray-900 text-sm flex-1">{{ exp.title }}</h4>
                      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded ml-3 whitespace-nowrap">{{ exp.period }}</span>
                    </div>
                    <p v-if="exp.type" class="text-xs text-gray-600 italic mb-1">{{ exp.type }}</p>
                    <p v-if="exp.role" class="text-xs font-medium text-gray-700 mb-2">Role: {{ exp.role }}</p>
                    <ul class="space-y-1 text-xs text-gray-700">
                      <li v-for="(desc, dIndex) in exp.descriptions" :key="dIndex" class="flex items-start gap-1 pl-3">
                        <svg class="w-2.5 h-2.5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="leading-relaxed">{{ desc }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- Professional Development -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 0l-.707.707M17.657 3.343l-.707-.707M21 12h-1M4 12H3m3.343 5.657l-.707.707m2.828 0l-.707-.707M12 21v-1M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 0l-.707.707" />
                  </svg>
                  Professional Development
                </h3>
                <div class="space-y-4">
                  <div v-for="(workshop, index) in workshops" :key="index" class="pt-3 border-t border-gray-100 first:border-t-0">
                    <div class="flex items-start justify-between mb-2">
                      <h4 class="font-semibold text-gray-900 text-sm flex-1">{{ workshop.title }}</h4>
                      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded ml-3 whitespace-nowrap">{{ workshop.date }}</span>
                    </div>
                    <p v-if="workshop.facilitator" class="text-xs text-gray-600 italic mb-1">Facilitator: {{ workshop.facilitator }}</p>
                    <ul class="space-y-1 text-xs text-gray-700">
                      <li v-for="(desc, dIndex) in workshop.descriptions" :key="dIndex" class="flex items-start gap-1 pl-3">
                        <svg class="w-2.5 h-2.5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="leading-relaxed">{{ desc }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- References -->
              <section class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  References
                </h3>
                <div class="grid grid-cols-1 gap-4">
                  <div v-for="ref in references" :key="ref.email" class="p-3 border border-gray-100 rounded bg-gray-50 print:bg-white print:border-0">
                    <h4 class="font-semibold text-gray-900 text-sm mb-1">{{ ref.name }}</h4>
                    <p class="text-xs text-gray-600 mb-2">{{ ref.position }}</p>
                    <div class="space-y-1 text-xs text-gray-700">
                      <div class="flex items-center gap-1">
                        <svg class="w-3 h-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{{ ref.phone }}</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <svg class="w-3 h-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span class="break-all">{{ ref.email }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import profilePhoto from "@/assets/isme.png";
import Html2CanvasExporter from '@/components/html2canvas.vue';

export default {
  name: "Resume",
  components: {
    Html2CanvasExporter
  },
  setup() {
    const isExporting = ref(false)
    return { isExporting }
  },
  data() {
    return {
      personalInfo: {
        name: "SREYNEATH ROM",
        position: "Web Developer Intern",
        photo: profilePhoto,
      },
      aboutMe: {
        dob: "May 05, 2004",
        pob: "Siem Reap Province",
        gender: "Female",
        nationality: "Khmer",
        status: "Single",
      },
      contact: [
        {
          phone: "+855 96 250 4227",
          email: "sreyneath.rom@student.passerellesnumeriques.org",
          address: "Phum Tropeang Chhuk (Borey Sorla), Street 371, Phnom Penh, Cambodia",
        },
      ],
      education: [
        {
          degree: "Associate Degree in Software Development",
          institution: "Passerelles Numériques Cambodia",
          period: "2024 - Present",
        },
        {
          degree: "High School Diploma",
          institution: "Varin High School",
          period: "2020 - 2023",
        },
      ],
      technicalTools: [
        "Figma", "Canva", "Jira", "Git/GitHub", "Postman", "Linux (Ubuntu)",
        "AWS (EC2)", "MS Office", "AI Tools (ChatGPT, Gemini)", "Power BI"
      ],
      languages: [
        { lang: "Khmer", level: "Native" },
        { lang: "English", level: "Intermediate" },
      ],
      workExperience: [
        {
          title: "POS System",
          period: "Feb 2025 - May 2025",
          type: "School Project",
          role: "DevOps Engineer",
          descriptions: [
            "Monitored server performance and resolved infrastructure issues, achieving 99% uptime for production environments.",
            "Configured development, testing, and production pipelines, reducing deployment time by 40%.",
            "Designed responsive user interfaces using HTML, CSS, JavaScript, and Bootstrap 5 for cross-device compatibility.",
            "Developed back-end logic with PHP and MySQL, handling 1,000+ daily transactions efficiently."
          ],
        },
        {
          title: "Inventory Management App",
          period: "Jan 2025",
          role: "UI/UX Designer",
          descriptions: [
            "Created responsive interfaces with HTML, CSS, and Bootstrap 5, improving user satisfaction scores by 30%.",
            "Produced wireframes and high-fidelity mockups using Figma, accelerating development by 2 weeks.",
            "Collaborated with development team to maintain design fidelity across implementation phases.",
            "Implemented client-side data handling using JavaScript for real-time inventory updates."
          ],
        },
        {
          title: "Video Download Tool",
          period: "Nov 2024",
          role: "Team Leader",
          descriptions: [
            "Directed a team of 3 in building a video downloader application, delivering 1 week ahead of schedule.",
            "Established project workflows and delegated responsibilities, fostering agile collaboration.",
            "Integrated JSON configurations for flexible settings, enhancing tool usability for 500+ downloads."
          ],
        },
        {
          title: "Bakery Shop Website",
          period: "Oct - Nov 2024",
          role: "Front-End Designer",
          descriptions: [
            "Developed a modern bakery website using SASS for advanced styling, boosting page load speed by 25%.",
            "Optimized layouts for responsiveness across devices, ensuring accessibility compliance.",
            "Ensured consistent design elements throughout multiple pages for brand cohesion."
          ],
        },
        {
          title: "Marketing Brochure Design",
          period: "Jun - Aug 2024",
          role: "Graphic Designer",
          descriptions: [
            "Designed professional brochures in Figma, adhering to branding guidelines and increasing engagement by 15%.",
            "Incorporated visual hierarchy and typography to effectively communicate key messages.",
            "Gathered stakeholder feedback and iterated designs for final approval and production."
          ],
        },
      ],
      hardSkills: [
        "HTML/CSS/SASS", "Bootstrap 5", "Tailwind CSS", "JavaScript",
        "Vue.js", "Laravel", "Node.js (RESTful APIs)", "Python (Algorithms)",
        "MySQL", "Firebase", "Data Analytics", "WordPress"
      ],
      softSkills: [
        "Problem Solving", "Adaptability", "Teamwork",
        "Time Management", "Communication", "Critical Thinking", "Creativity"
      ],
      hobbies: [
        "Researching emerging technologies",
        "Coding challenges and practice",
        "Designing modern, trend-forward websites"
      ],
      workshops: [
        {
          title: "Product Owner Training",
          date: "Jan 2025",
          descriptions: [
            "Defined product requirements and authored user stories for agile development, streamlining sprint planning.",
            "Managed tasks in Jira to facilitate progress tracking, reducing bottlenecks by 20%.",
            "Participated in role simulations (PO, Scrum Master, Developer) to grasp team dynamics.",
            "Applied agile methodologies to a hands-on mini-project for practical insight."
          ]
        },
        {
          title: "UX/UI Design Workshop",
          date: "Feb - Mar 2025",
          descriptions: [
            "Converted user needs into wireframes and interactive prototypes using Figma, enhancing usability.",
            "Enhanced usability through design principles and iterative improvements.",
            "Conducted user testing and peer reviews to refine prototypes, improving conversion rates."
          ]
        },
        {
          title: "Data Analytics Fundamentals",
          date: "Mar 2025",
          descriptions: [
            "Cleaned and prepared datasets in Python for accurate statistical analysis.",
            "Built interactive dashboards in Power BI to visualize key insights for stakeholders.",
            "Mastered data storytelling to convey complex findings to non-technical audiences."
          ]
        },
        {
          title: "Project Management Essentials",
          date: "Feb 2025",
          facilitator: "Felix Leuker",
          descriptions: [
            "Studied agile project management principles and best practices.",
            "Utilized Jira, Git, and GitHub for efficient workflow orchestration.",
            "Facilitated mock agile ceremonies including sprint planning and retrospectives."
          ]
        }
      ],
      references: [
        {
          name: "Mr. Rady Y",
          position: "IT Coordinator, Passerelles Numériques Cambodia",
          phone: "+855 12 251 803",
          email: "rady.y@passerellesnumeriques.org"
        },
        {
          name: "Ms. Sovanchansreyleap KHENG",
          position: "English Trainer, Passerelles Numériques Cambodia",
          phone: "+855 78 819 152",
          email: "sovanchansreyleap.kheng@passerellesnumeriques.org"
        },
        {
          name: "Mr. Puthy KRY",
          position: "Professional Life Trainer, Passerelles Numériques Cambodia",
          phone: "+855 12 376 863",
          email: "puthy.kry@passerellesnumeriques.org"
        }
      ]
    };
  },
  computed: {
    primaryContact() {
      return this.contact && this.contact.length ? this.contact[0] : {};
    },
  },
  methods: {
    getSkillPercent(skill) {
      if (!skill) return 60;
      const s = skill.toLowerCase();

      const rules = [
        { keywords: ["html", "css", "sass", "tailwind", "bootstrap"], percent: 90 },
        { keywords: ["javascript", "vue"], percent: 85 },
        { keywords: ["laravel", "node"], percent: 80 },
        { keywords: ["mysql", "firebase"], percent: 75 },
        { keywords: ["python", "data analytics"], percent: 70 },
        { keywords: ["wordpress"], percent: 65 },
      ];

      for (const rule of rules) {
        for (const kw of rule.keywords) {
          if (s.includes(kw)) return rule.percent;
        }
      }
      return 60;
    },

    languageLevelWidth(level) {
      if (!level) return "50%";
      const l = level.toLowerCase();
      if (l.includes("native") || l.includes("excellent")) return "100%";
      if (l.includes("advanced")) return "85%";
      if (l.includes("intermediate")) return "70%";
      if (l.includes("basic")) return "40%";
      return "50%";
    },
  },
};
</script>

<style scoped>
/* Base CV Styles */
.cv-content {
  padding: 18mm;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 10pt;
  line-height: 1.5;
  color: #374151;
  max-width: 100%;
  box-sizing: border-box;
}

/* A4 Size Container */
.a4-container {
  width: 210mm;
  margin: 0 auto;
  background: white;
  box-sizing: border-box;
  min-height: 297mm;
}

/* Print Styles */
@media print {
  .min-h-screen {
    padding: 0 !important;
    background: white !important;
  }

  .a4-container {
    width: 210mm !important;
    min-height: 297mm !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    overflow: visible !important;
  }

  .cv-content {
    padding: 18mm !important;
    box-sizing: border-box;
  }

  button {
    display: none !important;
  }

  a {
    color: black !important;
    text-decoration: underline !important;
  }

  * {
    color-scheme: exact !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .shadow-md, .shadow-lg {
    box-shadow: none !important;
  }

  .rounded-lg {
    border-radius: 0 !important;
  }

  img {
    max-width: 100% !important;
    height: auto !important;
  }

  svg {
    stroke: currentColor !important;
    fill: none !important;
  }

  /* Typography for Print */
  h1 {
    font-size: 18pt !important;
    line-height: 1.2 !important;
  }

  h3 {
    font-size: 11pt !important;
  }

  h4 {
    font-size: 10pt !important;
  }

  .text-sm {
    font-size: 9pt !important;
  }

  .text-xs {
    font-size: 8pt !important;
  }

  /* Ensure no overflow */
  *, *::before, *::after {
    overflow-wrap: break-word !important;
    word-break: break-word !important;
  }

  .break-all {
    word-break: break-all !important;
  }
}

/* Screen Optimizations */
@media (min-width: 1024px) {
  .cv-content {
    padding: 1.5rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>