"use client"

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", label: "HOME", num: "1.0" },
  { id: "profile", label: "PROFILE", num: "2.0" },
  { id: "projects", label: "PROJECTS", num: "3.0" },
  { id: "skills", label: "SKILLS", num: "4.0" },
  { id: "timeline", label: "TIMELINE", num: "5.0" },
];

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2 select-none">
      {sections.map((section, idx) => {
        const isActive = activeSection === section.id;
        return (
          <div key={section.id} className="flex flex-col items-center group cursor-pointer" onClick={() => scrollTo(section.id)}>
            {/* Connecting line */}
            {idx > 0 && (
              <div className={cn(
                "w-[2px] h-8 my-1 transition-colors duration-300",
                isActive || sections.findIndex(s => s.id === activeSection) >= idx 
                  ? "bg-primary" 
                  : "bg-muted-foreground/20"
              )} />
            )}

            {/* Label */}
            <span className={cn(
              "text-[9px] font-mono tracking-widest transition-all duration-300 mb-1",
              isActive ? "text-primary font-bold opacity-100 scale-105" : "text-muted-foreground opacity-60 group-hover:opacity-100"
            )}>
              {section.label}
            </span>

            {/* Box */}
            <div className={cn(
              "w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs font-mono transition-all duration-300 bg-background shadow-sm hover:scale-105",
              isActive 
                ? "border-primary text-primary shadow-md ring-2 ring-primary/20 bg-primary/5" 
                : "border-border text-muted-foreground hover:border-foreground"
            )}>
              {section.num}
            </div>
          </div>
        );
      })}
    </div>
  );
}
