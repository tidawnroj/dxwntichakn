"use client"

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { Trophy, Medal, Award, FileBadge, CheckCircle2, Star } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { WarpBackground } from "@/components/ui/warp-background";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { TextReveal } from "@/components/ui/text-reveal";
import { Particles } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { Highlighter } from "@/components/ui/highlighter";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

const getTagStyles = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "rebexs":
      return "text-pink-600 bg-pink-500/10 border-pink-500/20 dark:text-pink-400 dark:bg-pink-400/10 dark:border-pink-400/20";
    case "alds":
      return "text-red-600 bg-red-500/10 border-red-500/20 dark:text-red-400 dark:bg-red-400/10 dark:border-red-400/20";
    case "prc-gc-minerva":
      return "text-blue-600 bg-blue-500/10 border-blue-500/20 dark:text-blue-400 dark:bg-blue-400/10 dark:border-blue-400/20";
    case "circuit master":
      return "text-green-600 bg-green-500/10 border-green-500/20 dark:text-green-400 dark:bg-green-400/10 dark:border-green-400/20";
    case "stroke sight":
      return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20";
    case "individual":
      return "text-violet-600 bg-violet-500/10 border-violet-500/20 dark:text-violet-400 dark:bg-violet-400/10 dark:border-violet-400/20";
    default:
      return "text-muted-foreground border-border/50 bg-background/50";
  }
};

