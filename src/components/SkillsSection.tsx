import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { IconCloud } from "@/components/ui/icon-cloud";

export function SkillsSection({ isReady = true }: { isReady?: boolean }) {
  return (
    <section id="skills" className="py-20 w-full max-w-5xl mx-auto space-y-12">
      <BlurFade delay={0.1} inView>
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">Competencies & Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise, professional soft skills, and the academic milestones that have shaped my perspective.
          </p>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BlurFade delay={0.2} inView>
          <MagicCard className="p-8 h-full flex flex-col justify-between" gradientColor="#22c55e" gradientOpacity={0.1}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4">Technical Proficiencies</h3>
              <div>
                <span className="text-sm font-mono text-muted-foreground block mb-3">PROGRAMMING</span>
                <div className="flex flex-wrap gap-2">
                  {["C++", "Python", "React", "Java", "Swift", "Arduino IDE"].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm font-medium">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-mono text-muted-foreground block mb-3 mt-6">DESIGN & OTHER</span>
                <div className="flex flex-wrap gap-2">
                  {["Shapr3D", "Fritzing", "EasyEDA", "Figma", "Google Stitch", "Antigravity"].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm font-medium">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="relative mt-8 flex w-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-background">
                {isReady && (
                  <IconCloud
                    images={[
                      "https://cdn.simpleicons.org/cplusplus/00599C",
                      "https://cdn.simpleicons.org/python/3776AB",
                      "https://cdn.simpleicons.org/react/61DAFB",
                      "https://cdn.simpleicons.org/nodedotjs/339933",
                      "https://cdn.simpleicons.org/swift/F05138",
                      "https://cdn.simpleicons.org/arduino/00979D",
                      "https://cdn.simpleicons.org/figma/F24E1E",
                      "https://cdn.simpleicons.org/vercel/000000",
                      "https://cdn.simpleicons.org/nextdotjs/000000"
                    ]}
                  />
                )}
              </div>
            </div>
          </MagicCard>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <MagicCard className="p-8 h-full flex flex-col justify-between" gradientColor="#ffffff" gradientOpacity={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4">Interests & Skills</h3>
              <ul className="space-y-4 list-disc pl-5">
                <li>Software & Website Development</li>
                <li>Artificial Intelligence (AI) Model Development</li>
                <li>Microcontroller Programming</li>
                <li>3D Modeling & Prototyping</li>
                <li>Electronic Circuit & Hardware Design</li>
                <li>Mathematical Problem Solving & Analytical Thinking</li>
              </ul>
            </div>
          </MagicCard>
        </BlurFade>
      </div>
    </section>
  );
}
