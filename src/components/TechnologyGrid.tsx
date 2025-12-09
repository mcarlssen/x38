import { useState } from 'react';

interface Technology {
  name: string;
  icon: React.ReactNode; // SVG icon component or element
  alt: string;
}

interface TechnologyGridProps {
  technologies: Technology[];
}

const TechnologyGrid: React.FC<TechnologyGridProps> = ({ technologies }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="technology-grid fade-in-up delay-400">
      {technologies.map((tech, index) => (
        <div
          key={tech.name}
          className="technology-item"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div 
            className={`technology-icon ${hoveredIndex === index ? 'fade-out' : 'fade-in'}`}
            role="img"
            aria-label={tech.alt}
            title={tech.alt}
          >
            {tech.icon}
          </div>
          <div className={`technology-label ${hoveredIndex === index ? 'fade-in' : 'fade-out'}`}>
            {tech.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnologyGrid;

