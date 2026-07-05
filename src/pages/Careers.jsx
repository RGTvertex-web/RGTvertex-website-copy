import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, ChevronDown, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, Card, Pill } from "@/components/ui/Primitives";
import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";
import ApplyModal from "@/components/careers/ApplyModal";
import { jobs } from "@/data/careers";

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
            <Pill className="gap-1.5"><Briefcase size={12} /> {job.experience}</Pill>
            <Pill className="gap-1.5"><MapPin size={12} /> {job.location}</Pill>
            <Pill className="gap-1.5"><Clock size={12} /> {job.type}</Pill>
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

              <Button onClick={() => onApply(job)} size="sm" className="self-start">
                Apply now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

const filters = ["All roles", "Full-time", "Internship"];

export default function Careers() {
  const [openSlug, setOpenSlug] = useState(jobs[0]?.slug ?? null);
  const [applyingTo, setApplyingTo] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All roles");

  const visibleJobs = useMemo(
    () => (activeFilter === "All roles" ? jobs : jobs.filter((j) => j.type === activeFilter)),
    [activeFilter]
  );

  return (
    <>
      <Seo
        title="Careers — RGTvertex"
        description="Join RGTvertex and help build the AI workforce of the future. Explore open roles and internships in engineering, analytics, content, and social media."
      />
      <PageHero
        eyebrow="Careers"
        title="Help us build the AI workforce of the future."
        description="We're a small, fast-moving team shipping AI agents that businesses actually rely on. Here's where we could use you."
        bgImage="/careers-hero.png"
        bgClass="bg-cover bg-center sm:bg-[length:auto_92%] sm:bg-right bg-no-repeat"
      />

      <Section>
        <div className="mx-auto mb-8 flex w-fit items-center gap-1 rounded-full border border-border bg-white p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeFilter === f ? "text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              {activeFilter === f && (
                <motion.span
                  layoutId="careers-filter-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {visibleJobs.length > 0 ? (
              visibleJobs.map((job) => (
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
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-10 text-center text-sm text-ink-soft"
              >
                No {activeFilter.toLowerCase()} open right now. Check back soon, or send us your resume below.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Section>

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

      {applyingTo && <ApplyModal job={applyingTo} onClose={() => setApplyingTo(null)} />}
    </>
  );
}
