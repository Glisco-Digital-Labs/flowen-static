(function () {
    const header = document.querySelector('header.site');
    if (!header) return;

    const btn = header.querySelector('.nav-toggle');
    const nav = header.querySelector('#primary-nav');

    if (!btn || !nav) return;

    function setOpen(open) {
        console.log(`on nav.js setOpen; open is`, open);

        const isOpen = !!open;
        if (isOpen) header.setAttribute('data-nav-open', '');
        else header.removeAttribute('data-nav-open');
        btn.setAttribute('aria-expanded', String(isOpen));
    }

    btn.addEventListener('click', () => {
        const isOpen = header.hasAttribute('data-nav-open');
        setOpen(!isOpen);
    });

    /* Close on Escape */
    header.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
    });

    /* Close after navigating */
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => setOpen(false));
    });
})();
