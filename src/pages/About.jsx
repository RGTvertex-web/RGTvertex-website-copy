import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHeading, Card } from "@/components/ui/Primitives";
import CTASection from "@/components/sections/CTASection";
import Seo from "@/components/ui/Seo";

const values = [
  { title: "Precision over noise", description: "An agent that does one thing exactly right beats one that does ten things approximately." },
  { title: "Trust is earned in the details", description: "Security, transparency, and predictable behavior aren't features — they're the baseline." },
  { title: "Built with, not just for", description: "We shape the product alongside the teams who use it every day." },
  { title: "Never done improving", description: "Every agent we ship is a starting point. We iterate in the open, in partnership with the teams relying on it." },
];

export default function About() {
  return (
    <>
      <Seo
        title="About — RGTvertex"
        description="RGTvertex builds specialized AI agents that work as a genuine extension of enterprise teams. Learn our story, mission, and values."
      />
      <PageHero
        eyebrow="About RGTvertex"
        title="We think every team deserves a workforce that never falls behind."
        description="RGTvertex started with a straightforward observation: most business functions spend the majority of their time on work that's important but repetitive. We build the agents that take that work on directly."
        bgImage="/about-hero-new.jpg"
        bgClass="bg-cover bg-center bg-no-repeat scale-105"
        bgBlur="blur-[3px]"
      />

      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Card hover={false} className="corner-glow h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Target size={20} strokeWidth={1.6} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                To build a dedicated AI agent for every function inside the enterprise, each
                one reliable enough to trust with real work on day one, so teams spend their
                time on judgment and strategy instead of repetition.
              </p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card hover={false} className="corner-glow h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Eye size={20} strokeWidth={1.6} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                We're building toward a future where the line between "team" and "tool"
                disappears entirely: every company, regardless of size, operating a workforce
                of people and AI agents working side by side, each doing what they do best.
                We intend to be the platform enterprises build that workforce on.
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section className="border-y border-border bg-bg-soft-2">
        <SectionHeading eyebrow="Our values" title="What we hold ourselves to." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="corner-glow h-full bg-white hover:border-accent/30 hover:shadow-glow">
                <h3 className="text-base font-semibold tracking-tight text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="About RGTvertex"
        title="Want to see the workforce in action?"
        description="Book a walkthrough and we'll show you exactly how RGTvertex fits your team."
      />
    </>
  );
}
