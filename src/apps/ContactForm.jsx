import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser'; // Import EmailJS
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';

const ContactForm = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_zh5ggkx';
    const templateID = 'template_2hu3yun';
    const publicKey = 'Gk03eXAIaUVsYpIe9';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log('SUCCESS!', result.text);
          alert('Thank you for your message! It has been sent successfully. ✅');
          e.target.reset(); // Reset the form fields
      }, (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send the message, please try again later. ❌');
      });
  };

  // This stops the click from bubbling up to the Window component
  const handleWrapperClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Add the onClick handler to this wrapper div
    <div className="p-6 h-full bg-white" onClick={handleWrapperClick}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Get In Touch</h2>
        <p className="text-gray-600">Let's discuss your next project or collaboration opportunity!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-80 overflow-y-auto">
        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FiMail className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <a href="mailto:sadin.chanisa8@gmail.com" className="text-blue-600 hover:underline">
                    sadin.chanisa8@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FiPhone className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <a href="tel:0767571000" className="text-blue-600 hover:underline">
                    0767571000
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Location</p>
                  <p className="text-gray-600">Galle, Southern Province, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/chanisa-jayawardhana/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiLinkedin size={20} />
              </a>
              <a 
                href="https://github.com/chanisagithub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FiGithub size={20} />
              </a>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Available For</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Full-time opportunities</li>
              <li>• Freelance projects</li>
              <li>• Discord bot development</li>
              <li>• Web application development</li>
              <li>• Mobile app development</li>
              <li>• Graphic design services</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Send a Message</h3>
          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project inquiry, collaboration, etc."
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell me about your project or how we can work together..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;