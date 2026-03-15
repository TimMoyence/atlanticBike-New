(function () {
  const ROUTE_CONFIG = {
    accueil: "accueil/index.html",
    "a-propos": "a-propos/index.html",
    services: "services/index.html",
    flotte: "Vélos/index.html",
    location: "location-vélo/index.html",
    "vtt-vtc": "Detail-VTT-VTC/index.html",
    electric: "vélos-electriques/index.html",
    kids: "vélos-enfants/index.html",
    tandem: "vélos tandem/index.html",
    occasion: "vélos-occasions/index.html",
    "detail-vae": "detail-VAE/index.html",
    "detail-used": "detail-vélos-occasions/index.html",
    maps: "Cartes/index.html",
    "maps-download": "visibilité-cartes/index.html",
    contact: "contact/index.html",
    repair: "réparation-vélo/index.html",
    reservation: "reservation/index.html",
    connexion: "connexion/index.html",
    "admin-pages": "admin-pages/index.html",
    "admin-location": "Admin-location/index.html",
    "admin-reparation": "Admin-reparation/index.html",
    "admin-bike": "Ajout-vélo/index.html",
  };

  const FLEET_PAGE_KEYS = [
    "flotte",
    "location",
    "vtt-vtc",
    "electric",
    "kids",
    "tandem",
    "occasion",
    "detail-vae",
    "detail-used",
  ];

  const SERVICE_PAGE_KEYS = [
    "services",
    "maps",
    "maps-download",
    "contact",
    "repair",
  ];

  let navbarCount = 0;

  function createPageLinks(options = {}) {
    const basePath = options.basePath || "..";

    return Object.fromEntries(
      Object.entries(ROUTE_CONFIG).map(function ([key, path]) {
        return [key, `${basePath}/${path}`];
      }),
    );
  }

  function isActivePage(currentPage, pageKey) {
    const pageKeys = Array.isArray(pageKey) ? pageKey : [pageKey];
    return pageKeys.includes(currentPage);
  }

  function createPageAnchor(options) {
    const classes = [options.className, isActivePage(options.currentPage, options.pageKey) ? "is-active" : ""]
      .filter(Boolean)
      .join(" ");

    return `<a${classes ? ` class="${classes}"` : ""} href="${options.href}">${options.label}</a>`;
  }

  function createMenuItem(options) {
    const classes = ["ab-menu-item", isActivePage(options.currentPage, options.pageKey) ? "is-active" : ""]
      .filter(Boolean)
      .join(" ");

    return `
      <a class="${classes}" href="${options.href}">
        <img src="${options.icon}" alt="" aria-hidden="true" />
        <span>
          <strong>${options.title}</strong>
          <small>${options.description}</small>
        </span>
      </a>
    `;
  }

  function createNavbarMarkup(options) {
    navbarCount += 1;

    const assetBase = options.assetBase || "../Navbar/design/Assets";
    const currentPage = options.currentPage || "";
    const pageLinks = createPageLinks(options);
    const ids = {
      desktopToggle: `ab-mega-menu-toggle-${navbarCount}`,
      mobileToggle: `ab-mobile-menu-toggle-${navbarCount}`,
      megaMenu: `ab-mega-menu-${navbarCount}`,
      mobileMenu: `ab-mobile-menu-${navbarCount}`,
    };

    function asset(name) {
      return `${assetBase}/${name}`;
    }

    return `
      <header class="ab-navbar-shell" data-navbar>
        <input class="ab-navbar-state" type="checkbox" id="${ids.desktopToggle}" aria-hidden="true" />
        <input class="ab-mobile-navbar-state" type="checkbox" id="${ids.mobileToggle}" aria-hidden="true" />

        <div class="ab-navbar-row">
          <a class="ab-brand" href="${pageLinks.accueil}" aria-label="AtlanticBike">
            <img src="${asset("logo atlantic 1.png")}" alt="AtlanticBike Rent & Repair" />
          </a>

          <nav class="ab-primary-nav" aria-label="Navigation principale">
            ${createPageAnchor({
              href: pageLinks.accueil,
              label: "Accueil",
              currentPage,
              pageKey: "accueil",
            })}
            ${createPageAnchor({
              href: pageLinks.flotte,
              label: "Flotte",
              currentPage,
              pageKey: FLEET_PAGE_KEYS,
            })}
            ${createPageAnchor({
              href: pageLinks.services,
              label: "Services",
              currentPage,
              pageKey: SERVICE_PAGE_KEYS,
            })}
            ${createPageAnchor({
              href: pageLinks.reservation,
              label: "Réservation",
              currentPage,
              pageKey: "reservation",
            })}
            <label class="ab-plus-trigger" for="${ids.desktopToggle}" aria-controls="${ids.megaMenu}">
              <span>Plus</span>
              <svg viewBox="0 0 12 8" aria-hidden="true">
                <path d="M1 1.5 6 6.5 11 1.5"></path>
              </svg>
            </label>
          </nav>

          <label class="ab-mobile-trigger" for="${ids.mobileToggle}" aria-controls="${ids.mobileMenu}" aria-label="Ouvrir le menu mobile">
            <img class="ab-mobile-icon ab-mobile-icon-burger" src="${asset("burger-menu.svg")}" alt="" aria-hidden="true" />
            <img class="ab-mobile-icon ab-mobile-icon-close" src="${asset("close.svg")}" alt="" aria-hidden="true" />
          </label>
        </div>

        <div class="ab-mega-menu" id="${ids.megaMenu}">
          <div class="ab-mega-primary">
            <section class="ab-mega-column">
              <h2>Pages</h2>
              ${createMenuItem({
                href: pageLinks.accueil,
                icon: asset("explore.svg"),
                title: "Accueil",
                description: "Point d'entrée de la démo et parcours client AtlanticBike",
                currentPage,
                pageKey: "accueil",
              })}
              ${createMenuItem({
                href: pageLinks["a-propos"],
                icon: asset("details.svg"),
                title: "A propos",
                description: "Histoire, sites et promesse de marque AtlanticBike",
                currentPage,
                pageKey: "a-propos",
              })}
              ${createMenuItem({
                href: pageLinks.services,
                icon: asset("contact_support.svg"),
                title: "Services",
                description: "Location, réparation, cartes et accompagnement client",
                currentPage,
                pageKey: SERVICE_PAGE_KEYS,
              })}
              ${createMenuItem({
                href: pageLinks.reservation,
                icon: asset("two_wheeler.svg"),
                title: "Réservation",
                description: "Flow complet de réservation avec calcul et options",
                currentPage,
                pageKey: "reservation",
              })}
            </section>

            <section class="ab-mega-column">
              <h2>Gammes</h2>
              ${createMenuItem({
                href: pageLinks.flotte,
                icon: asset("gite.svg"),
                title: "Flotte complète",
                description: "Hub des catégories AtlanticBike pour orienter la démo client",
                currentPage,
                pageKey: FLEET_PAGE_KEYS,
              })}
              ${createMenuItem({
                href: pageLinks["vtt-vtc"],
                icon: asset("directions.svg"),
                title: "VTT / VTC",
                description: "Détail de gamme pour les sorties piste, forêt et balades",
                currentPage,
                pageKey: "vtt-vtc",
              })}
              ${createMenuItem({
                href: pageLinks.electric,
                icon: asset("location_on.svg"),
                title: "Vélos électriques",
                description: "Listing de modèles et passerelle vers la fiche produit VAE",
                currentPage,
                pageKey: ["electric", "detail-vae"],
              })}
              ${createMenuItem({
                href: pageLinks.occasion,
                icon: asset("conditions.svg"),
                title: "Occasion",
                description: "Listing occasion et fiche détaillée de vélo contrôlé",
                currentPage,
                pageKey: ["occasion", "detail-used"],
              })}
            </section>

            <section class="ab-mega-column">
              <h2>Pratique</h2>
              ${createMenuItem({
                href: pageLinks.location,
                icon: asset("accessible.svg"),
                title: "Location vélo",
                description: "Page service avec catégories, forfaits et points de retrait",
                currentPage,
                pageKey: "location",
              })}
              ${createMenuItem({
                href: pageLinks.maps,
                icon: asset("location_on.svg"),
                title: "Cartes & itinéraires",
                description: "Carte principale, parcours conseillés et téléchargement du plan",
                currentPage,
                pageKey: ["maps", "maps-download"],
              })}
              ${createMenuItem({
                href: pageLinks.contact,
                icon: asset("contact_support.svg"),
                title: "Contact",
                description: "Coordonnées, sites AtlanticBike et accès rapide à la réservation",
                currentPage,
                pageKey: "contact",
              })}
              ${createMenuItem({
                href: pageLinks.repair,
                icon: asset("details.svg"),
                title: "Réparation",
                description: "Atelier, prestations, prise en charge et contact support",
                currentPage,
                pageKey: "repair",
              })}
            </section>
          </div>

          <aside class="ab-mega-secondary">
            <h2>Parcours conseillé</h2>
            <p>Commencez par la home, explorez la flotte, puis terminez par la réservation pour une démo complète.</p>
            <a href="${pageLinks.flotte}">Voir la flotte complète</a>
            <a href="${pageLinks.maps}">Ouvrir les cartes</a>
            <a href="${pageLinks.reservation}">Commencer une réservation</a>
          </aside>
        </div>

        <div class="ab-mobile-menu" id="${ids.mobileMenu}">
          <div class="ab-mobile-menu-head">
            <h2>Menu</h2>
            <label class="ab-mobile-close" for="${ids.mobileToggle}" aria-label="Fermer le menu">
              <img src="${asset("close.svg")}" alt="" aria-hidden="true" />
            </label>
          </div>

          <nav class="ab-mobile-primary-nav" aria-label="Navigation mobile">
            ${createPageAnchor({
              href: pageLinks.accueil,
              label: "Accueil",
              currentPage,
              pageKey: "accueil",
            })}
            ${createPageAnchor({
              href: pageLinks.flotte,
              label: "Flotte",
              currentPage,
              pageKey: FLEET_PAGE_KEYS,
            })}
            ${createPageAnchor({
              href: pageLinks.services,
              label: "Services",
              currentPage,
              pageKey: SERVICE_PAGE_KEYS,
            })}
            ${createPageAnchor({
              href: pageLinks.reservation,
              label: "Réservation",
              currentPage,
              pageKey: "reservation",
            })}
          </nav>

          <div class="ab-mobile-menu-groups">
            <section class="ab-mobile-group">
              <h3>Pages</h3>
              ${createMenuItem({
                href: pageLinks["a-propos"],
                icon: asset("details.svg"),
                title: "A propos",
                description: "Histoire, sites et témoignages",
                currentPage,
                pageKey: "a-propos",
              })}
              ${createMenuItem({
                href: pageLinks.location,
                icon: asset("two_wheeler.svg"),
                title: "Location vélo",
                description: "Choisir une catégorie et accéder aux forfaits",
                currentPage,
                pageKey: "location",
              })}
            </section>

            <section class="ab-mobile-group">
              <h3>Gammes</h3>
              ${createMenuItem({
                href: pageLinks["vtt-vtc"],
                icon: asset("directions.svg"),
                title: "VTT / VTC",
                description: "Page détail de la gamme tout-terrain et balade",
                currentPage,
                pageKey: "vtt-vtc",
              })}
              ${createMenuItem({
                href: pageLinks.electric,
                icon: asset("location_on.svg"),
                title: "Vélos électriques",
                description: "Listing modèles et fiche produit VAE",
                currentPage,
                pageKey: ["electric", "detail-vae"],
              })}
              ${createMenuItem({
                href: pageLinks.occasion,
                icon: asset("conditions.svg"),
                title: "Occasion",
                description: "Listing occasion et détail de vélo reconditionné",
                currentPage,
                pageKey: ["occasion", "detail-used"],
              })}
            </section>

            <section class="ab-mobile-group">
              <h3>Pratique</h3>
              ${createMenuItem({
                href: pageLinks.maps,
                icon: asset("location_on.svg"),
                title: "Cartes",
                description: "Carte principale, plan téléchargeable et itinéraires",
                currentPage,
                pageKey: ["maps", "maps-download"],
              })}
              ${createMenuItem({
                href: pageLinks.contact,
                icon: asset("contact_support.svg"),
                title: "Contact",
                description: "Coordonnées, sites et support AtlanticBike",
                currentPage,
                pageKey: "contact",
              })}
              ${createMenuItem({
                href: pageLinks.repair,
                icon: asset("details.svg"),
                title: "Réparation",
                description: "Atelier, forfaits et prise en charge",
                currentPage,
                pageKey: "repair",
              })}
            </section>

            <section class="ab-mobile-group">
              <h3>Démo</h3>
              <a class="ab-mobile-inline-link" href="${pageLinks.reservation}">Lancer une réservation</a>
              <a class="ab-mobile-inline-link" href="${pageLinks["maps-download"]}">Télécharger le plan</a>
            </section>
          </div>
        </div>
      </header>
    `;
  }

  function createFooterMarkup(options = {}) {
    const assetBase = options.assetBase || "../Navbar/design/Assets";
    const currentPage = options.currentPage || "";
    const pageLinks = createPageLinks(options);

    function asset(name) {
      return `${assetBase}/${name}`;
    }

    return `
      <footer class="ab-footer" aria-label="Pied de page">
        <div class="ab-footer-top">
          <div class="ab-footer-brand">
            <a class="ab-footer-logo" href="${pageLinks.accueil}" aria-label="AtlanticBike">
              <img src="${asset("logo atlantic 1.png")}" alt="AtlanticBike Rent & Repair" />
            </a>

            <div class="ab-footer-block">
              <h3>Adresse</h3>
              <p>111 avenue de Maubuisson, 33121 Carcans Maubuisson</p>
            </div>

            <div class="ab-footer-block">
              <h3>Contact</h3>
              <a href="tel:+33556032233">+33 5 56 03 22 33</a>
              <a href="mailto:contact@atlanticbike.fr">contact@atlanticbike.fr</a>
            </div>

            <div class="ab-footer-socials" aria-label="Accès rapides AtlanticBike">
              <a class="ab-footer-social-link" href="${pageLinks.contact}#contact-support-title" aria-label="Contacter AtlanticBike">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.2-1.5 1.5-1.5h1.8V4.2c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v2H7v3.2h2.9V22h3.6Z"></path>
                </svg>
              </a>
              <a class="ab-footer-social-link" href="${pageLinks.maps}#map-main-title" aria-label="Voir les cartes AtlanticBike">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm0 1.8A3 3 0 0 0 4.8 7.8v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8Zm8.9 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.4A4.6 4.6 0 1 1 7.4 12 4.6 4.6 0 0 1 12 7.4Zm0 1.8A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Z"></path>
                </svg>
              </a>
              <a class="ab-footer-social-link" href="${pageLinks.reservation}#reservation-flow" aria-label="Réserver un vélo">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 4h3.9l4.3 5.9L17.2 4H20l-6.4 7.2L20.4 20h-3.9l-4.7-6.4L6.2 20H3.4l6.8-7.7L4 4Z"></path>
                </svg>
              </a>
              <a class="ab-footer-social-link" href="${pageLinks["a-propos"]}#about-sites" aria-label="Découvrir les sites AtlanticBike">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5.7 8.4A1.9 1.9 0 1 1 5.6 4.6a1.9 1.9 0 0 1 .1 3.8ZM4 9.9h3.3V20H4V9.9Zm5.2 0h3.2v1.4h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5V20h-3.3v-4.5c0-1.1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V20H9.2V9.9Z"></path>
                </svg>
              </a>
              <a class="ab-footer-social-link" href="${pageLinks.services}#services-cta-title" aria-label="Découvrir les services AtlanticBike">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 8.2a2.8 2.8 0 0 0-2-2C17.2 5.7 12 5.7 12 5.7s-5.2 0-7 .5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.5 12 29 29 0 0 0 3 15.8a2.8 2.8 0 0 0 2 2c1.8.5 7 .5 7 .5s5.2 0 7-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-3.8 29 29 0 0 0-.5-3.8ZM10.2 15.2V8.8l5.2 3.2-5.2 3.2Z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div class="ab-footer-links">
            <div class="ab-footer-links-column">
              <h3>Découvrir</h3>
              ${createPageAnchor({
                href: pageLinks.accueil,
                label: "Accueil",
                currentPage,
                pageKey: "accueil",
              })}
              ${createPageAnchor({
                href: pageLinks["a-propos"],
                label: "A propos",
                currentPage,
                pageKey: "a-propos",
              })}
              ${createPageAnchor({
                href: pageLinks.services,
                label: "Services",
                currentPage,
                pageKey: SERVICE_PAGE_KEYS,
              })}
              ${createPageAnchor({
                href: pageLinks.flotte,
                label: "Flotte",
                currentPage,
                pageKey: FLEET_PAGE_KEYS,
              })}
              ${createPageAnchor({
                href: pageLinks.reservation,
                label: "Réservation",
                currentPage,
                pageKey: "reservation",
              })}
            </div>

            <div class="ab-footer-links-column">
              <h3>Gammes</h3>
              ${createPageAnchor({
                href: pageLinks["vtt-vtc"],
                label: "VTT / VTC",
                currentPage,
                pageKey: "vtt-vtc",
              })}
              ${createPageAnchor({
                href: pageLinks.electric,
                label: "Vélos électriques",
                currentPage,
                pageKey: ["electric", "detail-vae"],
              })}
              ${createPageAnchor({
                href: pageLinks.kids,
                label: "Vélos enfants",
                currentPage,
                pageKey: "kids",
              })}
              ${createPageAnchor({
                href: pageLinks.tandem,
                label: "Tandem",
                currentPage,
                pageKey: "tandem",
              })}
              ${createPageAnchor({
                href: pageLinks.occasion,
                label: "Occasion",
                currentPage,
                pageKey: ["occasion", "detail-used"],
              })}
            </div>

            <div class="ab-footer-links-column">
              <h3>Pratique</h3>
              ${createPageAnchor({
                href: pageLinks.maps,
                label: "Cartes",
                currentPage,
                pageKey: "maps",
              })}
              ${createPageAnchor({
                href: pageLinks["maps-download"],
                label: "Télécharger le plan",
                currentPage,
                pageKey: "maps-download",
              })}
              ${createPageAnchor({
                href: pageLinks.contact,
                label: "Contact",
                currentPage,
                pageKey: "contact",
              })}
              ${createPageAnchor({
                href: pageLinks.repair,
                label: "Réparation",
                currentPage,
                pageKey: "repair",
              })}
              <a href="${pageLinks.connexion}">Connexion admin</a>
            </div>
          </div>
        </div>

        <div class="ab-footer-divider" aria-hidden="true"></div>

        <div class="ab-footer-bottom">
          <p>© 2026 AtlanticBike. Site de démonstration statique prêt pour GitHub Pages.</p>
          <div class="ab-footer-legal">
            <a href="${pageLinks.contact}#contact-support-title">Support</a>
            <a href="${pageLinks.maps}#map-main-title">Carte principale</a>
            <a href="${pageLinks.connexion}">Connexion admin</a>
          </div>
        </div>
      </footer>
    `;
  }

  window.AtlanticBikeUI = {
    getPageLinks(options = {}) {
      return createPageLinks(options);
    },
    renderNavbar(target, options = {}) {
      if (!target) return;
      target.innerHTML = createNavbarMarkup(options);
    },
    renderFooter(target, options = {}) {
      if (!target) return;
      target.innerHTML = createFooterMarkup(options);
    },
  };
})();
