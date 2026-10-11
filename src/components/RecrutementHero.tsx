"use client";

import { motion } from "framer-motion";

const profiles = ["Hauts dirigeants", "Directeurs", "Managers", "Ingénieurs", "Cadres", "Non-cadres"];

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
          <p className="eyebrow eyebrowLight">Pôle Recrutement</p>
          <h1>Identifier les talents capables de créer un impact durable.</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="pageHeroLead">
            ALTINDIS s'appuie sur son expertise métier, sa maîtrise des secteurs et des fonctions ainsi que sur un processus éprouvé de recherche et d'évaluation.
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
