(() => {
  function setupAnimations() {
    const items = [...document.querySelectorAll('main [style*="opacity:0"]')];

    if (!items.length) return;

    items.forEach((el, i) => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.willChange = 'opacity, transform';

      const reveal = () => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }, Math.min(i * 80, 600));
      };

      const rect = el.getBoundingClientRect();

      // Elements already visible when the page opens
      if (rect.top < window.innerHeight * 0.9) {
        reveal();
        return;
      }

      // Elements revealed as we scroll
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            reveal();
            observer.disconnect();
          }
        },
        {
          threshold: 0.1
        }
      );

      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAnimations);
  } else {
    setupAnimations();
  }
})();