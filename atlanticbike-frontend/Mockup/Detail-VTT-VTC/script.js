const detailVttVtcSections = [
  {
    type: 'detailHero',
    props: {
      id: 'detail-top',
      width: 'wide',
      eyebrow: 'Page',
      title: 'VTT et VTC de Carcans et Lacanau',
      description:
        'Découvrez nos deux familles de vélos, pensées pour les pistes forestières, les bords de lac et les balades autour de Carcans et Lacanau.',
      actions: [
        { label: 'Réserver', href: '../reservation/index.html', variant: 'primary' },
        { label: 'Détails', href: '#detail-techniques', variant: 'secondary' },
      ],
      tags: ['VTT sportif', 'VTC confort', 'Balade & découverte'],
    },
  },
  {
    type: 'infoSplit',
    props: {
      id: 'detail-techniques',
      width: 'wide',
      eyebrow: 'Caractéristiques',
      title: 'Caractéristiques techniques de nos VTT et VTC.',
      description:
        'Chaque famille est préparée pour un usage précis: le VTT pour une conduite plus engagée, le VTC pour une sortie plus fluide et polyvalente.',
      details: [
        'VTT: meilleure accroche et comportement plus sûr sur chemins forestiers et passages irréguliers',
        'VTC: position plus confortable et roulage plus souple sur piste cyclable, route douce et bord de lac',
        'Réglages simples pour adapter la position et la taille à chaque cycliste avant le départ',
      ],
      actions: [
        { label: 'Réserver', href: '../reservation/index.html', variant: 'primary' },
        { label: 'Voir la gamme', href: '../Vélos/index.html#fleet-grid-title', variant: 'secondary' },
      ],
      media: {
        icon: 'image',
        tone: 'neutral',
      },
    },
  },
  {
    type: 'bikeShowcase',
    props: {
      id: 'detail-models',
      width: 'wide',
      eyebrow: 'Nos modèles',
      title: 'Nos modèles VTT et VTC',
      description:
        'Deux VTT et deux VTC sont présentés avec des cartes détaillées et une alternance image/texte pour rendre la lecture plus premium et plus claire.',
      items: [
        {
          family: 'VTT',
          kicker: 'Modèle 01',
          title: 'VTT Forest 27.5',
          description:
            'Un VTT agile et rassurant, pensé pour les chemins forestiers, les pistes roulantes et les sorties actives autour de Carcans. Il convient aux cyclistes qui veulent un vélo maniable, stable et facile à prendre en main.',
          highlights: ['27.5"', 'Suspension avant', 'Pilotage agile'],
          details: [
            'Parfait pour les parcours irréguliers, les enchaînements de virages et les sorties plus dynamiques',
            'Position équilibrée entre confort et contrôle pour rester à l’aise sur plusieurs heures',
            'Idéal pour un usage loisir sportif ou une découverte plus engagée de la région',
          ],
          media: {
            icon: 'image',
            tone: 'neutral',
          },
          actions: [
            { label: 'Réserver ce modèle', href: '../reservation/index.html', variant: 'primary' },
            { label: 'Voir détails', href: '#detail-faq', variant: 'secondary' },
          ],
        },
        {
          family: 'VTT',
          kicker: 'Modèle 02',
          title: 'VTT Adventure 29',
          description:
            'Plus roulant et plus posé, ce second VTT est adapté aux longues sorties sur chemins, aux trajets mixtes et aux cyclistes qui cherchent davantage de stabilité sur la distance.',
          highlights: ['29"', 'Roulement fluide', 'Sorties longues'],
          details: [
            'Très bon comportement sur les longues pistes forestières et les liaisons plus ouvertes',
            'Cadre plus stable pour garder du confort lorsque le parcours s’allonge',
            'Bonne option pour les clients qui veulent un vélo plus endurant et moins nerveux',
          ],
          media: {
            icon: 'image',
            tone: 'neutral',
          },
          actions: [
            { label: 'Réserver ce modèle', href: '../reservation/index.html', variant: 'primary' },
            { label: 'Voir détails', href: '#detail-faq', variant: 'secondary' },
          ],
          reverse: true,
        },
        {
          family: 'VTC',
          kicker: 'Modèle 03',
          title: 'VTC Riviera Confort',
          description:
            'Un VTC très accessible, pensé pour les balades loisirs, les pistes cyclables et les trajets détente entre forêt, lac et centre-ville. C’est le modèle qui met le confort et la simplicité en priorité.',
          highlights: ['Position relevée', 'Confort', 'Balade douce'],
          details: [
            'Parfait pour une clientèle famille, couple ou découverte touristique de la région',
            'Conduite naturelle et souple pour rouler sans fatigue excessive sur terrain mixte',
            'Très adapté aux parcours tranquilles avec peu de technicité',
          ],
          media: {
            icon: 'image',
            tone: 'neutral',
          },
          actions: [
            { label: 'Réserver ce modèle', href: '../reservation/index.html', variant: 'primary' },
            { label: 'Voir détails', href: '#detail-faq', variant: 'secondary' },
          ],
        },
        {
          family: 'VTC',
          kicker: 'Modèle 04',
          title: 'VTC Touring Plus',
          description:
            'Plus équipé et plus polyvalent, ce VTC convient aux clients qui veulent une sortie plus longue avec un très bon confort, une position reposante et une vraie sensation de fluidité sur la journée.',
          highlights: ['Polyvalent', 'Sortie journée', 'Confort premium'],
          details: [
            'Très bon choix pour les longues promenades et les itinéraires mêlant route douce et pistes cyclables',
            'Confort renforcé pour une pratique régulière ou des sorties plus ambitieuses',
            'Permet de proposer une version VTC plus premium dans la même famille de produits',
          ],
          media: {
            icon: 'image',
            tone: 'neutral',
          },
          actions: [
            { label: 'Réserver ce modèle', href: '../reservation/index.html', variant: 'primary' },
            { label: 'Voir détails', href: '#detail-faq', variant: 'secondary' },
          ],
          reverse: true,
        },
      ],
    },
  },
  {
    type: 'detailGallery',
    props: {
      id: 'detail-gallery',
      width: 'wide',
      title: 'Photo du vélo',
      description:
        'Une présentation lisible des deux familles, de leurs détails et de leur niveau de finition avant réservation.',
      items: [
        { label: 'Vue d’ensemble', tone: 'neutral' },
        { label: 'Poste de conduite', tone: 'neutral' },
        { label: 'Cadre VTT', tone: 'neutral' },
        { label: 'Cadre VTC', tone: 'neutral' },
        { label: 'Détails de finition', tone: 'neutral' },
      ],
    },
  },
  {
    type: 'detailProcess',
    props: {
      id: 'detail-rental',
      width: 'wide',
      title: 'Comment louer votre vélo',
      description:
        'Un parcours simple, clair et rassurant pour choisir le bon vélo et partir rapidement.',
      lead: {
        eyebrow: 'Étape 1',
        title: 'Choisissez entre VTT et VTC',
        description:
          'Sélectionnez la famille adaptée à votre usage, à votre terrain et au niveau de confort recherché pour chaque personne.',
        media: {
          icon: 'image',
          tone: 'neutral',
        },
      },
      steps: [
        {
          eyebrow: 'Étape 2',
          title: 'Réservation en ligne',
          description:
            'Définissez les dates, les quantités et les tailles pour chaque personne directement dans le flow de réservation.',
          actions: [
            { label: 'Commencer', href: '../reservation/index.html', variant: 'secondary' },
          ],
        },
        {
          eyebrow: 'Étape 3',
          title: 'Prêt à partir',
          description:
            'Récupérez votre vélo sur le site choisi et partez explorer Carcans et Lacanau avec une préparation déjà cadrée.',
        },
      ],
    },
  },
  {
    type: 'testimonials',
    props: {
      width: 'wide',
      title: 'Témoignages',
      description: 'Ce que nos clients disent de leurs sorties en VTT et en VTC.',
      surface: 'soft',
      items: [
        {
          quote:
            'Le VTC était parfait pour une longue balade entre forêt et bord du lac, très confortable sur toute la journée.',
          name: 'Claire Martin',
          meta: 'Sortie loisirs en VTC',
          avatarInitial: 'C',
        },
        {
          quote:
            'Le VTT était parfaitement réglé et très rassurant sur les portions plus irrégulières.',
          name: 'Julien Morel',
          meta: 'Balade sportive en VTT',
          avatarInitial: 'J',
        },
        {
          quote:
            'Pouvoir comparer VTT et VTC sur une même page aide vraiment à réserver le bon vélo.',
          name: 'Amélie Bernard',
          meta: 'Week-end à Lacanau',
          avatarInitial: 'A',
        },
      ],
    },
  },
  {
    type: 'detailShowcaseCta',
    props: {
      id: 'detail-cta',
      width: 'wide',
      title: 'Commencez votre aventure maintenant',
      description:
        'Réservez votre vélo dès maintenant et préparez une sortie fluide, confortable et adaptée à votre parcours.',
      actions: [
        { label: 'Réserver', href: '../reservation/index.html', variant: 'primary' },
        { label: 'Nous contacter', href: '../contact/index.html#contact-support-title', variant: 'secondary' },
      ],
      media: {
        icon: 'image',
        tone: 'neutral',
      },
    },
  },
  {
    type: 'faqSplit',
    props: {
      id: 'detail-faq',
      width: 'wide',
      eyebrow: 'FAQs',
      title: 'Questions fréquentes',
      description:
        'Les réponses utiles avant de choisir entre VTT et VTC et de lancer la réservation.',
      actions: [
        { label: 'Réserver', href: '../reservation/index.html', variant: 'secondary' },
      ],
      items: [
        {
          question: 'Comment réserver un vélo ?',
          answer:
            'Choisissez votre modèle, la durée de location, les quantités et les tailles, puis complétez le récapitulatif directement dans le flow de réservation.',
        },
        {
          question: 'Quelle différence entre VTT et VTC ?',
          answer:
            'Le VTT est plus adapté aux chemins roulants et aux parcours plus engagés, tandis que le VTC vise davantage le confort et la polyvalence sur piste cyclable, route douce et longues balades.',
        },
        {
          question: 'Comment choisir la bonne taille ?',
          answer:
            'Le flow de réservation vous permet de saisir la taille de chaque personne afin de préparer un vélo réellement adapté à chaque cycliste.',
        },
        {
          question: 'Où récupérer mon vélo ?',
          answer:
            'Le retrait se fait sur le site sélectionné pendant la réservation, avec les informations utiles rappelées dans le récapitulatif.',
        },
      ],
    },
  },
];

window.AtlanticBikeUI.renderNavbar(document.querySelector('[data-navbar-root]'), {
  assetBase: '../Navbar/design/Assets',
  currentPage: 'vtt-vtc',
});

window.AtlanticBikeUI.renderPage(
  document.querySelector('[data-page-root]'),
  detailVttVtcSections,
);

window.AtlanticBikeUI.renderFooter(document.querySelector('[data-footer-root]'), {
  assetBase: '../Navbar/design/Assets',
  currentPage: 'vtt-vtc',
});
