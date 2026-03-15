window.AtlanticBikeUI.renderNavbar(
  document.querySelector('[data-navbar-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'repair',
  },
);

const pricingData = [
  {
    title: 'Forfait contrôle',
    price: '14€',
    tag: 'Diagnostic',
    text: 'Une vérification rapide pour identifier les points à reprendre.',
    items: ['Contrôle général', 'Retour atelier', 'Recommandations'],
  },
  {
    title: 'Pack révision',
    price: '30€',
    tag: 'Entretien',
    text: 'Pour remettre le vélo dans de bonnes conditions de roulage.',
    items: ['Réglages essentiels', 'Freins et transmission', 'Contrôle final'],
  },
  {
    title: 'Forfait atelier',
    price: '20€',
    tag: 'Intervention',
    text: 'Une base claire pour les réparations courantes les plus demandées.',
    items: ['Main d’œuvre simple', 'Petits ajustements', 'Validation atelier'],
  },
  {
    title: 'Forfait freins',
    price: '15€',
    tag: 'Sécurité',
    text: 'Pour retrouver une réponse plus sûre et plus propre au freinage.',
    items: ['Contrôle freins', 'Réglage tension', 'Test final'],
  },
  {
    title: 'Forfait transmission',
    price: '16€',
    tag: 'Réglage',
    text: 'Réglage précis pour limiter les sauts de chaîne et améliorer la fluidité.',
    items: ['Contrôle transmission', 'Réglage vitesses', 'Test dynamique'],
  },
  {
    title: 'Forfait pneus',
    price: '12€',
    tag: 'Roues',
    text: 'Intervention rapide autour du gonflage, du contrôle ou du remplacement simple.',
    items: ['Contrôle pneus', 'Vérification pression', 'Conseil usage'],
  },
  {
    title: 'Forfait montage',
    price: '18€',
    tag: 'Accessoires',
    text: 'Pour installer proprement les accessoires les plus fréquents.',
    items: ['Pose accessoire', 'Vérification compatibilité', 'Contrôle final'],
  },
  {
    title: 'Forfait nettoyage',
    price: '20€',
    tag: 'Confort',
    text: 'Un passage atelier utile pour repartir avec un vélo plus propre et mieux suivi.',
    items: ['Nettoyage ciblé', 'Contrôle visuel', 'Finition atelier'],
  },
];

const pricingGrid = document.getElementById('repairPricingGrid');

if (pricingGrid) {
  pricingGrid.innerHTML = pricingData
    .map(
      (item) => `
        <article class="ab-repair-pricing-card">
          <div class="ab-repair-pricing-card__top">
            <div>
              <span class="ab-repair-pricing-card__tag">${item.tag}</span>
              <h3>${item.title}</h3>
            </div>
            <strong class="ab-repair-pricing-card__price">${item.price}</strong>
          </div>
          <p>${item.text}</p>
          <ul>
            ${item.items.map((line) => `<li>${line}</li>`).join('')}
          </ul>
          <a class="ab-repair-button ab-repair-button--primary" href="#repair-booking-title">Réserver</a>
        </article>
      `,
    )
    .join('');
}

window.AtlanticBikeUI.renderFooter(
  document.querySelector('[data-footer-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'repair',
  },
);
