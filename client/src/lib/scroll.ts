/**
 * Gère le scroll vers une section spécifique de la page
 * @param sectionId - L'identifiant de la section (sans le #)
 */
export function scrollToSection(sectionId: string): void {
  // Supprimer le "#" ou "/#" si présent
  const cleanId = sectionId.replace(/^\/?#/, '');
  
  // Si c'est la page d'accueil, remonter en haut
  if (cleanId === '' || cleanId === '/') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }
  
  // Trouver l'élément immédiatement et mettre en place une recherche récursive
  const findElementAndScroll = () => {
    const element = document.getElementById(cleanId);
    if (element) {
      // Calculer la position avec un léger décalage pour tenir compte de la barre de navigation
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight - 20; // Ajouter un petit décalage supplémentaire
  
      // Effectuer le scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  };
  
  // Essayer de trouver l'élément immédiatement
  if (!findElementAndScroll()) {
    // Si l'élément n'est pas trouvé, essayer plusieurs fois avec un intervalle
    let attempts = 0;
    const maxAttempts = 10;
    const interval = setInterval(() => {
      if (findElementAndScroll() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
      attempts++;
    }, 100);
  }
}

/**
 * Détermine l'action à effectuer en fonction du format du lien
 * @param target - Le lien cible (peut être #section, /page ou https://...)
 */
export function handleLinkNavigation(target: string): void {
  // Si c'est un lien vide ou vers l'accueil
  if (target === '' || target === '/' || target === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  
  // Si c'est un lien interne avec #
  if (target.includes('#')) {
    // Extraire l'ID de section
    const sectionId = target.split('#')[1];
    
    // Si ce n'est pas la bonne page, naviguer d'abord
    const currentPath = window.location.pathname;
    const targetPath = target.split('#')[0] || '/';
    
    if (currentPath !== targetPath && targetPath !== '/' && targetPath !== '') {
      // Rediriger vers la bonne page, puis scroller
      window.location.href = target;
      return;
    }
    
    // Sinon, juste scroller
    scrollToSection(sectionId);
    return;
  }
  
  // Si c'est une URL externe (commence par http:// ou https://)
  if (target.startsWith('http://') || target.startsWith('https://')) {
    window.open(target, '_blank');
    return;
  }
  
  // Pour les liens relatifs internes commençant par /
  if (target.startsWith('/')) {
    // Vérifier si nous sommes déjà sur cette page
    if (window.location.pathname === target) {
      // Déjà sur cette page, juste remonter en haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigation vers une nouvelle page
      window.location.href = target;
    }
    return;
  }
  
  // Cas par défaut, remonter en haut de la page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}