// components/LanguageToggle.tsx
import React, { useState } from 'react';

const LanguageToggle: React.FC = () => {
  const [isEnglish, setIsEnglish] = useState(true);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <button
      className={`px-8 py-4  relative focus:outline-none `}
      onClick={toggleLanguage}
    >
      <div className="absolute inset-0 flex items-center">
        <span
          className={`w-1/2 h-full flex items-center justify-center  ${
            isEnglish ? 'bg-tertiary text-white' : 'bg-gray-300 text-gray-700'
          }`}
        >
          en
        </span>
        <span
          className={`w-1/2 h-full flex items-center justify-center ${
            isEnglish ? 'bg-gray-300 text-gray-700' : 'bg-tertiary text-white'
          }`}
        >
          nl
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;
