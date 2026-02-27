import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Computer Science M.S. Candidate & Software Developer
            </h3>

            <p className="text-muted-foreground">
              I'm Andrew Louis, currently pursuing an M.S. in Computer Science at
              Kean University (GPA 3.86). I am seeking a software development
              role where I can build reliable systems, improve developer
              workflows, and begin applying AI techniques to practical problems.
            </p>

            <p className="text-muted-foreground">
              In my current role as a Desktop Support Technician at Kean, I lead
              hands-on troubleshooting, maintain campus systems, and develop
              PowerShell scripts that automate repetitive tasks—helping the team
              move faster and avoid errors. I also validate policy deployments
              and prepare clear documentation to keep cross-functional work
              coordinated.
            </p>

            <p className="text-muted-foreground">
              I enjoy working on side projects that combine data and interfaces
              (for example, image analytics and prediction apps) and I play on
              Kean's men's soccer team — activities that sharpen teamwork and
              persistence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="/Andrew%27s%20Resume.pdf"
                download="Andrews-Resume.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
            >
                Download CV
            </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Software</h4>
                  <p className="text-muted-foreground">
                    Full‑stack and tooling: Java, Python, JavaScript, and C# for
                    building web apps, data tools, and small-scale services.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Systems & Support</h4>
                  <p className="text-muted-foreground">
                    Hands‑on support experience, automation with PowerShell, and
                    coordinating system updates to keep services reliable.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Academics & Teamwork</h4>
                  <p className="text-muted-foreground">
                    Graduate coursework in algorithms, OS, and databases, plus
                    team experience from projects and soccer — I value clear
                    communication and dependable collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};