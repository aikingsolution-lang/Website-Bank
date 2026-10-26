// Navigation toggle with aria attributes and header state
const menu = document.querySelector('.menu-toggle');
if (menu) {
  menu.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.site-header');
    const open = nav ? nav.classList.toggle('open') : false;
    if (header) header.classList.toggle('nav-is-open', open);
    menu.setAttribute('aria-expanded', open);
    menu.textContent = open ? 'Close menu' : 'Menu';
  });

  // Close mobile navigation when a nav link is clicked (e.g., in-page anchors)
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      const header = document.querySelector('.site-header');
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (header) header.classList.remove('nav-is-open');
        menu.setAttribute('aria-expanded', 'false');
        menu.textContent = 'Menu';
      }
    });
  });
}

// Intersection Observer for smooth reveal animations
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '50px 0px 50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Contact Inquiry Form handling
const form = document.getElementById('inquiry');
if (form) {
  const chosen = new URLSearchParams(location.search).get('package');
  if (['Essential', 'Standard', 'Comprehensive'].includes(chosen)) {
    form.elements.package.value = chosen;
  }
  let fileUrl;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const bank = data.get('bank') || '';
    const role = data.get('role') || '';
    const pkg = data.get('package') || '';
    const branches = data.get('branches') || '';
    const start = data.get('start') || '';
    const stage = data.get('stage') || '';
    const message = data.get('message') || '';
    const subject = 'DPDP compliance inquiry — ' + name + ' (' + bank + ')';
    const emailBody = 'Hello AIKing Solutions,\n\nI would like to discuss DPDP compliance advisory for our bank or organization. Here are our details:\n\n• Full name: ' + name + '\n• Work email: ' + email + '\n• Bank or organization: ' + bank + '\n• Role: ' + role + '\n• Package of interest: ' + pkg + '\n• Number of branches: ' + branches + '\n• Preferred start: ' + start + '\n• Current DPDP stage: ' + stage + '\n\nWhat we would like to discuss:\n' + message + '\n\nBest regards,\n' + name + '\n' + bank;
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=saurabhbelote112@gmail.com&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(emailBody);
    const mailtoUrl = 'mailto:saurabhbelote112@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(emailBody);
    
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    fileUrl = URL.createObjectURL(new Blob([emailBody], { type: 'text/plain' }));
    
    const downloadLink = document.getElementById('download-inquiry');
    if (downloadLink) downloadLink.href = fileUrl;
    
    const gmailBtn = document.getElementById('gmail-open-btn');
    if (gmailBtn) gmailBtn.href = gmailUrl;
    
    const mailtoBtn = document.getElementById('mailto-fallback');
    if (mailtoBtn) mailtoBtn.href = mailtoUrl;
    
    window.open(gmailUrl, '_blank');
    
    const resultBox = document.getElementById('form-result');
    if (resultBox) {
      resultBox.hidden = false;
      resultBox.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'nearest'
      });
    }
  });
}

// Readiness Checklist interactive counter
const readiness = document.querySelectorAll('#readiness-checks input');
if (readiness.length) {
  readiness.forEach(input => input.addEventListener('change', () => {
    const checked = [...readiness].filter(i => i.checked).length;
    const countEl = document.getElementById('readiness-count');
    const msgEl = document.getElementById('readiness-message');
    if (countEl) countEl.textContent = checked + ' of 6 areas selected';
    if (msgEl) {
      msgEl.textContent = checked === 6
        ? 'You have selected all six areas. A readiness assessment can review the evidence and identify gaps beyond this checklist.'
        : 'Areas still to review: ' + (6 - checked) + '. Use these to guide your assessment discussion. Selected areas also need evidence of effective operation.';
    }
  }));
}
