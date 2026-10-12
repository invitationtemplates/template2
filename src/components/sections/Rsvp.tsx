import { useId, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Heart, MessageSquareText, Phone, Send, User, Users } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { submitRsvp, type RsvpResult } from "../../lib/rsvp";
import { FloralCorner, SectionTitle } from "../ui/Decor";
import Reveal from "../ui/Reveal";
import { Petals, SectionCard } from "../ui/Effects";

type Status = "idle" | "sending" | "done" | "error";
type Attending = "" | "yes" | "no";

const initial = { name: "", phone: "", attending: "" as Attending, guests: "1", message: "" };

const doneText: Record<RsvpResult["channel"], string> = {
  endpoint: "Your reply has been received. We look forward to celebrating with you.",
  whatsapp: "WhatsApp has opened with your reply ready to send. Please press send there to confirm.",
  none: "RSVP is not connected to a service yet, so this reply was not sent. Please contact the family directly.",
};

const errorText = "mt-1 pl-1 text-[14px] text-[#a3324f]";

/** One field row: a leading icon inside the rounded control, like the reference. */
function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-[15px] text-teal">{icon}</span>
      {children}
    </div>
  );
}

/** Stacked RSVP form with icon fields and a teal send button; replies go through lib/rsvp.ts. */
export default function Rsvp({ rsvp }: { rsvp: InvitationConfig["rsvp"] }) {
  const uid = useId();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; attending?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<RsvpResult | null>(null);
  const id = (n: string) => `${uid}-${n}`;

  const set = (k: keyof typeof initial, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your full name";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) e.phone = "Please enter a valid phone number";
    if (!form.attending) e.attending = "Please select an option";
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    try {
      const res = await submitRsvp(
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
          attending: form.attending === "yes",
          guests: form.attending === "yes" ? Number(form.guests) : 0,
          dietary: "",
          message: form.message.trim(),
          submittedAt: new Date().toISOString(),
        },
        rsvp.whatsappNumber,
      );
      setResult(res);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <SectionCard id="rsvp" className="bg-gradient-to-b from-ivory to-[#F6EEDB] px-5 pb-16 pt-10">
      <Petals />
      <FloralCorner corner="bl" className="w-[24%]" />
      <FloralCorner corner="br" className="w-[24%]" />

      <header className="relative z-10 text-center">
        <SectionTitle>{rsvp.heading}</SectionTitle>
        <p className="mx-auto mt-2 max-w-[300px] font-body text-[17px] font-medium text-ink">{rsvp.intro}</p>
      </header>

      <div className="relative mx-auto mt-6 max-w-[340px]">
        <AnimatePresence mode="wait">
          {status === "done" && result ? (
            <motion.div key="done" role="status" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="rounded-3xl border border-gold-soft bg-white/85 px-6 py-10 text-center shadow-card">
              <p className="font-script text-[44px] leading-none text-teal-deep">Thank you!</p>
              <p className="mt-3 font-body text-[18px] font-medium leading-snug text-ink">{doneText[result.channel]}</p>
              <button
                type="button"
                className="btn-outline mt-5"
                onClick={() => {
                  setForm(initial);
                  setStatus("idle");
                }}
              >
                Send another reply
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="space-y-3.5">
              <div>
                <label htmlFor={id("name")} className="sr-only">
                  Full Name
                </label>
                <Row icon={<User className="h-5 w-5" />}>
                  <input id={id("name")} className="field" placeholder="Full Name *" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-e") : undefined} />
                </Row>
                {errors.name && <p id={id("name-e")} className={errorText}>{errors.name}</p>}
              </div>

              <div>
                <label htmlFor={id("phone")} className="sr-only">
                  Phone Number
                </label>
                <Row icon={<Phone className="h-5 w-5" />}>
                  <input id={id("phone")} type="tel" inputMode="tel" className="field" placeholder="Phone Number *" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? id("phone-e") : undefined} />
                </Row>
                {errors.phone && <p id={id("phone-e")} className={errorText}>{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor={id("attending")} className="sr-only">
                  Will you be attending?
                </label>
                <Row icon={<CalendarCheck className="h-5 w-5" />}>
                  <select id={id("attending")} className="field appearance-none" value={form.attending} onChange={(e) => set("attending", e.target.value)} aria-invalid={!!errors.attending} aria-describedby={errors.attending ? id("att-e") : undefined}>
                    <option value="">Will you be attending? *</option>
                    <option value="yes">Joyfully accept</option>
                    <option value="no">Regretfully decline</option>
                  </select>
                </Row>
                {errors.attending && <p id={id("att-e")} className={errorText}>{errors.attending}</p>}
              </div>

              <AnimatePresence initial={false}>
                {form.attending === "yes" && (
                  <motion.div key="guests" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <label htmlFor={id("guests")} className="sr-only">
                      Number of Guests
                    </label>
                    <Row icon={<Users className="h-5 w-5" />}>
                      <select id={id("guests")} className="field appearance-none" value={form.guests} onChange={(e) => set("guests", e.target.value)}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </Row>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor={id("message")} className="sr-only">
                  Your Message (Optional)
                </label>
                <Row icon={<MessageSquareText className="h-5 w-5" />}>
                  <textarea id={id("message")} rows={3} className="field resize-none" placeholder="Your Message (Optional)" value={form.message} onChange={(e) => set("message", e.target.value)} />
                </Row>
              </div>

              {status === "error" && (
                <p role="alert" className="text-center text-[16px] text-[#a3324f]">
                  Something went wrong. Please try again.
                </p>
              )}

              <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={status === "sending"} className="btn-teal w-full">
                <Send className="h-5 w-5" aria-hidden /> {status === "sending" ? "Sending…" : "Send RSVP"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <Reveal className="relative mt-8 text-center">
        <Heart className="mx-auto h-6 w-6 fill-teal text-teal" aria-hidden />
        <p className="mt-2 font-heading text-[17px] italic leading-snug text-teal-deep">
          {rsvp.closing.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
      </Reveal>
    </SectionCard>
  );
}
