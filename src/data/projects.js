/*
 * HOW TO ADD A PROJECT (no component changes needed):
 * 1. Copy one object below and paste it at the end of the array.
 * 2. Give it a unique `id` and `slug`.
 * 3. Put a screenshot in public/images/projects/ and set image: "/images/projects/my-shot.png".
 * 4. Fill githubUrl / liveUrl only with real URLs (leave null otherwise; the buttons hide automatically).
 * 5. Save. The card and its details dialog appear automatically.
 * Any optional field can be null or [] and it is simply hidden.
 */
export const projects = [
  {
    id: "joyaura-admin-panel",
    slug: "joyaura-admin-panel",
    title: "JoyAura Admin Panel",
    shortDescription: "A responsive e-commerce admin dashboard for managing products, categories and vendors.",
    fullDescription:
      "JoyAura Admin Panel is a responsive e-commerce administration dashboard built with React.js. It brings product, category and vendor management into one interface using reusable components and dynamic forms.",
    category: "Frontend",
    technologies: ["React.js", "JavaScript", "HTML", "CSS"],
    features: [
      "Responsive e-commerce admin dashboard",
      "Product management module",
      "Category-wise organization",
      "Vendor management",
      "Reusable React components",
      "Dynamic form handling",
    ],
    role: "Developed the frontend: reusable React components, dynamic forms and the product and category modules. Used Git and GitHub for version control and collaboration.",
    problem: "Store owners need one place to manage products, categories and vendors of an e-commerce store.",
    solution: "A component-based dashboard where each area (products, categories, vendors) is a frontend module built from shared, reusable pieces.",
    technicalDecisions: [
      "Reusable React components keep the interface consistent and maintainable.",
      "Dynamic form handling lets product and category forms share the same logic.",
    ],
    challenges: [], // add { challenge: "...", solution: "..." } objects to show this block
    learnings: ["Structuring a multi-module dashboard with reusable components.", "Using Git and GitHub for version control."],
    image: null, // e.g. "/images/projects/joyaura.png"
    gallery: [], // e.g. [{ src: "/images/projects/joyaura-2.png", alt: "Products page" }]
    githubUrl: null, // add your real repository URL
    liveUrl: null, // add your real live demo URL
    featured: true,
    status: "Completed",
    year: 2025,
    kind: "Project",
  },
  {
    id: "haze-removal-remote-sensing",
    slug: "haze-removal-remote-sensing",
    title: "Haze Removal from Remote Sensing Images",
    shortDescription: "An academic deep learning and image processing project that enhances hazy satellite images using DLCNN-MEF.",
    fullDescription:
      "An academic project that enhances hazy satellite images using the DLCNN-MEF technique. Laplacian and Gaussian pyramid-based features were applied for improved image restoration, and image quality was evaluated with PSNR, SSIM and MSE.",
    category: "Deep Learning",
    technologies: ["Deep Learning", "Image Processing", "DLCNN-MEF"],
    features: [
      "Enhancement of hazy satellite images with the DLCNN-MEF technique",
      "Laplacian and Gaussian pyramid-based features for image restoration",
      "Quality evaluation with PSNR, SSIM and MSE",
    ],
    role: "Developed this academic project during my B.Tech.",
    problem: "Haze in remote sensing images reduces visual quality, so hazy satellite images need enhancement.",
    solution: "Applied the DLCNN-MEF technique with Laplacian and Gaussian pyramid-based features for restoration.",
    technicalDecisions: [],
    challenges: [],
    learnings: ["Image quality was evaluated with PSNR, SSIM and MSE, with better enhancement results reported compared with existing approaches."],
    image: null,
    gallery: [],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    status: "Completed",
    year: 2023,
    kind: "Academic project",
  },
];
