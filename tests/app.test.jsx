import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App.jsx";
import ProjectCard from "../src/components/ProjectCard.jsx";
import { runCommand } from "../src/components/DeveloperTerminal.jsx";
import { filterProjects } from "../src/utils/projectFilters.js";
import { validateContact } from "../src/utils/validators.js";
import { projects } from "../src/data/projects.js";

beforeEach(() => { localStorage.clear(); document.documentElement.setAttribute("data-theme", "dark"); vi.clearAllMocks(); });

describe("page content", () => {
  it("renders hero, all sections and real resume facts", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName("React JS Developer Building Modern Web Experiences.");
    for (const id of ["home", "about", "skills", "projects", "experience", "education", "resume", "contact"]) expect(document.getElementById(id)).toBeTruthy();
    const img = screen.getByAltText(/Portrait of Murali Krishna Kummagiri/);
    expect(img.getAttribute("src")).toBe("/images/profile.jpg");
    expect(screen.getAllByText(/Geethanjali Institute/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/testimonial/i)).toBeNull();
  });
  it("resume links point to /resume.pdf", () => {
    render(<App />);
    const links = screen.getAllByRole("link", { name: /resume/i }).filter((a) => a.getAttribute("href") === "/resume.pdf");
    expect(links.length).toBeGreaterThanOrEqual(3);
  });
});

describe("navigation and theme", () => {
  it("mobile menu toggles and closes after selecting a link", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");
    await user.click(within(screen.getByRole("navigation", { name: "Main navigation" })).getByRole("link", { name: "Skills" }));
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute("aria-expanded", "false");
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
  it("theme toggle switches and persists", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /switch to light theme/i }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});

describe("command palette", () => {
  it("opens with Ctrl+K, filters, runs a command and closes on Escape", async () => {
    const user = userEvent.setup();
    render(<App />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const dialog = await screen.findByRole("dialog", { name: /command palette/i });
    const input = within(dialog).getByRole("combobox");
    expect(input).toHaveFocus();
    await user.type(input, "contact");
    expect(within(dialog).getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{Enter}");
    await waitFor(() => expect(screen.queryByRole("dialog", { name: /command palette/i })).toBeNull());
    await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled());
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    await screen.findByRole("dialog", { name: /command palette/i });
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog", { name: /command palette/i })).toBeNull());
  });
  it("supports arrow navigation", async () => {
    const user = userEvent.setup();
    render(<App />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const dialog = await screen.findByRole("dialog", { name: /command palette/i });
    const opts = within(dialog).getAllByRole("option");
    expect(opts[0]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowDown}");
    expect(within(dialog).getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true");
  });
});

describe("projects", () => {
  it("renders cards from data, searches, filters and shows the empty state", async () => {
    const user = userEvent.setup();
    render(<App />);
    const section = document.getElementById("projects");
    expect(within(section).getAllByRole("article")).toHaveLength(projects.length);
    await user.type(within(section).getByRole("searchbox"), "react");
    expect(within(section).getAllByRole("article")).toHaveLength(1);
    await user.clear(within(section).getByRole("searchbox"));
    await user.click(within(section).getByRole("button", { name: "Deep Learning" }));
    expect(within(section).getByText(/Haze Removal/)).toBeInTheDocument();
    expect(within(section).queryByText("JoyAura Admin Panel")).toBeNull();
    await user.click(within(section).getByRole("button", { name: "All" }));
    await user.type(within(section).getByRole("searchbox"), "zzzz");
    expect(within(section).getByText(/No projects match/)).toBeInTheDocument();
    await user.click(within(section).getByRole("button", { name: /clear filters/i }));
    expect(within(section).getAllByRole("article")).toHaveLength(projects.length);
  });
  it("opens an accessible details dialog, hides empty fields and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = within(document.getElementById("projects")).getAllByRole("button", { name: /view details/i })[0];
    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: /JoyAura Admin Panel/ });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(within(dialog).getByText("My contribution")).toBeInTheDocument();
    expect(within(dialog).queryByText("Gallery")).toBeNull();
    expect(within(dialog).queryByText(/Challenges/)).toBeNull();
    expect(within(dialog).queryByRole("link", { name: /live demo|view code/i })).toBeNull();
    expect(within(dialog).getByRole("button", { name: /close project details/i })).toHaveFocus();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog", { name: /JoyAura/ })).toBeNull());
    expect(trigger).toHaveFocus();
  });
  it("ProjectCard shows link buttons only when URLs exist and falls back on a broken image", () => {
    const p = { ...projects[0], githubUrl: "https://github.com/x/y", liveUrl: "https://example.com", image: "/missing.png" };
    const { container } = render(<ProjectCard project={p} onOpen={() => {}} />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", "https://github.com/x/y");
    expect(screen.getByRole("link", { name: /live demo/i })).toHaveAttribute("href", "https://example.com");
    fireEvent.error(container.querySelector("img.project-img"));
    expect(container.querySelector(".project-placeholder")).toBeTruthy();
  });
  it("filter util keeps featured first and matches technologies", () => {
    expect(filterProjects(projects, { query: "dlcnn" })).toHaveLength(1);
    expect(filterProjects(projects, { category: "Frontend" })).toHaveLength(1);
  });
});

describe("contact form", () => {
  it("validates helper rules", () => {
    const e = validateContact({ name: "", email: "bad", subject: "", message: "hi" });
    expect(Object.keys(e)).toEqual(["name", "email", "subject", "message"]);
    expect(validateContact({ name: "A", email: "a@b.co", subject: "S", message: "long enough message" })).toEqual({});
  });
  it("shows accessible errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /prepare message|send message/i }));
    const name = screen.getByLabelText(/^Name/);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(/Please enter your name/);
    await user.type(screen.getByLabelText(/^Email/), "nope");
    await user.click(screen.getByRole("button", { name: /prepare message|send message/i }));
    expect(screen.getByLabelText(/^Email/)).toHaveAccessibleDescription(/valid email/i);
  });
  it("never fakes success when no form service is configured", async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true });
    render(<App />);
    await user.type(screen.getByLabelText(/^Name/), "Test");
    await user.type(screen.getByLabelText(/^Email/), "t@example.com");
    await user.type(screen.getByLabelText(/^Subject/), "Hello");
    await user.type(screen.getByLabelText(/^Message/), "This is a test message");
    await user.click(screen.getByRole("button", { name: /prepare message/i }));
    expect(await screen.findByText(/not connected yet, so nothing was sent/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open in my email app/i }).getAttribute("href")).toMatch(/^mailto:muralikrishna88404@gmail\.com\?subject=Hello/);
    expect(screen.queryByText(/sent successfully/i)).toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });
});

