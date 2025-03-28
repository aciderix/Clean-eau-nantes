import React from 'react';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <h2 className="text-4xl font-bold text-center text-primary mb-16 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-primary after:to-nature-green after:mx-auto after:mt-4 after:rounded-md">
      {title}
    </h2>
  );
};

export default SectionTitle;
