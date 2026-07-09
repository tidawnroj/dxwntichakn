import { BlurFade } from "@/components/ui/blur-fade";

export function TimelineSection() {
  const events = [
    {
      title: "POSN Computer Olympiad Camp 1",
      date: "OCTOBER 2024",
      desc: "Selected to participate in the prestigious POSN Computer Olympiad training camp."
    },
    {
      title: "CEDT Innovation Summit 2025",
      date: "APRIL 2025",
      desc: "Winner of Medical Track with the innovative project: REBEXs Tools."
    },
    {
      title: "SUPER AI : Engineer SS5",
      date: "MAY 2025",
      desc: "Successfully passed the intensive Level 2 selection process."
    },
    {
      title: "HYLIFE Hackathon",
      date: "AUGUST 2025",
      desc: "Achieved 1st Place (Winner) by developing the Stroke Sight application."
    },
    {
      title: "SUPER AI : Innovator SS5",
      date: "OCTOBER 2025",
      desc: "Crowned as the Overall Winner in the Innovator track."
    },
    {
      title: "FIRST TECH CHALLENGE: Decode",
      date: "DECEMBER 2025",
      desc: "Achieved 3rd Place for the Inspired Award as part of the PRC-GC-Minerva team."
    },
    {
      title: "I-NEW GEN Award 2026",
      date: "JANUARY 2026",
      desc: "Awarded the Overall Winner and Gold Medal for REBEXs Tools."
    },
    {
      title: "Thailand Inventors' Day Road Show 2026",
      date: "MAY 2026",
      desc: "Honored to be an invited speaker presenting the REBEXs Tools project."
    },
    {
      title: "CSITF 2026",
      date: "JUNE 2026",
      desc: "Awarded Gold Medal & Special Award at the China Shanghai International Technology Fair for REBEXs Tools."
    }
  ];

  return (
    <section id="timeline" className="py-20 w-full max-w-5xl mx-auto space-y-12">
      <BlurFade delay={0.1} inView>
        <div className="text-center space-y-4">
          <span className="text-sm font-mono tracking-wider uppercase text-primary">GROWTH PATH</span>
          <h2 className="text-4xl font-bold tracking-tight">Academic Timeline</h2>
        </div>
      </BlurFade>

      <div className="relative space-y-12 py-8">
        {/* The Vertical Line */}
        <div className="absolute top-0 bottom-0 left-[23px] md:left-1/2 w-[2px] bg-muted-foreground/20 md:-translate-x-1/2" />
        
        {events.map((event, i) => (
          <BlurFade key={i} delay={0.2 + i * 0.1} inView>
            <div className={`relative flex items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              {/* Dot */}
              <div className="absolute w-4 h-4 bg-primary rounded-full left-[15px] md:left-1/2 md:-translate-x-1/2 shadow z-10" />
              
              {/* Content */}
              <div className={`w-full pl-12 md:pl-0 md:w-1/2 md:px-8 ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                <div className="bg-card shadow-sm border rounded-xl p-6 space-y-2">
                  <span className="text-xs font-mono text-primary">{event.date}</span>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-muted-foreground text-sm">{event.desc}</p>
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
