const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  navigation?.classList.toggle('is-open', !expanded);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const getValue = (source, path) => path.split('.').reduce((value, key) => value?.[key], source);

const setContentText = (content) => {
  document.querySelectorAll('[data-content]').forEach((element) => {
    const value = getValue(content, element.dataset.content);
    if (typeof value === 'string') element.textContent = value;
  });
};

const makeElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const renderWorkSteps = (steps) => {
  const container = document.querySelector('[data-work-steps]');
  if (!container || !Array.isArray(steps) || steps.length === 0) return;

  container.replaceChildren(...steps.map((step, index) => {
    const item = document.createElement('li');
    item.append(
      makeElement('span', '', step.numero || String(index + 1).padStart(2, '0')),
      makeElement('h3', '', step.titulo),
      makeElement('p', '', step.descripcion),
    );
    return item;
  }));
};

const renderAreas = (areas) => {
  const container = document.querySelector('[data-area-grid]');
  const colors = new Set(['terracotta', 'sand', 'moss', 'ink', 'clay', 'sage']);
  const icons = ['✦', '◒', '⌇', '↗', '⊹', '○'];
  if (!container || !Array.isArray(areas) || areas.length === 0) return;

  container.replaceChildren(...areas.map((area, index) => {
    const color = colors.has(area.color) ? area.color : 'sage';
    const card = makeElement('article', `area-card area-card-${color}`);
    const content = document.createElement('div');
    content.append(
      makeElement('span', 'area-icon', icons[index % icons.length]),
      makeElement('h3', '', area.titulo),
      makeElement('p', '', area.descripcion),
    );
    card.append(makeElement('span', 'area-number', String(index + 1).padStart(2, '0')), content);
    return card;
  }));
};

const renderPrinciples = (principles) => {
  const container = document.querySelector('[data-principles-list]');
  if (!container || !Array.isArray(principles) || principles.length === 0) return;
  container.replaceChildren(...principles.map((item) => makeElement('li', '', item)));
};

const renderParticipationOptions = (options) => {
  const container = document.querySelector('[data-participate-options]');
  if (!container || !Array.isArray(options) || options.length === 0) return;

  container.replaceChildren(...options.map((option, index) => {
    const link = document.createElement('a');
    link.href = '#contacto';
    link.append(
      makeElement('span', '', String(index + 1).padStart(2, '0')),
      document.createTextNode(option),
      makeElement('b', '', '↗'),
    );
    link.querySelector('b').setAttribute('aria-hidden', 'true');
    return link;
  }));
};

const renderContact = (contact) => {
  if (!contact) return;
  const email = contact.correo || '';
  const phone = contact.telefono || '';
  const domain = contact.dominio || '';
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;

  document.querySelectorAll('[data-email-link]').forEach((link) => {
    link.textContent = email;
    link.href = `mailto:${email}`;
  });
  document.querySelectorAll('[data-phone-link]').forEach((link) => {
    link.textContent = phone;
    link.href = phoneHref;
  });
  document.querySelectorAll('[data-domain-link]').forEach((link) => {
    link.textContent = domain;
    link.href = `https://${domain}`;
  });

  const form = document.querySelector('[data-contact-form]');
  if (form && email) form.action = `https://formsubmit.co/${email}`;
  const subject = document.querySelector('[data-contact-subject]');
  if (subject && domain) subject.value = `Nueva solicitud desde ${domain}`;
  const next = document.querySelector('[data-contact-next]');
  if (next && domain) next.value = `https://${domain}/gracias.html`;
};

const loadSiteContent = async () => {
  try {
    const response = await fetch('content/site.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('No se encontró el archivo de contenido.');
    const content = await response.json();
    setContentText(content);
    renderWorkSteps(content.trabajo?.pasos);
    renderAreas(content.lineas?.areas);
    renderPrinciples(content.principios?.items);
    renderParticipationOptions(content.participa?.opciones);
    renderContact(content.contacto);
  } catch (error) {
    // La página conserva su contenido inicial si se abre como archivo local.
  }
};

loadSiteContent();
