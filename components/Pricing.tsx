"use client";

import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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

type Plan = (typeof plans)[number];

export function Pricing({ onBook }: { onBook: (plan: string) => void }) {
  const [activePlan, setActivePlan] = useState(0);

  const showPlan = (index: number) => setActivePlan(index);

  const previousPlan = () =>
    showPlan((activePlan - 1 + plans.length) % plans.length);
  const nextPlan = () => showPlan((activePlan + 1) % plans.length);

  return (
    <>
      <motion.section
        className="pricing-grid pricing-desktop"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.11,
              delayChildren: 0.04,
            },
          },
        }}
      >
        {plans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} onBook={onBook} />
        ))}
      </motion.section>

      <section className="pricing-phone-carousel" aria-label="Pricing plans">
        <button
          type="button"
          className="pricing-carousel-control pricing-carousel-previous"
          onClick={previousPlan}
          aria-label="Previous pricing plan"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="pricing-carousel-viewport">
          <motion.div
            className="pricing-carousel-track"
            animate={{ x: `-${activePlan * 100}%` }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) nextPlan();
              if (info.offset.x > 40) previousPlan();
            }}
          >
            {plans.map((plan) => (
              <div className="pricing-carousel-slide" key={plan.title}>
                <PlanCard plan={plan} onBook={onBook} mobile />
              </div>
            ))}
          </motion.div>
        </div>

        <button
          type="button"
          className="pricing-carousel-control pricing-carousel-next"
          onClick={nextPlan}
          aria-label="Next pricing plan"
        >
          <ChevronRight size={18} />
        </button>

        <div className="pricing-carousel-dots" aria-hidden="true">
          {plans.map((plan, index) => (
            <span className={index === activePlan ? "active" : ""} key={plan.title} />
          ))}
        </div>
      </section>
    </>
  );
}

function PlanCard({
  plan,
  onBook,
  mobile = false,
}: {
  plan: Plan;
  onBook: (plan: string) => void;
  mobile?: boolean;
}) {
  return (
    <motion.article
      className={`${plan.popular ? "pricing-card popular" : "pricing-card"}${mobile ? " pricing-card-mobile" : ""}`}
      variants={{
        hidden: { opacity: 0, y: -220, scale: 0.94 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 115,
            damping: 18,
            mass: 0.9,
          },
        },
      }}
      whileHover={mobile ? undefined : { y: -8 }}
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
  );
}
