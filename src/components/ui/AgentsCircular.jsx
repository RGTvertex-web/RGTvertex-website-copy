import { motion } from "framer-motion";
import { agents } from "@/data/agents";
import Icon from "@/components/ui/Icon";

const RADIUS = 108;
const CENTER = 140;

function pointOnCircle(index, total) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function AgentsCircular() {
  const nodes = agents.map((agent, i) => ({
    ...agent,
    ...pointOnCircle(i, agents.length),
  }));

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px]">
      <svg viewBox="0 0 280 280" className="h-full w-full" aria-hidden="true">
        {nodes.map((node, i) => (
          <motion.line
            key={`line-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={node.x}
            y2={node.y}
            stroke="#8a8a8a"
            strokeOpacity="0.18"
            strokeWidth="1.4"
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: "easeInOut" }}
          />
        ))}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="2 6" />
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ink shadow-glow">
        <span className="text-lg font-semibold leading-none text-white">7</span>
        <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.1em] text-white/70">Agents</span>
      </div>

      {nodes.map((node, i) => (
        <motion.div
          key={node.slug}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: "easeOut" }}
          className="group absolute flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-[0_6px_18px_-10px_rgba(17,17,17,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow"
          style={{
            left: `${(node.x / 280) * 100}%`,
            top: `${(node.y / 280) * 100}%`,
            transform: "translate(-50%,-50%)",
          }}
        >
          <Icon name={node.icon} size={15} strokeWidth={1.7} className="text-ink transition-colors duration-300 group-hover:text-accent" />
        </motion.div>
      ))}
    </div>
  );
}
