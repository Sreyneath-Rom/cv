import { ref, computed } from 'vue';

// This composable centralizes all the static data for the CV.
export function useCVData() {
  const personalInfo = ref({
    name: "SREYNEATH ROM",
    position: "Web Developer Intern",
  });

  const contact = ref([
    {
      phone: "+855 96 250 4227",
      email: "sreyneath.rom@student.passerellesnumeriques.org",
    },
  ]);

  const education = ref([
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
  ]);

  const technicalTools = ref([
    "Figma", "Canva", "Jira", "Git/GitHub", "Postman", "Linux (Ubuntu)",
    "AWS (EC2)", "MS Office", "AI Tools (ChatGPT, Gemini)", "Power BI"
  ]);

  const languages = ref([
    { lang: "Khmer", level: "Native" },
    { lang: "English", level: "Intermediate" },
  ]);

  const workExperience = ref([
    {
      title: "POS System",
      period: "Feb 2025 - May 2025",
      role: "DevOps Engineer",
      descriptions: [
        "Monitored server performance and resolved infrastructure issues, achieving 99% uptime.",
        "Configured CI/CD pipelines, reducing deployment time by 40%.",
        "Developed back-end logic with PHP and MySQL, handling 1,000+ daily transactions."
      ],
    },
    {
      title: "Inventory Management App",
      period: "Jan 2025",
      role: "UI/UX Designer",
      descriptions: [
        "Created responsive interfaces with HTML, CSS, and Bootstrap 5, improving user satisfaction by 30%.",
        "Produced wireframes and high-fidelity mockups using Figma, accelerating development by 2 weeks.",
      ],
    },
  ]);

  const hardSkills = ref([
    "HTML/CSS/SASS", "Bootstrap 5", "Tailwind CSS", "JavaScript",
    "Vue.js", "Laravel", "Node.js (RESTful APIs)", "Python",
    "MySQL", "Firebase", "Data Analytics", "WordPress"
  ]);

  const softSkills = ref([
    "Problem Solving", "Adaptability", "Teamwork",
    "Time Management", "Communication", "Critical Thinking", "Creativity"
  ]);

  const workshops = ref([
    {
      title: "Product Owner Training",
      date: "Jan 2025",
      description: "Defined product requirements, authored user stories, and managed tasks in Jira to streamline sprint planning."
    },
    {
      title: "UX/UI Design Workshop",
      date: "Feb - Mar 2025",
      description: "Converted user needs into wireframes and interactive prototypes using Figma, enhancing usability through iterative design."
    },
  ]);

  const primaryContact = computed(() => (contact.value && contact.value.length ? contact.value[0] : {}));

  return {
    personalInfo,
    contact,
    education,
    technicalTools,
    languages,
    workExperience,
    hardSkills,
    softSkills,
    workshops,
    primaryContact,
  };
}
