"use client"

import { useState, useEffect } from "react"
import { JetBrains_Mono } from "next/font/google"
import { ChevronRight, LogOut, Home as HomeIcon, FileText, Mail } from "lucide-react"
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons"
import { NorenRedirect } from "@/components/ui/noren-redirect"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Dock, DockIcon } from "@/components/ui/dock"
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { AuroraText } from "@/components/ui/aurora-text"
import { TextAnimate } from "@/components/ui/text-animate"
import { KineticText } from "@/components/ui/kinetic-text"
import { motion, AnimatePresence } from "framer-motion"
import { LineShadowText } from "@/components/ui/line-shadow-text"
import { DiaTextReveal } from "@/components/ui/dia-text-reveal"
import { cn } from "@/lib/utils"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById("matrixCanvas") as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン"
    const alphabet = katakana + "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize) + 1
    const rainDrops = Array(columns).fill(1)

    const draw = () => {
      const isDark = document.documentElement.classList.contains("dark")
      
      // Theme-adaptive background trail
      ctx.fillStyle = isDark ? "rgba(10, 10, 10, 0.06)" : "rgba(250, 250, 250, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Theme-adaptive blue rain matching Scroll Mode brand
      ctx.fillStyle = isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.15)"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize)

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }
        rainDrops[i]++
      }
    }

    const interval = setInterval(draw, 30)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas id="matrixCanvas" className="fixed inset-0 w-full h-full -z-10 bg-background pointer-events-none" />
}

function LaserBox({ 
  active, 
  children, 
  type = "rect" 
}: { 
  active: boolean; 
  children: React.ReactNode; 
  type?: "rect" | "circle" 
}) {
  return (
    <div className="relative w-full h-full">
      {active && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {type === "rect" ? (
            <motion.rect
              x="0.2"
              y="0.2"
              width="99.6"
              height="99.6"
              rx="1.5"
              ry="1.5"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ 
                filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.85))",
                strokeLinecap: "round"
              }}
            />
          ) : (
            <motion.circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ 
                filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.85))",
                strokeLinecap: "round"
              }}
            />
          )}
        </svg>
      )}
      {children}
    </div>
  );
}

