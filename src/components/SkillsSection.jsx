import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Languages
  { name: "Java", level: 85, category: "languages" },
  { name: "Python", level: 85, category: "languages" },
  { name: "C", level: 70, category: "languages" },
  { name: "C#", level: 70, category: "languages" },
  { name: "JavaScript", level: 90, category: "languages" },
  { name: "HTML/CSS", level: 95, category: "languages" },
  { name: "SQL", level: 75, category: "languages" },

  // Dev tools
  { name: "Node.js", level: 80, category: "dev-tools" },
  { name: "Git / GitHub", level: 90, category: "dev-tools" },
  { name: "PowerShell", level: 80, category: "dev-tools" },
  { name: "Google Cloud Platform", level: 70, category: "dev-tools" },
  { name: "Android Studio", level: 70, category: "dev-tools" },
  { name: "VS Code", level: 95, category: "dev-tools" },

  // Libraries / Frameworks
  { name: "React", level: 90, category: "libraries" },
  { name: "react-router-dom", level: 80, category: "libraries" },
  { name: "lucide-react", level: 70, category: "libraries" },
  { name: "clsx", level: 75, category: "libraries" },
  { name: "tailwind-merge", level: 70, category: "libraries" },
  { name: "Flask", level: 70, category: "libraries" },
  { name: "Chart.js", level: 75, category: "libraries" },
  { name: "Processing", level: 70, category: "libraries" },
  { name: "NumPy", level: 65, category: "libraries" },
  { name: "Matplotlib", level: 65, category: "libraries" },
  { name: "Gson", level: 60, category: "libraries" },

  // Soft skills
  { name: "Communication", level: 100, category: "soft-skills" },
  { name: "Leadership", level: 100, category: "soft-skills" },
  { name: "Teamwork", level: 95, category: "soft-skills" },
  { name: "Adaptability", level: 90, category: "soft-skills" },
  { name: "Creativity", level: 80, category: "soft-skills" },
];

const categories = [
  { id: "languages", label: "Languages" },
  { id: "dev-tools", label: "Dev Tools" },
  { id: "libraries", label: "Libraries / Frameworks" },
  { id: "soft-skills", label: "Soft Skills" },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};