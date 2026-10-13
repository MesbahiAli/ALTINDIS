"use client";

import { motion } from "framer-motion";

const profiles = ["Senior executives", "Directors", "Managers", "Engineers", "Professionals", "Operational staff"];

export default function RecrutementHero() {
  return (
    <section className="pageHero pageHeroPurple recHero">
      <div className="recHeroGlow" />
      <div className="container pageHeroGrid">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow eyebrowLight">Recruitment</p>
          <h1>Find people who can make a lasting impact.</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="pageHeroLead">
            ALTINDIS combines industry expertise, knowledge of roles and sectors, and a proven search and assessment process.
          </p>
          <div className="recHeroPills">
            {profiles.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
