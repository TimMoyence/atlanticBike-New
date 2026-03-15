(function () {
  const ui = (window.AtlanticBikeUI = window.AtlanticBikeUI || {});
  let bookingFlowCount = 0;
  let faqCount = 0;
  const bookingConfigs = new Map();
  let rentalFlowCount = 0;
  const rentalFlowConfigs = new Map();
  const rentalFlowStates = new Map();

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char];
    });
  }

  function formatEuro(value) {
    const amount = Number(value || 0);
    const hasDecimals = Math.abs(amount % 1) > 0.001;
    const normalized = hasDecimals
      ? amount.toFixed(2).replace(".", ",")
      : String(Math.round(amount));
    return `${normalized} €`;
  }

  function formatShortDate(value) {
    if (!value) return "A définir";
    const [year, month, day] = String(value).split("-");
    if (!year || !month || !day) return value;
    return `${day}/${month}/${year.slice(-2)}`;
  }

  function addDaysToDate(value, days) {
    if (!value) return "";
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function containerClass(width) {
    if (width === "narrow") return "ab-section-container ab-section-container-narrow";
    if (width === "wide") return "ab-section-container ab-section-container-wide";
    return "ab-section-container";
  }

  function renderIcon(name) {
    if (name === "freedom") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9.5 12 4l8 5.5"></path>
          <path d="M6 8.8V19h12V8.8"></path>
          <path d="M9.5 19v-5.5h5V19"></path>
        </svg>
      `;
    }

    if (name === "email") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="6" width="17" height="12" rx="1.5"></rect>
          <path d="m4.5 7.5 7.5 6 7.5-6"></path>
        </svg>
      `;
    }

    if (name === "phone") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.8 4.5h2.7l1.2 4-1.9 1.9a16.5 16.5 0 0 0 3.8 3.8l1.9-1.9 4 1.2v2.7c0 .8-.6 1.5-1.4 1.5A13.8 13.8 0 0 1 5.5 5.9c0-.8.6-1.4 1.4-1.4Z"></path>
        </svg>
      `;
    }

    if (name === "image") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"></path>
          <circle cx="9" cy="10" r="1.5"></circle>
          <path d="m21 16-4.8-4.8a1 1 0 0 0-1.4 0L9 17"></path>
        </svg>
      `;
    }

    if (name === "map") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Z"></path>
          <circle cx="12" cy="10" r="2.3"></circle>
        </svg>
      `;
    }

    if (name === "calendar") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2"></rect>
          <path d="M16 3v4M8 3v4M3 10h18"></path>
        </svg>
      `;
    }

    if (name === "clock") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5"></circle>
          <path d="M12 7.5v5l3 1.8"></path>
        </svg>
      `;
    }

    if (name === "bike") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6.5" cy="16.5" r="3.5"></circle>
          <circle cx="17.5" cy="16.5" r="3.5"></circle>
          <path d="M9.5 8h4l2.2 3.8H10l-2.5 4.7"></path>
          <path d="M9.5 8 8 11.2H5"></path>
        </svg>
      `;
    }

    if (name === "shield") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 6 5.3v5.2c0 4.2 2.6 8 6 9.5 3.4-1.5 6-5.3 6-9.5V5.3L12 3Z"></path>
          <path d="m9.3 12 1.7 1.7 3.7-4"></path>
        </svg>
      `;
    }

    if (name === "route") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="18" r="2"></circle>
          <circle cx="18" cy="6" r="2"></circle>
          <path d="M8 18c5 0 2-8 8-8"></path>
          <path d="M12 18h6"></path>
        </svg>
      `;
    }

    if (name === "spark") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z"></path>
          <path d="m18.5 14.5.8 2.5 2.5.8-2.5.8-.8 2.5-.8-2.5-2.5-.8 2.5-.8.8-2.5Z"></path>
        </svg>
      `;
    }

    return "";
  }

  function renderActions(actions) {
    if (!actions || !actions.length) return "";

    return `
      <div class="ab-section-actions">
        ${actions
          .map(function (action) {
            const href = escapeHtml(action.href || "#");
            const label = escapeHtml(action.label || "");

            if (action.variant === "link") {
              return `<a class="ab-text-link" href="${href}">${label}</a>`;
            }

            const variantClass =
              action.variant === "secondary"
                ? "ab-button ab-button-secondary"
                : "ab-button ab-button-primary";

            return `<a class="${variantClass}" href="${href}">${label}</a>`;
          })
          .join("")}
      </div>
    `;
  }

  function renderSectionIntro(options) {
    const level = options.level || "h2";
    const titleClass =
      options.titleSize === "hero"
        ? "ab-section-title-hero"
        : options.titleSize === "display"
          ? "ab-section-title-display"
          : "ab-section-title";
    const centeredClass = options.centered ? " is-centered" : "";

    return `
      <div class="ab-section-intro${centeredClass}">
        ${options.eyebrow ? `<span class="ab-section-eyebrow">${escapeHtml(options.eyebrow)}</span>` : ""}
        <${level} class="${titleClass}">${escapeHtml(options.title || "")}</${level}>
        ${options.description ? `<p class="ab-section-description">${escapeHtml(options.description)}</p>` : ""}
      </div>
    `;
  }

  function renderMedia(media, options = {}) {
    if (media && media.src) {
      return `
        <div class="ab-media-frame ${options.className || ""}">
          <img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt || "")}" />
        </div>
      `;
    }

    const icon = renderIcon((media && media.icon) || options.icon || "image");
    const toneClass = media && media.tone ? ` ab-placeholder-tone-${escapeHtml(media.tone)}` : "";
    const mapClass = (media && media.icon) === "map" || options.icon === "map" ? " is-map" : "";

    return `
      <div class="ab-media-frame ${options.className || ""}">
        <div class="ab-media-placeholder${mapClass}${toneClass}">
          ${icon}
        </div>
      </div>
    `;
  }

  function renderAvatar(item) {
    if (item.avatarInitial) {
      return `<span class="ab-testimonial-avatar">${escapeHtml(item.avatarInitial)}</span>`;
    }

    return `<span class="ab-testimonial-avatar">${renderIcon("image")}</span>`;
  }

  function renderBookingField(flowId, stepIndex, field) {
    const fieldId = `ab-booking-${flowId}-${stepIndex}-${field.name}`;
    const fieldType = field.type || "text";

    if (fieldType === "choiceCards") {
      return `
        <div class="ab-booking-field ab-booking-field-full">
          <span class="ab-booking-label">${escapeHtml(field.label || "")}</span>
          ${field.description ? `<p class="ab-booking-help">${escapeHtml(field.description)}</p>` : ""}
          <div class="ab-booking-choice-grid">
            ${(field.options || [])
              .map(function (option, optionIndex) {
                return `
                  <label class="ab-booking-choice-card">
                    <input
                      type="radio"
                      name="${escapeHtml(field.name)}"
                      value="${escapeHtml(option.value)}"
                      ${field.required ? "required" : ""}
                      ${optionIndex === 0 ? "checked" : ""}
                    />
                    <span class="ab-booking-choice-card-ui">
                      <strong>${escapeHtml(option.label || "")}</strong>
                      ${option.description ? `<small>${escapeHtml(option.description)}</small>` : ""}
                      ${option.meta ? `<em>${escapeHtml(option.meta)}</em>` : ""}
                    </span>
                  </label>
                `;
              })
              .join("")}
          </div>
        </div>
      `;
    }

    if (fieldType === "checkboxGroup") {
      return `
        <div class="ab-booking-field ab-booking-field-full" data-required-group="${field.required ? "true" : "false"}" data-field-name="${escapeHtml(field.name)}">
          <span class="ab-booking-label">${escapeHtml(field.label || "")}</span>
          ${field.description ? `<p class="ab-booking-help">${escapeHtml(field.description)}</p>` : ""}
          <div class="ab-booking-check-grid">
            ${(field.options || [])
              .map(function (option) {
                return `
                  <label class="ab-booking-check-item">
                    <input type="checkbox" name="${escapeHtml(field.name)}" value="${escapeHtml(option.value)}" />
                    <span>${escapeHtml(option.label || "")}</span>
                  </label>
                `;
              })
              .join("")}
          </div>
        </div>
      `;
    }

    if (fieldType === "select") {
      return `
        <label class="ab-booking-field">
          <span class="ab-booking-label">${escapeHtml(field.label || "")}</span>
          <select
            class="ab-booking-input ab-booking-select"
            id="${fieldId}"
            name="${escapeHtml(field.name)}"
            ${field.required ? "required" : ""}
          >
            <option value="">${escapeHtml(field.placeholder || "Sélectionner")}</option>
            ${(field.options || [])
              .map(function (option) {
                return `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label || "")}</option>`;
              })
              .join("")}
          </select>
        </label>
      `;
    }

    if (fieldType === "textarea") {
      return `
        <label class="ab-booking-field ab-booking-field-full">
          <span class="ab-booking-label">${escapeHtml(field.label || "")}</span>
          <textarea
            class="ab-booking-input ab-booking-textarea"
            id="${fieldId}"
            name="${escapeHtml(field.name)}"
            placeholder="${escapeHtml(field.placeholder || "")}"
            rows="4"
            ${field.required ? "required" : ""}
          ></textarea>
        </label>
      `;
    }

    return `
      <label class="ab-booking-field">
        <span class="ab-booking-label">${escapeHtml(field.label || "")}</span>
        <input
          class="ab-booking-input"
          type="${escapeHtml(fieldType)}"
          id="${fieldId}"
          name="${escapeHtml(field.name)}"
          placeholder="${escapeHtml(field.placeholder || "")}"
          ${field.required ? "required" : ""}
        />
      </label>
    `;
  }

  function renderPageHeader(props) {
    return `
      <section class="ab-page-header"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            level: "h1",
            titleSize: "hero",
            centered: true,
            title: props.title,
            description: props.description,
          })}
        </div>
      </section>
    `;
  }

  function renderCenteredHero(props) {
    return `
      <section class="ab-section ab-centered-hero${props.surface === "soft" ? " ab-section-surface-soft" : ""}"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          <div class="ab-centered-hero-inner">
            ${props.icon ? `<div class="ab-centered-hero-icon">${renderIcon(props.icon)}</div>` : ""}
            ${renderSectionIntro({
              eyebrow: props.eyebrow,
              title: props.title,
              description: props.description,
              centered: true,
              titleSize: "display",
            })}
            ${renderActions(props.actions)}
          </div>
        </div>
      </section>
    `;
  }

  function renderMediaHero(props) {
    return `
      <section class="ab-media-hero"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          <div class="ab-media-hero-copy">
            ${renderSectionIntro({
              level: "h1",
              titleSize: "display",
              centered: true,
              title: props.title,
              description: props.description,
            })}
            ${renderActions(props.actions)}
          </div>
          ${renderMedia(props.media)}
        </div>
      </section>
    `;
  }

  function renderDetailHeroSection(props) {
    return `
      <section class="ab-section ab-detail-hero"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          <div class="ab-detail-hero-inner">
            ${renderSectionIntro({
              level: "h1",
              eyebrow: props.eyebrow,
              title: props.title,
              description: props.description,
              centered: true,
              titleSize: "display",
            })}
            ${renderActions(props.actions)}
            ${
              props.tags && props.tags.length
                ? `
                  <div class="ab-detail-tag-list">
                    ${props.tags
                      .map(function (tag) {
                        return `<span class="ab-detail-tag">${escapeHtml(tag)}</span>`;
                      })
                      .join("")}
                  </div>
                `
                : ""
            }
          </div>
        </div>
      </section>
    `;
  }

  function renderServicesSection(props) {
    return `
      <section class="ab-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
          })}
          <div class="ab-services-grid">
            ${(props.items || [])
              .map(function (item) {
                return `
                  <article class="ab-service-card">
                    ${item.kicker ? `<span class="ab-service-kicker">${escapeHtml(item.kicker)}</span>` : ""}
                    <h3>${escapeHtml(item.title || "")}</h3>
                    <p>${escapeHtml(item.description || "")}</p>
                    ${item.linkLabel ? `<a class="ab-inline-link" href="${escapeHtml(item.href || "#")}">${escapeHtml(item.linkLabel)}</a>` : ""}
                    ${renderMedia(item.media)}
                  </article>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderCollectionSpotlightSection(props) {
    return `
      <section class="ab-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
          })}
          <div class="ab-collection-spotlight-grid">
            <article class="ab-collection-spotlight-visual">
              ${renderMedia((props.visual && props.visual.media) || { icon: "image", tone: "neutral" })}
              ${
                props.visual && props.visual.caption
                  ? `<div class="ab-collection-spotlight-visual__caption">${escapeHtml(props.visual.caption)}</div>`
                  : ""
              }
            </article>
            ${(props.cards || [])
              .map(function (item) {
                return `
                  <article class="ab-collection-spotlight-card">
                    <div class="ab-collection-spotlight-card__copy">
                      ${item.kicker ? `<span class="ab-service-kicker">${escapeHtml(item.kicker)}</span>` : ""}
                      <h3>${escapeHtml(item.title || "")}</h3>
                      <p>${escapeHtml(item.description || "")}</p>
                      ${
                        item.linkLabel
                          ? `<a class="ab-inline-link" href="${escapeHtml(item.href || "#")}">${escapeHtml(item.linkLabel)}</a>`
                          : ""
                      }
                    </div>
                    <div class="ab-collection-spotlight-card__media">
                      ${renderMedia(item.media || { icon: "image", tone: "neutral" })}
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderTestimonialsSection(props) {
    const surfaceClass = props.surface === "soft" ? " is-soft" : " is-default";

    return `
      <section class="ab-section ab-testimonials-section${surfaceClass}"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
          })}
          <div class="ab-testimonial-grid">
            ${(props.items || [])
              .map(function (item) {
                const stars = "★".repeat(item.stars || 5);

                return `
                  <article class="ab-testimonial-card">
                    <div class="ab-testimonial-stars" aria-label="${escapeHtml(String(item.stars || 5))} étoiles">${stars}</div>
                    <p>${escapeHtml(item.quote || "")}</p>
                    <div class="ab-testimonial-person">
                      ${renderAvatar(item)}
                      <span>
                        <strong>${escapeHtml(item.name || "")}</strong>
                        <small>${escapeHtml(item.meta || "")}</small>
                      </span>
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderGallerySection(props) {
    return `
      <section class="ab-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            title: props.title,
            description: props.description,
          })}
          <div class="ab-gallery-grid">
            ${(props.items || [])
              .map(function (item) {
                return `
                  <article class="ab-gallery-card">
                    ${
                      item.media && item.media.src
                        ? renderMedia(item.media)
                        : `<div class="ab-media-placeholder ab-placeholder-tone-${escapeHtml(item.tone || "one")}"></div>`
                    }
                    <span class="ab-gallery-label">${escapeHtml(item.label || "Placeholder")}</span>
                  </article>
                `;
              })
              .join("")}
          </div>
          <div class="ab-gallery-controls">
            <div class="ab-gallery-dots" aria-hidden="true">
              <span class="is-active"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="ab-gallery-arrows">
              <button type="button" aria-label="Précédent">←</button>
              <button type="button" aria-label="Suivant">→</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderStatsSection(props) {
    return `
      <section class="ab-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          <div class="ab-stats-header">
            <h2 class="ab-section-title">${escapeHtml(props.title || "")}</h2>
            <p class="ab-section-description">${escapeHtml(props.description || "")}</p>
          </div>
          <div class="ab-stats-grid">
            ${(props.items || [])
              .map(function (item) {
                if (item.type === "media") {
                  return `
                    <article class="ab-stat-media">
                      <div class="ab-media-placeholder ab-placeholder-tone-${escapeHtml(item.tone || "one")}"></div>
                    </article>
                  `;
                }

                return `
                  <article class="ab-stat-card${item.size === "large" ? " is-large" : ""}">
                    <strong>${escapeHtml(item.value || "")}</strong>
                    <span>${escapeHtml(item.label || "")}</span>
                  </article>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderTimelineSection(props) {
    return `
      <section class="ab-section ab-timeline-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
            titleSize: "display",
          })}
          ${renderActions(props.actions)}
          <div class="ab-timeline-track">
            ${(props.items || [])
              .map(function (item) {
                return `
                  <article class="ab-timeline-item">
                    <span class="ab-timeline-dot" aria-hidden="true"></span>
                    <strong class="ab-timeline-year">${escapeHtml(item.year || "")}</strong>
                    <p>${escapeHtml(item.description || "")}</p>
                  </article>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderSplitFeatureSection(props) {
    return `
      <section class="ab-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          <div class="ab-split-grid${props.reverse ? " is-reversed" : ""}">
            <div class="ab-split-copy">
              <h2 class="ab-section-title">${escapeHtml(props.title || "")}</h2>
              <p class="ab-section-description">${escapeHtml(props.description || "")}</p>
            </div>
            <div class="ab-split-media">
              ${renderMedia(props.media, { icon: (props.media && props.media.icon) || "image" })}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderContactSitesSection(props) {
    return `
      <section class="ab-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          <div class="ab-contact-grid">
            <div class="ab-contact-left">
              ${renderSectionIntro({
                eyebrow: props.eyebrow,
                title: props.title,
                description: props.description,
              })}
              <div class="ab-site-list">
                ${(props.sites || [])
                  .map(function (site) {
                    return `
                      <article class="ab-site-item">
                        <h3>${escapeHtml(site.name || "")}</h3>
                        <p>${escapeHtml(site.description || "")}</p>
                        <a class="ab-inline-link" href="${escapeHtml(site.href || "#")}">${escapeHtml(site.linkLabel || "Voir carte")}</a>
                      </article>
                    `;
                  })
                  .join("")}
              </div>
            </div>

            <div class="ab-contact-right">
              <div class="ab-contact-items">
                ${(props.contacts || [])
                  .map(function (contact) {
                    return `
                      <div class="ab-contact-item">
                        <span class="ab-contact-icon">${renderIcon(contact.icon)}</span>
                        <div>
                          <h3>${escapeHtml(contact.label || "")}</h3>
                          ${
                            contact.href
                              ? `<a href="${escapeHtml(contact.href)}">${escapeHtml(contact.value || "")}</a>`
                              : `<p>${escapeHtml(contact.value || "")}</p>`
                          }
                        </div>
                      </div>
                    `;
                  })
                  .join("")}
              </div>

              ${renderMedia(props.mapMedia || { icon: "map" }, { icon: "map" })}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderCtaSection(props) {
    return `
      <section class="ab-section ab-cta-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            title: props.title,
            description: props.description,
            centered: true,
            titleSize: "display",
          })}
          ${renderActions(props.actions)}
        </div>
      </section>
    `;
  }

  function renderFeatureCardsSection(props) {
    return `
      <section class="ab-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: !!props.centered,
          })}
          <div class="ab-feature-card-grid">
            ${(props.items || [])
              .map(function (item) {
                return `
                  <article class="ab-feature-card">
                    <span class="ab-feature-icon">${renderIcon(item.icon || "spark")}</span>
                    <h3>${escapeHtml(item.title || "")}</h3>
                    <p>${escapeHtml(item.description || "")}</p>
                  </article>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderPricingTableSection(props) {
    return `
      <section class="ab-section ab-pricing-table-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
          })}
          ${
            props.columns && props.columns.length
              ? `
                <div class="ab-pricing-package-list" aria-label="Forfaits de location">
                  ${props.columns
                    .map(function (column) {
                      return `<span class="ab-pricing-package-pill">${escapeHtml(column.shortLabel || column.label || "")}</span>`;
                    })
                    .join("")}
                </div>
              `
              : ""
          }
          <div class="ab-pricing-table-wrap">
            <table class="ab-pricing-table">
              <thead>
                <tr>
                  <th>${escapeHtml(props.rowHeaderLabel || "Catégorie")}</th>
                  ${(props.columns || [])
                    .map(function (column) {
                      return `<th>${escapeHtml(column.label || "")}</th>`;
                    })
                    .join("")}
                </tr>
              </thead>
              <tbody>
                ${(props.rows || [])
                  .map(function (row) {
                    return `
                      <tr>
                        <th>${escapeHtml(row.label || "")}</th>
                        ${(props.columns || [])
                          .map(function (column) {
                            return `<td>${escapeHtml((row.values && row.values[column.key]) || "—")}</td>`;
                          })
                          .join("")}
                      </tr>
                    `;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
          ${renderActions(props.actions)}
        </div>
      </section>
    `;
  }

  function renderInfoSplitSection(props) {
    const intro =
      props.introEyebrow || props.introTitle || props.introDescription
        ? renderSectionIntro({
            eyebrow: props.introEyebrow,
            title: props.introTitle,
            description: props.introDescription,
            centered: props.introCentered !== false,
          })
        : "";

    return `
      <section class="ab-section${props.surface === "soft" ? " ab-section-surface-soft" : ""}"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${intro}
          <div class="ab-info-split${props.reverse ? " is-reversed" : ""}">
            <div class="ab-info-split-copy${props.copySurface === "card" ? " ab-info-split-copy-card" : ""}">
              ${props.icon ? `<span class="ab-info-split-icon">${renderIcon(props.icon)}</span>` : ""}
              ${renderSectionIntro({
                eyebrow: props.eyebrow,
                title: props.title,
                description: props.description,
              })}
              ${
                props.details && props.details.length
                  ? `
                    <ul class="ab-info-list">
                      ${props.details
                        .map(function (detail) {
                          return `<li>${escapeHtml(detail)}</li>`;
                        })
                        .join("")}
                    </ul>
                  `
                  : ""
              }
              ${renderActions(props.actions)}
            </div>
            <div class="ab-info-split-media">
              ${renderMedia(props.media, { icon: (props.media && props.media.icon) || "image" })}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderDetailGalleryItem(item, className) {
    return `
      <article class="ab-detail-gallery-item ${className}">
        ${renderMedia(item.media || { icon: "image", tone: item.tone || "neutral" })}
        ${item.label ? `<span class="ab-detail-gallery-item__label">${escapeHtml(item.label)}</span>` : ""}
      </article>
    `;
  }

  function renderDetailGallerySection(props) {
    const items = props.items || [];
    const primaryItem = items[0] || { label: "Visuel principal", tone: "neutral" };
    const secondaryItems = items.slice(1, 5);

    while (secondaryItems.length < 4) {
      secondaryItems.push({ label: "Détail", tone: "neutral" });
    }

    return `
      <section class="ab-section ab-detail-gallery-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            title: props.title,
            description: props.description,
            centered: true,
          })}
          <div class="ab-detail-gallery-grid">
            ${renderDetailGalleryItem(primaryItem, "is-large")}
            ${secondaryItems
              .map(function (item, index) {
                return renderDetailGalleryItem(item, `is-small ab-detail-gallery-slot-${index + 1}`);
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderDetailProcessCard(item, options = {}) {
    return `
      <article class="${options.className}">
        ${options.withMedia ? `<div class="ab-detail-process-card__media">${renderMedia(item.media || { icon: "image", tone: "neutral" })}</div>` : ""}
        <div class="ab-detail-process-card__body">
          ${item.eyebrow ? `<span class="ab-detail-process-card__eyebrow">${escapeHtml(item.eyebrow)}</span>` : ""}
          <h3>${escapeHtml(item.title || "")}</h3>
          <p>${escapeHtml(item.description || "")}</p>
          ${item.actions ? renderActions(item.actions) : ""}
        </div>
      </article>
    `;
  }

  function renderDetailProcessSection(props) {
    return `
      <section class="ab-section ab-detail-process-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
          })}
          <div class="ab-detail-process-grid">
            ${renderDetailProcessCard(props.lead || {}, {
              className: "ab-detail-process-card ab-detail-process-card-lead",
              withMedia: true,
            })}
            <div class="ab-detail-process-stack">
              ${(props.steps || [])
                .map(function (item) {
                  return renderDetailProcessCard(item, {
                    className: "ab-detail-process-card ab-detail-process-card-step",
                  });
                })
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderBikeShowcaseSection(props) {
    return `
      <section class="ab-section ab-bike-showcase-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
          })}
          <div class="ab-bike-showcase-list">
            ${(props.items || [])
              .map(function (item) {
                return `
                  <article class="ab-bike-showcase-card${item.reverse ? " is-reversed" : ""}">
                    <div class="ab-bike-showcase-card__media">
                      ${renderMedia(item.media || { icon: "image", tone: "neutral" })}
                    </div>
                    <div class="ab-bike-showcase-card__copy">
                      <div class="ab-bike-showcase-card__head">
                        ${item.family ? `<span class="ab-bike-showcase-card__family">${escapeHtml(item.family)}</span>` : ""}
                        ${item.kicker ? `<span class="ab-bike-showcase-card__kicker">${escapeHtml(item.kicker)}</span>` : ""}
                      </div>
                      <h3>${escapeHtml(item.title || "")}</h3>
                      ${item.description ? `<p class="ab-bike-showcase-card__description">${escapeHtml(item.description)}</p>` : ""}
                      ${
                        item.highlights && item.highlights.length
                          ? `
                            <div class="ab-bike-showcase-card__highlights">
                              ${item.highlights
                                .map(function (highlight) {
                                  return `<span>${escapeHtml(highlight)}</span>`;
                                })
                                .join("")}
                            </div>
                          `
                          : ""
                      }
                      ${
                        item.details && item.details.length
                          ? `
                            <ul class="ab-bike-showcase-card__details">
                              ${item.details
                                .map(function (detail) {
                                  return `<li>${escapeHtml(detail)}</li>`;
                                })
                                .join("")}
                            </ul>
                          `
                          : ""
                      }
                      ${renderActions(item.actions)}
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderDetailShowcaseCtaSection(props) {
    return `
      <section class="ab-section ab-detail-showcase-cta"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          <div class="ab-detail-showcase-cta__intro">
            ${renderSectionIntro({
              eyebrow: props.eyebrow,
              title: props.title,
              description: props.description,
              centered: true,
              titleSize: "display",
            })}
            ${renderActions(props.actions)}
          </div>
          ${renderMedia(props.media || { icon: "image", tone: "neutral" }, { className: "ab-detail-showcase-cta__media" })}
        </div>
      </section>
    `;
  }

  function renderFaqItems(items, faqId) {
    return (items || [])
      .map(function (item, index) {
        const panelId = `${faqId}-panel-${index}`;
        return `
          <article class="ab-faq-item">
            <button
              class="ab-faq-trigger"
              type="button"
              aria-expanded="${index === 0 ? "true" : "false"}"
              aria-controls="${panelId}"
              data-faq-trigger
            >
              <span>${escapeHtml(item.question || "")}</span>
              <span class="ab-faq-trigger-icon" aria-hidden="true">+</span>
            </button>
            <div class="ab-faq-panel" id="${panelId}" ${index === 0 ? "" : "hidden"}>
              <p>${escapeHtml(item.answer || "")}</p>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderFaqSection(props) {
    faqCount += 1;
    const faqId = `ab-faq-${faqCount}`;

    return `
      <section class="ab-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
          })}
          <div class="ab-faq-list" data-faq-list>
            ${renderFaqItems(props.items, faqId)}
          </div>
        </div>
      </section>
    `;
  }

  function renderFaqSplitSection(props) {
    faqCount += 1;
    const faqId = `ab-faq-${faqCount}`;

    return `
      <section class="ab-section ab-faq-split-section"${props.id ? ` id="${escapeHtml(props.id)}"` : ""}>
        <div class="${containerClass(props.width)}">
          <div class="ab-faq-split">
            <div class="ab-faq-split-copy">
              ${renderSectionIntro({
                eyebrow: props.eyebrow,
                title: props.title,
                description: props.description,
              })}
              ${renderActions(props.actions)}
            </div>
            <div class="ab-faq-list" data-faq-list>
              ${renderFaqItems(props.items, faqId)}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderBookingFlowSection(props) {
    bookingFlowCount += 1;
    const flowId = `ab-booking-flow-${bookingFlowCount}`;
    const sectionId = props.id || flowId;
    bookingConfigs.set(flowId, props);

    return `
      <section class="ab-section ab-booking-section" id="${escapeHtml(sectionId)}">
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
          })}

          <div class="ab-booking-flow" data-booking-flow data-booking-id="${flowId}">
            <div class="ab-booking-stepper" role="tablist" aria-label="Étapes de réservation">
              ${(props.steps || [])
                .map(function (step, index) {
                  return `
                    <button
                      class="ab-booking-step${index === 0 ? " is-active" : ""}"
                      type="button"
                      role="tab"
                      aria-selected="${index === 0 ? "true" : "false"}"
                      data-booking-step
                      data-step-index="${index}"
                    >
                      <span class="ab-booking-step-index">${index + 1}</span>
                      <span class="ab-booking-step-copy">
                        <strong>${escapeHtml(step.label || `Étape ${index + 1}`)}</strong>
                        ${step.short ? `<small>${escapeHtml(step.short)}</small>` : ""}
                      </span>
                    </button>
                  `;
                })
                .join("")}
            </div>

            <div class="ab-booking-layout">
              <div class="ab-booking-panel-shell">
                ${(props.steps || [])
                  .map(function (step, index) {
                    return `
                      <section
                        class="ab-booking-panel${index === 0 ? " is-active" : ""}"
                        data-step-panel
                        data-step-index="${index}"
                        ${index === 0 ? "" : "hidden"}
                      >
                        <div class="ab-booking-panel-copy">
                          <span class="ab-booking-panel-kicker">Étape ${index + 1} sur ${(props.steps || []).length}</span>
                          <h3>${escapeHtml(step.title || step.label || "")}</h3>
                          ${step.description ? `<p>${escapeHtml(step.description)}</p>` : ""}
                        </div>

                        ${
                          step.review
                            ? `<div class="ab-booking-review" data-booking-review></div>`
                            : `
                              <div class="ab-booking-fields">
                                ${(step.fields || [])
                                  .map(function (field) {
                                    return renderBookingField(flowId, index, field);
                                  })
                                  .join("")}
                              </div>
                            `
                        }
                      </section>
                    `;
                  })
                  .join("")}

                <p class="ab-booking-error" data-booking-error hidden></p>
                <p class="ab-booking-feedback" data-booking-feedback hidden></p>

                <div class="ab-booking-actions-row">
                  <button class="ab-button ab-button-secondary" type="button" data-booking-prev>
                    Précédent
                  </button>
                  <div class="ab-booking-actions-main">
                    <button class="ab-button ab-button-primary" type="button" data-booking-next>
                      Suivant
                    </button>
                    <button class="ab-button ab-button-primary" type="button" data-booking-submit hidden>
                      ${escapeHtml(props.confirmLabel || "Confirmer la réservation")}
                    </button>
                  </div>
                </div>
              </div>

              <aside class="ab-booking-summary">
                <span class="ab-booking-summary-kicker">${escapeHtml(props.summaryEyebrow || "Réservation")}</span>
                <h3>${escapeHtml(props.summaryTitle || "Votre sélection")}</h3>
                <p class="ab-booking-summary-progress" data-booking-progress></p>
                <dl class="ab-booking-summary-list" data-booking-summary-list></dl>
              </aside>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function serializeBookingFlow(flow, config) {
    const values = {};
    const processedFields = new Set();

    (config.steps || []).forEach(function (step) {
      (step.fields || []).forEach(function (field) {
        if (processedFields.has(field.name)) return;
        processedFields.add(field.name);

        if (field.type === "checkboxGroup") {
          values[field.name] = Array.from(
            flow.querySelectorAll(`input[name="${field.name}"]:checked`),
          ).map(function (input) {
            return input.value;
          });
          return;
        }

        if (field.type === "choiceCards") {
          const checked = flow.querySelector(`input[name="${field.name}"]:checked`);
          values[field.name] = checked ? checked.value : "";
          return;
        }

        const input = flow.querySelector(`[name="${field.name}"]`);
        values[field.name] = input ? input.value.trim() : "";
      });
    });

    return values;
  }

  function findFieldConfig(config, fieldName) {
    for (const step of config.steps || []) {
      for (const field of step.fields || []) {
        if (field.name === fieldName) return field;
      }
    }

    return null;
  }

  function formatBookingValue(field, rawValue) {
    if (Array.isArray(rawValue)) {
      if (!rawValue.length) return "";
      if (!field || !field.options) return rawValue.join(", ");
      return rawValue
        .map(function (value) {
          const option = field.options.find(function (candidate) {
            return candidate.value === value;
          });
          return option ? option.label : value;
        })
        .join(", ");
    }

    if (!rawValue) return "";
    if (!field || !field.options) return rawValue;

    const option = field.options.find(function (candidate) {
      return candidate.value === rawValue;
    });

    return option ? option.label : rawValue;
  }

  function validateBookingStep(flow, config, stepIndex) {
    const step = (config.steps || [])[stepIndex];
    const panel = flow.querySelector(`[data-step-panel][data-step-index="${stepIndex}"]`);

    if (!step || !panel || step.review) return { valid: true, message: "" };

    for (const field of step.fields || []) {
      if (field.type === "checkboxGroup" && field.required) {
        const hasSelection = panel.querySelectorAll(`input[name="${field.name}"]:checked`).length > 0;
        if (!hasSelection) {
          return {
            valid: false,
            message: `Sélectionnez au moins une option pour “${field.label}”.`,
          };
        }
      }

      if (field.type === "choiceCards" && field.required) {
        const checked = panel.querySelector(`input[name="${field.name}"]:checked`);
        if (!checked) {
          return {
            valid: false,
            message: `Choisissez une valeur pour “${field.label}”.`,
          };
        }
      }

      if (!field.required || field.type === "checkboxGroup" || field.type === "choiceCards") {
        continue;
      }

      const input = panel.querySelector(`[name="${field.name}"]`);
      if (!input || !input.value.trim()) {
        return {
          valid: false,
          message: `Complétez le champ “${field.label}”.`,
        };
      }
    }

    return { valid: true, message: "" };
  }

  function updateBookingSummary(flow, config, stepIndex) {
    const values = serializeBookingFlow(flow, config);
    const summaryRoot = flow.querySelector("[data-booking-summary-list]");
    const progressRoot = flow.querySelector("[data-booking-progress]");
    const reviewRoot = flow.querySelector("[data-booking-review]");

    if (progressRoot) {
      progressRoot.textContent = `Étape ${stepIndex + 1} sur ${(config.steps || []).length}`;
    }

    const entries = [];
    const added = new Set();
    (config.steps || []).forEach(function (step) {
      (step.fields || []).forEach(function (field) {
        if (added.has(field.name) || field.omitSummary) return;
        added.add(field.name);

        const formatted = formatBookingValue(field, values[field.name]);
        if (!formatted) return;

        entries.push({
          label: field.summaryLabel || field.label,
          value: formatted,
        });
      });
    });

    if (summaryRoot) {
      summaryRoot.innerHTML = entries.length
        ? entries
            .map(function (entry) {
              return `<div><dt>${escapeHtml(entry.label)}</dt><dd>${escapeHtml(entry.value)}</dd></div>`;
            })
            .join("")
        : `<div><dt>Progression</dt><dd>Complétez les étapes pour voir votre récapitulatif.</dd></div>`;
    }

    if (reviewRoot) {
      reviewRoot.innerHTML = `
        <h4>Vérifiez votre demande</h4>
        <p>Voici le récapitulatif des informations saisies avant confirmation.</p>
        <dl class="ab-booking-review-list">
          ${
            entries.length
              ? entries
                  .map(function (entry) {
                    return `<div><dt>${escapeHtml(entry.label)}</dt><dd>${escapeHtml(entry.value)}</dd></div>`;
                  })
                  .join("")
              : `<div><dt>Récapitulatif</dt><dd>Aucune information disponible pour le moment.</dd></div>`
          }
        </dl>
      `;
    }
  }

  function goToBookingStep(flow, config, stepIndex) {
    const steps = Array.from(flow.querySelectorAll("[data-booking-step]"));
    const panels = Array.from(flow.querySelectorAll("[data-step-panel]"));
    const prevButton = flow.querySelector("[data-booking-prev]");
    const nextButton = flow.querySelector("[data-booking-next]");
    const submitButton = flow.querySelector("[data-booking-submit]");

    flow.dataset.currentStep = String(stepIndex);

    steps.forEach(function (stepButton, index) {
      const isActive = index === stepIndex;
      const isComplete = index < stepIndex;
      stepButton.classList.toggle("is-active", isActive);
      stepButton.classList.toggle("is-complete", isComplete);
      stepButton.setAttribute("aria-selected", isActive ? "true" : "false");
      stepButton.disabled = index > stepIndex;
    });

    panels.forEach(function (panel, index) {
      const isActive = index === stepIndex;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    if (prevButton) prevButton.hidden = stepIndex === 0;
    if (nextButton) {
      nextButton.hidden = stepIndex >= (config.steps || []).length - 1;
      nextButton.textContent =
        stepIndex === (config.steps || []).length - 2 ? "Voir le récapitulatif" : "Suivant";
    }
    if (submitButton) submitButton.hidden = stepIndex !== (config.steps || []).length - 1;

    updateBookingSummary(flow, config, stepIndex);
  }

  function initBookingFlow(flow) {
    const flowId = flow.dataset.bookingId;
    const config = bookingConfigs.get(flowId);
    if (!config) return;

    const errorRoot = flow.querySelector("[data-booking-error]");
    const feedbackRoot = flow.querySelector("[data-booking-feedback]");

    function clearMessages() {
      if (errorRoot) {
        errorRoot.hidden = true;
        errorRoot.textContent = "";
      }
      if (feedbackRoot) {
        feedbackRoot.hidden = true;
      }
    }

    flow.addEventListener("input", function () {
      clearMessages();
      updateBookingSummary(flow, config, Number(flow.dataset.currentStep || 0));
    });

    flow.querySelectorAll("[data-booking-step]").forEach(function (button) {
      button.addEventListener("click", function () {
        const targetStep = Number(button.dataset.stepIndex || 0);
        const currentStep = Number(flow.dataset.currentStep || 0);
        if (targetStep <= currentStep) {
          clearMessages();
          goToBookingStep(flow, config, targetStep);
        }
      });
    });

    const prevButton = flow.querySelector("[data-booking-prev]");
    const nextButton = flow.querySelector("[data-booking-next]");
    const submitButton = flow.querySelector("[data-booking-submit]");

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        clearMessages();
        const currentStep = Number(flow.dataset.currentStep || 0);
        goToBookingStep(flow, config, Math.max(0, currentStep - 1));
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        const currentStep = Number(flow.dataset.currentStep || 0);
        const validation = validateBookingStep(flow, config, currentStep);
        if (!validation.valid) {
          if (errorRoot) {
            errorRoot.hidden = false;
            errorRoot.textContent = validation.message;
          }
          return;
        }

        clearMessages();
        goToBookingStep(
          flow,
          config,
          Math.min((config.steps || []).length - 1, currentStep + 1),
        );
      });
    }

    if (submitButton) {
      submitButton.addEventListener("click", function () {
        clearMessages();
        if (feedbackRoot) {
          feedbackRoot.hidden = false;
          feedbackRoot.textContent =
            "Mockup validé. La réservation est prête à être connectée à l’API.";
        }
      });
    }

    goToBookingStep(flow, config, 0);
  }

  function getRentalContactStep(config) {
    return (config.steps || []).find(function (step) {
      return step.kind === "contact";
    }) || { fields: [] };
  }

  function createRentalInitialState(config) {
    const contactStep = getRentalContactStep(config);
    const contact = {};

    (contactStep.fields || []).forEach(function (field) {
      contact[field.name] = "";
    });

    return {
      bikeQuantities: Object.fromEntries(
        (config.bikeCategories || []).map(function (category) {
          return [category.key, 0];
        }),
      ),
      bikeSizes: {},
      addonQuantities: Object.fromEntries(
        (config.addonCategories || []).map(function (category) {
          return [category.key, 0];
        }),
      ),
      packageKey: "",
      pickupDate: "",
      pickupSite: "",
      notes: "",
      contact,
    };
  }

  function getRentalPackage(config, packageKey) {
    return (config.packages || []).find(function (entry) {
      return entry.key === packageKey;
    });
  }

  function getRentalSite(config, siteKey) {
    return (config.sites || []).find(function (entry) {
      return entry.key === siteKey;
    });
  }

  function getRentalReturnDate(state, config) {
    const selectedPackage = getRentalPackage(config, state.packageKey);
    if (!selectedPackage || !state.pickupDate) return "";
    return addDaysToDate(state.pickupDate, selectedPackage.returnOffsetDays || 0);
  }

  function getRentalReturnLabel(state, config) {
    const selectedPackage = getRentalPackage(config, state.packageKey);
    if (!selectedPackage) return "A définir";
    if (!state.pickupDate) return `${selectedPackage.label} sélectionné`;

    const returnDate = getRentalReturnDate(state, config);
    if (!returnDate) return "A définir";

    if (selectedPackage.returnHint) {
      return `${formatShortDate(returnDate)} · ${selectedPackage.returnHint}`;
    }

    return formatShortDate(returnDate);
  }

  function syncRentalSizeState(state, config) {
    const nextSizes = {};

    (config.bikeCategories || []).forEach(function (category) {
      const quantity = Number(state.bikeQuantities[category.key] || 0);
      const slots = Number(category.sizeSlotsPerUnit || 0);

      for (let unitIndex = 1; unitIndex <= quantity; unitIndex += 1) {
        const unitId = `${category.key}-${unitIndex}`;
        const previous = state.bikeSizes[unitId] || [];
        nextSizes[unitId] = Array.from({ length: slots }, function (_, slotIndex) {
          return previous[slotIndex] || "";
        });
      }
    });

    state.bikeSizes = nextSizes;
  }

  function getRentalSelectedBikeUnits(state, config) {
    const units = [];

    (config.bikeCategories || []).forEach(function (category) {
      const quantity = Number(state.bikeQuantities[category.key] || 0);
      for (let unitIndex = 1; unitIndex <= quantity; unitIndex += 1) {
        const unitId = `${category.key}-${unitIndex}`;
        units.push({
          category,
          unitId,
          unitIndex,
          sizes: state.bikeSizes[unitId] || [],
        });
      }
    });

    return units;
  }

  function getRentalBreakdown(state, config) {
    const selectedPackage = getRentalPackage(config, state.packageKey);
    const pickupLabel = formatShortDate(state.pickupDate);
    const returnLabel = getRentalReturnLabel(state, config);
    const lines = [];
    let bikeCount = 0;
    let peopleCount = 0;
    let total = 0;

    getRentalSelectedBikeUnits(state, config).forEach(function (unit) {
      const category = unit.category;
      const unitPrice = selectedPackage ? Number(category.prices[selectedPackage.key] || 0) : 0;
      const sizeText = unit.sizes.filter(Boolean).length
        ? unit.sizes.map(function (size) {
            return `${size} cm`;
          }).join(" / ")
        : "A définir";

      bikeCount += 1;
      peopleCount += Number(category.personCountPerUnit || category.sizeSlotsPerUnit || 1);
      total += unitPrice;

      lines.push({
        label: `${category.label}${Number(state.bikeQuantities[category.key] || 0) > 1 ? ` #${unit.unitIndex}` : ""}`,
        start: pickupLabel,
        end: returnLabel,
        duration: selectedPackage ? selectedPackage.label : "A définir",
        amount: unitPrice,
        size: sizeText,
      });
    });

    (config.addonCategories || []).forEach(function (category) {
      const quantity = Number(state.addonQuantities[category.key] || 0);
      if (!quantity) return;

      const unitPrice = selectedPackage ? Number(category.prices[selectedPackage.key] || 0) : 0;
      const lineAmount = unitPrice * quantity;
      total += lineAmount;

      lines.push({
        label: `${category.label} x${quantity}`,
        start: pickupLabel,
        end: returnLabel,
        duration: selectedPackage ? selectedPackage.label : "A définir",
        amount: lineAmount,
        size: "-",
      });
    });

    return {
      selectedPackage,
      selectedSite: getRentalSite(config, state.pickupSite),
      pickupLabel,
      returnLabel,
      lines,
      bikeCount,
      peopleCount,
      total,
    };
  }

  function renderRentalBikeSizeTable(state, config) {
    const units = getRentalSelectedBikeUnits(state, config).filter(function (unit) {
      return Number(unit.category.sizeSlotsPerUnit || 0) > 0;
    });

    if (!units.length) {
      return `
        <div class="ab-rental-empty-state">
          <p>Ajoutez au moins un vélo pour renseigner les tailles des personnes à équiper.</p>
        </div>
      `;
    }

    const rows = [];

    units.forEach(function (unit) {
      const slots = Number(unit.category.sizeSlotsPerUnit || 0);
      for (let slotIndex = 0; slotIndex < slots; slotIndex += 1) {
        const label = slots > 1
          ? `${unit.category.label} #${unit.unitIndex} · personne ${slotIndex + 1}`
          : `${unit.category.label}${Number(state.bikeQuantities[unit.category.key] || 0) > 1 ? ` #${unit.unitIndex}` : ""}`;

        rows.push(`
          <div class="ab-rental-size-row">
            <span class="ab-rental-size-row-label">${escapeHtml(label)}</span>
            <label class="ab-rental-size-input-wrap">
              <input
                class="ab-rental-size-input"
                type="number"
                min="70"
                max="220"
                step="1"
                value="${escapeHtml(unit.sizes[slotIndex] || "")}"
                data-rental-size-input
                data-unit-id="${escapeHtml(unit.unitId)}"
                data-size-slot="${slotIndex}"
                placeholder="cm"
              />
              <span>cm</span>
            </label>
          </div>
        `);
      }
    });

    return `
      <div class="ab-rental-size-table">
        <div class="ab-rental-size-table-head">
          <span>Vélo sélectionné</span>
          <span>Taille de la personne</span>
        </div>
        ${rows.join("")}
      </div>
    `;
  }

  function updateRentalViews(flow, config, stepIndex) {
    const flowId = flow.dataset.rentalId;
    const state = rentalFlowStates.get(flowId);
    if (!state) return;

    const breakdown = getRentalBreakdown(state, config);

    flow.querySelectorAll("[data-rental-qty-value]").forEach(function (output) {
      const key = output.dataset.key;
      const kind = output.dataset.kind;
      output.textContent =
        kind === "addon"
          ? String(state.addonQuantities[key] || 0)
          : String(state.bikeQuantities[key] || 0);
    });

    const sizeCount = flow.querySelector("[data-rental-size-count]");
    if (sizeCount) {
      sizeCount.textContent = `${breakdown.peopleCount} personne(s) à équiper`;
    }

    const sizeList = flow.querySelector("[data-rental-size-list]");
    if (sizeList) {
      sizeList.innerHTML = renderRentalBikeSizeTable(state, config);
    }

    const returnFields = flow.querySelectorAll("[data-rental-return-output]");
    returnFields.forEach(function (field) {
      field.value = breakdown.returnLabel;
    });

    const progressRoot = flow.querySelector("[data-rental-summary-progress]");
    if (progressRoot) {
      progressRoot.textContent = `Étape ${stepIndex + 1} sur ${(config.steps || []).length}`;
    }

    const summaryRoot = flow.querySelector("[data-rental-summary-list]");
    if (summaryRoot) {
      summaryRoot.innerHTML = `
        <div><dt>Forfait</dt><dd>${escapeHtml(breakdown.selectedPackage ? breakdown.selectedPackage.label : "A définir")}</dd></div>
        <div><dt>Départ</dt><dd>${escapeHtml(breakdown.pickupLabel)}</dd></div>
        <div><dt>Retour</dt><dd>${escapeHtml(breakdown.returnLabel)}</dd></div>
        <div><dt>Site</dt><dd>${escapeHtml(breakdown.selectedSite ? breakdown.selectedSite.label : "A définir")}</dd></div>
        <div><dt>Vélos</dt><dd>${breakdown.bikeCount}</dd></div>
        <div><dt>Personnes</dt><dd>${breakdown.peopleCount}</dd></div>
      `;
    }

    const summaryItemsRoot = flow.querySelector("[data-rental-summary-items]");
    if (summaryItemsRoot) {
      const items = [];

      (config.bikeCategories || []).forEach(function (category) {
        const quantity = Number(state.bikeQuantities[category.key] || 0);
        if (!quantity) return;
        items.push(
          `<div><span>${escapeHtml(category.label)}</span><strong>x${quantity}</strong></div>`,
        );
      });

      (config.addonCategories || []).forEach(function (category) {
        const quantity = Number(state.addonQuantities[category.key] || 0);
        if (!quantity) return;
        items.push(
          `<div><span>${escapeHtml(category.label)}</span><strong>x${quantity}</strong></div>`,
        );
      });

      summaryItemsRoot.innerHTML = items.length
        ? items.join("")
        : `<div><span>Aucune sélection</span><strong>0</strong></div>`;
    }

    const totalRoot = flow.querySelector("[data-rental-total]");
    if (totalRoot) {
      totalRoot.textContent = formatEuro(breakdown.total);
    }

    const reviewRoot = flow.querySelector("[data-rental-review]");
    if (reviewRoot) {
      reviewRoot.innerHTML = breakdown.lines.length
        ? `
          <div class="ab-rental-review-card">
            <div class="ab-rental-review-caption">
              <span>Récapitulatif de votre réservation de location</span>
            </div>
            <div class="ab-rental-review-table-wrap">
              <table class="ab-rental-review-table">
                <thead>
                  <tr>
                    <th>Vélos</th>
                    <th>Début</th>
                    <th>Fin</th>
                    <th>Temps</th>
                    <th>Prix</th>
                    <th>Taille</th>
                  </tr>
                </thead>
                <tbody>
                  ${breakdown.lines
                    .map(function (line) {
                      return `
                        <tr>
                          <td>${escapeHtml(line.label)}</td>
                          <td>${escapeHtml(line.start)}</td>
                          <td>${escapeHtml(line.end)}</td>
                          <td>${escapeHtml(line.duration)}</td>
                          <td>${escapeHtml(formatEuro(line.amount))}</td>
                          <td>${escapeHtml(line.size)}</td>
                        </tr>
                      `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
            <div class="ab-rental-review-total">
              <span>Total</span>
              <strong>${escapeHtml(formatEuro(breakdown.total))}</strong>
            </div>
          </div>
        `
        : `
          <div class="ab-rental-empty-state">
            <p>Complétez les étapes précédentes pour générer votre récapitulatif et le montant estimé.</p>
          </div>
        `;
    }
  }

  function validateRentalStep(flow, config, stepIndex) {
    const flowId = flow.dataset.rentalId;
    const state = rentalFlowStates.get(flowId);
    const step = (config.steps || [])[stepIndex];
    if (!state || !step) return { valid: true, message: "" };

    if (step.kind === "bikes") {
      const units = getRentalSelectedBikeUnits(state, config);
      if (!units.length) {
        return {
          valid: false,
          message: "Ajoutez au moins un vélo avant de continuer.",
        };
      }

      for (const unit of units) {
        for (let slotIndex = 0; slotIndex < unit.sizes.length; slotIndex += 1) {
          const value = unit.sizes[slotIndex];
          if (!String(value || "").trim()) {
            return {
              valid: false,
              message: `Renseignez la taille pour ${unit.category.label}${unit.sizes.length > 1 ? ` · personne ${slotIndex + 1}` : ""}.`,
            };
          }
        }
      }
    }

    if (step.kind === "schedule") {
      if (!state.packageKey) {
        return {
          valid: false,
          message: "Choisissez un forfait de location.",
        };
      }

      if (!state.pickupDate) {
        return {
          valid: false,
          message: "Indiquez la date de départ.",
        };
      }

      if (!state.pickupSite) {
        return {
          valid: false,
          message: "Sélectionnez un lieu de récupération.",
        };
      }
    }

    if (step.kind === "contact") {
      for (const field of step.fields || []) {
        if (!field.required) continue;
        if (!String(state.contact[field.name] || "").trim()) {
          return {
            valid: false,
            message: `Complétez le champ “${field.label}”.`,
          };
        }
      }
    }

    return { valid: true, message: "" };
  }

  function goToRentalStep(flow, config, stepIndex) {
    const steps = Array.from(flow.querySelectorAll("[data-rental-step]"));
    const panels = Array.from(flow.querySelectorAll("[data-rental-panel]"));
    const prevButton = flow.querySelector("[data-rental-prev]");
    const nextButton = flow.querySelector("[data-rental-next]");
    const submitButton = flow.querySelector("[data-rental-submit]");

    flow.dataset.currentStep = String(stepIndex);

    steps.forEach(function (stepButton, index) {
      const isActive = index === stepIndex;
      const isComplete = index < stepIndex;
      stepButton.classList.toggle("is-active", isActive);
      stepButton.classList.toggle("is-complete", isComplete);
      stepButton.setAttribute("aria-selected", isActive ? "true" : "false");
      stepButton.disabled = index > stepIndex;
    });

    panels.forEach(function (panel, index) {
      const isActive = index === stepIndex;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    if (prevButton) prevButton.hidden = stepIndex === 0;
    if (nextButton) {
      nextButton.hidden = stepIndex >= (config.steps || []).length - 1;
      nextButton.textContent =
        stepIndex === (config.steps || []).length - 2 ? "Voir le récapitulatif" : "Suivant";
    }
    if (submitButton) submitButton.hidden = stepIndex !== (config.steps || []).length - 1;

    updateRentalViews(flow, config, stepIndex);
  }

  function renderRentalCounterList(items, kind) {
    return `
      <div class="ab-rental-counter-list">
        ${items
          .map(function (item) {
            const basePrice = item.prices && item.prices["half-day"] != null
              ? formatEuro(item.prices["half-day"])
              : "";

            return `
              <div class="ab-rental-counter-row">
                <div class="ab-rental-counter-copy">
                  <strong>${escapeHtml(item.label)}</strong>
                  ${item.description ? `<small>${escapeHtml(item.description)}</small>` : ""}
                  ${basePrice ? `<em>A partir de ${escapeHtml(basePrice)}</em>` : ""}
                </div>
                <div class="ab-rental-counter-controls">
                  <button
                    type="button"
                    class="ab-rental-counter-button"
                    data-rental-qty-button
                    data-kind="${escapeHtml(kind)}"
                    data-key="${escapeHtml(item.key)}"
                    data-delta="-1"
                    aria-label="Retirer ${escapeHtml(item.label)}"
                  >
                    −
                  </button>
                  <output
                    class="ab-rental-counter-value"
                    data-rental-qty-value
                    data-kind="${escapeHtml(kind)}"
                    data-key="${escapeHtml(item.key)}"
                  >
                    0
                  </output>
                  <button
                    type="button"
                    class="ab-rental-counter-button"
                    data-rental-qty-button
                    data-kind="${escapeHtml(kind)}"
                    data-key="${escapeHtml(item.key)}"
                    data-delta="1"
                    aria-label="Ajouter ${escapeHtml(item.label)}"
                  >
                    +
                  </button>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderRentalScheduleStep(flowId, props) {
    return `
      <div class="ab-rental-package-panel">
        <span class="ab-booking-label">Choisissez votre forfait</span>
        <p class="ab-booking-help">Le tarif dépend du temps de location sélectionné.</p>
        <div class="ab-rental-package-grid">
          ${(props.packages || [])
            .map(function (item) {
              return `
                <label class="ab-rental-package-card">
                  <input
                    type="radio"
                    name="${flowId}-package"
                    value="${escapeHtml(item.key)}"
                    data-rental-package-input
                  />
                  <span class="ab-rental-package-card-ui">
                    <strong>${escapeHtml(item.label)}</strong>
                    ${item.description ? `<small>${escapeHtml(item.description)}</small>` : ""}
                  </span>
                </label>
              `;
            })
            .join("")}
        </div>
      </div>

      <div class="ab-booking-fields">
        <label class="ab-booking-field">
          <span class="ab-booking-label">Date de départ</span>
          <input class="ab-booking-input" type="date" data-rental-date-input />
        </label>
        <label class="ab-booking-field">
          <span class="ab-booking-label">Date de retour estimée</span>
          <input class="ab-booking-input" type="text" data-rental-return-output readonly value="A définir" />
        </label>
      </div>

      <div class="ab-rental-site-panel">
        <span class="ab-booking-label">Lieu de récupération</span>
        <div class="ab-rental-site-grid">
          ${(props.sites || [])
            .map(function (site) {
              return `
                <label class="ab-rental-site-card">
                  <input
                    type="radio"
                    name="${flowId}-site"
                    value="${escapeHtml(site.key)}"
                    data-rental-site-input
                  />
                  <span class="ab-rental-site-card-ui">${escapeHtml(site.label)}</span>
                </label>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  function renderRentalBookingFlowSection(props) {
    rentalFlowCount += 1;
    const flowId = `ab-rental-flow-${rentalFlowCount}`;
    const sectionId = props.id || flowId;
    rentalFlowConfigs.set(flowId, props);

    return `
      <section class="ab-section ab-rental-booking-section" id="${escapeHtml(sectionId)}">
        <div class="${containerClass(props.width)}">
          ${renderSectionIntro({
            eyebrow: props.eyebrow,
            title: props.title,
            description: props.description,
            centered: true,
          })}

          <div class="ab-booking-flow ab-rental-flow" data-rental-flow data-rental-id="${flowId}">
            <div class="ab-booking-stepper" role="tablist" aria-label="Étapes de réservation">
              ${(props.steps || [])
                .map(function (step, index) {
                  return `
                    <button
                      class="ab-booking-step${index === 0 ? " is-active" : ""}"
                      type="button"
                      role="tab"
                      aria-selected="${index === 0 ? "true" : "false"}"
                      data-rental-step
                      data-step-index="${index}"
                    >
                      <span class="ab-booking-step-index">${index + 1}</span>
                      <span class="ab-booking-step-copy">
                        <strong>${escapeHtml(step.label || `Étape ${index + 1}`)}</strong>
                        ${step.short ? `<small>${escapeHtml(step.short)}</small>` : ""}
                      </span>
                    </button>
                  `;
                })
                .join("")}
            </div>

            <div class="ab-booking-layout">
              <div class="ab-booking-panel-shell">
                ${(props.steps || [])
                  .map(function (step, index) {
                    let content = "";

                    if (step.kind === "bikes") {
                      content = `
                        <div class="ab-rental-bike-step">
                          ${renderRentalCounterList(props.bikeCategories || [], "bike")}
                          <div class="ab-rental-size-card">
                            <div class="ab-rental-size-card-head">
                              <h4>Définissez les tailles</h4>
                              <p data-rental-size-count>0 personne(s) à équiper</p>
                            </div>
                            <div data-rental-size-list></div>
                          </div>
                        </div>
                      `;
                    } else if (step.kind === "schedule") {
                      content = renderRentalScheduleStep(flowId, props);
                    } else if (step.kind === "options") {
                      content = `
                        <div class="ab-rental-options-step">
                          ${renderRentalCounterList(props.addonCategories || [], "addon")}
                          <label class="ab-booking-field ab-booking-field-full">
                            <span class="ab-booking-label">Informations complémentaires</span>
                            <textarea
                              class="ab-booking-input ab-booking-textarea"
                              rows="4"
                              placeholder="Précisez ici une demande particulière."
                              data-rental-notes
                            ></textarea>
                          </label>
                        </div>
                      `;
                    } else if (step.kind === "contact") {
                      content = `
                        <div class="ab-booking-fields">
                          ${(step.fields || [])
                            .map(function (field) {
                              return `
                                <label class="ab-booking-field">
                                  <span class="ab-booking-label">${escapeHtml(field.label || "")}</span>
                                  <input
                                    class="ab-booking-input"
                                    type="${escapeHtml(field.type || "text")}"
                                    name="${escapeHtml(field.name)}"
                                    placeholder="${escapeHtml(field.placeholder || "")}"
                                    data-rental-contact-input
                                    ${field.required ? "required" : ""}
                                  />
                                </label>
                              `;
                            })
                            .join("")}
                        </div>
                      `;
                    } else if (step.kind === "review") {
                      content = `<div class="ab-rental-review" data-rental-review></div>`;
                    }

                    return `
                      <section
                        class="ab-booking-panel${index === 0 ? " is-active" : ""}"
                        data-rental-panel
                        data-step-index="${index}"
                        ${index === 0 ? "" : "hidden"}
                      >
                        <div class="ab-booking-panel-copy">
                          <span class="ab-booking-panel-kicker">Étape ${index + 1} sur ${(props.steps || []).length}</span>
                          <h3>${escapeHtml(step.title || step.label || "")}</h3>
                          ${step.description ? `<p>${escapeHtml(step.description)}</p>` : ""}
                        </div>
                        ${content}
                      </section>
                    `;
                  })
                  .join("")}

                <p class="ab-booking-error" data-rental-error hidden></p>
                <p class="ab-booking-feedback" data-rental-feedback hidden></p>

                <div class="ab-booking-actions-row">
                  <button class="ab-button ab-button-secondary" type="button" data-rental-prev>
                    Retour
                  </button>
                  <div class="ab-booking-actions-main">
                    <button class="ab-button ab-button-primary" type="button" data-rental-next>
                      Suivant
                    </button>
                    <button class="ab-button ab-button-primary" type="button" data-rental-submit hidden>
                      ${escapeHtml(props.confirmLabel || "Réserver")}
                    </button>
                  </div>
                </div>
              </div>

              <aside class="ab-booking-summary ab-rental-summary">
                <span class="ab-booking-summary-kicker">${escapeHtml(props.summaryEyebrow || "Réservation")}</span>
                <h3>${escapeHtml(props.summaryTitle || "Votre réservation")}</h3>
                <p class="ab-booking-summary-progress" data-rental-summary-progress></p>
                <dl class="ab-booking-summary-list" data-rental-summary-list></dl>
                <div class="ab-rental-summary-items" data-rental-summary-items></div>
                <div class="ab-rental-summary-total">
                  <span>Total estimé</span>
                  <strong data-rental-total>0 €</strong>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function initRentalFlow(flow) {
    const flowId = flow.dataset.rentalId;
    const config = rentalFlowConfigs.get(flowId);
    if (!config) return;

    const state = createRentalInitialState(config);
    syncRentalSizeState(state, config);
    rentalFlowStates.set(flowId, state);

    const errorRoot = flow.querySelector("[data-rental-error]");
    const feedbackRoot = flow.querySelector("[data-rental-feedback]");

    function clearMessages() {
      if (errorRoot) {
        errorRoot.hidden = true;
        errorRoot.textContent = "";
      }
      if (feedbackRoot) {
        feedbackRoot.hidden = true;
        feedbackRoot.textContent = "";
      }
    }

    flow.addEventListener("click", function (event) {
      const quantityButton = event.target.closest("[data-rental-qty-button]");
      if (quantityButton) {
        clearMessages();
        const kind = quantityButton.dataset.kind;
        const key = quantityButton.dataset.key;
        const delta = Number(quantityButton.dataset.delta || 0);
        const collection = kind === "addon" ? state.addonQuantities : state.bikeQuantities;
        const currentValue = Number(collection[key] || 0);
        collection[key] = Math.max(0, Math.min(8, currentValue + delta));
        if (kind === "bike") {
          syncRentalSizeState(state, config);
        }
        updateRentalViews(flow, config, Number(flow.dataset.currentStep || 0));
        return;
      }

      const stepButton = event.target.closest("[data-rental-step]");
      if (stepButton) {
        const targetStep = Number(stepButton.dataset.stepIndex || 0);
        const currentStep = Number(flow.dataset.currentStep || 0);
        if (targetStep <= currentStep) {
          clearMessages();
          goToRentalStep(flow, config, targetStep);
        }
        return;
      }
    });

    flow.addEventListener("input", function (event) {
      const target = event.target;
      clearMessages();

      if (target.matches("[data-rental-size-input]")) {
        const unitId = target.dataset.unitId;
        const slotIndex = Number(target.dataset.sizeSlot || 0);
        if (!state.bikeSizes[unitId]) state.bikeSizes[unitId] = [];
        state.bikeSizes[unitId][slotIndex] = target.value.trim();
      } else if (target.matches("[data-rental-package-input]")) {
        state.packageKey = target.value;
      } else if (target.matches("[data-rental-date-input]")) {
        state.pickupDate = target.value;
      } else if (target.matches("[data-rental-site-input]")) {
        state.pickupSite = target.value;
      } else if (target.matches("[data-rental-notes]")) {
        state.notes = target.value;
      } else if (target.matches("[data-rental-contact-input]")) {
        state.contact[target.name] = target.value.trim();
      }

      updateRentalViews(flow, config, Number(flow.dataset.currentStep || 0));
    });

    const prevButton = flow.querySelector("[data-rental-prev]");
    const nextButton = flow.querySelector("[data-rental-next]");
    const submitButton = flow.querySelector("[data-rental-submit]");

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        clearMessages();
        const currentStep = Number(flow.dataset.currentStep || 0);
        goToRentalStep(flow, config, Math.max(0, currentStep - 1));
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        const currentStep = Number(flow.dataset.currentStep || 0);
        const validation = validateRentalStep(flow, config, currentStep);
        if (!validation.valid) {
          if (errorRoot) {
            errorRoot.hidden = false;
            errorRoot.textContent = validation.message;
          }
          return;
        }

        clearMessages();
        goToRentalStep(
          flow,
          config,
          Math.min((config.steps || []).length - 1, currentStep + 1),
        );
      });
    }

    if (submitButton) {
      submitButton.addEventListener("click", function () {
        clearMessages();
        if (feedbackRoot) {
          feedbackRoot.hidden = false;
          feedbackRoot.textContent =
            "Mockup validé. Le récapitulatif et le montant sont prêts à être connectés au moteur de réservation.";
        }
      });
    }

    goToRentalStep(flow, config, 0);
  }

  function initFaqList(list) {
    list.querySelectorAll("[data-faq-trigger]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        if (!panel) return;

        trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
        panel.hidden = expanded;
      });
    });
  }

  function hydrateDynamicSections(target) {
    target.querySelectorAll("[data-booking-flow]").forEach(initBookingFlow);
    target.querySelectorAll("[data-rental-flow]").forEach(initRentalFlow);
    target.querySelectorAll("[data-faq-list]").forEach(initFaqList);
  }

  const renderers = {
    pageHeader: renderPageHeader,
    centeredHero: renderCenteredHero,
    mediaHero: renderMediaHero,
    detailHero: renderDetailHeroSection,
    services: renderServicesSection,
    collectionSpotlight: renderCollectionSpotlightSection,
    testimonials: renderTestimonialsSection,
    gallery: renderGallerySection,
    detailGallery: renderDetailGallerySection,
    stats: renderStatsSection,
    timeline: renderTimelineSection,
    splitFeature: renderSplitFeatureSection,
    contactSites: renderContactSitesSection,
    cta: renderCtaSection,
    featureCards: renderFeatureCardsSection,
    pricingTable: renderPricingTableSection,
    infoSplit: renderInfoSplitSection,
    faq: renderFaqSection,
    faqSplit: renderFaqSplitSection,
    detailProcess: renderDetailProcessSection,
    bikeShowcase: renderBikeShowcaseSection,
    detailShowcaseCta: renderDetailShowcaseCtaSection,
    bookingFlow: renderBookingFlowSection,
    rentalBookingFlow: renderRentalBookingFlowSection,
  };

  ui.renderPage = function renderPage(target, sections) {
    if (!target) return;

    target.innerHTML = (sections || [])
      .map(function (section) {
        const renderer = renderers[section.type];
        return renderer ? renderer(section.props || {}) : "";
      })
      .join("");

    hydrateDynamicSections(target);
  };

  ui.components = renderers;
  ui.hydrateDynamicSections = hydrateDynamicSections;
})();
