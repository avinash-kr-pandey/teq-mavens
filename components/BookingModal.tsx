"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { FormEvent, useState } from "react";

type BookingModalProps = {
  plan: string | null;
  onClose: () => void;
};

export function BookingModal({ plan, onClose }: BookingModalProps) {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <AnimatePresence>
      {plan && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close booking form"
              onClick={onClose}
            >
              <X size={19} />
            </button>
            {sent ? (
              <motion.div
                className="success-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 size={54} />
                <h2>Request Confirmed</h2>
                <p>Our performance specialist will contact you shortly.</p>
                <button type="button" onClick={onClose}>
                  Return to track
                </button>
              </motion.div>
            ) : (
              <>
                <span className="eyebrow">BOOK YOUR BUILD</span>
                <h2 id="booking-title">{plan}</h2>
                <p>Tell us where to reach you and start your custom build.</p>
                <form onSubmit={submit}>
                  <label>
                    Full name
                    <input required name="name" autoComplete="name" />
                  </label>
                  <label>
                    Phone number
                    <input
                      required
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </label>
                  <label>
                    Email address
                    <input required type="email" name="email" autoComplete="email" />
                  </label>
                  <button type="submit">Start My Build</button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
