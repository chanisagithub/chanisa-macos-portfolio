import React from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectExplorer = () => {
  const projects = [
    {
      id: 1,
      title: "Weather App",
      description: "A responsive weather application using WeatherAPI with modern UI design and real-time weather data.",
      technologies: ["SCSS", "JavaScript", "WeatherAPI", "HTML5"],
      githubUrl: "https://github.com/chanisagithub",
      liveUrl: "#",
      icon: "🌤️"
    },
    {
      id: 2,
      title: "Discord Bot Development",
      description: "Custom Discord bots for NFT, Gaming, and Trading communities with advanced features and automation.",
      technologies: ["Discord.js", "Discord.py", "Node.js", "Python"],
      githubUrl: "https://github.com/chanisagithub",
      liveUrl: "#",
      icon: "🤖"
    },
    {
      id: 3,
      title: "PayMedia Projects",
      description: "Enterprise-level web applications and mobile solutions using modern frameworks and cloud technologies.",
      technologies: ["Vue.js", "Flutter", "Laravel", "Spring Boot", "AWS"],
      githubUrl: "#",
      liveUrl: "#",
      icon: "💼"
    },
    {
      id: 4,
      title: "Community Management Platform",
      description: "Discord server creation and management for NFT communities, gaming guilds, and trading groups.",
      technologies: ["Discord.js", "React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/chanisagithub",
      liveUrl: "#",
      icon: "👥"
    },
    {
      id: 5,
      title: "Graphic Design Portfolio",
      description: "Mascot logos and branding designs for various clients on Fiverr, specializing in gaming and NFT communities.",
      technologies: ["Figma", "Adobe Illustrator", "Photoshop"],
      githubUrl: "#",
      liveUrl: "#",
      icon: "🎨"
    },
    {
      id: 6,
      title: "Desktop Portfolio OS",
      description: "An innovative macOS-styled portfolio website that simulates a desktop operating system experience.",
      technologies: ["React", "JavaScript", "TailwindCSS", "Zustand"],
      githubUrl: "https://github.com/chanisagithub/chanisa-desktop-portfolio",
      liveUrl: "#",
      icon: "💻"
    }
  ];

  return (
    <div className="p-6 h-full bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Explorer</h2>
        <p className="text-gray-600">Showcasing my development projects and technical expertise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-80 overflow-y-auto">
        {projects.map(project => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{project.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
              </div>
              <div className="flex space-x-2">
                {project.githubUrl !== "#" && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FiGithub size={18} />
                  </a>
                )}
                {project.liveUrl !== "#" && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FiExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span 
                  key={tech} 
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skills Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Frontend</h4>
            <ul className="text-gray-600 space-y-1">
              <li>Vue.js</li>
              <li>React</li>
              <li>React Native</li>
              <li>JavaScript</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Backend</h4>
            <ul className="text-gray-600 space-y-1">
              <li>Node.js</li>
              <li>Spring Boot</li>
              <li>Laravel</li>
              <li>Python</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Mobile & Cloud</h4>
            <ul className="text-gray-600 space-y-1">
              <li>Flutter</li>
              <li>AWS Services</li>
              <li>ECS</li>
              <li>RDS</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Other</h4>
            <ul className="text-gray-600 space-y-1">
              <li>Discord.js</li>
              <li>Figma</li>
              <li>MySQL</li>
              <li>MongoDB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectExplorer;