function AchievementCard({
  ach,
  index,
  scrollYProgress
}: {
  ach: any;
  index: number;
  scrollYProgress: any;
}) {
  const isLeft = index % 2 === 0;
  const total = 13; // achievementsData.length
  const rowIndex = Math.floor(index / 2);
  
  // Stagger start times: bottom rows start flying first
  const cardProgressStart = (rowIndex / 7) * 0.45;
  const cardProgressEnd = cardProgressStart + 0.35;

  const targetX = isLeft ? 185 : -185;
  const targetY = (7 - rowIndex) * 260 + 550;

  const x = useTransform(scrollYProgress, [0, cardProgressStart, cardProgressEnd, 1], [0, 0, targetX, targetX]);
  const y = useTransform(scrollYProgress, [0, cardProgressStart, cardProgressEnd, 1], [0, 0, targetY, targetY]);
  const scale = useTransform(scrollYProgress, [0, cardProgressStart, cardProgressEnd, 1], [1, 1, 0.16, 0.16]);
  const opacity = useTransform(scrollYProgress, [0, cardProgressStart, cardProgressStart + 0.05, cardProgressEnd - 0.05, cardProgressEnd, 1], [1, 1, 1, 0.8, 0, 0]);
  const rotate = useTransform(scrollYProgress, [0, cardProgressStart, cardProgressEnd, 1], [0, 0, isLeft ? 12 : -12, isLeft ? 12 : -12]);

  const IconComp = ach.icon;

  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate }}
      className="w-full h-full"
    >
      <MagicCard className="relative p-6 flex flex-col h-full space-y-4 border border-border/40 hover:border-border/80 transition-all duration-300 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08]" 
          style={{ 
            backgroundImage: "repeating-linear-gradient(45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 8px)"
          }} 
        />
        <div className="flex justify-between items-start z-10">
          <div className="flex gap-3 items-center">
            <div className={`p-2 rounded-lg ${ach.color.split(" ").slice(0,2).join(" ")}`}>
              <IconComp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base leading-snug">{ach.title}</h4>
              <span className="text-xs text-muted-foreground font-mono">{ach.sub}</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed flex-grow z-10">{ach.desc}</p>
        <div className="flex justify-between items-center pt-2 flex-wrap gap-2 z-10">
          <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800/80 px-2 py-0.5 rounded text-muted-foreground">{ach.date}</span>
          <div className="flex flex-wrap gap-1">
            {ach.tags?.map((tag: string, tIdx: number) => (
              <span key={tIdx} className={cn("text-[9px] font-mono border px-1.5 py-0.5 rounded-full font-semibold", getTagStyles(tag))}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </MagicCard>
    </motion.div>
  );
}

function AchievementsMerger({ scrollYProgress }: { scrollYProgress: any }) {
  const flapRotateX = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [180, 180, 0, 0]);
  const sealScale = useTransform(scrollYProgress, [0, 0.8, 0.9, 1], [0, 0, 1, 1]);
  const sealOpacity = useTransform(scrollYProgress, [0, 0.8, 0.9, 1], [0, 0, 1, 1]);

  return (
    <WarpBackground 
      className="relative w-full h-[600px] overflow-hidden my-16 select-none"
    >
      {/* Submission Title Overlay */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center space-y-1 z-40">
        <h4 className="text-lg font-bold font-mono tracking-tight text-foreground">
          Achievements Synthesis
        </h4>
        <p className="text-xs text-muted-foreground font-mono">
          Sealing 13+ Prestigious Milestones for Portfolio Submission
        </p>
      </div>

      {/* Main Interactive Envelope Area */}
      <div 
        className="relative w-[320px] h-[200px] flex items-center justify-center z-10"
        style={{ perspective: 1000 }}
      >
        {/* Envelope Back Body */}
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-850 rounded-b-xl border border-neutral-300 dark:border-neutral-800 z-0 shadow-inner" />

        {/* Envelope Front Pocket Cover */}
        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none drop-shadow-[0_-2px_5px_rgba(0,0,0,0.05)]" viewBox="0 0 320 200">
          {/* Left Flap */}
          <path d="M0,0 L160,100 L0,200 Z" className="fill-neutral-100 dark:fill-neutral-900/95 stroke-neutral-200/50 dark:stroke-neutral-800/50" />
          {/* Right Flap */}
          <path d="M320,0 L160,100 L320,200 Z" className="fill-neutral-100 dark:fill-neutral-900/95 stroke-neutral-200/50 dark:stroke-neutral-800/50" />
          {/* Bottom Flap */}
          <path d="M0,200 L160,100 L320,200 Z" className="fill-neutral-50 dark:fill-neutral-950 stroke-neutral-200/50 dark:stroke-neutral-800/50" />
        </svg>

        {/* Envelope Top Flap (3D Folding animation driven by scroll) */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[100px] z-30"
          style={{
            transformOrigin: "top",
            transformStyle: "preserve-3d",
            rotateX: flapRotateX
          }}
        >
          <svg className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]" viewBox="0 0 320 100" style={{ backfaceVisibility: "visible" }}>
            <path d="M0,0 L160,100 L320,0 Z" className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700" />
          </svg>
        </motion.div>

        {/* Wax Seal (Stamps down at the end of scroll) */}
        <motion.div
          style={{ 
            scale: sealScale, 
            opacity: sealOpacity 
          }}
          className="absolute top-[76px] left-[136px] z-40 w-12 h-12 rounded-full bg-red-600 border-2 border-red-700 shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center justify-center cursor-default"
        >
          <Trophy className="w-5 h-5 text-white animate-pulse" />
        </motion.div>
      </div>
    </WarpBackground>
  );
}

const projectsList = [
  { id: "project-rebexs", label: "REBEXs" },
  { id: "project-circuit-master", label: "Circuit Master" },
  { id: "project-alds", label: "ALDS" },
  { id: "project-tmd", label: "TMD Weather" },
];

const achievementsData = [
  {
    title: "CSITF 2026 Gold Medal",
    sub: "1st in Biotechnology, Health & Medicine (Shanghai)",
    date: "JUNE 2026",
    icon: Trophy,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    desc: "Awarded the Gold Medal for REBEXs. Represented Thailand as an official delegation inventor.",
    tags: ["REBEXs", "International", "Medalists"]
  },
  {
    title: "CSITF 2026 NRCT Special Award",
    sub: "National Research Council of Thailand Special Award",
    date: "JUNE 2026",
    icon: Award,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    desc: "Honored with a Special Award by the NRCT for outstanding medical AI innovation.",
    tags: ["REBEXs", "Special Award", "International"]
  },
  {
    title: "I-NEWGEN 2026 Winner (1st of Medical Track)",
    sub: "Thailand New Gen Inventors Award 2026",
    date: "JANUARY 2026",
    icon: Trophy,
    color: "text-primary bg-primary/10 border-primary/20",
    desc: "Won the Overall Winner Trophy in the Medical Track for REBEXs Tools.",
    tags: ["REBEXs", "National Competition", "1st Place"]
  },
  {
    title: "I-NEWGEN 2026 Gold Medal",
    sub: "Thailand New Gen Inventors Award 2026",
    date: "JANUARY 2026",
    icon: Medal,
    color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    desc: "Awarded the Gold Medal for the REBEXs Tools screening system.",
    tags: ["REBEXs", "National Competition", "Gold Medalist"]
  },
  {
    title: "CEDT Innovation Summit 2025 Winner (1st)",
    sub: "Medical Track Winner",
    date: "APRIL 2025",
    icon: Award,
    color: "text-primary bg-primary/10 border-primary/20",
    desc: "Winner of Medical Track with the innovative REBEXs screening system.",
    tags: ["REBEXs", "Academic Exhibition", "1st Place"]
  },
  {
    title: "SUPER AI SS5 - Track Innovator Region Winner (1st)",
    sub: "Northern Region Regional Winner",
    date: "OCTOBER 2025",
    icon: Trophy,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    desc: "Crowned as the regional champion in the Innovator track of Northern Region.",
    tags: ["Individual", "Regional Winner", "1st Place"]
  },
  {
    title: "SUPER AI SS5 - National Outstanding AI Innovation Award",
    sub: "National Outstanding AI Innovation Award",
    date: "OCTOBER 2025",
    icon: Award,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    desc: "Honored with the national AI innovation award for the ALDS system.",
    tags: ["ALDS", "National Award", "Artificial Intelligence"]
  },
  {
    title: "SUPER AI SS5 - Hackathon Honorable Mention",
    sub: "Track Engineer 5 Domains Hackathon",
    date: "SEPTEMBER 2025",
    icon: Medal,
    color: "text-neutral-500 bg-neutral-500/10 border-neutral-500/20",
    desc: "Earned an Honorable Mention at the national level for the 5 Domains Hackathon.",
    tags: ["Individual", "Hackathon", "Honorable Mention"]
  },
  {
    title: "HYLIFE HACKATHON 2025 - Winner (1st Track Place)",
    sub: "Smart Manufacturing & Health Products",
    date: "AUGUST 2025",
    icon: Star,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    desc: "Achieved 1st Place (Winner) for Stroke Sight, an AI-powered stroke detection helper application.",
    tags: ["Stroke Sight", "Hackathon", "1st Place"]
  },
  {
    title: "HYLIFE HACKATHON 2025 - People's Choice Award",
    sub: "Public Choice Award Winner",
    date: "AUGUST 2025",
    icon: Star,
    color: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    desc: "Won the popular vote award for the Stroke Sight project.",
    tags: ["Stroke Sight", "Hackathon", "Popular Vote"]
  },
  {
    title: "HYLIFE HACKATHON 2025 - Digital Spark Award",
    sub: "Best Innovation & Tech Potential",
    date: "AUGUST 2025",
    icon: Star,
    color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    desc: "Awarded the Digital Spark Award for outstanding digital potential.",
    tags: ["Stroke Sight", "Hackathon", "Special Award"]
  },
  {
    title: "FTC-Decode Thailand Inspired Award (3rd Winner)",
    sub: "First Tech Challenge Thailand - Team PRC-GC-Minerva 24809",
    date: "DECEMBER 2025",
    icon: Medal,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    desc: "Achieved 3rd Place for the Inspired Award in the national First Tech Challenge.",
    tags: ["PRC-GC-Minerva", "Robotics", "Inspired Award"]
  },
  {
    title: "Thailand Inventors' Day 2026 Invited Speaker",
    sub: "Guest Speaker on 'Beyond the Award'",
    date: "MAY 2026",
    icon: Star,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    desc: "Honored to be a guest speaker sharing insight on REBEXs development and research.",
    tags: ["REBEXs", "Invited Speaker", "Public Speaking"]
  }
];

const certificatesData = [
  {
    title: "WWDC Swift Student Challenge Representative",
    issuer: "Apple Inc.",
    year: "2026",
    desc: "Selected for the Circuit Master playground, recognizing outstanding App playground innovation and gamified design.",
    tags: ["Circuit Master", "Individual", "iOS Development"]
  },
  {
    title: "SUPER AI SS5 - Track Engineer Level 2 Pass",
    issuer: "AI Association of Thailand",
    year: "2025",
    desc: "Certified for passing the Level 2 qualification process in AI engineering.",
    tags: ["Individual", "AI Assessment", "Qualification"]
  },
  {
    title: "SUPER AI SS6 - AI Assessment (Passed 70%)",
    issuer: "AI Association of Thailand",
    year: "2026",
    desc: "Certified for passing the AI assessment at the season 6 level.",
    tags: ["Individual", "AI Assessment", "Technical Check"]
  },
  {
    title: "SUPER AI SS6 - Hackathon Threshold Pass",
    issuer: "AI Association of Thailand",
    year: "2026",
    desc: "Passed the threshold of the 5 Domains Hackathon in Season 6.",
    tags: ["Individual", "AI Assessment", "Hackathon Pass"]
  },
  {
    title: "POSN Computer Olympiad Camp 1",
    issuer: "POSN Center of Thailand",
    year: "2024",
    desc: "Selected and participated in the Computer Olympiad Camp 1 training.",
    tags: ["Individual", "Competitive Programming", "Algorithms"]
  },
  {
    title: "Representative Delegation Inventor Certificate",
    issuer: "National Research Council of Thailand (NRCT)",
    year: "2026",
    desc: "Selected as official representative delegating Thai inventions to CSITF Shanghai.",
    tags: ["REBEXs", "International Delegation", "Official"]
  }
];

export function ProjectsSection({ isReady = true }: { isReady?: boolean }) {
  const [activeSection, setActiveSection] = useState<"projects" | "achievements" | "certificates">("projects");
  const [activeProject, setActiveProject] = useState<string>("project-rebexs");
  const [isStatsRowVisible, setIsStatsRowVisible] = useState<boolean>(true);
  const [isProjectsSectionActive, setIsProjectsSectionActive] = useState<boolean>(true);
  const [isProjectsSubsectionActive, setIsProjectsSubsectionActive] = useState<boolean>(false);
  
  const achievementsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: achievementsRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // 1. Observer for Subsections
    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -25% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "subsection-projects") {
            setActiveSection("projects");
            setIsProjectsSubsectionActive(true);
          } else if (entry.target.id === "subsection-achievements") {
            setActiveSection("achievements");
            setIsProjectsSubsectionActive(false);
          } else if (entry.target.id === "subsection-certificates") {
            setActiveSection("certificates");
            setIsProjectsSubsectionActive(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    ["subsection-projects", "subsection-achievements", "subsection-certificates"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 2. Observer for individual Projects
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveProject(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0.1,
      }
    );
    const projectIds = ["project-rebexs", "project-circuit-master", "project-alds", "project-tmd"];
    projectIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) projectObserver.observe(el);
    });

    // 3. Observer for Stats Row Visibility
    const statsEl = document.getElementById("stats-row");
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        setIsStatsRowVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (statsEl) statsObserver.observe(statsEl);

    // 4. Observer for whole Projects Section Active
    const sectionEl = document.getElementById("projects");
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsProjectsSectionActive(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (sectionEl) sectionObserver.observe(sectionEl);

    return () => {
      observer.disconnect();
      projectObserver.disconnect();
      statsObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  // Sync active section highlight based on envelope scroll progress to prevent early Certs trigger
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.02 && v < 0.98) {
        setActiveSection("achievements");
        setIsProjectsSubsectionActive(false);
      } else if (v >= 0.98) {
        setActiveSection("certificates");
        setIsProjectsSubsectionActive(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleScrollToSub = (id: string) => {
    setActiveSection(id as any);
    if (id === "projects") {
      setIsProjectsSubsectionActive(true);
    } else {
      setIsProjectsSubsectionActive(false);
    }
    const el = document.getElementById(`subsection-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToProject = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const projectsContent = useMemo(() => (
    <div id="subsection-projects" className="w-full space-y-16 pt-8 scroll-mt-24">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">3.1 PROJECTS</span>
        <div className="h-[1px] bg-border/50 flex-grow" />
      </div>

      {/* Project 1: REBEXs (Featured - Largest) */}
      <BlurFade delay={0.3} inView className="w-full">
        <div id="project-rebexs" className="hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-300 rounded-3xl overflow-hidden transform-gpu">
          <NeonGradientCard className="w-full max-w-5xl items-center justify-center text-center" neonColors={{ firstColor: "#3b82f6", secondColor: "#60a5fa" }}>
            <div className="flex flex-col md:flex-row gap-8 items-center text-left p-6">
              <div className="md:w-1/2 overflow-hidden rounded-xl">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" alt="AI Network" className="rounded-xl w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="flex flex-col gap-2">
                  <DiaTextReveal 
                    text={[
                      "CEDT Innovation Summit 2025 Winner", 
                      "INEWGEN Award 2026 Winner", 
                      "CSITF 2026 Gold Medal & Special Award"
                    ]} 
                    repeat
                    textColor="#3b82f6"
                    className="font-mono font-semibold uppercase tracking-wider text-xs border border-primary/20 bg-primary/10 px-3 py-1 rounded-full w-fit"
                  />
                  <div className="text-xs text-muted-foreground font-mono">2025-2026</div>
                </div>
                <h3 className="text-3xl font-bold tracking-tight">REBEXs: AI Breast Cancer Screening</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  An award-winning screening system utilizing <Highlighter action="underline" color="#3b82f644">Electrical Impedance Tomography (EIT) and AI</Highlighter> for safe and accessible breast cancer screening. Winner of Medical Track at CEDT Innovation Summit 2025, Gold Medal at CSITF 2026 in Shanghai, and Winner of I-NEWGEN 2026. Responsible for custom PCB hardware circuit design, 3D CAD modeling, and building the web application with integrated AI chatbot and secure backend.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono pt-2">
                  <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">AI CHATBOT</span>
                  <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">WEB APP</span>
                  <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">PCB HARDWARE</span>
                  <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">UX/UI</span>
                </div>
              </div>
            </div>
          </NeonGradientCard>
        </div>
      </BlurFade>

      {/* Project 2: Circuit Master (Featured - Large) */}
      <BlurFade delay={0.4} inView className="w-full">
        <div id="project-circuit-master" className="hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(34,197,94,0.15)] transition-all duration-300 rounded-3xl border border-border/50 bg-card overflow-hidden transform-gpu">
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center text-left p-8">
            <div className="md:w-1/2 overflow-hidden rounded-xl">
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop" alt="Electronics Playground" className="rounded-xl w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <div className="flex flex-col gap-2">
                <DiaTextReveal 
                  text={["WWDC Swift Student Challenge 2026"]} 
                  textColor="#22c55e"
                  className="font-mono font-semibold uppercase tracking-wider text-xs border border-green-500/20 bg-green-500/10 px-3 py-1 rounded-full w-fit"
                />
                <div className="text-xs text-muted-foreground font-mono">2026</div>
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Circuit Master</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A safe, gamified <Highlighter action="highlight" color="#22c55e33">"Duolingo for Electronics"</Highlighter> app playground that solves the physical and financial gatekeeping of hardware engineering. Built to empower students (ages 8-18) to experiment freely without the risk of shocks, burns, or wasted burnt parts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/50 border border-border/30">
                  <span className="font-bold text-foreground block mb-0.5">Lesson Mode</span>
                  <span className="text-[11px] text-muted-foreground">16 guided tracks step-by-step with real-time feedback.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/50 border border-border/30">
                  <span className="font-bold text-foreground block mb-0.5">Adventure Mode</span>
                  <span className="text-[11px] text-muted-foreground">25 story-driven missions with hint systems.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/50 border border-border/30">
                  <span className="font-bold text-foreground block mb-0.5">Playground Sandbox</span>
                  <span className="text-[11px] text-muted-foreground">An open canvas for unlimited circuit logic verification.</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">SWIFT PLAYGROUNDS</span>
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">OHM'S LAW CALCULATOR</span>
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">ENCYCLOPEDIA</span>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Project 3: ALDS (Featured - Large) */}
      <BlurFade delay={0.5} inView className="w-full">
        <div id="project-alds" className="hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-300 rounded-3xl border border-border/50 bg-card overflow-hidden transform-gpu">
          <div className="flex flex-col md:flex-row gap-8 items-center text-left p-8">
            <div className="md:w-1/2 overflow-hidden rounded-xl">
              <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop" alt="Lifesaving System" className="rounded-xl w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <div className="flex flex-col gap-2">
                <DiaTextReveal 
                  text={[
                    "SUPER AI Engineer Season 5 Northern Region Winner", 
                    "National Outstanding AI Innovation Award"
                  ]} 
                  repeat
                  textColor="#3b82f6"
                  className="font-mono font-semibold uppercase tracking-wider text-xs border border-blue-500/20 bg-blue-500/10 px-3 py-1 rounded-full w-fit"
                />
                <div className="text-xs text-muted-foreground font-mono">2025</div>
              </div>
              <h3 className="text-3xl font-bold tracking-tight">ALDS: Automatic Lifebuoy Deployment System</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                An automated lifesaving response system designed to <Highlighter action="highlight" color="#3b82f633">detect and assist drowning victims in real time</Highlighter>. Engineered to solve the global problem of 300,000+ drowning fatalities annually. The system conforms to ISO 9001:2015 and ISO 22320:2018 standards.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/50 border border-border/30">
                  <span className="font-bold text-foreground block mb-0.5">AI Processing Pipeline</span>
                  <span className="text-[11px] text-muted-foreground">
                    Uses OpenCV, YOLOv5, and MediaPipe to track 8 visual features (head tilt, gasping mouth, hand flailing). An LSTM model analyzes 120-frame sequences with <strong>93.14% accuracy</strong>.
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/50 border border-border/30">
                  <span className="font-bold text-foreground block mb-0.5">Hardware Pneumatics</span>
                  <span className="text-[11px] text-muted-foreground">
                    Air Cannon Ver.3 designed using Barlow's Formula & Ideal Gas Law. Fires up to <strong>20 meters</strong> at 85 psi with interchangeable barrels and motorized rescue retraction.
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">YOLOV5 & LSTM</span>
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">OPENCV & MEDIAPIPE</span>
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">RASPBERRY PI & IoT</span>
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">PNEUMATIC DESIGN</span>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Project 4: TMD Weather App Forecast (Medium Card) */}
      <BlurFade delay={0.6} inView className="w-full">
        <div id="project-tmd" className="hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-300 rounded-3xl border border-border/50 bg-card overflow-hidden transform-gpu">
          <div className="flex flex-col md:flex-row gap-8 items-center text-left p-6">
            <div className="md:w-1/3 overflow-hidden rounded-xl">
              <img src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1000&auto=format&fit=crop" alt="Weather App" className="rounded-xl w-full h-36 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:w-2/3 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-full font-semibold uppercase">SOFTWARE DEVELOPMENT</span>
                <span className="text-muted-foreground">2025</span>
              </div>
              <h4 className="text-xl font-bold">TMD Weather App Forecast</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A weather forecasting application integrating <Highlighter action="underline" color="#3b82f644">Thai Meteorological Department (TMD) API data</Highlighter>. It provides clean, responsive, and localized meteorological visualizations, real-time weather alerts, and wind map overlays.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">REACT</span>
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">API INTEGRATION</span>
                <span className="border border-border/50 bg-background/50 text-foreground px-2.5 py-1 rounded-full">TAILWIND CSS</span>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  ), []);

  const achievementsGrid = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {achievementsData.map((ach, i) => (
        <BlurFade key={i} delay={0.1 + i * 0.05} inView>
          <AchievementCard ach={ach} index={i} scrollYProgress={scrollYProgress} />
        </BlurFade>
      ))}
    </div>
  ), [scrollYProgress]);

  const achievementsMergerContent = useMemo(() => (
    <div ref={achievementsRef} className="relative w-full h-[220vh] my-16">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <AchievementsMerger scrollYProgress={scrollYProgress} />
      </div>
    </div>
  ), [scrollYProgress]);

  const certificatesContent = useMemo(() => (
    <div id="subsection-certificates" className="w-full space-y-12 pt-8 scroll-mt-24">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">3.3 CERTIFICATES</span>
        <div className="h-[1px] bg-border/50 flex-grow" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {certificatesData.map((cert, i) => (
          <BlurFade key={i} delay={0.1 + i * 0.05} inView>
            <MagicCard className="relative p-6 flex flex-col space-y-3 border border-border/40 hover:border-border/80 transition-all duration-300 overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08]" 
                style={{ 
                  backgroundImage: "repeating-linear-gradient(45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 8px)"
                }} 
              />
              <div className="flex justify-between items-start z-10">
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FileBadge className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base leading-snug">{cert.title}</h4>
                    <span className="text-xs text-muted-foreground font-mono">{cert.issuer}</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed flex-grow z-10">{cert.desc}</p>
              <div className="flex justify-between items-center pt-2 flex-wrap gap-2 z-10">
                <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800/80 px-2 py-0.5 rounded text-muted-foreground">{cert.year}</span>
                <div className="flex flex-wrap gap-1">
                  {cert.tags?.map((tag, tIdx) => (
                    <span key={tIdx} className={cn("text-[9px] font-mono border px-1.5 py-0.5 rounded-full font-semibold", getTagStyles(tag))}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </div>
  ), []);

  const textRevealContent = useMemo(() => (
    <TextReveal text="Innovating at the intersection of Hardware, Software, and Artificial Intelligence." className="my-20" />
  ), []);

  return (
    <section id="projects" className="py-20 relative w-full">
      {isReady && (
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
      )}

      {/* Morphed Top-Right Floating Sub-Navigator */}
      <AnimatePresence>
        {isProjectsSectionActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex fixed top-16 right-4 md:right-8 z-50 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 shadow-xl items-center gap-1 text-[10px] md:text-xs font-mono font-medium"
          >
            {[
              { id: "projects", label: "Projects" },
              { id: "achievements", label: "Awards" },
              { id: "certificates", label: "Certs" },
            ].map((sub) => {
              const isActive = activeSection === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleScrollToSub(sub.id)}
                  className={`relative px-3 py-1 rounded-full transition-colors duration-300 ${
                    isActive ? "text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSubSectionIndicator"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {sub.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10 relative flex flex-col items-center max-w-5xl mx-auto space-y-20">
        <BlurFade delay={0.1} inView>
          <div className="text-center space-y-4">
            <span className="text-sm font-mono tracking-wider uppercase text-primary font-semibold">Section 3.0</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Portfolio Exhibition</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated selection of technical ventures, competitive milestones, and academic credentials that define my pursuit of computer science.
            </p>
          </div>
        </BlurFade>

        {/* Stats Row with Dynamic Glow */}
        <BlurFade delay={0.2} inView className="w-full">
          <div id="stats-row" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { id: "projects", val: 4, label: "PROJECTS", suffix: "" },
              { id: "achievements", val: 12, label: "ACHIEVEMENTS", suffix: "+" },
              { id: "certificates", val: 24, label: "CERTIFICATES", suffix: "+" },
            ].map((stat, i) => {
              const isActive = activeSection === stat.id;
              return (
                <button
                  key={stat.id}
                  onClick={() => handleScrollToSub(stat.id)}
                  className="w-full text-left"
                >
                  <MagicCard
                    className={`flex flex-col items-center justify-center py-8 transition-all duration-500 border ${
                      isActive 
                        ? "border-primary scale-[1.03] shadow-[0_0_30px_rgba(59,130,246,0.35)] bg-primary/5" 
                        : "border-border/50 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:scale-[1.01]"
                    }`}
                    gradientColor="#3b82f6"
                    gradientOpacity={isActive ? 0.15 : 0.05}
                  >
                    <span className="text-4xl font-bold flex items-center justify-center gap-0.5">
                      <NumberTicker value={stat.val} />{stat.suffix}
                    </span>
                    <span className="text-xs font-mono tracking-wider mt-2 text-muted-foreground font-semibold">{stat.label}</span>
                  </MagicCard>
                </button>
              );
            })}
          </div>
        </BlurFade>

        {projectsContent}

        {/* Subsection 2: Achievements */}
        <div id="subsection-achievements" className="w-full space-y-12 pt-8 scroll-mt-24">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">3.2 ACHIEVEMENTS</span>
            <div className="h-[1px] bg-border/50 flex-grow" />
          </div>
          {achievementsGrid}
          {achievementsMergerContent}
        </div>

        {certificatesContent}
        {textRevealContent}
      </div>

      {/* Floating Project Mini-Navigator */}
      <AnimatePresence>
        {isProjectsSectionActive && activeSection === "projects" && activeProject && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 shadow-xl flex items-center gap-1 text-[10px] md:text-xs font-mono font-medium"
          >
            {projectsList.map((proj) => {
              const isActive = activeProject === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleScrollToProject(proj.id)}
                  className={`relative px-3 py-1 rounded-full transition-colors duration-300 ${
                    isActive ? "text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectIndicator"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {proj.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
