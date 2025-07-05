import React from 'react';
import { FiDownload, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ResumeViewer = () => {
  const resumeData = {
    personalInfo: {
      name: "Chanisa Jayawardhana",
      title: "Developer | Freelancer",
      email: "sadin.chanisa8@gmail.com",
      phone: "0767571000",
      location: "Galle, Southern Province, Sri Lanka",
      summary: "I'm a Software Engineer at PayMedia in Colombo, Sri Lanka. My journey began with a software engineering internship at PayMedia, where I mastered Vue.js, AWS Services, Flutter, Laravel, and Spring Boot frameworks. I studied Mechatronics Engineering at the University of Sri Jayewardenepura from December 2016 to January 2021. Since February 2020, I've also been a Freelance Graphic Designer, creating Discord servers for NFT communities and designing mascot logos on Fiverr. Passionate about tech and design, I bring creativity and innovation to every project."
    },
    experience: [
      {
        company: "PayMedia",
        position: "Associate Software Engineer",
        period: "April 2024 - Present",
        location: "Colombo, Western Province, Sri Lanka",
        responsibilities: [
          "Working with Vue.js, AWS Services, Flutter, Laravel, and Spring Boot frameworks",
          "Developing scalable web applications and mobile solutions",
          "Collaborating with cross-functional teams to deliver high-quality software"
        ]
      },
      {
        company: "PayMedia",
        position: "Software Engineer Intern",
        period: "October 2023 - April 2024",
        location: "Sri Lanka",
        responsibilities: [
          "Gained hands-on experience with modern web development frameworks",
          "Learned cloud technologies and AWS services",
          "Contributed to various software development projects"
        ]
      },
      {
        company: "Fiverr",
        position: "Freelance Developer",
        period: "February 2020 - Present",
        location: "Sri Lanka",
        responsibilities: [
          "Discord bot development using Discord.js & Discord.py",
          "Discord community creator for NFT, Gaming, Trading, and communities",
          "Graphic design services including mascot logos"
        ]
      },
      {
        company: "MAS Holdings",
        position: "Internship Trainee",
        period: "October 2019 - April 2020",
        location: "Sri Lanka",
        responsibilities: [
          "Industrial Engineering Department",
          "Sewing Autonomation projects"
        ]
      }
    ],
    skills: [
      "JavaScript", "Java", "Python", "Dart", "Vue.js", "React", "React Native",
      "Node.js", "Spring Boot", "Express", "Laravel", "Flutter", "MySQL", "MongoDB",
      "AWS", "ECS", "RDS", "Figma", "TailwindCSS", "Discord.js", "Discord.py",
      "Chatbot Development"
    ],
    certifications: [
      "AWS Certified Cloud Practitioner (CLF-C02)",
      "Huawei Cloud Certified Developer Associate (HCCDA)",
      "Linux: System Maintenance"
    ],
    education: [
      {
        degree: "Bachelor of Engineering Technology",
        field: "Mechatronics, Robotics, and Automation Engineering",
        school: "University of Sri Jayewardenepura",
        year: "2017 - 2021"
      },
      {
        degree: "BIT, Information Technology",
        school: "University of Colombo School of Computing",
        year: "2019 - 2020"
      },
      {
        degree: "Comprehensive Master Java Developer",
        field: "Software Engineering",
        school: "Institute of Java & Software Engineering",
        year: "2015 - 2017"
      }
    ]
  };

  return (
    <div className="p-6 h-full bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Resume</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiDownload size={16} />
          <span>Download PDF</span>
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-6">
        {/* Personal Info */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{resumeData.personalInfo.name}</h1>
          <h2 className="text-xl text-blue-600 mb-4">{resumeData.personalInfo.title}</h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-2">
              <FiMail size={16} />
              <span>{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiPhone size={16} />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2 col-span-2">
              <FiMapPin size={16} />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          </div>
          
          <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Experience</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{exp.position}</h4>
                  <p className="text-blue-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Certifications</h3>
          <div className="space-y-2">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <h4 className="font-medium text-gray-900">{edu.degree}</h4>
              {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
              <p className="text-blue-600">{edu.school}</p>
              <span className="text-sm text-gray-500">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;

