const iconPaths = {
  linkedin: 'M5.4 7.7H1.8V22h3.6V7.7ZM3.6 2A2.1 2.1 0 1 0 3.6 6.2 2.1 2.1 0 0 0 3.6 2ZM22.2 13.8c0-4.3-2.3-6.3-5.4-6.3a4.7 4.7 0 0 0-4.2 2.3V7.7H9V22h3.6v-7.1c0-1.9.4-3.7 2.7-3.7s2.3 2.1 2.3 3.8v7h3.6l1-8.2Z',
  github: 'M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.5v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C18.5 4.7 19.5 5 19.5 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.1c0 .3.2.6.8.5A11.5 11.5 0 0 0 12 .7Z',
  email: 'M3.5 4.5h17A2.5 2.5 0 0 1 23 7v10a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 17V7a2.5 2.5 0 0 1 2.5-2.5Zm0 2L12 12l8.5-5.5h-17Zm17 11V9L12 14.5 3.5 9v8.5h17Z',
  document: 'M6 2h8l5 5v15H6V2Zm7 2H8v16h9V8h-4V4Zm1.5.7V6.5h1.8l-1.8-1.8ZM10 11h5v1.5h-5V11Zm0 3h5v1.5h-5V14Zm0 3h4v1.5h-4V17Z'
};

const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${iconPaths[name]}"></path></svg>`;
const number = (index) => String(index + 1).padStart(2, '0');
const fullName = (identity) => `${identity.firstName} ${identity.lastName}`;
const chapterLabel = (index, label) => `<div class="chapter-label reveal"><span>${String(index).padStart(2, '0')}</span> / ${label}</div>`;
const sectionHeading = (headingHtml) => `
  <div class="section-heading reveal">
    <h2>${headingHtml}</h2>
  </div>`;

