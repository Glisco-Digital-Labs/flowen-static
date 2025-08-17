// Lightweight Web Components for Flowen Yoga
(function(){
  // Header
  class PYHeader extends HTMLElement{
    connectedCallback(){
      const title = this.getAttribute('title') || '';
      const subtitle = this.getAttribute('subtitle') || '';
      const nav = this.innerHTML; // light DOM links
      this.innerHTML = `
        <header class="site" role="banner">
          <div class="wrap">
            <div class="brand">
              <h1>${title}</h1>
              ${subtitle ? `<p class="sub">${subtitle}</p>` : ''}
            </div>
            <nav class="site" aria-label="Principal navegação">
              ${nav}
            </nav>
          </div>
        </header>
      `;
    }
  }
  customElements.define('py-header', PYHeader);

  // Footer
  class PYFooter extends HTMLElement{
    connectedCallback(){
      const content = this.innerHTML || '';
      this.innerHTML = `
        <footer class="site" role="contentinfo">
          <div class="wrap">${content}</div>
        </footer>
      `;
      // Auto year if span[data-year] exists
      const y = this.querySelector('[data-year]');
      if (y) y.textContent = new Date().getFullYear();
    }
  }
  customElements.define('py-footer', PYFooter);

  // Grid
  class PYGrid extends HTMLElement{
    connectedCallback(){
      const style = this.getAttribute('style') || '';
      const body = this.innerHTML;
      this.innerHTML = `<div class="grid ${style}">${body}</div>`;
    }
  }
  customElements.define('py-grid', PYGrid);

  // Section
  class PYSection extends HTMLElement{
    connectedCallback(){
      const title = this.getAttribute('title') || '';
      const subtitle = this.getAttribute('subtitle') || '';
      const body = this.innerHTML.trim();
      this.innerHTML = `
        <section class="section">
          <div class="wrap">
            ${title ? `<h2 class="section-title lato-light-italic dark-text">${title}</h2>` : ''}
            ${subtitle ? `<p class="section-subtitle lato-light">${subtitle}</p>` : ''}
            <div class="section-body">${body}</div>
          </div>
        </section>
      `;
    }
  }
  customElements.define('py-section', PYSection);

  class PYHero extends HTMLElement {
    connectedCallback() {
      const title     = this.getAttribute('title') || '';
      const subtitle  = this.getAttribute('subtitle') || '';
      const ctaText   = this.getAttribute('cta-text') || '';
      const ctaLink   = this.getAttribute('cta-link') || '#';
      const image     = this.getAttribute('image') || '';                 // e.g. /assets/hero.jpg
      const overlay   = this.getAttribute('overlay')                      // e.g. "rgba(0,0,0,.5)" or "linear-gradient(...)"
                        || 'linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.35))';
      const position  = this.getAttribute('position') || 'center 30%';    // CSS background-position
      const minH      = this.getAttribute('min-h') || '52vh';             // optional

      const ctaContent = ctaLink ? `<a class="btn" href="${ctaLink}" aria-label="${ctaText}">${ctaText}</a>` : ctaText;
      const cta        = ctaText ? ctaContent : '';

      console.log('Hero component:', this.getAttribute('overlay') ? 'with overlay' : 'no overlay');
      // Note: no self-closing divs; keep proper open/close tags.
      this.innerHTML = `
        <section class="hero${image ? '' : ' hero--noimage'}" 
                style="--hero-min-h:${minH}; --hero-position:${position}; --hero-overlay:${overlay};">
          ${image ? `
            <div class="hero-media">
              <div class="hero-image" style="background-image:url('${image}');"></div>
              <div class="hero-overlay" style="background: ${overlay}"></div>
            </div>` : ''
          }
          <div class="wrap hero-content">
            <h1 class="lato-regular-italic">${title}</h1>
            ${subtitle ? `<p class="sub lato-thin">${subtitle}</p>` : ''}
            <div class="hero-cta">${cta}</div>
          </div>
        </section>
      `;
    }
  }
  customElements.define('py-hero', PYHero);
  // Card
  class PYCard extends HTMLElement{
    connectedCallback(){
      const title = this.getAttribute('title') || '';
      const subtitle = this.getAttribute('subtitle') || '';
      const image = this.getAttribute('image') || ''; // optional
      const style = this.getAttribute('style') || 'ystack'; // one of ['ystack', 'xstack', 'zstack']
      const href  = this.getAttribute('href')  || '#';
      const btn   = this.getAttribute('button-label') || 'Ver mais';
      const body  = this.innerHTML.trim();
      this.innerHTML = `
        <article class="card">
          ${image ? `<div class="card-image" style="background-image:url('${image}');"></div>` : ''}
          <div class="card-content ${style}">
            ${title ? `<h3>${title}</h3>` : ''}
            ${subtitle ? `<p class="sub">${subtitle}</p>` : ''}
            <div class="card-body">${body}</div>
          </div>
          <div class="card-cta">
            <a class="btn" href="${href}" aria-label="${title ? `Abrir ${title}` : 'Ver mais'}">${btn}</a>
          </div>
          
        </article>
      `;
    }
  }
  customElements.define('py-card', PYCard);
})();