(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const sticky = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero');
  if (sticky && hero && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      sticky.classList.toggle('visible', !entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(hero);
  }

  document.querySelectorAll('.track-cta').forEach(link => link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'reframers_cta_click', cta_text: link.textContent.trim(), page_path: location.pathname });
  }));

  document.querySelectorAll('.demo-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const result = form.querySelector('.form-result');
    const firstInvalid = [...form.querySelectorAll('[required]')].find(field => {
      if (field.type === 'checkbox') return !field.checked;
      return !field.value.trim() || (field.type === 'email' && !field.validity.valid);
    });
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.reportValidity();
      return;
    }
    result.hidden = false;
    result.textContent = 'Thanks for trying the preview. This form is not connected yet, so your details have not been sent. The live version will send a confirmation after the email integration is set up.';
    result.focus?.();
    result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'reframers_form_preview_submit', form_type: form.dataset.formType || 'unknown' });
  }));
})();

(() => {
 const toggle = document.querySelector('#reframe-toggle');
 const possibilities = document.querySelector('#possibilities');
 if (!toggle || !possibilities) return;
 possibilities.hidden = true;
 toggle.setAttribute('aria-expanded', 'false');
 toggle.textContent = 'Pop your Reframers on ↗';
 toggle.addEventListener('click', () => {
   const open = toggle.getAttribute('aria-expanded') === 'true';
   possibilities.hidden = open;
   toggle.setAttribute('aria-expanded', String(!open));
   toggle.textContent = open ? 'Pop your Reframers on ↗' : 'See the first thought again ↺';
   document.querySelector('.storyboard').classList.toggle('is-reframed', !open);
   if (!open) possibilities.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
 });
})();

// Keep download events in the existing optional data layer; downloads work without analytics.
document.querySelectorAll('.download-link').forEach(link => link.addEventListener('click', () => {
 window.dataLayer = window.dataLayer || [];
 window.dataLayer.push({event:'reframers_resource_download', resource:link.dataset.resource, page_path:location.pathname});
}));
