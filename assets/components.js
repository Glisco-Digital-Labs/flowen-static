// Lightweight Web Components for Patsy Yoga
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
      const body = this.innerHTML;
      this.innerHTML = `<div class="grid">${body}</div>`;
    }
  }
  customElements.define('py-grid', PYGrid);

  // Card
  class PYCard extends HTMLElement{
    connectedCallback(){
      const title = this.getAttribute('title') || '';
      const href  = this.getAttribute('href')  || '#';
      const btn   = this.getAttribute('button-label') || 'Ver mais';
      const body  = this.innerHTML.trim();
      this.innerHTML = `
        <article class="card">
          ${title ? `<h3>${title}</h3>` : ''}
          <div class="card-body">${body}</div>
          <p><a class="btn" href="${href}" aria-label="${title ? `Abrir ${title}` : 'Ver mais'}">${btn}</a></p>
        </article>
      `;
    }
  }
  customElements.define('py-card', PYCard);
})();