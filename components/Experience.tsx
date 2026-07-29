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

  return (
    <main className={cn("experience", `view-${view}`)}>
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

        <div
          className={cn(
            "stage-atmosphere persistent-stage-atmosphere",
            (view === "dashboard" || view === "home" || view === "certifications") &&
              "has-center-focus",
          )}
          aria-hidden="true"
        >
          {["ring-one", "ring-two", "ring-three", "ring-four"].map((ring) => (
            <div className={`stage-ring ${ring}`} key={ring} />
          ))}
          <div className="spotlight" />
        </div>

        <AnimatePresence mode="sync" initial={false}>
          <motion.div className="view-transition-layer" key={view}>
            <motion.div
              className="view-shell"
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.015, y: -6 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {view === "dashboard" && <VehicleStage />}
              {view === "home" && <HomeStage />}
              {view === "pricing" && <Pricing onBook={setPlan} />}
              {view === "chat" && <ChatStage />}
              {view === "timeline" && (
                <TimelineStage onGoHome={() => setView("home")} />
              )}
              {view === "certifications" && (
                <CertificateStage />
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
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowImage(true), 3180);
    return () => window.clearTimeout(timer);
  }, []);

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
        initial={{ x: "-50%", opacity: 0, scaleY: 0 }}
        animate={{ x: "-50%", opacity: 0.68, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0.88 }}
        transition={{
          duration: 1.05,
          delay: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <motion.div
        className="chat-reveal-slab"
        initial={{ x: "52vw", y: "-50%", opacity: 0 }}
        animate={{
          x: ["52vw", "43vw", "-20vw", "-20vw"],
          y: "-50%",
          opacity: [0, 1, 1, 0],
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.55,
          delay: 1.42,
          times: [0, 0.08, 0.7, 1],
          ease: [0.45, 0, 0.22, 1],
        }}
      />
      <AnimatePresence>
        {showImage && (
          <motion.div
            className="chat-message-card"
            initial={{
              x: "-50%",
              y: "-50%",
              opacity: 0,
              scaleX: 0.045,
              scaleY: 0.98,
            }}
            animate={{
              x: "-50%",
              y: "-50%",
              opacity: 1,
              scaleX: [0.045, 1.1, 0.955, 1.035, 0.99, 1],
              scaleY: [0.98, 1.015, 0.992, 1.006, 1],
            }}
            exit={{ opacity: 0, scaleX: 0.96, scaleY: 1 }}
            transition={{
              opacity: { duration: 0.18, ease: "easeOut" },
              scaleX: {
                duration: 1.08,
                times: [0, 0.5, 0.68, 0.82, 0.92, 1],
                ease: "easeOut",
              },
              scaleY: {
                duration: 1.02,
                times: [0, 0.5, 0.7, 0.86, 1],
                ease: "easeOut",
              },
            }}
          >
            <motion.img
              src="/robot_chat.png"
              alt="Chat assistant"
              initial={{ filter: "blur(22px)", scale: 1.035 }}
              animate={{ filter: "blur(0px)", scale: 1 }}
              transition={{
                duration: 1.05,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
