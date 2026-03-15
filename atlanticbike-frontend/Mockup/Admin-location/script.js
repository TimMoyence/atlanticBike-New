window.AtlanticBikeUI.renderNavbar(
  document.querySelector('[data-navbar-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'admin-location',
  },
);

const fleet = [
  {
    id: 'VTC-001',
    name: 'VTC Riverside 500',
    category: 'VTC',
    priceHalf: '18€',
    priceDay: '29€',
    status: 'disponible',
    location: 'Magasin',
    note: 'RAS',
  },
  {
    id: 'VAE-004',
    name: 'VTC Électrique Cube',
    category: 'VAE',
    priceHalf: '29€',
    priceDay: '45€',
    status: 'location',
    location: 'En sortie',
    note: 'Retour prévu 18:00',
  },
  {
    id: 'KID-003',
    name: 'Vélo enfant 20"',
    category: 'Enfant',
    priceHalf: '10€',
    priceDay: '16€',
    status: 'controle',
    location: 'Atelier',
    note: 'Frein arrière à vérifier',
  },
  {
    id: 'CITY-007',
    name: 'Vélo ville Elops',
    category: 'Ville',
    priceHalf: '15€',
    priceDay: '24€',
    status: 'occasion',
    location: 'Showroom',
    note: 'À vendre',
  },
  {
    id: 'VTC-011',
    name: 'VTC Riverside Touring',
    category: 'VTC',
    priceHalf: '19€',
    priceDay: '31€',
    status: 'prepare',
    location: 'Magasin',
    note: 'Préparation demain matin',
  },
];

const bookings = [
  {
    client: 'Marie Dupont',
    bike: 'VTC Riverside 500',
    phone: '06 00 00 00 00',
    email: 'marie@email.fr',
    start: '14/07 • 09:00',
    end: '16/07 • 18:00',
    total: '58€',
    status: 'validation',
  },
  {
    client: 'Nicolas Martin',
    bike: 'VTC Électrique Cube',
    phone: '06 11 11 11 11',
    email: 'nicolas@email.fr',
    start: '15/07 • 10:00',
    end: '15/07 • 19:00',
    total: '42€',
    status: 'preparation',
  },
  {
    client: 'Thomas Leroy',
    bike: 'Vélo ville Elops',
    phone: '06 22 22 22 22',
    email: 'thomas@email.fr',
    start: '12/07 • 09:30',
    end: '15/07 • 17:30',
    total: '64€',
    status: 'encours',
  },
  {
    client: 'Julie Bernard',
    bike: 'Vélo enfant 20"',
    phone: '06 33 33 33 33',
    email: 'julie@email.fr',
    start: '13/07 • 11:00',
    end: '14/07 • 16:00',
    total: '18€',
    status: 'retour',
  },
];

function statusLabel(status) {
  return (
    {
      disponible: 'Disponible',
      location: 'En location',
      controle: 'Retour à contrôler',
      prepare: 'À préparer',
      occasion: 'Occasion',
      validation: 'À valider',
      preparation: 'À préparer',
      encours: 'En cours',
      retour: 'Retour à contrôler',
    }[status] || status
  );
}

function statusClass(status) {
  return `is-${status}`;
}

