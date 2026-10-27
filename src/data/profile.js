// Single source of truth for personal details. Edit here, the whole site updates.
export const profile = {
  name: "Murali Krishna Kummagiri",
  firstName: "Murali Krishna",
  initials: "MK",
  title: "React JS Developer",
  headline: "React JS Developer Building Modern Web Experiences.",
  intro:
    "I build responsive, user-friendly web interfaces with HTML, CSS, JavaScript and React.js, using reusable components and clean frontend practices.",
  email: "muralikrishna88404@gmail.com",
  phone: "+91-9346260556",
  showPhone: false, // set true to display your phone number publicly on the site
  github: "https://github.com/muralikrishna-26",
  linkedin: "https://linkedin.com/in/kummagirin",
  resumeUrl: "/resume.pdf",
  photo: { webp: "/images/profile.webp", jpg: "/images/profile.jpg", alt: "Portrait of Murali Krishna Kummagiri in a navy suit and striped tie" },
  // Only set a short sentence once it is true, e.g. "Open to frontend roles". null hides the label.
  availability: null,
  summary:
    "React JS Developer with strong knowledge of HTML, CSS, JavaScript, and React.js. Skilled in building responsive and user-friendly web applications using reusable React components and modern frontend development practices. Quick learner with good problem-solving abilities and a strong interest in developing scalable web applications and continuously improving technical skills.",
  highlights: [
    { label: "Focus", value: "Frontend with React.js" },
    { label: "Builds", value: "Responsive interfaces" },
    { label: "Style", value: "Reusable components" },
    { label: "Education", value: "B.Tech, 2023" },
  ],
  approach: [
    { title: "Readable", text: "Clear component names and simple structure so code is easy to follow." },
    { title: "Usable", text: "Responsive layouts and user-friendly interfaces that work across screen sizes." },
    { title: "Maintainable", text: "Reusable components and dynamic forms to keep changes small and safe." },
  ],
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
