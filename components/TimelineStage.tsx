import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const WAYPOINTS = [
  { label: "Registration", sub: "Fill form for submission", x: "0%" },
  { label: "Consultation", sub: "Planning and pricing", x: "33%" },
  { label: "Artist assign", sub: "according to task", x: "66%" },
  { label: "Vehicle Pickup", sub: "Payment & dropoff", x: "100%" },
];

export function TimelineStage({ onGoHome }: { onGoHome?: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= 7) return;

    let delay = 3000;
    if (step === 3) delay = 2500;
    else if (step === 4) delay = 1000; // Timeline fades
    else if (step === 5) delay = 4500; // Truck comes (3s) and stays (1.5s)
    else if (step === 6) delay = 3000; // Truck leaves (3s)

    const timer = setTimeout(() => {
      setStep((s) => s + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [step]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <>
      {isClient &&
        createPortal(
          <AnimatePresence>
            {step >= 7 && (
              <motion.div
                className="timeline-thank-you"
                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.8 }}
              >
                <h2>THANK YOU</h2>
                <button onClick={onGoHome} className="timeline-home-btn">
                  Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
      <section className="timeline-stage">
        <div
          className="timeline-track"
          style={{
            opacity: step >= 7 ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          <div className="timeline-line-bg" style={{ opacity: step >= 4 ? 0 : 1, transition: "opacity 0.5s ease" }} />

          <motion.div
            className="timeline-line-fg"
            initial={{ width: "0%" }}
            animate={{ 
              width: WAYPOINTS[Math.min(step, 3)].x,
              opacity: step >= 4 ? 0 : 1
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          {WAYPOINTS.map((waypoint, index) => {
            const reached = step >= index;
            const current = step === index;

            return (
              <span
                key={waypoint.label}
                className={`timeline-stop${reached ? " reached" : ""}${current ? " current" : ""}`}
                style={{ left: waypoint.x, opacity: step >= 4 ? 0 : 1, transition: "opacity 0.5s ease" }}
                aria-hidden="true"
              >
                <i />
              </span>
            );
          })}

          <motion.div
            className="timeline-car-marker"
            initial={{ left: "0%", opacity: 0 }}
            animate={{
              left:
                step >= 4
                  ? "calc(100% + 50px)"
                  : WAYPOINTS[Math.min(step, 3)].x,
              opacity: step >= 4 ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <img src="/car_avatar.png" alt="car" />
          </motion.div>

          <AnimatePresence mode="wait">
            {step <= 3 && (
              <motion.div
                key={step}
                className="timeline-tooltip-card"
                initial={{ opacity: 0, y: 15, scale: 0.95, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: -15, scale: 0.95, x: "-50%" }}
                transition={{ duration: 0.4 }}
                style={{ left: WAYPOINTS[step].x }}
              >
                <strong>{WAYPOINTS[step].label}</strong>
                <small>{WAYPOINTS[step].sub}</small>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="timeline-truck"
            initial={{ x: "70vw", y: "-50%", scaleX: 1, scale: 1 }}
            animate={{
              x: step < 5 ? "70vw" : step === 5 ? "-50%" : "-70vw",
              scaleX: 1,
              scale: 1,
              y: "-50%",
            }}
            transition={{
              duration: step === 5 ? 3 : step === 6 ? 3 : 0.8,
              ease: "easeInOut"
            }}
          >
            <img src="/delivery_truck_transparent.png" alt="Delivery Truck" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
