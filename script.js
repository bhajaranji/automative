const burgerBtn = document.getElementById('burgerBtn');
const centerMenu = document.getElementById('centerMenu');
const closeCenterMenu = document.getElementById('closeCenterMenu');

// Open / close center menu (scale from center)
function openCenterMenu() {
  if (!centerMenu) return;
  centerMenu.setAttribute('aria-hidden', 'false');
  burgerBtn.setAttribute('aria-expanded', 'true');
  setTimeout(() => {
    const first = centerMenu.querySelector('a, button');
    if (first) first.focus();
  }, 220);
}
function closeCenterMenuFn() {
  if (!centerMenu) return;
  centerMenu.setAttribute('aria-hidden', 'true');
  burgerBtn.setAttribute('aria-expanded', 'false');
  burgerBtn.focus();
}

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    const expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) closeCenterMenuFn(); else openCenterMenu();
  });
}
if (closeCenterMenu) closeCenterMenu.addEventListener('click', closeCenterMenuFn);
if (centerMenu) {
  centerMenu.addEventListener('click', (e) => {
    if (e.target === centerMenu) closeCenterMenuFn();
  });
}

// Desktop: arrow rotates on hover via CSS. Mobile: clicking toggles sublists in the center menu.
// Handle mobile toggles for mobile nav sublists
function isMobile() { return window.innerWidth <= 980; }

// Attach toggles for mobile submenu controls
function setupMobileSubToggles() {
  document.querySelectorAll('.mobile-item.has-sub').forEach(item => {
    const btn = item.querySelector('.mobile-link');
    btn.addEventListener('click', (e) => {
      // toggle open class
      const open = item.classList.contains('open');
      // close others (optional)
      document.querySelectorAll('.mobile-item.has-sub').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
      else item.classList.remove('open');
    });
  });
}
// initial setup
setupMobileSubToggles();

// Also support tapping the desktop dropdown on mobile (if user tries)
document.querySelectorAll('.nav-item.dropdown > .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (isMobile()) {
      e.preventDefault();
      // show center menu (mobile) and auto-open corresponding sublist there
      openCenterMenu();
      // find which menu to open by text content
      const txt = link.textContent.trim().split(' ')[0].toLowerCase();
      // map small heuristics to mobile items
      document.querySelectorAll('.mobile-item').forEach(mi => mi.classList.remove('open'));
      document.querySelectorAll('.mobile-item').forEach(mi => {
        const label = mi.querySelector('.mobile-link');
        if (!label) return;
        if (label.textContent.toLowerCase().includes(txt)) {
          mi.classList.add('open');
        }
      });
    }
  });
});

// Close sublists when clicking outside (mobile)
document.addEventListener('click', (e) => {
  if (isMobile()) {
    if (!e.target.closest('.center-menu-card') && !e.target.closest('.burger')) {
      document.querySelectorAll('.mobile-item.has-sub').forEach(i => i.classList.remove('open'));
    }
  }
});

// ESC closes center menu and collapses sublists
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (centerMenu && centerMenu.getAttribute('aria-hidden') === 'false') closeCenterMenuFn();
    document.querySelectorAll('.mobile-item.has-sub').forEach(i => i.classList.remove('open'));
  }
});


