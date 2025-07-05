import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: "Welcome to Chanisa's Portfolio Terminal!" },
    { type: 'output', content: 'Type "help" to see available commands.' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  about     - Learn about Chanisa',
      '  skills    - View technical skills',
      '  experience - Show work experience',
      '  projects  - List recent projects',
      '  contact   - Get contact information',
      '  education - View educational background',
      '  clear     - Clear terminal',
      '  whoami    - Display current user'
    ],
    about: () => [
      'Chanisa Jayawardhana - Developer | Freelancer',
      '',
      "I'm a Software Engineer at PayMedia in Colombo, Sri Lanka.",
      'My journey began with a software engineering internship at PayMedia,',
      'where I mastered Vue.js, AWS Services, Flutter, Laravel, and Spring Boot.',
      '',
      'Since February 2020, I\'ve also been a Freelance Developer,',
      'creating Discord bots and communities for NFT, Gaming, and Trading.',
      '',
      'Passionate about tech and design, I bring creativity and innovation',
      'to every project. Let\'s connect!'
    ],
    skills: () => [
      'Technical Skills:',
      '',
      '🌐 Frontend:',
      '  • Vue.js, React, React Native',
      '  • JavaScript, HTML5, CSS3, SCSS',
      '  • TailwindCSS, Figma',
      '',
      '⚙️ Backend:',
      '  • Node.js, Spring Boot, Laravel',
      '  • Python, Java, Dart',
      '  • Express.js',
      '',
      '📱 Mobile & Cloud:',
      '  • Flutter (Mobile Development)',
      '  • AWS Services (ECS, RDS)',
      '  • Cloud Architecture',
      '',
      '🗄️ Databases:',
      '  • MySQL, MongoDB',
      '',
      '🤖 Specialized:',
      '  • Discord.js, Discord.py',
      '  • Chatbot Development',
      '  • Community Management'
    ],
    experience: () => [
      'Work Experience:',
      '',
      '💼 PayMedia (April 2024 - Present)',
      '   Associate Software Engineer',
      '   • Working with Vue.js, AWS Services, Flutter, Laravel',
      '   • Developing scalable web and mobile applications',
      '',
      '🎓 PayMedia (October 2023 - April 2024)',
      '   Software Engineer Intern',
      '   • Gained hands-on experience with modern frameworks',
      '   • Learned cloud technologies and AWS services',
      '',
      '💻 Fiverr (February 2020 - Present)',
      '   Freelance Developer',
      '   • Discord bot development using Discord.js & Discord.py',
      '   • Community creator for NFT, Gaming, Trading communities',
      '   • Graphic design services including mascot logos',
      '',
      '🏭 MAS Holdings (October 2019 - April 2020)',
      '   Internship Trainee - Industrial Engineering',
      '   • Sewing Autonomation projects'
    ],
    projects: () => [
      'Recent Projects:',
      '',
      '🌤️ Weather App',
      '   • Responsive weather application using WeatherAPI',
      '   • Technologies: SCSS, JavaScript, HTML5',
      '',
      '🤖 Discord Bot Development',
      '   • Custom bots for NFT, Gaming, Trading communities',
      '   • Technologies: Discord.js, Discord.py, Node.js, Python',
      '',
      '💼 PayMedia Enterprise Projects',
      '   • Web applications and mobile solutions',
      '   • Technologies: Vue.js, Flutter, Laravel, Spring Boot, AWS',
      '',
      '👥 Community Management Platform',
      '   • Discord server creation and management',
      '   • Technologies: Discord.js, React, Node.js, MongoDB',
      '',
      '💻 Desktop Portfolio OS',
      '   • macOS-styled portfolio website',
      '   • Technologies: React, JavaScript, TailwindCSS, Zustand'
    ],
    contact: () => [
      'Contact Information:',
      '',
      '📧 Email: sadin.chanisa8@gmail.com',
      '📱 Phone: 0767571000',
      '📍 Location: Galle, Southern Province, Sri Lanka',
      '',
      '🔗 Links:',
      '  • LinkedIn: linkedin.com/in/chanisa-jayawardhana',
      '  • GitHub: github.com/chanisagithub',
      '',
      '💼 Available for:',
      '  • Full-time opportunities',
      '  • Freelance projects',
      '  • Discord bot development',
      '  • Web & mobile app development',
      '  • Graphic design services'
    ],
    education: () => [
      'Educational Background:',
      '',
      '🎓 University of Sri Jayewardenepura (2017-2021)',
      '   Bachelor of Engineering Technology',
      '   Mechatronics, Robotics, and Automation Engineering',
      '',
      '💻 University of Colombo School of Computing (2019-2020)',
      '   BIT, Information Technology',
      '',
      '☕ Institute of Java & Software Engineering (2015-2017)',
      '   Comprehensive Master Java Developer',
      '   Software Engineering',
      '',
      '🏆 Certifications:',
      '   • AWS Certified Cloud Practitioner (CLF-C02)',
      '   • Huawei Cloud Certified Developer Associate (HCCDA)',
      '   • Linux: System Maintenance'
    ],
    whoami: () => ['chanisa@portfolio:~$'],
    clear: () => 'CLEAR'
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]();
      if (result === 'CLEAR') {
        setHistory([]);
        return;
      }
      
      setHistory(prev => [
        ...prev,
        { type: 'input', content: `chanisa@portfolio:~$ ${cmd}` },
        { type: 'output', content: result }
      ]);
    } else if (trimmedCmd === '') {
      setHistory(prev => [
        ...prev,
        { type: 'input', content: 'chanisa@portfolio:~$ ' }
      ]);
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'input', content: `chanisa@portfolio:~$ ${cmd}` },
        { type: 'output', content: [`Command not found: ${cmd}`, 'Type "help" for available commands.'] }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(currentInput);
    setCurrentInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="p-6 h-full bg-black text-green-400 font-mono text-sm">
      <div 
        ref={terminalRef}
        className="h-full overflow-y-auto space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, index) => (
          <div key={index}>
            {entry.type === 'input' ? (
              <div className="text-green-400">{entry.content}</div>
            ) : (
              <div className="text-gray-300">
                {Array.isArray(entry.content) ? (
                  entry.content.map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))
                ) : (
                  <div>{entry.content}</div>
                )}
              </div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">chanisa@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-400"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;