describe("contact form with a configured endpoint", () => {
  async function setup(response) {
    vi.resetModules();
    vi.stubEnv("VITE_FORMSPREE_ENDPOINT", "https://formspree.io/f/test");
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(response);
    const { default: Contact } = await import("../src/components/Contact.jsx");
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/^Name/), "Test");
    await user.type(screen.getByLabelText(/^Email/), "t@example.com");
    await user.type(screen.getByLabelText(/^Subject/), "Hello");
    await user.type(screen.getByLabelText(/^Message/), "This is a test message");
    await user.click(screen.getByRole("button", { name: /send message/i }));
    return fetchMock;
  }
  it("shows success only after a successful response", async () => {
    const f = await setup(() => Promise.resolve({ ok: true }));
    expect(await screen.findByText(/sent successfully/i)).toBeInTheDocument();
    expect(f).toHaveBeenCalledOnce();
    vi.unstubAllEnvs();
  });
  it("shows a failure state when the request fails", async () => {
    await setup(() => Promise.resolve({ ok: false, status: 500 }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/could not be sent/i);
    expect(screen.queryByText(/sent successfully/i)).toBeNull();
    vi.unstubAllEnvs();
  });
  it("ignores honeypot submissions", async () => {
    vi.resetModules();
    vi.stubEnv("VITE_FORMSPREE_ENDPOINT", "https://formspree.io/f/test");
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true });
    const { default: Contact } = await import("../src/components/Contact.jsx");
    const { container } = render(<Contact />);
    fireEvent.change(container.querySelector(".hp input"), { target: { value: "spam" } });
    fireEvent.submit(container.querySelector("form"));
    expect(fetchMock).not.toHaveBeenCalled();
    vi.unstubAllEnvs();
  });
});

describe("developer terminal", () => {
  it("runs only predefined commands", () => {
    expect(runCommand("help").lines.length).toBe(8);
    expect(runCommand("skills").lines.some((l) => l.includes("React.js"))).toBe(true);
    expect(runCommand("projects").lines.some((l) => l.includes("JoyAura"))).toBe(true);
    expect(runCommand("clear").clear).toBe(true);
    expect(runCommand("alert(1)").lines[0]).toMatch(/command not found/);
    expect(runCommand("rm -rf /").action).toBeUndefined();
  });
  it("opens from the button, runs a command and closes", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /open developer terminal/i }));
    const input = await screen.findByLabelText("Terminal command");
    await user.type(input, "skills{Enter}");
    expect(await screen.findByText(/- React\.js \(Frontend\)/)).toBeInTheDocument();
    await user.type(input, "clear{Enter}");
    expect(screen.queryByText(/- React\.js/)).toBeNull();
    await user.click(screen.getByRole("button", { name: /close terminal/i }));
    await waitFor(() => expect(screen.queryByLabelText("Terminal command")).toBeNull());
  });
});
