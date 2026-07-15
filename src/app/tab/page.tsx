"use client"

import { useState, useEffect } from "react"
import { JetBrains_Mono } from "next/font/google"
import { ChevronRight, LogOut } from "lucide-react"
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons"
import { NorenTransition } from "@/components/ui/noren-transition"
import { NorenRedirect } from "@/components/ui/noren-redirect"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

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

export default function TabPage() {
  const [activeTab, setActiveTab] = useState<"index.html" | "projects.js" | "skills.py" | "contact.json">("index.html")
  const [isRedirecting, setIsRedirecting] = useState(false)

  const renderIndexTab = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-[#3b82f6] text-sm font-mono font-bold">$ whoami</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-mono">
            Hi, I'm <br/>
            <span className="text-[#3b82f6] neon-text">Tichakorn</span>
          </h1>
        </div>
        <div className="space-y-4">
          <p className="text-[#3b82f6] text-sm font-mono font-bold">$ info --role</p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl font-mono">
            AI Innovator and Medical Tech Developer. I love building things that solve real-world problems and pushing the boundaries of what's possible with technology.
          </p>
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
          {/* Metadata */}
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
      `}} />

      {/* Matrix Background */}
      <MatrixRain />

      {/* IDE Style Header */}
      <header className="fixed top-0 w-full z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between h-12 overflow-x-auto no-scrollbar">
          <div className="flex items-center h-full">
            {/* File Explorer Mock-up on left */}
            <div className="hidden md:flex items-center px-4 border-r border-border text-xs text-muted-foreground uppercase tracking-widest h-full font-mono select-none">
              <span className="mr-2">📁</span> Project_Tichakorn
            </div>
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
                  onClick={() => setActiveTab(tab.id as any)}
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
          <div className="flex items-center gap-3 px-4">
            <button
              onClick={() => setIsRedirecting(true)}
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
          <section className="lg:col-span-7 terminal-window p-8 rounded-lg shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Terminal Header Controls */}
            <div className="flex justify-between items-center mb-8 border-b border-border pb-4 select-none">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-muted-foreground font-mono">bash — 80x24</span>
            </div>

            <NorenTransition tabKey={activeTab}>
              <div className="min-h-[300px] flex flex-col justify-center">
                {activeTab === "index.html" && renderIndexTab()}
                {activeTab === "projects.js" && renderProjectsTab()}
                {activeTab === "skills.py" && renderSkillsTab()}
                {activeTab === "contact.json" && renderContactTab()}
              </div>
            </NorenTransition>
          </section>

          {/* Profile Image Section */}
          <section className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Geometric Glitch Frames */}
              <div className="absolute -inset-4 border border-[#3b82f6]/25 rounded-full animate-pulse"></div>
              <div className="absolute -inset-8 border border-[#3b82f6]/15 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              
              {/* Image Container */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#3b82f6]/45 relative z-10 bg-muted">
                <img 
                  alt="Tichakorn Profile" 
                  className="w-full h-full object-cover" 
                  src="/profile.png"
                />
              </div>

              {/* ID Badge Decor */}
              <div className="absolute -bottom-4 -right-4 bg-card border border-border px-4 py-2 text-[10px] text-[#3b82f6] z-20 shadow-xl leading-relaxed select-none font-bold">
                STATUS: ACTIVE<br/>
                LEVEL: DEV_GEN_70
              </div>
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
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 select-none">
        <div className="glass-nav rounded-2xl flex items-center justify-around p-3 shadow-2xl">
          {[
            { id: "index.html", title: "Home", icon: (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            )},
            { id: "projects.js", title: "Projects", icon: (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            )},
            { id: "skills.py", title: "Skills", icon: (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            )},
            { id: "contact.json", title: "Contact", icon: (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            )}
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                activeTab === item.id 
                  ? "bg-[#3b82f6]/10 text-[#3b82f6]" 
                  : "text-muted-foreground hover:text-[#3b82f6] hover:bg-[#3b82f6]/5"
              }`}
              title={item.title}
            >
              {item.icon}
            </button>
          ))}
          <div className="h-6 w-[1px] bg-border mx-1" />
          {/* GitHub Link */}
          <a href="https://github.com/tidawnroj" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-muted-foreground hover:text-[#3b82f6] hover:bg-[#3b82f6]/5 transition-all">
            <GitHubLogoIcon className="h-5 w-5" />
          </a>
          {/* Instagram Link */}
          <a href="https://instagram.com/dxwntichakn" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-muted-foreground hover:text-[#3b82f6] hover:bg-[#3b82f6]/5 transition-all">
            <InstagramLogoIcon className="h-5 w-5" />
          </a>
        </div>
      </footer>

      {/* Redirect Curtain Transition */}
      <NorenRedirect active={isRedirecting} to="/" />
    </div>
  )
}
