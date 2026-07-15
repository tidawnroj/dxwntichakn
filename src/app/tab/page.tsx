"use client"

import { useState, useEffect } from "react"
import { JetBrains_Mono } from "next/font/google"
import { motion } from "framer-motion"
import { Home as HomeIcon, FileText, Mail, Phone, ChevronRight, Terminal, RefreshCw, LogOut } from "lucide-react"
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons"
import { NorenTransition } from "@/components/ui/noren-transition"
import { NorenRedirect } from "@/components/ui/noren-redirect"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Dock, DockIcon } from "@/components/ui/dock"

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

    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピ"
    const alphabet = katakana + "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const fontSize = 15
    const columns = Math.floor(canvas.width / fontSize) + 1
    const rainDrops = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(0, 255, 65, 0.2)" // Cyber green overlay
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

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas id="matrixCanvas" className="fixed inset-0 w-full h-full -z-10 bg-black pointer-events-none opacity-[0.25]" />
}

export default function TabPage() {
  const [activeTab, setActiveTab] = useState<"index.html" | "projects.js" | "skills.py" | "contact.json">("index.html")
  const [isReady, setIsReady] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "System loaded successfully.",
    "Type $ help to view all terminal routines.",
    "Click files in file explorer to edit or execute."
  ])
  const [terminalInput, setTerminalInput] = useState("")

  useEffect(() => {
    setIsReady(true)
  }, [])

  const runProjectCode = (projName: string) => {
    setConsoleLogs((prev) => [
      ...prev,
      `$ node run ${projName.toLowerCase().replace(/\s+/g, "-")}.js`,
      `[PROCESS] Executing ${projName} binary files...`,
      `[SUCCESS] AI model weights initialized for ${projName}.`,
      `[SUCCESS] Dev Env running at 120 FPS.`
    ])
  }

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!terminalInput.trim()) return

    const cmd = terminalInput.trim().toLowerCase()
    let response = `Command not found: "${cmd}". Type "help" for a list of commands.`

    if (cmd === "help") {
      response = "Available commands: clear, whoami, run, system, status"
    } else if (cmd === "whoami") {
      response = "user@dawn: Tichakorn Rojsirphisal - AI & MedTech Developer"
    } else if (cmd === "clear") {
      setConsoleLogs([])
      setTerminalInput("")
      return
    } else if (cmd === "system") {
      response = "CPU: Core-i9-DEK70 // Architecture: ARM64 // Platform: Next.js + Tailwind"
    } else if (cmd === "status") {
      response = "STATUS: ACTIVE // LEVEL: DEV_GEN_70 // LOCATION: CHIANG MAI"
    } else if (cmd.startsWith("run ")) {
      const target = cmd.slice(4)
      response = `[RUN] Attempting to initialize module: ${target}...`
      runProjectCode(target)
    }

    setConsoleLogs((prev) => [...prev, `$ ${terminalInput}`, response])
    setTerminalInput("")
  }

  const renderIndexTab = () => {
    const lines = [
      "<!DOCTYPE html>",
      `<html lang="en">`,
      "  <head>",
      "    <title>Hi, I'm Tichakorn</title>",
      "  </head>",
      "  <body>",
      "    <!-- Bio -->",
      "    <h1 class='neon-text'>Tichakorn</h1>",
      "    <p>",
      "      AI Innovator & Medical Tech Developer. I love building",
      "      things that solve real-world problems and pushing",
      "      the boundaries of what's possible with technology.",
      "    </p>",
      "    <button onclick='init()'>Execute Initialization</button>",
      "  </body>",
      "</html>"
    ]

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full">
        {/* Terminal UI Container */}
        <section className="lg:col-span-7 flex flex-col justify-between bg-black/75 backdrop-blur-md border border-[#00ff41]/30 p-6 rounded-lg shadow-2xl relative overflow-hidden">
          <div>
            {/* Terminal Header Controls */}
            <div className="flex space-x-2 mb-6 border-b border-gray-800 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs text-gray-500">bash — 80x24</span>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[#00ff41] text-xs font-mono">$ whoami</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-mono">
                  Hi, I'm <br/>
                  <span className="text-[#00ff41] font-bold tracking-tighter" style={{ textShadow: "0 0 10px rgba(0, 255, 65, 0.5)" }}>Tichakorn</span>
                </h1>
              </div>
              <div className="space-y-3">
                <p className="text-[#00ff41] text-xs font-mono">$ info --role</p>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed font-mono">
                  AI Innovator and Medical Tech Developer. I love building things that solve real-world problems and pushing the boundaries of what's possible with technology.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => runProjectCode("Tichakorn Core")}
              className="bg-transparent border border-[#00ff41] text-[#00ff41] text-xs font-mono px-6 py-2.5 hover:bg-[#00ff41] hover:text-black transition-all duration-300 flex items-center group cursor-pointer"
            >
              <span className="mr-2">&gt;</span> Execute Initialization
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">_</span>
            </button>
          </div>
        </section>

        {/* Profile Image Section */}
        <section className="lg:col-span-5 flex flex-col justify-center items-center relative py-6">
          <div className="relative group">
            {/* Geometric Glitch Frames */}
            <div className="absolute -inset-4 border border-[#00ff41]/20 rounded-full animate-pulse"></div>
            <div className="absolute -inset-8 border border-[#00ff41]/10 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
            
            {/* Image Container */}
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#00ff41]/50 relative z-10 bg-black">
              <img 
                alt="Tichakorn Profile" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                src="/profile.png"
              />
              {/* Scanline Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
            </div>
            
            {/* ID Badge Decor */}
            <div className="absolute -bottom-4 -right-4 bg-[#0a0a0a] border border-[#00ff41] px-4 py-2 text-[9px] text-[#00ff41] font-mono z-20 shadow-xl leading-relaxed">
              STATUS: ACTIVE<br/>
              LEVEL: DEV_GEN_70
            </div>
          </div>
        </section>
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
      <div className="space-y-6 font-mono">
        <div className="text-xs text-gray-500 mb-2 border-b border-gray-800 pb-2">
          // projects.js - Interactive Executables
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="bg-black/75 border border-gray-800 hover:border-[#00ff41]/50 p-4 rounded-lg flex flex-col justify-between space-y-4 hover:shadow-[0_0_15px_rgba(0,255,65,0.05)] transition-all"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-bold text-base">{proj.name}</h3>
                  <span className="text-[9px] text-[#00ff41] border border-[#00ff41]/30 px-2 py-0.5 rounded bg-[#00ff41]/5">active</span>
                </div>
                <div className="text-xs text-gray-400 font-semibold">{proj.track}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{proj.desc}</p>
                {proj.detail && (
                  <div className="text-[10px] text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 p-2 rounded">
                    ★ {proj.detail}
                  </div>
                )}
              </div>
              <button 
                onClick={() => runProjectCode(proj.name)}
                className="bg-transparent border border-gray-800 text-gray-400 hover:border-[#00ff41] hover:text-[#00ff41] text-[10px] py-1.5 px-3 rounded text-center transition-all cursor-pointer"
              >
                $ execute_run()
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSkillsTab = () => {
    const categories = [
      { name: "Artificial Intelligence", skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Machine Learning"] },
      { name: "Medical Tech & Biosensors", skills: ["Bio-Signal Processing", "ESP32 Sensor Interface", "Data Analytics"] },
      { name: "Languages & Frameworks", skills: ["Python", "C/C++", "Next.js", "React", "TypeScript", "Tailwind CSS"] }
    ]

    return (
      <div className="space-y-6 font-mono text-xs">
        <div className="text-xs text-gray-500 mb-2 border-b border-gray-800 pb-2">
          # skills.py - Imported Packages
        </div>
        <div className="space-y-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-3 bg-[#0a0a0a]/50 p-4 border border-gray-800 rounded-lg">
              <h3 className="text-[#00ff41] font-bold text-sm flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2 pl-4">
                {cat.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="border border-[#00ff41]/20 text-[#00ff41]/80 px-2.5 py-1 rounded bg-[#00ff41]/5 font-mono text-[10px] hover:border-[#00ff41] hover:text-[#00ff41] transition-all cursor-default"
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
        <div className="text-xs text-gray-500 mb-2 border-b border-gray-800 pb-2">
          {"{"} "contact.json" - Meta Config {"}"}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Metadata */}
          <div className="bg-[#0a0a0a]/50 border border-gray-800 p-4 rounded-lg space-y-3">
            <h3 className="text-white font-bold">Config Parameters</h3>
            <div className="space-y-2 text-gray-400">
              <p><span className="text-[#00ff41]">"email":</span> "tidawnroj@gmail.com"</p>
              <p><span className="text-[#00ff41]">"phone":</span> "092-9129230"</p>
              <p><span className="text-[#00ff41]">"location":</span> "Chiang Mai, Thailand"</p>
              <p><span className="text-[#00ff41]">"status":</span> "Open to Innovation"</p>
            </div>
            <div className="flex gap-2 pt-2">
              <a 
                href="mailto:tidawnroj@gmail.com"
                className="border border-gray-800 text-gray-400 hover:border-[#00ff41] hover:text-[#00ff41] p-2 rounded text-[10px] flex items-center justify-center flex-1 transition-all"
              >
                <Mail className="w-3.5 h-3.5 mr-1" /> Email
              </a>
              <a 
                href="https://github.com/tidawnroj"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-800 text-gray-400 hover:border-[#00ff41] hover:text-[#00ff41] p-2 rounded text-[10px] flex items-center justify-center flex-1 transition-all"
              >
                <GitHubLogoIcon className="w-3.5 h-3.5 mr-1" /> GitHub
              </a>
            </div>
          </div>

          {/* Timeline mini */}
          <div className="bg-[#0a0a0a]/50 border border-gray-800 p-4 rounded-lg space-y-3">
            <h3 className="text-white font-bold">Execution Timeline</h3>
            <div className="space-y-3 relative border-l border-gray-800 pl-4 py-1">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                <span className="text-[10px] font-bold text-[#00ff41]">2026</span>
                <p className="text-gray-400 mt-0.5">Presented REBEXs globally @ CSITF Shanghai</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-gray-600" />
                <span className="text-[10px] font-bold text-[#00ff41]">2025</span>
                <p className="text-gray-400 mt-0.5">Won Medical Track @ CEDT Innovation Summit</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-gray-600" />
                <span className="text-[10px] font-bold text-gray-500">2024</span>
                <p className="text-gray-400 mt-0.5">Overall Winner @ SUPER AI SS5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${jetbrainsMono.className} min-h-screen bg-black text-white relative z-10 selection:bg-[#00ff41] selection:text-black overflow-hidden flex flex-col`}>
      {/* Dynamic matrix background overlay */}
      <MatrixRain />

      {/* Top Header Mocking IDE Tabs */}
      <header className="sticky top-0 w-full z-40 bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-between px-4 select-none">
        <div className="flex items-center h-12 overflow-x-auto no-scrollbar flex-grow">
          <div className="hidden md:flex items-center px-4 border-r border-gray-800 text-[10px] text-gray-500 uppercase tracking-widest font-mono">
            <span className="mr-2">📁</span> Project_Tichakorn
          </div>
          
          <nav className="flex h-full font-mono">
            {[
              { id: "index.html", color: "text-[#00ff41]" },
              { id: "projects.js", color: "text-blue-400" },
              { id: "skills.py", color: "text-yellow-400" },
              { id: "contact.json", color: "text-purple-400" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-5 h-full text-xs border-r border-gray-800 hover:bg-gray-900/50 transition-colors cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-[#1a1a1a] border-b-2 border-[#00ff41] text-[#00ff41] font-bold" 
                    : "text-gray-400"
                }`}
              >
                <span className={`mr-1.5 ${tab.color}`}>•</span> {tab.id}
              </button>
            ))}
          </nav>
        </div>

        {/* Exit / Theme Controls */}
        <div className="flex items-center gap-3 pl-4">
          <button
            onClick={() => setIsRedirecting(true)}
            className="text-[9px] font-mono font-bold tracking-wider uppercase border border-gray-800 px-3 py-1.5 rounded-full bg-black hover:border-[#00ff41] hover:text-[#00ff41] active:scale-95 transition-all shadow-sm flex items-center gap-1 cursor-pointer text-gray-400"
          >
            <LogOut className="w-3 h-3" /> Scroll Mode
          </button>
          <AnimatedThemeToggler />
        </div>
      </header>

      {/* Main Content Workspace Layout */}
      <div className="flex-grow flex flex-col md:flex-row relative">
        {/* Sidebar Directory Tree Mockup */}
        <aside className="w-full md:w-60 bg-[#0a0a0a]/80 backdrop-blur-md border-r border-gray-800 p-4 font-mono select-none hidden md:block">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Workspace Explorer</div>
          <div className="space-y-2">
            <div className="text-xs text-gray-300 font-bold flex items-center gap-1">
              <span>📂</span> src
            </div>
            <div className="pl-4 space-y-2 text-xs">
              {[
                { id: "index.html", label: "index.html", icon: "🌐", color: "text-[#00ff41]" },
                { id: "projects.js", label: "projects.js", icon: "📦", color: "text-blue-400" },
                { id: "skills.py", label: "skills.py", icon: "🐍", color: "text-yellow-400" },
                { id: "contact.json", label: "contact.json", icon: "⚙️", color: "text-purple-400" }
              ].map((file) => (
                <button
                  key={file.id}
                  onClick={() => setActiveTab(file.id as any)}
                  className={`flex items-center gap-2 w-full text-left py-1 px-2 rounded transition-all cursor-pointer ${
                    activeTab === file.id 
                      ? "bg-[#1a1a1a] text-[#00ff41] font-semibold border-l-2 border-[#00ff41]" 
                      : "text-gray-400 hover:text-white hover:bg-gray-900/30"
                  }`}
                >
                  <span>{file.icon}</span>
                  <span className="flex-grow truncate">{file.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Code Editor Body */}
        <main className="flex-grow p-6 flex flex-col justify-between min-h-[50vh] relative">
          <NorenTransition tabKey={activeTab}>
            <div className="h-full">
              {activeTab === "index.html" && renderIndexTab()}
              {activeTab === "projects.js" && renderProjectsTab()}
              {activeTab === "skills.py" && renderSkillsTab()}
              {activeTab === "contact.json" && renderContactTab()}
            </div>
          </NorenTransition>
        </main>
      </div>

      {/* Simulated Console Panel at the bottom */}
      <footer className="w-full bg-[#0a0a0a]/95 border-t border-gray-800 font-mono p-4 z-20">
        <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest border-b border-gray-900 pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#00ff41]" />
            <span>Terminal Output - console.log</span>
          </div>
          <button 
            onClick={() => setConsoleLogs([])} 
            className="hover:text-[#00ff41] flex items-center gap-1 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Clear
          </button>
        </div>

        <div className="h-28 overflow-y-auto space-y-1.5 text-xs text-gray-400 leading-relaxed px-1 scrollbar-thin">
          {consoleLogs.map((log, idx) => (
            <div key={idx} className={`${
              log.startsWith("$") 
                ? "text-gray-300 font-bold" 
                : log.startsWith("[SUCCESS]") 
                  ? "text-[#00ff41]" 
                  : log.startsWith("[INFO]")
                    ? "text-blue-400"
                    : "text-gray-500"
            }`}>
              {log}
            </div>
          ))}
        </div>

        {/* Simulated Command Input */}
        <form onSubmit={handleTerminalSubmit} className="flex items-center mt-2 border-t border-gray-900 pt-2 text-xs">
          <span className="text-[#00ff41] font-bold mr-1.5">$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Type 'help' and press Enter..."
            className="flex-grow bg-transparent border-none outline-none text-white focus:ring-0 p-0 placeholder-gray-600 font-mono"
          />
        </form>
      </footer>

      {/* Floating Navigation Dock */}
      <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <Dock direction="middle">
          {/* Home Tab */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <button 
                onClick={() => setActiveTab("index.html")}
                className={`w-full h-full flex items-center justify-center rounded-full hover:bg-[#00ff41]/10 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200 cursor-pointer ${
                  activeTab === "index.html" ? "bg-[#00ff41]/10 text-[#00ff41]" : "text-gray-400"
                }`} 
                aria-label="Home"
              >
                <HomeIcon className="w-5 h-5 transition-colors" />
              </button>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-[#0a0a0a] border border-gray-800 px-2 py-0.5 text-[9px] font-mono text-[#00ff41] shadow-md group-hover:scale-100 origin-bottom whitespace-nowrap">
                index.html
              </span>
            </div>
          </DockIcon>

          {/* Projects Tab */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <button 
                onClick={() => setActiveTab("projects.js")}
                className={`w-full h-full flex items-center justify-center rounded-full hover:bg-blue-400/10 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200 cursor-pointer ${
                  activeTab === "projects.js" ? "bg-blue-400/10 text-blue-400" : "text-gray-400"
                }`} 
                aria-label="Projects"
              >
                <FileText className="w-5 h-5 transition-colors" />
              </button>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-[#0a0a0a] border border-gray-800 px-2 py-0.5 text-[9px] font-mono text-blue-400 shadow-md group-hover:scale-100 origin-bottom whitespace-nowrap">
                projects.js
              </span>
            </div>
          </DockIcon>

          {/* Separator */}
          <div className="h-6 w-[1px] bg-gray-800 mx-1 self-center" />

          {/* GitHub Logo */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a href="https://github.com/tidawnroj" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-gray-800 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200 text-gray-400 hover:text-white" aria-label="GitHub">
                <GitHubLogoIcon className="w-5 h-5 transition-colors" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-[#0a0a0a] border border-gray-800 px-2 py-0.5 text-[9px] font-mono text-white shadow-md group-hover:scale-100 origin-bottom">
                GitHub
              </span>
            </div>
          </DockIcon>

          {/* Instagram Logo */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a href="https://instagram.com/dxwntichakn" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-gray-800 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200 text-gray-400 hover:text-white" aria-label="Instagram">
                <InstagramLogoIcon className="w-5 h-5 transition-colors" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-[#0a0a0a] border border-gray-800 px-2 py-0.5 text-[9px] font-mono text-white shadow-md group-hover:scale-100 origin-bottom">
                Instagram
              </span>
            </div>
          </DockIcon>

          {/* Email Icon */}
          <DockIcon>
            <div className="group relative w-full h-full flex items-center justify-center">
              <a href="mailto:tidawnroj@gmail.com" className="w-full h-full flex items-center justify-center rounded-full hover:bg-gray-800 hover:scale-125 hover:-translate-y-1.5 active:scale-95 transition-all duration-200 text-gray-400 hover:text-white" aria-label="Email">
                <Mail className="w-5 h-5 transition-colors" />
              </a>
              <span className="pointer-events-none absolute -top-10 scale-0 transition-all duration-200 rounded bg-[#0a0a0a] border border-gray-800 px-2 py-0.5 text-[9px] font-mono text-white shadow-md group-hover:scale-100 origin-bottom">
                Email
              </span>
            </div>
          </DockIcon>
        </Dock>
      </div>

      {/* Transition Redirect Wrapper */}
      <NorenRedirect active={isRedirecting} to="/" />
    </div>
  )
}
