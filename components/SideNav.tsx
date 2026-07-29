"use client";

import { Gauge, Home, IndianRupee, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ViewName = "dashboard" | "home" | "pricing" | "timeline";

const items = [
  { id: "dashboard" as const, label: "Dashboard", icon: Gauge },
  { id: "home" as const, label: "Home", icon: Home },
  { id: "pricing" as const, label: "Pricing", icon: IndianRupee },
];

type SideNavProps = {
  view: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (view: ViewName) => void;
};

export function SideNav({
  view,
  open,
  onOpenChange,
  onSelect,
}: SideNavProps) {
  return (
    <>
      <button
        type="button"
        className="mobile-menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => onOpenChange(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <motion.nav
        className={cn("side-nav", open && "is-open")}
        aria-label="Main navigation"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 27 }}
      >
        <svg className="nav-arc-svg" viewBox="0 0 100 200" preserveAspectRatio="none">
          <path d="M 50 0 Q 0 100 50 200" className="nav-arc-path" />
        </svg>
        {items.map(({ id, label, icon: Icon }, index) => {
          const active = view === id;
          return (
            <button
              type="button"
              className={cn("nav-item", active && "active", index === 1 && "middle-item")}
              key={id}
              onClick={() => {
                onSelect(id);
                onOpenChange(false);
              }}
              aria-current={active ? "page" : undefined}
            >
              <span className="nav-icon">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <span className="nav-label">{label}</span>
            </button>
          );
        })}
      </motion.nav>
    </>
  );
}
