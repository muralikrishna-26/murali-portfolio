import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { profile } from "../data/profile.js";
import { validateContact } from "../utils/validators.js";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
const EMPTY = { name: "", email: "", subject: "", message: "", website: "" }; // "website" is a hidden honeypot

function mailtoHref(v) {
  const body = `${v.message}\n\nFrom: ${v.name} (${v.email})`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | unconfigured
  const set = (k) => (e) => { setValues((v) => ({ ...v, [k]: e.target.value })); if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined })); };

  async function onSubmit(e) {
    e.preventDefault();
    if (values.website) return; // bots fill the hidden field; silently stop
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    if (!ENDPOINT) { setStatus("unconfigured"); return; } // not configured: never fake a send; offer the mailto fallback
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: values.name, email: values.email, subject: values.subject, message: values.message }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  const field = (id, label, props = {}) => (
    <div className="field">
      <label htmlFor={`c-${id}`}>{label} <span aria-hidden="true">*</span></label>
      {props.as === "textarea" ? (
        <textarea id={`c-${id}`} rows={5} value={values[id]} onChange={set(id)} aria-invalid={errors[id] ? "true" : "false"} aria-describedby={errors[id] ? `c-${id}-err` : undefined} required />
      ) : (
        <input id={`c-${id}`} type={props.type || "text"} autoComplete={props.autoComplete} value={values[id]} onChange={set(id)} aria-invalid={errors[id] ? "true" : "false"} aria-describedby={errors[id] ? `c-${id}-err` : undefined} required />
      )}
      {errors[id] && <p className="field-error" id={`c-${id}-err`}>{errors[id]}</p>}
    </div>
  );

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="Let's talk" id="contact-title">Send a message or reach me directly through email, GitHub or LinkedIn.</SectionHeading>
        <div className="contact-grid">
          <Reveal className="card contact-info">
            <a className="contact-link" href={`mailto:${profile.email}`}><Mail size={20} aria-hidden="true" /><span>{profile.email}</span></a>
            <a className="contact-link" href={profile.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={20} /><span>github.com/muralikrishna-26</span></a>
            <a className="contact-link" href={`https://${profile.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={20} /><span>linkedin.com/in/kummagirin</span></a>
            {profile.showPhone && <a className="contact-link" href={`tel:${profile.phone}`}><span>{profile.phone}</span></a>}
          </Reveal>

          <Reveal className="card" delay={0.08}>
            <form onSubmit={onSubmit} noValidate aria-label="Contact form">
              {field("name", "Name", { autoComplete: "name" })}
              {field("email", "Email", { type: "email", autoComplete: "email" })}
              {field("subject", "Subject")}
              {field("message", "Message", { as: "textarea" })}
              <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} /></label></div>

              <div aria-live="polite">
                {status === "unconfigured" && <div className="notice" role="status"><AlertCircle size={18} aria-hidden="true" /><p>The online form is not connected yet, so nothing was sent. You can send this message by email instead: <a href={mailtoHref(values)}>open in my email app</a>.</p></div>}
                {status === "success" && <div className="notice notice-ok"><CheckCircle2 size={18} aria-hidden="true" /><p>Thank you. Your message was sent successfully.</p></div>}
                {status === "error" && <div className="notice notice-err" role="alert"><AlertCircle size={18} aria-hidden="true" /><p>Sorry, your message could not be sent. Please try again or email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p></div>}
              </div>
              <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                {status === "sending" ? (<><Loader2 size={18} className="spin" aria-hidden="true" /> Sending...</>) : (<><Send size={18} aria-hidden="true" /> {ENDPOINT ? "Send message" : "Prepare message"}</>)}
              </button>
              {!ENDPOINT && <p className="form-hint">Setup note: add VITE_FORMSPREE_ENDPOINT to enable sending from this form (see README).</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
