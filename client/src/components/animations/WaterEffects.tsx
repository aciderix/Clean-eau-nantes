import { useEffect, useRef } from 'react';

export default function WaterEffects() {
  const dropsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = dropsContainerRef.current;
    if (!container) return;

    // Create raindrops
    for (let i = 0; i < 50; i++) {
      const drop = document.createElement('div');
      drop.classList.add('drop');
      drop.style.left = `${Math.random() * 100}vw`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      drop.style.animationDuration = `${Math.random() * 3 + 2}s`;
      drop.style.opacity = `${Math.random() * 0.5 + 0.2}`;
      container.appendChild(drop);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <>
      {/* Water effect background */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/10 to-green-500/5 z-[-1] opacity-60 pointer-events-none"></div>
      
      {/* Wave animations */}
      <div 
        className="fixed bottom-0 left-0 w-[200%] h-[100px] bg-gradient-to-r from-primary/20 to-green-500/10 z-[-1] opacity-80 pointer-events-none"
        style={{ animation: 'wave 20s linear infinite' }}
      ></div>
      
      <div 
        className="fixed bottom-[-25px] left-0 w-[200%] h-[100px] bg-gradient-to-r from-primary/20 to-green-500/10 z-[-1] opacity-50 pointer-events-none"
        style={{ animation: 'wave 15s linear infinite' }}
      ></div>
      
      {/* Rain drops container */}
      <div 
        ref={dropsContainerRef} 
        className="absolute inset-0 pointer-events-none"
      ></div>
    </>
  );
}
