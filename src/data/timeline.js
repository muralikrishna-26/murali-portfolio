// type: "Employment" | "Internship" | "Project" | "Academic project" | "Workshop" | "Achievement"
// To add verified work experience, add an object like:
// { id: "job-1", type: "Employment", title: "Frontend Developer", org: "Company name", period: "2026 - Present", description: "What you really did." }
export const experience = [
  { id: "joyaura", type: "Project", title: "JoyAura Admin Panel", org: "React.js e-commerce admin dashboard", period: "2025",
    description: "Developed a responsive admin dashboard for products, categories and vendors with reusable React components and dynamic forms." },
  { id: "haze", type: "Academic project", title: "Haze Removal from Remote Sensing Images", org: "B.Tech academic project", period: "2023",
    description: "Enhanced hazy satellite images using DLCNN-MEF and evaluated them with PSNR, SSIM and MSE." },
  { id: "scilab", type: "Workshop", title: "Mathematical Operations with Scilab", org: "APSSDC, 3-day workshop", period: "",
    description: "Attended a three-day workshop conducted by APSSDC." },
  { id: "skill-competition", type: "Achievement", title: "Andhra Pradesh State Skill Competition, Electronics", org: "Chittoor Cluster Level, conducted by APSSDC", period: "2020",
    description: "Participated in the Electronics category." },
  { id: "sports-meet", type: "Achievement", title: "District Sports and Games Meet", org: "District level", period: "2019 - 2020",
    description: "Participated in the district meet." },
];

export const education = [
  { id: "btech", title: "Bachelor of Technology (B.Tech)", org: "Geethanjali Institute of Science and Technology, Nellore", period: "2023", score: "75%" },
  { id: "inter", title: "Intermediate (MPC)", org: "SKKR Government Junior College, Nellore", period: "2019", score: "83%" },
  { id: "ssc", title: "SSC", org: "ZPP High School, Damaramadugu, SPSR Nellore District, Andhra Pradesh", period: "2017", score: "85%" },
];
