"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, MessageCircle, Lock } from "lucide-react";
import { WHATSAPP_URL } from "../eduData";
import { COUNTRIES, LEVELS, FIELDS, upcomingIntakes } from "./v3Data";

type Form = { name: string; phone: string; email: string; country: string; level: string; field: string; intake: string; consent: boolean };
const EMPTY: Form = { name: "", phone: "", email: "", country: "", level: "", field: "Not sure yet", intake: "", consent: false };

/* No backend yet: on submit we build a WhatsApp message the visitor sends themselves.
   Swap handleSubmit for a CRM/API call when one is available. */
export default function LeadForm({ id }: { id?: string }) {
  const [f, setF] = useState<Form>(EMPTY);
  const [intakes, setIntakes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sentLink, setSentLink] = useState("");

  useEffect(() => { setIntakes(upcomingIntakes(new Date(), 4).map((i) => i.label)); }, []);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => { setF((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (f.name.trim().length < 2) err.name = "Please enter your name";
    if (f.phone.replace(/\D/g, "").length < 8) err.phone = "Please enter a WhatsApp number";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) err.email = "Please enter a valid email";
    if (!f.country) err.country = "Please choose one";
    if (!f.level) err.level = "Please choose one";
    if (!f.consent) err.consent = "Please tick to continue";
    setErrors(err);
    if (Object.keys(err).length) return;
    const msg = [
      "Hi RACC, I'd like a free study plan.",
      `Name: ${f.name}`, `WhatsApp: ${f.phone}`, `Email: ${f.email}`,
      `Country: ${f.country}`, `Highest education: ${f.level}`, `Interested in: ${f.field}`,
      `Preferred intake: ${f.intake || "Flexible"}`,
    ].join("\n");
    setSentLink(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`);
  };

  if (sentLink) {
    return (
      <div className="v3-form v3-form-done" id={id}>
        <span className="v3-form-check"><Check size={28} /></span>
        <h3>Almost there, {f.name.split(" ")[0]}.</h3>
        <p>Send your details to our team on WhatsApp. An advisor usually replies within one business day.</p>
        <a href={sentLink} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-yellow v3-btn-block">
          <MessageCircle size={18} /> Send on WhatsApp
        </a>
        <button type="button" className="v3-form-link" onClick={() => setSentLink("")}>Edit my details</button>
      </div>
    );
  }

  const field = (k: keyof Form) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const Err = ({ k }: { k: keyof Form }) => (errors[k] ? <span id={`${k}-err`} className="v3-err">{errors[k]}</span> : null);

  return (
    <form className="v3-form" id={id} onSubmit={handleSubmit} noValidate>
      <div className="v3-form-head">
        <strong>Get your free study plan</strong>
        <span>Takes 60 seconds. No obligation.</span>
      </div>

      <label className="v3-field">
        <span>Full name</span>
        <input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" {...field("name")} />
        <Err k="name" />
      </label>
      <div className="v3-field-row">
        <label className="v3-field">
          <span>WhatsApp number</span>
          <input value={f.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" autoComplete="tel" placeholder="+62 …" {...field("phone")} />
          <Err k="phone" />
        </label>
        <label className="v3-field">
          <span>Email</span>
          <input value={f.email} onChange={(e) => set("email", e.target.value)} type="email" autoComplete="email" {...field("email")} />
          <Err k="email" />
        </label>
      </div>
      <div className="v3-field-row">
        <label className="v3-field">
          <span>Where do you live?</span>
          <select value={f.country} onChange={(e) => set("country", e.target.value)} {...field("country")}>
            <option value="" disabled>Choose…</option>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <Err k="country" />
        </label>
        <label className="v3-field">
          <span>Highest education</span>
          <select value={f.level} onChange={(e) => set("level", e.target.value)} {...field("level")}>
            <option value="" disabled>Choose…</option>
            {LEVELS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <Err k="level" />
        </label>
      </div>
      <div className="v3-field-row">
        <label className="v3-field">
          <span>Interested in</span>
          <select value={f.field} onChange={(e) => set("field", e.target.value)}>
            {FIELDS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="v3-field">
          <span>Preferred intake</span>
          <select value={f.intake} onChange={(e) => set("intake", e.target.value)}>
            <option value="">Flexible</option>
            {intakes.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>

      <label className="v3-consent">
        <input type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} {...field("consent")} />
        <span>I agree RACC may contact me about my study plan.</span>
      </label>
      <Err k="consent" />

      <button type="submit" className="v3-btn v3-btn-yellow v3-btn-block">Get my free plan <ArrowRight size={18} /></button>
      <p className="v3-form-safe"><Lock size={12} /> Your details go only to the RACC team.</p>
    </form>
  );
}
