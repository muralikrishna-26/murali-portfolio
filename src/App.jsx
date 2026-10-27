import { useCallback, useEffect, useMemo, useState } from "react";
import { Briefcase, Download, FolderGit2, Home, Mail, Palette, SquareTerminal, User, Wrench, FileText } from "lucide-react";
import { navLinks, profile } from "./data/profile.js";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { useScrollY } from "./hooks/useScrollY.js";
import { useTheme } from "./hooks/useTheme.js";
import { scrollToSection } from "./utils/scroll.js";
import About from "./components/About.jsx";
import BackToTop from "./components/BackToTop.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Contact from "./components/Contact.jsx";
import DeveloperTerminal from "./components/DeveloperTerminal.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import { GithubIcon } from "./components/icons.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import Resume from "./components/Resume.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Skills from "./components/Skills.jsx";

const SECTION_IDS = [...navLinks.map((l) => l.id), "resume"].sort((a, b) => ["home","about","skills","projects","experience","education","resume","contact"].indexOf(a) - ["home","about","skills","projects","experience","education","resume","contact"].indexOf(b));

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { y, progress } = useScrollY();
  const active = useActiveSection(SECTION_IDS);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands = useMemo(() => {
    const ic = (I) => <I size={16} aria-hidden="true" />;
    return [
      { id: "home", label: "Go to Home", icon: ic(Home), run: () => scrollToSection("home") },
      { id: "about", label: "Go to About", icon: ic(User), run: () => scrollToSection("about") },
      { id: "skills", label: "Go to Skills", icon: ic(Wrench), run: () => scrollToSection("skills") },
      { id: "projects", label: "Go to Projects", icon: ic(FolderGit2), run: () => scrollToSection("projects") },
      { id: "resume", label: "Go to Resume", icon: ic(FileText), run: () => scrollToSection("resume") },
      { id: "download", label: "Download Resume PDF", icon: ic(Download), keywords: "cv pdf", run: () => { const a = document.createElement("a"); a.href = profile.resumeUrl; a.download = "Murali-Krishna-Kummagiri-Resume.pdf"; a.click(); } },
      { id: "contact", label: "Go to Contact", icon: ic(Mail), run: () => scrollToSection("contact") },
      { id: "theme", label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`, icon: ic(Palette), keywords: "theme dark light mode", run: toggleTheme },
      { id: "github", label: "Open GitHub profile", icon: <GithubIcon size={16} />, hint: "new tab", run: () => window.open(profile.github, "_blank", "noopener,noreferrer") },
      { id: "terminal", label: "Open developer terminal", icon: ic(SquareTerminal), run: () => setTerminalOpen(true) },
      { id: "experience", label: "Go to Experience", icon: ic(Briefcase), run: () => scrollToSection("experience") },
    ];
  }, [theme, toggleTheme]);

  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <ScrollProgress progress={progress} />
      <Navbar active={active} scrolled={y > 24} theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop visible={y > 600} />
      <CommandPalette open={paletteOpen} onClose={closePalette} commands={commands} />
      <DeveloperTerminal open={terminalOpen} onOpen={() => setTerminalOpen(true)} onClose={closeTerminal} />
    </>
  );
}