export default function TabPage() {
  const [activeTab, setActiveTab] = useState<"index.html" | "projects.js" | "skills.py" | "contact.json">("index.html")
  const [nextTab, setNextTab] = useState<"index.html" | "projects.js" | "skills.py" | "contact.json" | null>(null)
  const [tabTransitionActive, setTabTransitionActive] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [introStage, setIntroStage] = useState<"dial" | "tree" | "morph" | "laser" | "done">("dial")

  // File Tree Intro transition on page mount
  useEffect(() => {
    // 1. Large dxwntichakn runs Dialtext reveal from 0ms to 1600ms
    const treeTimer = setTimeout(() => {
      setIntroStage("tree")
    }, 1600)

    // 2. File Tree displays and title shrinks down. Start camera zoom ("morph" stage) at 3200ms
    const morphTimer = setTimeout(() => {
      setIntroStage("morph")
    }, 3200)

    // 3. PROJECT_TICHAKORN completes its flight/slide to the top-right at 4400ms. Start laser wireframe drawing stage.
    const laserTimer = setTimeout(() => {
      setIntroStage("laser")
    }, 4400)

    // 4. Laser wireframes finish drawing (takes 1.2s). Fully transition to active done homepage at 5600ms.
    const doneTimer = setTimeout(() => {
      setIntroStage("done")
    }, 5600)

    return () => {
      clearTimeout(treeTimer)
      clearTimeout(morphTimer)
      clearTimeout(laserTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  // Handle page-level tab curtain transition
  useEffect(() => {
    if (tabTransitionActive && nextTab) {
      const timer = setTimeout(() => {
        setActiveTab(nextTab)
      }, 600)
      
      const endTimer = setTimeout(() => {
        setTabTransitionActive(false)
        setNextTab(null)
      }, 1800)

      return () => {
        clearTimeout(timer)
        clearTimeout(endTimer)
      }
    }
  }, [tabTransitionActive, nextTab])

  const handleTabChange = (tabId: typeof activeTab) => {
    if (tabId === activeTab || tabTransitionActive) return
    setNextTab(tabId)
    setTabTransitionActive(true)
  }

  const renderIndexTab = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-[#3b82f6] text-sm font-mono font-bold">$ whoami</p>
          <h1 className="tracking-tighter text-foreground font-mono leading-none">
            <span className="block text-3xl md:text-5xl font-bold"><TextAnimate animation="blurInUp" by="character">Hi, I'm</TextAnimate></span>
            <span className="block mt-2 text-6xl md:text-8xl font-extrabold tracking-tighter"><AuroraText>Tichakorn</AuroraText></span>
          </h1>
        </div>
        <div className="space-y-4">
          <p className="text-[#3b82f6] text-sm font-mono font-bold">$ info --role</p>
          <KineticText 
            as="p"
            text="AI Innovator and Medical Tech Developer. I love building things that solve real-world problems and pushing the boundaries of what's possible with technology."
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl font-mono font-medium"
          />
        </div>
      </div>
    )
  }

  const renderProjectsTab = () => {
    const projects = [
      {
        name: "REBEXs Tools",
        track: "Winner @ CEDT Innovation Summit 2025",
        desc: "An AI-powered rehabilitation & medical tech suite designed to optimize patient recovery.",
        detail: "CSITF 2026 Shanghai Representative"
      },
      {
        name: "Stroke Sight",
        track: "Overall Winner @ SUPER AI Innovator SS5",
        desc: "AI model for real-time stroke risk assessment and early warning systems."
      },
      {
        name: "ALDS (Advanced Life Detection System)",
        track: "Gold Medal @ I-NEW GEN Award 2026",
        desc: "Multi-sensor system to detect live signs in disaster recovery scenarios."
      }
    ]

    return (
      <div className="space-y-6 font-mono text-xs">
        <div className="space-y-2 border-b border-border pb-2">
          <p className="text-[#3b82f6] text-sm font-bold">$ cat projects.js</p>
          <h2 className="text-xl font-bold text-foreground">Project Repositories</h2>
        </div>
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="border border-border hover:border-[#3b82f6]/55 p-4 rounded bg-card/60 space-y-2 transition-all shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span className="text-foreground font-bold text-sm">📁 {proj.name}</span>
                <span className="text-[9px] text-[#3b82f6] border border-[#3b82f6]/30 px-2 py-0.5 rounded bg-[#3b82f6]/5 font-bold">active</span>
              </div>
              <div className="text-[10px] text-muted-foreground font-semibold">{proj.track}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{proj.desc}</p>
              {proj.detail && (
                <div className="text-[9px] text-[#3b82f6] bg-[#3b82f6]/5 border border-[#3b82f6]/20 p-2 rounded font-bold">
                  ★ {proj.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSkillsTab = () => {
    const categories = [
      { name: "Artificial Intelligence", skills: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-Learn", "Machine Learning"] },
      { name: "Medical Tech & Biosensors", skills: ["Bio-Signal Processing", "ESP32 Sensor Interface", "Data Analytics"] },
      { name: "Languages & Frameworks", skills: ["Python", "C/C++", "Next.js", "React", "TypeScript", "Tailwind CSS"] }
    ]

    return (
      <div className="space-y-6 font-mono text-xs">
        <div className="space-y-2 border-b border-border pb-2">
          <p className="text-[#3b82f6] text-sm font-bold">$ python skills.py --list</p>
          <h2 className="text-xl font-bold text-foreground">Imported Skill Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-2 bg-card/60 p-4 border border-border rounded-lg shadow-sm">
              <h3 className="text-[#3b82f6] font-bold text-xs flex items-center">
                <ChevronRight className="w-3.5 h-3.5 mr-1" />
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 pl-4">
                {cat.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="border border-[#3b82f6]/25 text-[#3b82f6] px-2 py-0.5 rounded bg-[#3b82f6]/5 font-mono text-[9px] hover:border-[#3b82f6] transition-all cursor-default font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderContactTab = () => {
    return (
      <div className="space-y-6 font-mono text-xs">
        <div className="space-y-2 border-b border-border pb-2">
          <p className="text-[#3b82f6] text-sm font-bold">$ cat contact.json</p>
          <h2 className="text-xl font-bold text-foreground">Contact & Timeline</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Info */}
          <div className="bg-card/60 border border-border p-4 rounded-lg space-y-3 shadow-sm">
            <h3 className="text-foreground font-bold">// Contact Info</h3>
            <div className="space-y-2 text-muted-foreground">
              <p><span className="text-[#3b82f6] font-bold">"email":</span> "tidawnroj@gmail.com"</p>
              <p><span className="text-[#3b82f6] font-bold">"phone":</span> "092-9129230"</p>
              <p><span className="text-[#3b82f6] font-bold">"location":</span> "Chiang Mai, Thailand"</p>
              <p><span className="text-[#3b82f6] font-bold">"status":</span> "Open to Innovation"</p>
            </div>
          </div>

          {/* Timeline mini */}
          <div className="bg-card/60 border border-border p-4 rounded-lg space-y-3 shadow-sm">
            <h3 className="text-foreground font-bold">// Execution Timeline</h3>
            <div className="space-y-3 relative border-l border-border pl-4 py-1">
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <span className="text-[9px] font-bold text-[#3b82f6]">2026</span>
                <p className="text-muted-foreground mt-0.5 text-[10px]">Presented REBEXs globally @ CSITF Shanghai</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-[9px] font-bold text-[#3b82f6]">2025</span>
                <p className="text-muted-foreground mt-0.5 text-[10px]">Won Medical Track @ CEDT Innovation Summit</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-neutral-350 dark:bg-neutral-750" />
                <span className="text-[9px] font-bold text-muted-foreground">2024</span>
                <p className="text-muted-foreground mt-0.5 text-[10px]">Overall Winner @ SUPER AI SS5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${jetbrainsMono.className} bg-background text-foreground font-mono selection:bg-[#3b82f6] selection:text-background min-h-screen relative flex flex-col justify-between overflow-x-hidden z-10`}>
      <SmoothCursor />
      {/* Custom styles override */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px rgba(59,130,246,0.4); color: #3b82f6; }
          50% { text-shadow: 0 0 15px rgba(59,130,246,0.8); color: #3b82f6; }
        }
        .neon-text {
          animation: glow 2s infinite ease-in-out;
        }
        .terminal-window {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .dark .terminal-window {
          background: rgba(10, 10, 10, 0.85);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .tab-active {
          background: var(--muted);
          border-bottom: 2px solid #3b82f6;
          color: #3b82f6;
          font-weight: bold;
        }
        .glass-nav {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(59, 130, 246, 0.25);
        }
        .dark .glass-nav {
          background: rgba(26, 26, 26, 0.7);
          border: 1px solid rgba(59, 130, 246, 0.25);
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-scroll {
          animation: scroll 30s linear infinite;
        }
        @keyframes line-shadow {
          0% { background-position: 0 0; }
          100% { background-position: 100% -100%; }
        }
        .animate-line-shadow::after {
          background-size: 0.06em 0.06em;
          animation: line-shadow 15s linear infinite;
        }
      `}} />

      {/* Matrix Background */}
      <MatrixRain />

      {/* IDE Style Header */}
      <header className="fixed top-0 w-full z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between h-12 overflow-x-auto no-scrollbar">
          <div className="flex items-center h-full">
            {/* Tabs */}
            <nav className="flex h-full select-none">
              {[
                { id: "index.html", label: "index.html" },
                { id: "projects.js", label: "projects.js" },
                { id: "skills.py", label: "skills.py" },
                { id: "contact.json", label: "contact.json" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`flex items-center px-6 h-full text-sm border-r border-border transition-colors cursor-pointer font-mono ${
                    activeTab === tab.id 
                      ? "tab-active" 
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className={`${activeTab === tab.id ? "text-[#3b82f6]" : "text-muted-foreground"} mr-2`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 h-full pr-4">
            <div className="hidden md:flex items-center px-4 border-l border-border h-full font-mono select-none font-bold">
              <motion.div layoutId="project-title-morph" style={{ display: "inline-block" }}>
                <LineShadowText shadowColor="#3b82f6" className="font-extrabold tracking-wider text-sm">
                  PROJECT_TICHAKORN
                </LineShadowText>
              </motion.div>
            </div>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("fromTabMode", "true")
                }
                setIsRedirecting(true)
              }}
              className="text-[9px] font-mono font-bold tracking-wider uppercase border border-border px-3 py-1.5 rounded-full bg-background hover:bg-muted active:scale-95 transition-all shadow-sm cursor-pointer flex items-center gap-1 text-muted-foreground"
            >
              <LogOut className="w-3 h-3" /> Scroll Mode
            </button>
            <AnimatedThemeToggler />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="min-h-screen flex items-center justify-center pt-20 pb-32 px-4 relative z-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Terminal UI Container */}
          <section className="lg:col-span-7 relative h-full">
            <LaserBox active={introStage === "laser"} type="rect">
              <motion.div
                animate={introStage === "laser" ? { opacity: [0, 0, 1] } : { opacity: 1 }}
                transition={{ duration: 1.2, times: [0, 0.4, 1.0] }}
                className="terminal-window p-8 rounded-lg shadow-2xl relative overflow-hidden flex flex-col justify-between w-full h-full"
              >
                {/* Terminal Header Controls */}
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4 select-none">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">bash — 80x24</span>
                </div>

                <div className="min-h-[300px] flex flex-col justify-center">
                  {activeTab === "index.html" && renderIndexTab()}
                  {activeTab === "projects.js" && renderProjectsTab()}
                  {activeTab === "skills.py" && renderSkillsTab()}
                  {activeTab === "contact.json" && renderContactTab()}
                </div>
              </motion.div>
            </LaserBox>
          </section>

          {/* Profile Image Section */}
          <section className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Geometric Glitch Frames */}
              <div className="absolute -inset-4 border border-[#3b82f6]/25 rounded-full animate-pulse"></div>
              <div className="absolute -inset-8 border border-[#3b82f6]/15 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              
              {/* Image Container with Laser Circle draw */}
              <div className="relative">
                <LaserBox active={introStage === "laser"} type="circle">
                  <motion.div
                    animate={introStage === "laser" ? { opacity: [0, 0, 1] } : { opacity: 1 }}
                    transition={{ duration: 1.2, times: [0, 0.4, 1.0] }}
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#3b82f6] relative z-10 bg-card shadow-[0_0_30px_rgba(59,130,246,0.2)] dark:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-300"
                  >
                    <img 
                      alt="Tichakorn Profile" 
                      className="w-full h-full object-cover" 
                      src="/profile.png"
                    />
                  </motion.div>
                </LaserBox>
              </div>

              {/* ID Badge Decor */}
              <motion.div 
                animate={introStage === "laser" ? { opacity: [0, 0, 1] } : { opacity: 1 }}
                transition={{ duration: 1.2, times: [0, 0.5, 1.0] }}
                className="absolute -bottom-4 -right-4 bg-card border border-border px-4 py-2 text-[10px] text-[#3b82f6] z-20 shadow-xl leading-relaxed select-none font-bold"
              >
                STATUS: ACTIVE<br/>
                LEVEL: DEV_GEN_70
              </motion.div>
            </div>
          </section>
        </div>
      </main>

      {/* Scrolling Identity Bar */}
      <div className="fixed bottom-24 w-full bg-card/65 border-y border-border py-4 overflow-hidden whitespace-nowrap z-0 select-none backdrop-blur-sm">
        <div className="flex ticker-scroll">
          <span className="text-3xl md:text-5xl font-bold text-transparent px-8" style={{ WebkitTextStroke: "1px rgba(59, 130, 246, 0.35)" }}>
            • TICHAKORN • PORTFOLIO • DXWNTICHAKN • TICHAKORN • PORTFOLIO • DXWNTICHAKN •
          </span>
          <span className="text-3xl md:text-5xl font-bold text-transparent px-8" style={{ WebkitTextStroke: "1px rgba(59, 130, 246, 0.35)" }}>
            • TICHAKORN • PORTFOLIO • DXWNTICHAKN • TICHAKORN • PORTFOLIO • DXWNTICHAKN •
          </span>
        </div>
      </div>

      {/* Floating Navigation */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none">
        <Dock direction="middle">
          {[
            { id: "index.html", title: "Home", icon: <HomeIcon className="w-5 h-5" /> },
            { id: "projects.js", title: "Projects", icon: <FileText className="w-5 h-5" /> },
            { id: "skills.py", title: "Skills", icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            )},
            { id: "contact.json", title: "Contact", icon: <Mail className="w-5 h-5" /> }
          ].map((item) => (
            <DockIcon key={item.id}>
              <div className="group relative w-full h-full flex items-center justify-center">
                <button
                  onClick={() => handleTabChange(item.id as any)}
                  className={`w-full h-full flex items-center justify-center rounded-full transition-all duration-200 hover:scale-125 hover:-translate-y-1.5 active:scale-95 cursor-pointer ${
                    activeTab === item.id 
                      ? "bg-[#3b82f6]/15 text-[#3b82f6]" 
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                  aria-label={item.title}
                >
                  {item.icon}
                </button>
                <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-900 shadow-md group-hover:scale-100 origin-bottom">
                  {item.title}
                </span>
              </div>
            </DockIcon>
          ))}

          {/* Separator */}
          <div className="h-6 w-[1px] bg-border mx-1 self-center" />

          {/* GitHub Icon */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a 
                href="https://github.com/tidawnroj" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full h-full flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200 text-muted-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <GitHubLogoIcon className="w-5 h-5" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-900 shadow-md group-hover:scale-100 origin-bottom">
                GitHub
              </span>
            </div>
          </DockIcon>

          {/* Instagram Icon */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a 
                href="https://instagram.com/dxwntichakn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full h-full flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200 text-muted-foreground hover:text-foreground"
                aria-label="Instagram"
              >
                <InstagramLogoIcon className="w-5 h-5" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-50 dark:text-neutral-900 shadow-md group-hover:scale-100 origin-bottom">
                Instagram
              </span>
            </div>
          </DockIcon>
        </Dock>
      </footer>

      {/* Tab Switch Curtain Transition */}
      <div className={`fixed inset-0 flex z-[9999] ${tabTransitionActive ? "pointer-events-auto" : "pointer-events-none"}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`tab-transition-panel-${i}`}
            custom={i}
            variants={{
              initial: { y: "-100%", borderRightColor: "#3b82f6", boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" },
              animate: (i: number) => ({
                y: tabTransitionActive ? ["-100%", "0%", "0%", "0%", "0%", "100%"] : "-100%",
                borderRightColor: tabTransitionActive 
                  ? ["#3b82f6", "#3b82f6", "#ffffff", "#ffffff", "#3b82f6", "#3b82f6"] 
                  : "#3b82f6",
                boxShadow: tabTransitionActive
                  ? [
                      "0 0 15px rgba(59, 130, 246, 0.3)",
                      "0 0 15px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 15px rgba(59, 130, 246, 0.3)",
                      "0 0 15px rgba(59, 130, 246, 0.3)"
                    ]
                  : "0 0 15px rgba(59, 130, 246, 0.3)",
                transition: {
                  duration: 1.6,
                  times: [0, 0.25, 0.35, 0.65, 0.75, 1.0],
                  ease: [0.76, 0, 0.24, 1],
                  delay: i * 0.08
                }
              })
            }}
            initial="initial"
            animate="animate"
            className="h-full flex-1 bg-white border-r last:border-r-0"
          />
        ))}
      </div>

      {/* Redirect Curtain Transition */}
      <NorenRedirect active={isRedirecting} to="/" />

      {/* File Tree Intro Transition & Zoom Morphing on Mount */}
      <AnimatePresence>
        {introStage !== "done" && (
          <motion.div
            key="intro-overlay"
            initial={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
            animate={introStage === "morph" || introStage === "laser"
              ? { backgroundColor: "rgba(255, 255, 255, 0)" }
              : { backgroundColor: "rgba(255, 255, 255, 1)" }
            }
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none pointer-events-none"
          >
            {(introStage === "dial" || introStage === "tree" || introStage === "morph") && (
              <motion.div
                initial={{ 
                  backgroundColor: "rgba(248, 249, 250, 0)",
                  borderColor: "rgba(229, 229, 229, 0)",
                  boxShadow: "0 0 0px rgba(0, 0, 0, 0)"
                }}
                animate={
                  introStage === "dial"
                    ? {
                        backgroundColor: "rgba(248, 249, 250, 0)",
                        borderColor: "rgba(229, 229, 229, 0)",
                        boxShadow: "0 0 0px rgba(0, 0, 0, 0)"
                      }
                    : introStage === "morph"
                      ? {
                          backgroundColor: "rgba(248, 249, 250, 0)",
                          borderColor: "rgba(229, 229, 229, 0)",
                          boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
                          transition: { duration: 0.4 }
                        }
                      : {
                          backgroundColor: "rgba(248, 249, 250, 1)",
                          borderColor: "rgba(229, 229, 229, 1)",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
                        }
                }
                transition={{ duration: 0.5 }}
                className="max-w-md w-full border p-8 rounded-lg font-mono text-sm text-[#1a1a1a] relative"
              >
                {/* Explorer Header */}
                <motion.div 
                  animate={introStage === "dial" || introStage === "morph" 
                    ? { borderBottomColor: "rgba(229, 229, 229, 0)" } 
                    : { borderBottomColor: "rgba(229, 229, 229, 1)" }
                  }
                  transition={{ duration: 0.4 }}
                  className="pb-2 border-b mb-4 h-8 flex items-center gap-1.5 text-sm text-neutral-400 font-bold tracking-wider relative normal-case"
                >
                  <motion.div 
                    animate={introStage === "morph" || introStage === "dial" ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center"
                  >
                    <span>📁</span>
                  </motion.div>
                  {/* Space reservation for header slot */}
                  <div className="h-6 w-24" />
                </motion.div>

                {/* dxwntichakn absolute overlay (perfectly centered on viewport, scaling up to 7.0) */}
                <motion.div 
                  animate={introStage === "dial" 
                    ? { scale: 7.0, left: "50%", top: "50%", x: "-50%", y: "-50%", originX: 0.5, originY: 0.5 }
                    : introStage === "morph"
                      ? { scale: 1.0, left: "52px", top: "38px", x: "0%", y: "0%", opacity: 0 }
                      : { scale: 1.0, left: "52px", top: "38px", x: "0%", y: "0%", opacity: 1 }
                  }
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute font-sans font-bold text-[#1a1a1a] normal-case"
                >
                  <DiaTextReveal 
                    text="dxwntichakn" 
                    textColor="#1a1a1a"
                    colors={["#3b82f6", "#2563eb", "#1d4ed8", "#1e3a8a"]} 
                    duration={1.2}
                    className="text-xs font-bold font-sans tracking-tight normal-case"
                  />
                </motion.div>

                {/* File Tree Structure */}
                <div className="space-y-2">
                  {/* Root Node - PROJECT_TICHAKORN */}
                  <div className="flex items-center gap-1.5">
                    <motion.div 
                      animate={introStage === "morph" || introStage === "dial" ? { opacity: 0 } : { opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center"
                    >
                      <span className="text-[#3b82f6] text-base">📁</span>
                    </motion.div>
                    
                    <motion.div 
                      layoutId="project-title-morph" 
                      style={{ display: "inline-block" }}
                      animate={
                        introStage === "dial"
                          ? { opacity: 0, x: 0, y: 0, scale: 1 }
                          : introStage === "morph"
                            ? {
                                opacity: 1,
                                // Move Project Tichakorn to top-right controls first!
                                x: [0, 80, "calc(50vw - 220px)"],
                                y: [0, 70, "calc(-50vh + 24px)"],
                                scale: [1, 2.0, 1],
                                transition: {
                                  duration: 1.2,
                                  times: [0, 0.4, 1.0],
                                  ease: "easeInOut"
                                }
                              }
                            : { opacity: 1, x: 0, y: 0, scale: 1 }
                      }
                    >
                      <span className="font-extrabold text-[#1a1a1a] tracking-wider text-sm">
                        PROJECT_TICHAKORN
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Nested nodes (fades in during tree stage, fades out in morph stage) */}
                  <motion.div 
                    animate={introStage === "dial" 
                      ? { opacity: 0 } 
                      : introStage === "morph" 
                        ? { opacity: 0 } 
                        : { opacity: 1 }
                    }
                    transition={{ duration: 0.4 }}
                    className="pl-5 border-l border-neutral-200 ml-2.5 space-y-2 py-0.5"
                  >
                    <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                      <span>📁</span> <span>src</span>
                    </div>
                    <div className="pl-5 border-l border-neutral-200 ml-2.5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                        <span>📁</span> <span>app</span>
                      </div>
                      <div className="pl-5 border-l border-neutral-200 ml-2.5 space-y-1 text-xs text-neutral-400">
                        <div className="flex items-center gap-1">
                          <span>📄</span> <span>layout.tsx</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📄</span> <span>page.tsx</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                        <span>📁</span> <span>components</span>
                      </div>
                      <div className="pl-5 border-l border-neutral-200 ml-2.5 space-y-1 text-xs text-neutral-400">
                        <div className="flex items-center gap-1">
                          <span>📄</span> <span>SidebarNav.tsx</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
