<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
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
        class="bg-white shadow-xl overflow-hidden rounded-3xl a4-container print:shadow-none print:rounded-none"
      >
        <div class="cv-content">
          <!-- Header -->
          <header class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-inner mb-8 page-break-after print:mb-0">
            <div class="flex flex-col md:flex-row items-center gap-6 p-6 lg:p-8">
              <div class="flex-shrink-0">
                <img
                  :src="personalInfo.photo"
                  :alt="`${personalInfo.name} — profile photo`"
                  class="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-4 ring-white/50 shadow-lg print:ring-0 print:shadow-none"
                  loading="lazy"
                />
              </div>
              <div class="text-center md:text-left flex-1 mt-4 md:mt-0">
                <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                  {{ personalInfo.name }}
                </h1>
                <p class="mt-3 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-base font-semibold shadow-lg">
                  {{ personalInfo.position }}
                </p>
              </div>
            </div>
          </header>

          <!-- Content Layout -->
          <div :class="[
            'grid lg:grid-cols-12 gap-8',
            { 'flex flex-col gap-8': isExporting || $mq === 'print' }
          ]">
            <!-- Sidebar -->
            <aside class="lg:col-span-4 space-y-6 print:w-full print:col-span-full" 
                   :aria-label="`Sidebar with personal details`"
                   :style="{ position: isExporting ? 'static' : '' }">
              
              <!-- Contact -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact
                </h3>
                <div class="space-y-3 text-sm text-gray-700">
                  <div v-if="primaryContact.phone" class="flex items-center gap-3 p-2 bg-indigo-50 rounded-lg">
                    <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="font-medium">{{ primaryContact.phone }}</span>
                  </div>
                  <div v-if="primaryContact.email" class="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                    <svg class="w-5 h-5 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium break-all">{{ primaryContact.email }}</span>
                  </div>
                  <div v-if="primaryContact.address" class="flex items-start gap-3 p-2 bg-orange-50 rounded-lg">
                    <svg class="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="font-medium text-sm leading-relaxed">{{ primaryContact.address }}</span>
                  </div>
                </div>
              </section>

              <!-- Education -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-8.303a7 7 0 00-14 0" />
                  </svg>
                  Education
                </h3>
                <div class="space-y-4">
                  <div v-for="edu in education" :key="edu.degree" class="pt-3 border-t border-gray-100 last:border-t-0">
                    <h4 class="font-semibold text-gray-900 text-base">{{ edu.degree }}</h4>
                    <p class="text-gray-600 text-sm mt-1">{{ edu.institution }}</p>
                    <p class="text-gray-500 text-xs mt-0.5">{{ edu.period }}</p>
                  </div>
                </div>
              </section>

              <!-- Languages -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Languages
                </h3>
                <ul class="space-y-4">
                  <li v-for="lang in languages" :key="lang.lang" class="flex items-center justify-between py-2">
                    <div class="flex-1">
                      <span class="font-medium text-gray-900">{{ lang.lang }}</span>
                      <div class="text-xs text-gray-500 capitalize">{{ lang.level }}</div>
                    </div>
                    <div class="w-24 h-2 bg-gray-200 rounded-full ml-4 overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all duration-500" 
                           :style="{ width: languageLevelWidth(lang.level) }"></div>
                    </div>
                  </li>
                </ul>
              </section>

              <!-- Hard Skills -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hard Skills
                </h3>
                <div class="space-y-4">
                  <div v-for="skill in hardSkills" :key="skill" class="text-sm">
                    <div class="flex items-center justify-between mb-2">
                      <span class="font-medium text-gray-900">{{ skill }}</span>
                      <span class="text-xs text-gray-500 font-medium">{{ getSkillPercent(skill) }}%</span>
                    </div>
                    <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500" 
                           :style="{ width: getSkillPercent(skill) + '%' }"></div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Technical Tools -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Technical Tools
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tool in technicalTools" :key="tool" 
                        class="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium border border-indigo-200">
                    {{ tool }}
                  </span>
                </div>
              </section>

              <!-- Soft Skills -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Soft Skills
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="skill in softSkills" :key="skill" 
                        class="px-3 py-1.5 bg-amber-100 text-amber-800 text-xs rounded-full font-medium border border-amber-200">
                    {{ skill }}
                  </span>
                </div>
              </section>

              <!-- Hobbies -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2H5a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485a2 2 0 01-2.828 0l-2.829-2.829a2 2 0 010-2.828L11 7.343z" />
                  </svg>
                  Hobbies / Interests
                </h3>
                <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside pl-2">
                  <li v-for="hobby in hobbies" :key="hobby" class="leading-relaxed">{{ hobby }}</li>
                </ul>
              </section>
            </aside>

            <!-- Main Content -->
            <main class="lg:col-span-8 space-y-8 print:w-full print:col-span-full" aria-label="Main content">
              
              <!-- About Me -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  About Me
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div v-for="(value, key) in aboutMe" :key="key" class="space-y-1">
                    <dt class="font-medium text-gray-500 capitalize">{{ key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }}:</dt>
                    <dd class="text-gray-900 ml-1">{{ value }}</dd>
                  </div>
                </div>
              </section>

              <!-- Work Experience -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Work Experience
                </h3>
                <div class="space-y-6">
                  <div v-for="(exp, index) in workExperience" :key="index" class="pt-4 border-t border-gray-100 first:border-t-0 group">
                    <div class="flex items-start justify-between mb-2">
                      <h4 class="font-semibold text-gray-900 text-base flex-1">{{ exp.title }}</h4>
                      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-4 whitespace-nowrap">{{ exp.period }}</span>
                    </div>
                    <p v-if="exp.type" class="text-sm text-indigo-600 italic mb-2">{{ exp.type }}</p>
                    <p class="text-sm font-medium text-gray-700 mb-3">Role: <span class="text-indigo-600">{{ exp.role }}</span></p>
                    <ul class="space-y-2 text-sm text-gray-700">
                      <li v-for="(desc, dIndex) in exp.descriptions" :key="dIndex" class="flex items-start gap-2 pl-4">
                        <svg class="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="leading-relaxed">{{ desc }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- Technical Workshops -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 0l-.707.707M17.657 3.343l-.707-.707M21 12h-1M4 12H3m3.343 5.657l-.707.707m2.828 0l-.707-.707M12 21v-1M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 0l-.707.707" />
                  </svg>
                  Technical Workshops
                </h3>
                <div class="space-y-6">
                  <div v-for="(workshop, index) in workshops" :key="index" class="pt-4 border-t border-gray-100 first:border-t-0">
                    <div class="flex items-start justify-between mb-2">
                      <h4 class="font-semibold text-gray-900 text-base flex-1">{{ workshop.title }}</h4>
                      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-4 whitespace-nowrap">{{ workshop.date }}</span>
                    </div>
                    <p v-if="workshop.facilitator" class="text-sm text-purple-600 italic mb-2">Facilitator: {{ workshop.facilitator }}</p>
                    <ul class="space-y-2 text-sm text-gray-700">
                      <li v-for="(desc, dIndex) in workshop.descriptions" :key="dIndex" class="flex items-start gap-2 pl-4">
                        <svg class="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="leading-relaxed">{{ desc }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- References -->
              <section class="bg-white p-6 rounded-2xl shadow-md page-break-inside-avoid print:shadow-none print:rounded-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-indigo-100 pb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  References
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="ref in references" :key="ref.email" class="p-4 border border-gray-200 rounded-xl bg-gray-50 print:bg-white print:border-0">
                    <h4 class="font-semibold text-gray-900 mb-2">{{ ref.name }}</h4>
                    <p class="text-sm text-gray-600 mb-3">{{ ref.position }}</p>
                    <div class="space-y-2 text-sm text-gray-700">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{{ ref.phone }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        position: "WEB DEVELOPER INTERN",
        photo: profilePhoto,
      },
      aboutMe: {
        fullName: "Sreyneath ROM",
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
          degree: "Associate Degree",
          institution: "Passerelles Numériques Cambodia",
          period: "2024-Present",
        },
        {
          degree: "High School Diploma",
          institution: "Varin High School",
          period: "2020 - 2023",
        },
      ],
      technicalTools: [
        "Figma (Design)",
        "Canva",
        "Jira",
        "Git/GitHub",
        "Postman",
        "Linux(Ubuntu)",
        "AWS(EC2)",
        "MS Office (Word, Excel, PowerPoint)",
        "AI Tools (ChatGPT, Gemini , etc.)",
        "Power BI",
      ],
      languages: [
        { lang: "Khmer", level: "Excellent" },
        { lang: "English", level: "Intermediate" },
      ],
      workExperience: [
        {
          title: "Pos System",
          period: "Feb 10, 2025 - May 02, 2025",
          type: "School Project",
          role: "DevOps",
          descriptions: [
            "Monitored server performance and resolved infrastructure issues.",
            "Configured environments for development, testing, and production.",
            "Designed responsive user interfaces with HTML, CSS, JavaScript, and Bootstrap 5.",
            "Fetched and processed data using PHP and a connected database.",
          ],
        },
        {
          title: "Inventory Management App",
          period: "Jan 14, 2025 - Jan 29, 2025",
          role: "Designer",
          descriptions: [
            "Designed responsive user interfaces with HTML, CSS, and Bootstrap 5.",
            "Created wireframes and mockups using Figma.",
            "Collaborated with developers to ensure design consistency.",
            "Fetched and handled data using JavaScript.",
          ],
        },
        {
          title: "Video Download",
          period: "Nov 18, 2024 – Nov 28, 2024",
          role: "Team Leader",
          descriptions: [
            "Led a team of 3 members to develop a video downloader tool.",
            "Structured the project workflow and delegated tasks.",
            "Integrated JSON for dynamic configuration and settings.",
          ],
        },
        {
          title: "Bakery Shop",
          period: "Oct 21, 2024 – Nov 5, 2024",
          role: "Designer",
          descriptions: [
            "Designed a visually appealing bakery website using SASS.",
            "Enhanced layout responsiveness for a better user experience.",
            "Maintained design consistency across pages.",
          ],
        },
        {
          title: "Brochure Design",
          period: "June 18, 2024 – Aug 16, 2024",
          role: "Designer",
          descriptions: [
            "Created professional marketing brochures using Figma.",
            "Applied branding guidelines and visual design principles.",
            "Presented final designs to stakeholders for feedback and approval.",
          ],
        },
      ],
      hardSkills: [
        "HTML/CSS/SASS",
        "Bootstrap 5",
        "Tailwind CSS",
        "JavaScript",
        "PHP",
        "Node.js (Basic REST API)",
        "Python (Algorithm )",
        "Database (MySQL)",
        "OOP (TypeScript)",
        "Vue.js",
        "Laravel",
        "Data Analytics ",
        "Firebase",
        "WordPress"
      ],
      softSkills: [
        "Problem solving ",
        "Adaptability",
        "Teamwork",
        "Time Management",
        "Task Management",
        "Communication",
        "Critical Thinking",
        "Creative"
      ],
      hobbies: [
        "Researching ",
        "Coding practice",
        "Designing a Website On Trend"
      ],
      workshops: [
        {
          title: "Product Owner",
          date: "Jan 18 & 25, 2025",
          descriptions: [
            "Practiced defining product requirements and writing user stories.",
            "Utilized Jira to manage and track tasks in an agile environment.",
            "Collaborated in simulated roles (PO, Scrum Master, Dev Team) to understand agile team dynamics.",
            "Applied agile principles to a mini-project for practical learning."
          ]
        },
        {
          title: "UX/UI Design",
          date: "Feb 7 & Mar 14, 2025",
          descriptions: [
            "Translated user requirements into wireframes and interactive prototypes.",
            "Applied design logic to improve usability and visual appeal.",
            "Conducted user-centered design exercises and design reviews."
          ]
        },
        {
          title: "Data Analytics",
          date: "Mar 19, 2025",
          descriptions: [
            "Prepared and cleaned datasets using Python for analysis.",
            "Visualized insights using Power BI dashboards.",
            "Explored data storytelling techniques to communicate findings effectively."
          ]
        },
        {
          title: "Project Management",
          date: "Feb 8, 2025 —Felix Leuker",
          descriptions: [
            "Explored project management fundamentals using agile methodologies.",
            "Worked with tools such as Jira, Git, and GitHub to manage project workflows.",
            "Simulated agile ceremonies (sprint planning, reviews, stand-ups) for real-world application."
          ]
        }
      ],
      references: [
        {
          name: "Mr. Rady Y",
          position: "PNC IT Coordinator",
          phone: "+855 12 251 803",
          email: "rady.y@passerellesnumeriques.org"
        },
        {
          name: "Ms. Sovanchansreyleap KHENG",
          position: "PNC English trainer",
          phone: "+855 78 819 152",
          email: "sovanchansreyleap.kheng@passerellesnumeriques.org"
        },
        {
          name: "Mr. Puthy KRY",
          position: "PNC Professional life trainer",
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
        { keywords: ["javascript", "vue", "typescript"], percent: 85 },
        { keywords: ["php", "laravel"], percent: 80 },
        { keywords: ["node", "python", "firebase"], percent: 75 },
        { keywords: ["mysql", "database"], percent: 70 },
        { keywords: ["data analytics", "data"], percent: 65 },
        { keywords: ["wordpress"], percent: 60 },
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
      if (l.includes("excellent")) return "100%";
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
  padding: 15mm;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 10pt;
  line-height: 1.6;
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
    padding: 15mm !important;
    box-sizing: border-box;
  }

  button {
    display: none !important;
  }

  .page-break-before {
    page-break-before: always;
  }

  .page-break-after {
    page-break-after: always;
  }

  .page-break-inside-avoid {
    page-break-inside: avoid;
  }

  * {
    color-scheme: exact !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .shadow-md, .shadow-lg, .shadow-xl, .shadow-inner, .shadow-sm {
    box-shadow: none !important;
  }

  .rounded-2xl, .rounded-3xl, .rounded-lg, .rounded-xl {
    border-radius: 0 !important;
  }

  .bg-white {
    background: white !important;
  }

  .bg-gradient-to-r {
    background: linear-gradient(to right, #4f46e5, #7c3aed) !important;
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
    font-size: 22pt !important;
    line-height: 1.2 !important;
  }

  h3 {
    font-size: 13pt !important;
  }

  h4 {
    font-size: 11pt !important;
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
    padding: 2rem;
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