function renderFleetRows(items) {
  return items
    .map(
      (item) => `
        <tr>
          <td>
            <div class="ab-admin-rental-table__main-cell">
              <strong>${item.name}</strong>
              <span>${item.id}</span>
            </div>
          </td>
          <td>${item.category}</td>
          <td>${item.priceHalf}</td>
          <td>${item.priceDay}</td>
          <td><span class="ab-admin-rental-pill ${statusClass(item.status)}">${statusLabel(item.status)}</span></td>
          <td>${item.location}</td>
          <td>${item.note}</td>
          <td>
            <div class="ab-admin-rental-table__actions">
              <button class="ab-admin-rental-button ab-admin-rental-button--ghost" type="button">Éditer</button>
              <button class="ab-admin-rental-button ab-admin-rental-button--ghost" type="button">Détail</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join('');
}

function renderBookingCards(items, targetStatus, title, desc) {
  const filtered = items.filter((item) => item.status === targetStatus);

  return `
    <article class="ab-admin-rental-lane">
      <div class="ab-admin-rental-lane__header">
        <div>
          <h3 class="ab-admin-rental-lane__title">${title}</h3>
          <p class="ab-admin-rental-lane__text">${desc}</p>
        </div>
        <span class="ab-admin-rental-lane__count">${filtered.length}</span>
      </div>
      <div class="ab-admin-rental-lane__cards">
        ${filtered
          .map(
            (booking) => `
              <article class="ab-admin-rental-booking-card">
                <div class="ab-admin-rental-booking-card__top">
                  <div>
                    <p class="ab-admin-rental-booking-card__client">${booking.client}</p>
                    <p class="ab-admin-rental-booking-card__meta">${booking.bike}</p>
                  </div>
                  <span class="ab-admin-rental-pill ${statusClass(booking.status)}">${statusLabel(booking.status)}</span>
                </div>

                <div class="ab-admin-rental-booking-card__infos">
                  <div><span>Tél.</span><strong>${booking.phone}</strong></div>
                  <div><span>Email</span><strong>${booking.email}</strong></div>
                  <div><span>Début</span><strong>${booking.start}</strong></div>
                  <div><span>Fin</span><strong>${booking.end}</strong></div>
                  <div><span>Total</span><strong>${booking.total}</strong></div>
                </div>

                <div class="ab-admin-rental-booking-card__actions">
                  <button class="ab-admin-rental-button ab-admin-rental-button--primary" type="button">Traiter</button>
                  <button class="ab-admin-rental-button ab-admin-rental-button--ghost" type="button">Voir</button>
                </div>
              </article>
            `,
          )
          .join('')}
      </div>
    </article>
  `;
}

const pageRoot = document.querySelector('[data-page-root]');

if (pageRoot) {
  pageRoot.innerHTML = `
    <section class="ab-admin-rental-hero" aria-labelledby="admin-rental-hero-title">
      <div class="ab-admin-rental-container ab-admin-rental-hero__inner">
        <p class="ab-admin-rental-hero__eyebrow">Admin location</p>
        <h1 id="admin-rental-hero-title" class="ab-admin-rental-hero__title">
          Centre de pilotage de la flotte location
        </h1>
        <p class="ab-admin-rental-hero__text">
          Gérez les vélos en location, les tarifs, les statuts de retour, les réservations
          et la préparation opérationnelle depuis une seule interface premium.
        </p>
        <div class="ab-admin-rental-hero__actions">
          <a class="ab-admin-rental-button ab-admin-rental-button--primary" href="#admin-rental-dashboard-title">
            Ouvrir le dashboard
          </a>
          <a class="ab-admin-rental-button ab-admin-rental-button--secondary" href="#admin-rental-bookings-title">
            Voir les réservations
          </a>
        </div>
      </div>
    </section>

    <section class="ab-admin-rental-kpis" aria-labelledby="admin-rental-dashboard-title">
      <div class="ab-admin-rental-container">
        <div class="ab-admin-rental-kpis__grid">
          <article class="ab-admin-rental-kpi-card">
            <span class="ab-admin-rental-kpi-card__label">Flotte totale</span>
            <strong class="ab-admin-rental-kpi-card__value">48</strong>
            <span class="ab-admin-rental-kpi-card__meta">Tous vélos confondus</span>
          </article>
          <article class="ab-admin-rental-kpi-card">
            <span class="ab-admin-rental-kpi-card__label">Disponibles</span>
            <strong class="ab-admin-rental-kpi-card__value">19</strong>
            <span class="ab-admin-rental-kpi-card__meta">Prêts à louer</span>
          </article>
          <article class="ab-admin-rental-kpi-card">
            <span class="ab-admin-rental-kpi-card__label">En location</span>
            <strong class="ab-admin-rental-kpi-card__value">21</strong>
            <span class="ab-admin-rental-kpi-card__meta">Sorties en cours</span>
          </article>
          <article class="ab-admin-rental-kpi-card">
            <span class="ab-admin-rental-kpi-card__label">À contrôler</span>
            <strong class="ab-admin-rental-kpi-card__value">8</strong>
            <span class="ab-admin-rental-kpi-card__meta">Retours / maintenance</span>
          </article>
        </div>
      </div>
    </section>

    <section class="ab-admin-rental-dashboard" aria-labelledby="admin-rental-dashboard-title">
      <div class="ab-admin-rental-container ab-admin-rental-dashboard__grid">
        <div class="ab-admin-rental-main">
          <div class="ab-admin-rental-section-heading ab-admin-rental-section-heading--split">
            <div>
              <p class="ab-admin-rental-section-heading__eyebrow">Pilotage</p>
              <h2 id="admin-rental-dashboard-title" class="ab-admin-rental-section-heading__title">
                Agir vite sur la flotte, les prix et les retours
              </h2>
            </div>
            <p class="ab-admin-rental-section-heading__text">
              Les actions les plus critiques sont regroupées ici pour accélérer l’exploitation
              quotidienne et la mise à jour du site.
            </p>
          </div>

          <div class="ab-admin-rental-main__grid">
            <article class="ab-admin-rental-panel ab-admin-rental-panel--wide">
              <div class="ab-admin-rental-panel__header">
                <div>
                  <p class="ab-admin-rental-panel__eyebrow">Action rapide</p>
                  <h3 class="ab-admin-rental-panel__title">Modifier l’état d’un vélo</h3>
                </div>
                <span class="ab-admin-rental-badge">Temps réel</span>
              </div>

              <form class="ab-admin-rental-form" aria-label="Modifier l'état d'un vélo">
                <div class="ab-admin-rental-form__grid ab-admin-rental-form__grid--three">
                  <label class="ab-admin-rental-field">
                    <span class="ab-admin-rental-field__label">Vélo</span>
                    <select class="ab-admin-rental-field__select">
                      <option>VTC Riverside 500</option>
                      <option>VTC Électrique Cube</option>
                      <option>Vélo enfant 20"</option>
                      <option>Vélo ville Elops</option>
                    </select>
                  </label>

                  <label class="ab-admin-rental-field">
                    <span class="ab-admin-rental-field__label">Statut</span>
                    <select class="ab-admin-rental-field__select">
                      <option>Disponible</option>
                      <option>En location</option>
                      <option>À préparer</option>
                      <option>Retour à contrôler</option>
                      <option>Maintenance</option>
                      <option>Occasion</option>
                    </select>
                  </label>

                  <label class="ab-admin-rental-field">
                    <span class="ab-admin-rental-field__label">Commentaire</span>
                    <input class="ab-admin-rental-field__input" type="text" placeholder="Ex: retour sale, check frein arrière" />
                  </label>
                </div>

                <div class="ab-admin-rental-form__actions">
                  <button class="ab-admin-rental-button ab-admin-rental-button--primary" type="submit">Mettre à jour</button>
                  <button class="ab-admin-rental-button ab-admin-rental-button--ghost" type="button">Voir historique</button>
                </div>
              </form>
            </article>

            <article class="ab-admin-rental-panel">
              <div class="ab-admin-rental-panel__header">
                <div>
                  <p class="ab-admin-rental-panel__eyebrow">Tarifs</p>
                  <h3 class="ab-admin-rental-panel__title">Mettre à jour les prix</h3>
                </div>
              </div>

              <form class="ab-admin-rental-form" aria-label="Mettre à jour les prix">
                <label class="ab-admin-rental-field">
                  <span class="ab-admin-rental-field__label">Catégorie</span>
                  <select class="ab-admin-rental-field__select">
                    <option>VTC</option>
                    <option>VAE</option>
                    <option>Ville</option>
                    <option>Enfant</option>
                  </select>
                </label>

                <div class="ab-admin-rental-form__grid ab-admin-rental-form__grid--two">
                  <label class="ab-admin-rental-field">
                    <span class="ab-admin-rental-field__label">Demi-journée</span>
                    <input class="ab-admin-rental-field__input" type="text" placeholder="18€" />
                  </label>
                  <label class="ab-admin-rental-field">
                    <span class="ab-admin-rental-field__label">Journée</span>
                    <input class="ab-admin-rental-field__input" type="text" placeholder="29€" />
                  </label>
                </div>

                <button class="ab-admin-rental-button ab-admin-rental-button--secondary" type="submit">
                  Enregistrer
                </button>
              </form>
            </article>

            <article class="ab-admin-rental-panel">
              <div class="ab-admin-rental-panel__header">
                <div>
                  <p class="ab-admin-rental-panel__eyebrow">Occasion</p>
                  <h3 class="ab-admin-rental-panel__title">Sortir un vélo de la location</h3>
                </div>
              </div>

              <p class="ab-admin-rental-panel__text">
                Faites basculer un vélo de la flotte location vers la vente occasion en gardant une trace propre.
              </p>

              <form class="ab-admin-rental-form" aria-label="Passer un vélo en occasion">
                <label class="ab-admin-rental-field">
                  <span class="ab-admin-rental-field__label">Vélo</span>
                  <select class="ab-admin-rental-field__select">
                    <option>Vélo ville Elops</option>
                    <option>VTC Riverside 500</option>
                    <option>VTC Électrique Cube</option>
                  </select>
                </label>

                <label class="ab-admin-rental-field">
                  <span class="ab-admin-rental-field__label">Prix occasion</span>
                  <input class="ab-admin-rental-field__input" type="text" placeholder="350€" />
                </label>

                <div class="ab-admin-rental-form__actions">
                  <button class="ab-admin-rental-button ab-admin-rental-button--secondary" type="submit">Basculer</button>
                  <button class="ab-admin-rental-button ab-admin-rental-button--ghost" type="button">Prévisualiser</button>
                </div>
              </form>
            </article>
          </div>
        </div>

        <aside class="ab-admin-rental-side">
          <article class="ab-admin-rental-panel ab-admin-rental-panel--sticky">
            <div class="ab-admin-rental-panel__header">
              <div>
                <p class="ab-admin-rental-panel__eyebrow">Page complémentaire</p>
                <h3 class="ab-admin-rental-panel__title">Gestion vélo détaillée</h3>
              </div>
            </div>

            <p class="ab-admin-rental-panel__text">
              Ouvrez la fiche détaillée d’un vélo pour modifier ses visuels, son historique,
              son entretien, ses attributs et sa fiche commerciale.
            </p>

            <div class="ab-admin-rental-visual-card" aria-hidden="true">
              <span class="ab-admin-rental-visual-card__icon">
                <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="14" width="54" height="44" rx="6" fill="currentColor" opacity="0.22"/>
                  <path d="M20 49L31.5 35.5C32.3109 34.5489 33.7837 34.5797 34.5542 35.5637L41 43.8L46.5674 36.6838C47.3452 35.69 48.8423 35.6712 49.6448 36.645L58 46.7778" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
                  <circle cx="30" cy="26" r="5" fill="currentColor" opacity="0.5"/>
                </svg>
              </span>
            </div>

            <div class="ab-admin-rental-form__actions">
              <a class="ab-admin-rental-button ab-admin-rental-button--primary" href="../Ajout-vélo/index.html">
                Ouvrir la fiche vélo
              </a>
            </div>
          </article>
        </aside>
      </div>
    </section>

    <section class="ab-admin-rental-fleet-table" aria-labelledby="admin-rental-fleet-table-title">
      <div class="ab-admin-rental-container">
        <div class="ab-admin-rental-section-heading ab-admin-rental-section-heading--split">
          <div>
            <p class="ab-admin-rental-section-heading__eyebrow">Flotte</p>
            <h2 id="admin-rental-fleet-table-title" class="ab-admin-rental-section-heading__title">
              Tableau de flotte exploitable
            </h2>
          </div>
          <p class="ab-admin-rental-section-heading__text">
            Une lecture claire des vélos, de leurs prix, de leur statut et des actions disponibles.
          </p>
        </div>

        <div class="ab-admin-rental-table-wrap">
          <table class="ab-admin-rental-table">
            <thead>
              <tr>
                <th>Vélo</th>
                <th>Catégorie</th>
                <th>1/2 journée</th>
                <th>Journée</th>
                <th>Statut</th>
                <th>Localisation</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${renderFleetRows(fleet)}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="ab-admin-rental-bookings" aria-labelledby="admin-rental-bookings-title">
      <div class="ab-admin-rental-container">
        <div class="ab-admin-rental-section-heading ab-admin-rental-section-heading--centered">
          <p class="ab-admin-rental-section-heading__eyebrow">Pipeline réservation</p>
          <h2 id="admin-rental-bookings-title" class="ab-admin-rental-section-heading__title">
            Réservations à traiter par statut
          </h2>
          <p class="ab-admin-rental-section-heading__text">
            Une vue premium, plus opérationnelle qu’une simple liste.
          </p>
        </div>

        <div class="ab-admin-rental-lanes">
          ${renderBookingCards(
            bookings,
            'validation',
            'À valider',
            'Demandes entrantes à confirmer.',
          )}
          ${renderBookingCards(
            bookings,
            'preparation',
            'À préparer',
            'Vélos à sortir et préparer.',
          )}
          ${renderBookingCards(
            bookings,
            'encours',
            'En cours',
            'Locations actuellement actives.',
          )}
          ${renderBookingCards(
            bookings,
            'retour',
            'Retour à contrôler',
            'Vélos revenus à checker.',
          )}
        </div>
      </div>
    </section>

    <section class="ab-admin-rental-add" aria-labelledby="admin-rental-add-title">
      <div class="ab-admin-rental-container ab-admin-rental-add__grid">
        <div>
          <p class="ab-admin-rental-section-heading__eyebrow">Nouveau</p>
          <h2 id="admin-rental-add-title" class="ab-admin-rental-section-heading__title">
            Ajoutez facilement un nouveau vélo à votre inventaire
          </h2>
          <p class="ab-admin-rental-section-heading__text">
            Créez une fiche vélo claire avec sa catégorie, ses tarifs, son état initial
            et sa disponibilité à la location.
          </p>
          <div class="ab-admin-rental-form__actions">
            <a class="ab-admin-rental-button ab-admin-rental-button--secondary" href="../Ajout-vélo/index.html">Créer un vélo</a>
            <a class="ab-admin-rental-link" href="../Ajout-vélo/index.html">Voir le formulaire complet</a>
          </div>
        </div>

        <div class="ab-admin-rental-visual-card" aria-hidden="true">
          <span class="ab-admin-rental-visual-card__icon">
            <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="9" y="14" width="54" height="44" rx="6" fill="currentColor" opacity="0.22"/>
              <path d="M20 49L31.5 35.5C32.3109 34.5489 33.7837 34.5797 34.5542 35.5637L41 43.8L46.5674 36.6838C47.3452 35.69 48.8423 35.6712 49.6448 36.645L58 46.7778" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
              <circle cx="30" cy="26" r="5" fill="currentColor" opacity="0.5"/>
            </svg>
          </span>
        </div>
      </div>
    </section>

    <section class="ab-admin-rental-recap" aria-labelledby="admin-rental-recap-title">
      <div class="ab-admin-rental-container">
        <div class="ab-admin-rental-section-heading ab-admin-rental-section-heading--centered">
          <p class="ab-admin-rental-section-heading__eyebrow">Lecture croisée</p>
          <h2 id="admin-rental-recap-title" class="ab-admin-rental-section-heading__title">
            Récapitulatif opérationnel des réservations
          </h2>
          <p class="ab-admin-rental-section-heading__text">
            Consultez rapidement les réservations et les informations clients en mode synthèse.
          </p>
        </div>

        <div class="ab-admin-rental-recap__filters">
          <label class="ab-admin-rental-field">
            <span class="ab-admin-rental-field__label">Date de départ</span>
            <input class="ab-admin-rental-field__input" type="text" placeholder="À partir du..." />
          </label>
          <label class="ab-admin-rental-field">
            <span class="ab-admin-rental-field__label">Date de retour</span>
            <input class="ab-admin-rental-field__input" type="text" placeholder="Jusqu’au..." />
          </label>
        </div>

        <div class="ab-admin-rental-table-wrap">
          <table class="ab-admin-rental-table">
            <thead>
              <tr>
                <th>Client / contact</th>
                <th>Vélo</th>
                <th>Statut</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              ${bookings
                .map(
                  (booking) => `
                    <tr>
                      <td>${booking.client} • ${booking.phone}</td>
                      <td>${booking.bike}</td>
                      <td><span class="ab-admin-rental-pill ${statusClass(booking.status)}">${statusLabel(booking.status)}</span></td>
                      <td>${booking.start}</td>
                      <td>${booking.end}</td>
                      <td>${booking.total}</td>
                    </tr>
                  `,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

window.AtlanticBikeUI.renderFooter(
  document.querySelector('[data-footer-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'admin-location',
  },
);
