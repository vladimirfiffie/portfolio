import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
const SKILL_GROUPS = [
  { title: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React"] },
  { title: "Design", items: ["Figma", "Photoshop"] },
];

export default function Skills() {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Skills & Tools
      </h3>

      <BentoGrid>
        {SKILL_GROUPS.map((group) => (
          <BentoGridItem
            key={group.title}
            title={group.title}
            description={group.items.join(", ")}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
