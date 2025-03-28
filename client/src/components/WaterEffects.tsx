import React from 'react';

const WaterEffects: React.FC = () => {
  return (
    <>
      <div className="water-effect"></div>
      <div 
        className="wave" 
        style={{ animation: 'wave-animation 20s linear infinite' }}
      ></div>
      <div 
        className="wave -bottom-6" 
        style={{ animation: 'wave-animation 15s linear infinite', opacity: 0.5 }}
      ></div>
    </>
  );
};

export default WaterEffects;