function renderPaperKeywords(keywords, publications, scope) {
  const papers = new Map(publications.items.map((paper) => [paper.title, paper]));
  return `<div class="paper-keywords">
    ${keywords.map((keyword, index) => {
      const matches = keyword.papers.map((title) => papers.get(title)).filter(Boolean);
      const tooltipId = `papers-${scope}-${index}`;
      return `<div class="paper-keyword">
        <button type="button" aria-describedby="${tooltipId}">${keyword.label}<span>${matches.length}</span></button>
        <div class="paper-tooltip" id="${tooltipId}" role="tooltip">
          <small>Related work</small>
          ${matches.map((paper) => `<a href="${paper.url}">${paper.title}<span>${paper.venue}</span></a>`).join('')}
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function resolveHref(item, identity) {
  if (item.hrefKey === 'email') return `mailto:${identity.email}`;
  if (item.hrefKey === 'cv') return identity.cv;
  if (item.hrefKey) return identity.links[item.hrefKey];
  return item.href;
}

function renderHeader(content) {
  const { identity } = content;
  const name = fullName(identity);
  return `
    <a class="monogram" href="#hero" aria-label="${name}, home">
      <span>${identity.initials}</span><i></i>
    </a>
    <p class="status"><span></span> ${identity.status}</p>
    <nav aria-label="Primary navigation">
      ${content.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
    </nav>
    <div class="header-actions">
      <div class="social-bar" aria-label="Profile links">
        ${content.socials.map((item) => `
          <a href="${resolveHref(item, identity)}" aria-label="${item.ariaLabel || item.label}" title="${item.label}">
            ${icon(item.icon)}<span>${item.label}</span>
          </a>`).join('')}
      </div>
      <a class="hire-link" href="mailto:${identity.email}?subject=Full-time%20opportunity%20for%20${encodeURIComponent(identity.availability)}">
        <span class="hire-copy"><span class="hire-prefix">${identity.availabilityLabel} · </span>${identity.availability}</span>
        <strong>Hire me <i>↗</i></strong>
      </a>
    </div>`;
}

function renderHero(content) {
  const { hero, identity } = content;
  return `
    <section class="chapter hero" id="hero" data-stage="input" data-index="00">
      <h1 class="hero-title" aria-label="${fullName(identity)}">
        <span class="reveal">${identity.firstName}</span>
        <span class="reveal outline">${identity.lastName}</span>
      </h1>
      <div class="hero-bottom reveal">
        <p>${hero.introduction}</p>
      </div>
      <div class="signal-entry" aria-hidden="true"><i></i><span>QUERY IN / IDENTITY</span></div>
    </section>`;
}

function renderAbout(content) {
  const { about, identity } = content;
  return `
    <section class="chapter chapter-copy" id="about" data-stage="ingress" data-index="01">
      ${chapterLabel(1, 'INGRESS DMA')}
      <div class="copy-grid">
        <h2 class="display-copy reveal">${about.headingHtml}</h2>
        <div class="portrait-window reveal">
          <img src="${about.portrait}" alt="${about.portraitAlt}">
          <span>${fullName(identity).toUpperCase()} / ${identity.location.toUpperCase()}</span>
        </div>
        <div class="body-copy reveal">
          ${about.paragraphsHtml.map((paragraph) => `<p>${paragraph}</p>`).join('')}
          <div class="about-details">
            <section class="about-detail"><h3>Interests</h3><ul>${about.interests.map((item) => `<li>${item}</li>`).join('')}</ul></section>
            <section class="about-detail"><h3>Languages &amp; tools</h3><ul>${about.tools.map((item) => `<li>${item}</li>`).join('')}</ul></section>
          </div>
        </div>
      </div>
    </section>`;
}

function renderResearch(content) {
  const section = content.research;
  return `
    <section class="chapter research" id="research" data-stage="buffer" data-index="02">
      ${chapterLabel(2, 'GLOBAL BUFFER')}
      ${sectionHeading(section.headingHtml)}
      <div class="domain-list">
        ${section.areas.map((area, index) => `
          <article class="domain reveal">
            <span class="domain-number">${number(index)}</span>
            <h3>${area.title}</h3>
            <p>${area.description}</p>
            ${renderPaperKeywords(area.keywords, content.publications, `research-${index}`)}
          </article>`).join('')}
      </div>
    </section>`;
}

function renderExperience(content) {
  const section = content.experience;
  return `
    <section class="chapter experience" id="experience" data-stage="mac-array" data-index="03">
      ${chapterLabel(3, 'MAC ARRAY')}
      ${sectionHeading(section.headingHtml)}
      <div class="timeline">
        ${section.items.map((item, index) => `
          <article class="timeline-row reveal">
            <span class="timeline-year">${item.year}</span>
            <div class="timeline-copy">
              <h3>${item.company}</h3>
              <p class="timeline-role">${item.role}</p>
            </div>
            <span class="timeline-place">${item.location}</span>
            <span class="timeline-mark">${item.mark}</span>
            <p class="timeline-summary">${item.summary}</p>
            <div class="timeline-keywords">${renderPaperKeywords(item.keywords, content.publications, `experience-${index}`)}</div>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderPublications(content) {
  const section = content.publications;
  return `
    <section class="chapter publications" id="publications" data-stage="accumulate" data-index="04">
      ${chapterLabel(4, 'ACCUMULATE')}
      ${sectionHeading(section.headingHtml)}
      <div class="publication-stack">
        ${[...section.items].sort((a, b) => b.year - a.year).map((paper) => `
          <a class="publication-card reveal" href="${paper.url}" style="--card-accent:${paper.accent}">
            <div class="publication-image ${paper.imageClass || ''}"><img src="${paper.image}" alt="${paper.imageAlt}" loading="lazy"></div>
            <div class="publication-meta ${paper.metaLayout === 'stacked' ? 'publication-meta--stacked' : ''}"><span>${paper.venue}</span><span>${paper.category}</span></div>
            <div class="publication-title-block">
              <h3>${paper.title}</h3>
              <p class="publication-full-title">${paper.subtitle}</p>
            </div>
            <p class="publication-summary">${paper.description}</p>
            <span class="paper-link">READ PAPER ↗</span>
          </a>`).join('')}
      </div>
      <a class="text-link reveal" href="${resolveHref({ hrefKey: section.scholarHrefKey }, content.identity)}">VIEW ALL ON GOOGLE SCHOLAR <span>↗</span></a>
    </section>`;
}

function renderNews(content) {
  const section = content.news;
  const featured = section.featured;
  return `
    <section class="chapter news" id="news" data-stage="vector" data-index="05">
      ${chapterLabel(5, 'VECTOR PREPROCESS')}
      ${sectionHeading(section.headingHtml)}
      <div class="news-grid">
        <article class="news-lead reveal">
          <span class="news-date">${featured.date} · ${featured.type}</span>
          <h3>${featured.title}</h3>
          <p>${featured.description}</p>
          <div class="chip-stamp">${featured.stampHtml}</div>
        </article>
        <div class="news-feed" tabindex="0" aria-label="More news. Scroll to browse all updates.">
          ${section.items.map((item) => `<article class="news-item reveal"><time>${item.date}</time><span>${item.type}</span><p>${item.textHtml}</p></article>`).join('')}
        </div>
      </div>
    </section>`;
}

function renderAwards(content) {
  const section = content.awards;
  return `
    <section class="chapter awards" id="awards" data-stage="activation" data-index="06">
      ${chapterLabel(6, 'NON-LINEAR ACTIVATION')}
      <div class="award-statement reveal">
        <h2>${section.headingHtml}</h2>
      </div>
      <div class="award-orbit">
        ${section.items.map((award) => `<article class="award reveal"><span>${award.year}</span><h3>${award.title}</h3><p>${award.description}</p></article>`).join('')}
      </div>
    </section>`;
}

function renderContact(content) {
  const { contact, identity } = content;
  return `
    <section class="chapter contact" id="contact" data-stage="result" data-index="07">
      ${chapterLabel(7, 'RESULT')}
      <h2 class="reveal">${contact.headingHtml}</h2>
      <p class="response-summary reveal">${contact.summary}</p>
      <aside class="community-service reveal">
        <span>${contact.service.label}</span>
        <p>${contact.service.description}</p>
        <a href="${contact.service.url}">${contact.service.linkLabel} ↗</a>
      </aside>
      <a class="email-link reveal" href="mailto:${identity.email}">
        <span class="email-label">CONTACT ME AT</span>
        <span class="email-address">${identity.email}</span>
        <span class="email-arrow" aria-hidden="true">↗</span>
      </a>
      <div class="contact-links reveal">
        ${contact.links.map((item) => `<a href="${resolveHref(item, identity)}">${item.label} ↗</a>`).join('')}
      </div>
      <footer>
        <span>${fullName(identity).toUpperCase()} © ${identity.copyrightYear}</span>
        <span>${contact.footerTagline.toUpperCase()}</span>
        <a href="#hero">BACK TO INPUT ↑</a>
      </footer>
      <div class="signal-exit" aria-hidden="true"><span>DATA OUT</span><i></i></div>
    </section>`;
}

function renderMetadata(metadata) {
  document.title = metadata.title;
  const values = {
    'meta[name="description"]': metadata.description,
    'meta[property="og:title"]': metadata.title,
    'meta[property="og:description"]': metadata.socialDescription,
    'meta[property="og:url"]': metadata.url,
    'meta[property="og:image"]': metadata.image
  };
  Object.entries(values).forEach(([selector, value]) => {
    document.querySelector(selector)?.setAttribute('content', value);
  });
}

export function renderSite(content) {
  renderMetadata(content.metadata);
  document.querySelector('.site-header').innerHTML = renderHeader(content);
  document.querySelector('#main').innerHTML = [
    renderHero(content),
    renderAbout(content),
    renderResearch(content),
    renderExperience(content),
    renderPublications(content),
    renderNews(content),
    renderAwards(content),
    renderContact(content)
  ].join('');
}
