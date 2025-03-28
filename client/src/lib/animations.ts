import { useEffect } from 'react';

export const useWaterAnimations = () => {
  useEffect(() => {
    // Create and append water drops to the container
    const createDrops = (containerId: string, count: number = 50) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      // Clear existing drops
      container.innerHTML = '';
      
      // Create new drops
      for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.classList.add('drop');
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.animationDuration = `${Math.random() * 3 + 2}s`;
        container.appendChild(drop);
      }
    };
    
    // Initialize drops on first render
    createDrops('drops-container');
    
    // Return cleanup function
    return () => {
      const container = document.getElementById('drops-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);
};

// Handle navbar scroll effects
export const useNavbarScrollEffect = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (!navbar) return;
      
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initialize on first render
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
