const aboutSections = [
  {
    type: "pageHeader",
    props: {
      id: "about-header",
      title: "Découvrez atlanticbike",
      description:
        "Votre partenaire de voyage à vélo dans les magnifiques régions de Carcans et Lacanau.",
    },
  },
  {
    type: "centeredHero",
    props: {
      id: "about-mission",
      icon: "freedom",
      eyebrow: "Liberté",
      title: "Notre mission de location de vélos",
      description:
        "Nous transformons vos vacances en aventures inoubliables. Chaque vélo raconte une histoire de découverte et de liberté.",
      actions: [
        { label: "Réserver", href: "../reservation/index.html#reservation-flow", variant: "primary" },
        { label: "Explorer", href: "#about-sites", variant: "link" },
      ],
    },
  },
  {
    type: "timeline",
    props: {
      id: "about-story",
      eyebrow: "Parcours",
      title: "Notre histoire de passion pour le cyclisme",
      description:
        "Depuis notre création, nous avons parcouru de nombreux kilomètres. Notre engagement envers la qualité et l'aventure ne cesse de grandir.",
      actions: [
        { label: "Découvrir", href: "../services/index.html#services-grid-title", variant: "secondary" },
        { label: "Lire", href: "#about-founder", variant: "link" },
      ],
      items: [
        {
          year: "2018",
          description:
            "Première location de vélos à Carcans, transformant le tourisme local.",
        },
        {
          year: "2020",
          description:
            "Expansion à Lacanau et introduction des vélos électriques pour une expérience plus accessible.",
        },
        {
          year: "2021",
          description:
            "Développement de notre plateforme de réservation en ligne pour simplifier les locations.",
        },
        {
          year: "2022",
          description:
            "Lancement de services de réparation et maintenance pour garantir des vélos toujours en parfait état.",
        },
        {
          year: "2023",
          description:
            "Création de circuits touristiques uniques et partenariats avec des guides locaux.",
        },
      ],
    },
  },
  {
    type: "splitFeature",
    props: {
      id: "about-founder",
      title: "L'âme de atlanticbike",
      description:
        "Vincent, le fondateur passionné, a transformé sa passion pour le cyclisme en une aventure entrepreneuriale. Chaque vélo dans notre flotte raconte l'histoire de son rêve de permettre aux voyageurs de découvrir la beauté des régions de Carcans et Lacanau.",
      media: {
        icon: "image",
        tone: "neutral",
      },
    },
  },
  {
    type: "testimonials",
    props: {
      id: "about-testimonials",
      title: "Témoignages",
      description:
        "Ce que nos clients disent de leur expérience avec atlanticbike",
      surface: "default",
      items: [
        {
          quote:
            "Un voyage à vélo qui a dépassé toutes mes attentes. Un service impeccable et des vélos parfaitement entretenus.",
          name: "Claire Martin",
          meta: "Touriste, Paris",
        },
        {
          quote:
            "La meilleure façon de découvrir Carcans et Lacanau. Des itinéraires incroyables et un support technique excellent.",
          name: "Marc Dupont",
          meta: "Cycliste amateur, Bordeaux",
        },
        {
          quote:
            "Une expérience de location de vélos professionnelle et conviviale. Je recommande vivement atlanticbike.",
          name: "Sophie Leroy",
          meta: "Voyageuse indépendante, Lyon",
        },
      ],
    },
  },
  {
    type: "contactSites",
    props: {
      id: "about-sites",
      eyebrow: "Découverte",
      title: "Nos sites",
      description: "Explorez nos points de rencontre dans la région",
      contacts: [
        {
          icon: "email",
          label: "Email",
          value: "contact@atlanticbike.fr",
          href: "mailto:contact@atlanticbike.fr",
        },
        {
          icon: "phone",
          label: "Téléphone",
          value: "+33 5 56 03 22 33",
          href: "tel:+33556032233",
        },
      ],
      sites: [
        {
          name: "Maubuisson",
          description: "111 avenue de maubuisson, 33121 Carcans Maubuisson",
          linkLabel: "Voir carte",
          href: "../Cartes/index.html#map-contact-title",
        },
        {
          name: "Igesa Carcans",
          description: "Notre site partenaire pour des expériences de cyclisme uniques",
          linkLabel: "Voir carte",
          href: "../Cartes/index.html#map-contact-title",
        },
      ],
      mapMedia: {
        icon: "map",
        tone: "neutral",
      },
    },
  },
  {
    type: "cta",
    props: {
      id: "about-cta",
      title: "Prêt à commencer votre aventure",
      description:
        "Contactez-nous pour une expérience de vélo unique dans les plus beaux paysages de France.",
      actions: [
        { label: "Réserver", href: "../reservation/index.html#reservation-flow", variant: "primary" },
        { label: "Contact", href: "../contact/index.html#contact-support-title", variant: "secondary" },
      ],
    },
  },
];

window.AtlanticBikeUI.renderNavbar(document.querySelector("[data-navbar-root]"), {
  assetBase: "../Navbar/design/Assets",
  currentPage: "a-propos",
});

window.AtlanticBikeUI.renderPage(document.querySelector("[data-page-root]"), aboutSections);

window.AtlanticBikeUI.renderFooter(document.querySelector("[data-footer-root]"), {
  assetBase: "../Navbar/design/Assets",
  currentPage: "a-propos",
});
