"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { IntroLoader } from "@/components/IntroLoader"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { BlurFade } from "@/components/ui/blur-fade"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { AuroraText } from "@/components/ui/aurora-text"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Download, GraduationCap, MapPin, User, ChevronRight, Home as HomeIcon, FileText, Mail } from "lucide-react"
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons"
import { ProjectsSection } from "@/components/ProjectsSection"
import { SkillsSection } from "@/components/SkillsSection"
import { TimelineSection } from "@/components/TimelineSection"
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { Meteors } from "@/components/ui/meteors"
import { Dock, DockIcon } from "@/components/ui/dock"
import { GlyphMatrix } from "@/components/ui/glyph-matrix"
import { TextAnimate } from "@/components/ui/text-animate"
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity"
import { SidebarNav } from "@/components/SidebarNav"
import { KineticText } from "@/components/ui/kinetic-text"

export default function Home() {
  const [loading, setLoading] = useState(true)

  // Disable page scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [loading])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <IntroLoader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SidebarNav />
        <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
          <GlyphMatrix className="w-full h-full" color="#22c55e" />
        </div>
        <main className="min-h-screen p-8 max-w-5xl mx-auto space-y-24 relative z-10">
        <SmoothCursor />
      <header className="sticky top-4 z-40 flex justify-between items-center py-2.5 px-6 bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg w-full max-w-md mx-auto">
        <div className="font-bold tracking-tighter text-base">dxwntichakn</div>
        <div className="flex items-center gap-4">
          <AnimatedThemeToggler />
        </div>
      </header>

      <div className="space-y-4 !mt-6" id="home">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start justify-between py-4 gap-8 relative z-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <BlurFade delay={0.1} inView>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter flex flex-wrap justify-center md:justify-start gap-x-4 items-center">
                <TextAnimate animation="blurInUp" by="character">Hi, I'm</TextAnimate>
                <AuroraText>Tichakorn</AuroraText>
              </h1>
            </BlurFade>
            
            <KineticText 
              as="p"
              text="AI Innovator and Medical Tech Developer. I love building things that solve real-world problems and pushing the boundaries of what's possible with technology."
              className="text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto md:mx-0 font-medium"
            />
          </div>
          
          <BlurFade delay={0.3} inView>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-background/50 shadow-2xl backdrop-blur-sm group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
              <img
                src="/profile.png"
                alt="Tichakorn Rojsirphisal"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <Meteors number={20} />
            </div>
          </BlurFade>
        </section>

        {/* Velocity Scroll Section */}
        <section className="w-full overflow-hidden py-4 border-y border-border/10 relative z-10 my-2">
          <ScrollVelocityContainer>
            <ScrollVelocityRow baseVelocity={1.2} className="font-bold tracking-tighter text-3xl md:text-4xl uppercase">
              dxwntichakn • Dawn • DEK70 • Portfolio •{" "}
            </ScrollVelocityRow>
            <ScrollVelocityRow baseVelocity={-1.2} className="font-bold tracking-tighter text-3xl md:text-4xl uppercase">
              dxwntichakn • Dawn • DEK70 • Portfolio •{" "}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </section>

      </div>

      {/* About Section */}
      <section id="profile" className="py-8 space-y-4 max-w-3xl relative z-10">
        <BlurFade delay={0.4} inView>
          <h2 className="text-2xl font-bold">About</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            At the end of 2024, I dedicated myself to competing in top-tier technology competitions and advancing my skills in Artificial Intelligence. In the past, <span className="underline decoration-primary/50 hover:decoration-primary transition-colors underline-offset-4 decoration-2 text-foreground font-medium">I won the Medical Track at CEDT Innovation Summit 2025</span>, <span className="underline decoration-primary/50 hover:decoration-primary transition-colors underline-offset-4 decoration-2 text-foreground font-medium">became the Overall Winner of SUPER AI Innovator SS5</span>, and <span className="underline decoration-primary/50 hover:decoration-primary transition-colors underline-offset-4 decoration-2 text-foreground font-medium">achieved a Gold Medal at I-NEW GEN Award 2026</span>. I also had the honor of presenting <span className="font-medium text-foreground">REBEXs Tools</span> globally at CSITF 2026 in Shanghai.
          </p>
        </BlurFade>
      </section>

      {/* Bento Grid */}
      <section className="py-12">
        <BlurFade delay={0.25} inView>
          <BentoGrid className="lg:grid-rows-3">
            <BentoCard
              name="Tichakorn Rojsirphisal"
              className="lg:col-span-2 lg:row-span-1"
              background={<div className="absolute inset-0 bg-neutral-100/50 dark:bg-neutral-800/50" />}
              Icon={User}
              description="Prince Royal's College • Science-Math Track • Technology Gifted Program"
              href="#"
              cta="Download Dossier"
            />
            <BentoCard
              name="High School GPAX"
              className="lg:col-span-1 lg:row-span-1 bg-primary text-primary-foreground"
              background={<div className="absolute inset-0" />}
              Icon={GraduationCap}
              description="3.75 / 4.00"
              href="#"
              cta="View Transcripts"
            />
            <BentoCard
              name="Contact Information"
              className="lg:col-span-1 lg:row-span-2"
              background={<div className="absolute inset-0 bg-neutral-100/50 dark:bg-neutral-800/50" />}
              Icon={User}
              description="TEL: 092-9129230 • MAIL: tidawnroj@gmail.com"
              href="#"
              cta="Contact Me"
            />
             <BentoCard
              name="Residence"
              className="lg:col-span-2 lg:row-span-1"
              background={<div className="absolute inset-0 bg-neutral-100/50 dark:bg-neutral-800/50" />}
              Icon={MapPin}
              description="49/2 Moo 8, San Kamphaeng, Chiang Mai, Thailand 50130"
              href="#"
              cta="View Map"
            />
          </BentoGrid>
        </BlurFade>
      </section>
      <ProjectsSection />
      <SkillsSection />
      <TimelineSection />

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <Dock direction="middle">
          {/* Home Icon */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a href="#" className="w-full h-full flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200" aria-label="Home">
                <HomeIcon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-900 shadow-md group-hover:scale-100 origin-bottom">
                Home
              </span>
            </div>
          </DockIcon>
          
          {/* Docs Icon */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a href="#timeline" className="w-full h-full flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200" aria-label="Timeline / Docs">
                <FileText className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-900 shadow-md group-hover:scale-100 origin-bottom">
                Timeline
              </span>
            </div>
          </DockIcon>

          {/* Separator */}
          <div className="h-6 w-[1px] bg-border mx-1 self-center" />

          {/* Github Icon */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a href="https://github.com/tidawnroj" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200" aria-label="GitHub">
                <GitHubLogoIcon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-900 shadow-md group-hover:scale-100 origin-bottom">
                GitHub
              </span>
            </div>
          </DockIcon>

          {/* Instagram Icon */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a href="https://instagram.com/dxwntichakn" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200" aria-label="Instagram">
                <InstagramLogoIcon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-900 shadow-md group-hover:scale-100 origin-bottom">
                Instagram
              </span>
            </div>
          </DockIcon>

          {/* Email Icon */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a href="mailto:tidawnroj@gmail.com" className="w-full h-full flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200" aria-label="Email">
                <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-900 shadow-md group-hover:scale-100 origin-bottom">
                Email
              </span>
            </div>
          </DockIcon>

          {/* Theme Mode Toggler */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <AnimatedThemeToggler 
                className="w-full h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors [&_svg]:w-5 [&_svg]:h-5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200" 
                fromCenter={false} 
              />
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-900 shadow-md group-hover:scale-100 origin-bottom">
                Theme
              </span>
            </div>
          </DockIcon>
        </Dock>
      </div>
    </main>
    </motion.div>
    </>
  );
}
