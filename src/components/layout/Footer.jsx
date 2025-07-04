// client/src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#3A1A1A] py-6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <a 
              target="_blank" 
              className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
              href="https://www.instagram.com/modulaindia/"
              rel="noopener noreferrer"
            >
              <svg 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                height="24" 
                width="24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              target="_blank" 
              className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
              href="https://www.youtube.com/@modula_india_11"
              rel="noopener noreferrer"
            >
              <svg 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                height="24" 
                width="24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a 
              target="_blank" 
              className="text-[#F1E6DD] hover:text-[#f7d3b6] transition-colors" 
              href="https://www.linkedin.com/company/modulaindia/"
              rel="noopener noreferrer"
            >
              <svg 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                height="24" 
                width="24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
          <a 
            className="bg-[#F1E6DD] text-[#3A1A1A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#f7d3b6] transition-colors font-medium" 
            href="https://www.modula.in/price-calculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;