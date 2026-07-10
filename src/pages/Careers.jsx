import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Clock, CalendarClock, ChevronDown, CheckCircle2, Clock3 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, Card, Pill } from "@/components/ui/Primitives";
import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";
import ApplyModal from "@/components/careers/ApplyModal";
import { jobs } from "@/data/careers";

// ─────────────────────────────────────────────────────────────────────────
// APPLICATIONS TOGGLE
// We're getting more applications than we can process right now, so new
// applications are paused. To reopen applications later, just change this
// one value back to `true` — nothing else in this file needs to change.
// ─────────────────────────────────────────────────────────────────────────
const APPLICATIONS_OPEN = false;

function formatDuration(duration) {
  if (Array.isArray(duration)) return duration.join(" / ");
  return duration;
}

function JobCard({ job, isOpen, onToggle, onApply }) {
  return (
    <Card hover={false} className="overflow-hidden p-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full flex-col gap-3 p-6 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-ink">{job.role}</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Pill className="gap-1.5"><GraduationCap size={12} /> Student / New grad</Pill>
            <Pill className="gap-1.5"><MapPin size={12} /> {job.location}</Pill>
            <Pill className="gap-1.5"><Clock size={12} /> {job.type}</Pill>
            {job.duration && (
              <Pill className="gap-1.5"><CalendarClock size={12} /> {formatDuration(job.duration)}</Pill>
            )}
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 self-end text-ink-soft transition-transform duration-300 sm:self-auto ${isOpen ? "rotate-180 text-accent" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border"
          >
            <div className="flex flex-col gap-6 p-6 pt-6">
              <p className="text-sm leading-relaxed text-ink-soft">{job.description}</p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Required skills</h4>
                  <ul className="flex flex-col gap-2">
                    {job.skills.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-ink-soft">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Responsibilities</h4>
                  <ul className="flex flex-col gap-2">
                    {job.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-ink-soft">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {APPLICATIONS_OPEN ? (
                <Button onClick={() => onApply(job)} size="sm" className="self-start">
                  Apply now
                </Button>
              ) : (
                <div className="flex items-center gap-2 self-start rounded-full border border-border bg-bg-soft px-4 py-2.5 text-sm font-medium text-ink-soft">
                  <Clock3 size={15} className="shrink-0 text-ink-faint" />
                  Applications will open soon
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function Careers() {
  const [openSlug, setOpenSlug] = useState(jobs[0]?.slug ?? null);
  const [applyingTo, setApplyingTo] = useState(null);

  return (
    <>
      <Seo
        title="Careers — RGTvertex"
        description="Join RGTvertex as an intern and help build the AI workforce of the future. Explore open, fully remote internships in engineering, analytics, content, and social media."
      />
      <PageHero
        eyebrow="Careers"
        title="Kickstart your career with a remote internship."
        description="We're a small, fast-moving team shipping AI agents that businesses actually rely on. Every open role right now is a fully remote internship, here's where we could use you."
        bgImage="/careers-hero.png"
        bgClass="bg-cover bg-center sm:bg-[length:auto_92%] sm:bg-right bg-no-repeat"
      />

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="corner-glow relative mx-auto mb-10 flex max-w-3xl flex-col items-center gap-3 overflow-hidden rounded-2xl bg-ink px-6 py-6 text-center shadow-glow sm:flex-row sm:gap-4 sm:text-left"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
          <div className="relative flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5">
            {APPLICATIONS_OPEN ? (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            ) : (
              <Clock3 size={13} className="text-white/80" />
            )}
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-white">
              {APPLICATIONS_OPEN ? "Now hiring" : "Applications paused"}
            </span>
          </div>
          <p className="relative text-sm font-medium leading-relaxed text-white/90">
            {APPLICATIONS_OPEN ? (
              <>
                Every listed role below is a <span className="text-white">fully remote internship</span>,
                built for students and new grads ready to work on real AI products.
              </>
            ) : (
              <>
                We've received a high volume of applications and are pausing new submissions while we
                catch up. <span className="text-white">Applications will open again soon</span> — check
                back shortly.
              </>
            )}
          </p>
        </motion.div>

        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {jobs.map((job) => (
              <motion.div
                key={job.slug}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <JobCard
                  job={job}
                  isOpen={openSlug === job.slug}
                  onToggle={() => setOpenSlug((s) => (s === job.slug ? null : job.slug))}
                  onApply={setApplyingTo}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {APPLICATIONS_OPEN && (
        <Section className="border-t border-border bg-bg-soft-2 !py-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Don't see a role that fits?</h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              We're always open to meeting people who are excited about AI agents. Send us your resume
              anyway, we review every application.
            </p>
            <Button href="mailto:rgtvertex.ai@outlook.com" variant="secondary" size="sm">
              Email your resume
            </Button>
          </div>
        </Section>
      )}

      {APPLICATIONS_OPEN && applyingTo && <ApplyModal job={applyingTo} onClose={() => setApplyingTo(null)} />}
    </>
  );
}
