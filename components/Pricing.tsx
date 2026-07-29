"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Basic Custom Package",
    price: "₹4,999",
    action: "Book Essential Package",
    features: [
      "Exterior Detailing",
      "Premium Car Wash & Polish",
      "Alloy Wheel Cleaning",
      "Interior Vacuum & Sanitization",
      "Dashboard & Trim Dressing",
    ],
  },
  {
    title: "Performance Custom (Popular)",
    price: "₹19,999",
    action: "Choose Performance",
    popular: true,
    features: [
      "Everything In Essential",
      "Ceramic Coating",
      "Window Tint Installation",
      "Custom LED Lighting",
      "Premium Seat Covers",
    ],
  },
  {
    title: "Premium Package",
    price: "₹49,999",
    action: "Build My Dream Car",
    features: [
      "Everything In Performance",
      "Full Body Wrap Or Protection",
      "Performance Exhaust Upgrade",
      "Custom Body Kit Installation",
      "Premium Audio System Upgrade",
    ],
  },
];

export function Pricing({ onBook }: { onBook: (plan: string) => void }) {
  return (
    <motion.section
      className="pricing-grid"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {plans.map((plan) => (
        <motion.article
          key={plan.title}
          className={plan.popular ? "pricing-card popular" : "pricing-card"}
          variants={{
            hidden: { opacity: 0, y: -100 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
              }
            },
          }}
          whileHover={{ y: -8 }}
        >
          <h2>{plan.title}</h2>
          <div className="price">
            <strong>{plan.price}</strong>
            <span>/ Starting From</span>
          </div>
          <motion.button
            type="button"
            className={plan.popular ? "plan-action primary" : "plan-action"}
            whileTap={{ scale: 0.97 }}
            onClick={() => onBook(plan.title)}
          >
            {plan.action}
          </motion.button>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>
                <span>
                  <Check size={13} strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </motion.section>
  );
}
