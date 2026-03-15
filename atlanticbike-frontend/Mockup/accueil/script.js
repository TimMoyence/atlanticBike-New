const homepageSections = [
  {
    type: "mediaHero",
    props: {
      id: "home-hero",
      title: "Explorez Carcans et Lacanau à vélo",
      description:
        "Découvrez la liberté et l'aventure avec AtlanticBike. Nos vélos vous attendent pour une expérience unique dans les magnifiques paysages de la région.",
      media: {
        src: "./assets/Placeholder Image.png",
        alt: "Familles et cyclistes avec leurs vélos au bord du lac.",
      },
      actions: [
        { label: "Réserver", href: "../reservation/index.html#reservation-flow", variant: "primary" },
        { label: "Nos services", href: "../services/index.html#services-grid-title", variant: "secondary" },
      ],
    },
  },
  {
    type: "services",
    props: {
      id: "home-services",
      width: "narrow",
      eyebrow: "Découverte",
      title: "Nos services de cyclisme",
      description:
        "Profitez de nos vélos adaptés à tous les niveaux et toutes les envies.",
      items: [
        {
          kicker: "Location",
          title: "Vélos électriques et classiques pour tous",
          description:
            "Choisissez parmi notre large gamme de vélos modernes et confortables.",
          linkLabel: "Détails",
          href: "../location-vélo/index.html#rental-categories-title",
          media: {
            src: "./assets/Placeholder Image copy.png",
            alt: "Famille à vélo sur une piste cyclable.",
          },
        },
        {
          kicker: "Réparation",
          title: "Entretien et réparation",
          description: "Nos experts remettent votre vélo en parfait état.",
          linkLabel: "Voir",
          href: "../réparation-vélo/index.html#repair-services-title",
          media: {
            src: "./assets/Placeholder Image-1.png",
            alt: "Atelier AtlanticBike et vélo en réparation.",
          },
        },
        {
          kicker: "Balades",
          title: "Circuits guidés et découverte",
          description:
            "Explorez la région avec nos itinéraires recommandés.",
          linkLabel: "Explorer",
          href: "../Cartes/index.html#map-routes-title",
          media: {
            src: "./assets/Placeholder Image-2.png",
            alt: "Carte illustrée de circuits guidés.",
          },
        },
      ],
    },
  },
  {
    type: "testimonials",
    props: {
      id: "home-testimonials",
      width: "wide",
      title: "Nos clients témoignent",
      description:
        "Découvrez ce que nos clients disent de leur expérience.",
      surface: "soft",
      items: [
        {
          quote:
            "Un service impeccable et des vélos de qualité. Je recommande AtlanticBike à tous.",
          name: "Thomas Laurent",
          meta: "Cycliste amateur",
          avatarInitial: "T",
        },
        {
          quote:
            "Des itinéraires magnifiques et un accompagnement professionnel. Une expérience inoubliable.",
          name: "Claire Moreau",
          meta: "Touriste",
          avatarInitial: "C",
        },
        {
          quote:
            "La réparation de mon vélo a été rapide et efficace. Un service de confiance.",
          name: "Marc Dupont",
          meta: "Résident local",
          avatarInitial: "M",
        },
      ],
    },
  },
  {
    type: "gallery",
    props: {
      id: "home-gallery",
      width: "wide",
      title: "Notre galerie",
      description:
        "Découvrez nos vélos et les magnifiques paysages de Carcans et Lacanau.",
      items: [
        { label: "Placeholder", tone: "one" },
        { label: "Placeholder", tone: "two" },
        { label: "Placeholder", tone: "three" },
      ],
    },
  },
  {
    type: "stats",
    props: {
      id: "home-stats",
      width: "wide",
      title: "AtlanticBike en chiffres",
      description:
        "Nous sommes fiers de notre engagement envers la qualité et la satisfaction client. Nos statistiques reflètent notre passion pour le cyclisme.",
      items: [
        {
          type: "stat",
          size: "large",
          value: "95%",
          label: "Satisfaction client",
        },
        { type: "media", tone: "four" },
        {
          type: "stat",
          value: "10",
          label: "Années d'expérience",
        },
        {
          type: "stat",
          value: "50+",
          label: "Vélos disponibles",
        },
        { type: "media", tone: "five" },
      ],
    },
  },
];

window.AtlanticBikeUI.renderNavbar(document.querySelector("[data-navbar-root]"), {
  assetBase: "../Navbar/design/Assets",
  currentPage: "accueil",
});

window.AtlanticBikeUI.renderPage(
  document.querySelector("[data-page-root]"),
  homepageSections,
);

window.AtlanticBikeUI.renderFooter(document.querySelector("[data-footer-root]"), {
  assetBase: "../Navbar/design/Assets",
  currentPage: "accueil",
});
