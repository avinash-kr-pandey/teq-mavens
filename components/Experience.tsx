"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Download, Share2, Check, MessageSquare, FileText, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { BookingModal } from "@/components/BookingModal";
import { Heading } from "@/components/Heading";
import { HomeStage } from "@/components/HomeStage";
import { LapTrack } from "@/components/LapTrack";
import { Logo } from "@/components/Logo";
import { Pricing } from "@/components/Pricing";
import { SideNav, type ViewName } from "@/components/SideNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VehicleStage } from "@/components/VehicleStage";
import { TimelineStage } from "@/components/TimelineStage";
import { CertificateStage } from "@/components/CertificateStage";
import { cn } from "@/lib/utils";

export function Experience() {
  const [view, setView] = useState<ViewName | "chat" | "timeline" | "certifications">("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [certificateRevealed, setCertificateRevealed] = useState(false);

  useEffect(() => {
    setCertificateRevealed(false);
  }, [view]);

  return (
    <main className="experience dark">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" />

      <div className="experience-container">
        {/* Topbar layout */}
        <div className="topbar">
          <div className="logo-section">
            <Logo />
            <button
              type="button"
              className="back-button-circle"
              aria-label="Go back to dashboard"
              onClick={() => setView("dashboard")}
            >
              <ArrowLeft size={14} />
            </button>
          </div>
          <div className="top-actions">
            <ThemeToggle />
          </div>
        </div>

        {/* Right side actions stack */}
        <div className="right-action-stack">
          <button type="button" className="action-circle-btn" aria-label="Download specification">
            <Download size={15} />
          </button>
          <button type="button" className="action-circle-btn" aria-label="Share setup">
            <Share2 size={15} />
          </button>
          <button type="button" className="action-circle-btn confirm-btn" aria-label="Confirm configuration">
            <Check size={15} />
          </button>
        </div>

        {/* Heading */}
        <Heading />

        {/* Left Navigation */}
        <SideNav
          view={view}
          open={menuOpen}
          onOpenChange={setMenuOpen}
          onSelect={setView}
        />

        {/* Right Navigation Arc */}
        <div className="right-nav-arc-container">
          <svg className="nav-arc-svg" viewBox="0 0 100 200" preserveAspectRatio="none">
            <path d="M 50 0 Q 100 100 50 200" className="nav-arc-path" />
          </svg>
          <div className="right-nav-items">
            <button
              type="button"
              className={cn("right-nav-item", view === "chat" && "active")}
              onClick={() => setView("chat")}
              aria-label="Chat support"
            >
              {view === "chat" && <span className="timeline-tooltip">Chat support</span>}
              <span className="right-nav-icon">
                <MessageSquare size={15} />
              </span>
            </button>

            <button
              type="button"
              className={cn("right-nav-item", view === "timeline" && "active")}
              onClick={() => setView("timeline")}
              aria-label="Explore timeline"
            >
              {view === "timeline" && <span className="timeline-tooltip">Explore timeline</span>}
              <span className="right-nav-icon">
                <FileText size={15} />
              </span>
            </button>

            <button
              type="button"
              className={cn("right-nav-item", view === "certifications" && "active")}
              onClick={() => setView("certifications")}
              aria-label="Certifications"
            >
              {view === "certifications" && <span className="timeline-tooltip">Certifications</span>}
              <span className="right-nav-icon">
                <Award size={15} />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait" initial>
          <motion.div className="view-transition-layer" key={view}>
            <motion.div
              className={cn(
                "stage-atmosphere",
                view === "certifications" && certificateRevealed && "is-cleared",
              )}
              aria-hidden="true"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
            >
              {["ring-one", "ring-two", "ring-three"].map((ring, index) => (
                <motion.div
                  className={`stage-ring ${ring}`}
                  key={ring}
                  initial={{
                    opacity: 0,
                    transform: "translate(-50%, -50%) scale(0.12)",
                  }}
                  animate={{
                    opacity: 1,
                    transform: "translate(-50%, -50%) scale(1)",
                  }}
                  exit={{
                    opacity: 0,
                    transform: "translate(-50%, -50%) scale(0.12)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 18,
                    delay: index * 0.08,
                  }}
                />
              ))}
              <motion.div
                className="spotlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38 }}
              />
            </motion.div>

            <motion.div
              className="view-shell"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.26, ease: "easeInOut" }}
            >
              {view === "dashboard" && <VehicleStage />}
              {view === "home" && <HomeStage />}
              {view === "pricing" && <Pricing onBook={setPlan} />}
              {view === "chat" && <ChatStage />}
              {view === "timeline" && (
                <TimelineStage onGoHome={() => setView("home")} />
              )}
              {view === "certifications" && (
                <CertificateStage onReveal={() => setCertificateRevealed(true)} />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <LapTrack
          active={
            view === "pricing" ? 4 : view === "home" || view === "dashboard" ? 2 : 0
          }
        />
        <BookingModal plan={plan} onClose={() => setPlan(null)} />
      </div>
    </main>
  );
}

function ChatStage() {
  return (
    <motion.section
      className="chat-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="chat-spotlight"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 0.5, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="chat-message-card"
        initial={{ x: "-120vw", y: "-50%", opacity: 0, scale: 0.9 }}
        animate={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
        exit={{ x: "-120vw", y: "-50%", opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.08 }}
      >
        <img src="/robot_chat.png" alt="Chat assistant" />
      </motion.div>
    </motion.section>
  );
}
