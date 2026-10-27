import { Atom, Braces, Code, FileText, GitBranch, Layers, LayoutDashboard, Palette, SquareTerminal, Smartphone } from "lucide-react";

const ICONS = { code: Code, palette: Palette, braces: Braces, atom: Atom, git: GitBranch, editor: SquareTerminal, responsive: Smartphone, layers: Layers, layout: LayoutDashboard, file: FileText };

export default function SkillIcon({ name, size = 22 }) {
  const Icon = ICONS[name] || Code;
  return <Icon size={size} aria-hidden="true" />;
}
