const reservationSections = [
  {
    type: 'mediaHero',
    props: {
      id: 'reservation-hero',
      width: 'wide',
      title: 'Réservez votre vélo à Carcans',
      description:
        'Choisissez votre formule, vos dates et vos options en quelques étapes pour préparer votre aventure AtlanticBike.',
      actions: [
        { label: 'Commencer', href: '#reservation-flow', variant: 'primary' },
        { label: 'Nous contacter', href: '../contact/index.html#contact-support-title', variant: 'secondary' },
      ],
      media: {
        icon: 'image',
        tone: 'neutral',
      },
    },
  },
  {
    type: 'rentalBookingFlow',
    props: {
      id: 'reservation-flow',
      width: 'wide',
      eyebrow: 'Réservation',
      title: 'Commencez votre parcours à vélo',
      description:
        'Le flow suit la logique métier de location: plusieurs catégories en même temps, tailles par personne, forfait lié à la durée et montant calculé depuis la grille 2024.',
      summaryEyebrow: 'Parcours',
      summaryTitle: 'Votre réservation',
      confirmLabel: 'Réserver',
      packages: [
        {
          key: '2h',
          label: '2h',
          description: 'Sortie courte autour du lac',
          returnOffsetDays: 0,
          returnHint: 'le même jour',
        },
        {
          key: 'half-day',
          label: '1/2 journée',
          description: 'Matin ou après-midi',
          returnOffsetDays: 0,
          returnHint: 'le même jour',
        },
        {
          key: 'day',
          label: '1 jour (9h-19h)',
          description: 'Retour en fin de journée',
          returnOffsetDays: 0,
          returnHint: 'le même jour',
        },
        {
          key: '24h',
          label: '24h',
          description: 'Retour le lendemain',
          returnOffsetDays: 1,
          returnHint: 'sur 24 heures',
        },
        {
          key: '7d',
          label: '7 jours',
          description: 'Formule semaine',
          returnOffsetDays: 7,
          returnHint: 'séjour semaine',
        },
        {
          key: '15d',
          label: '15 jours',
          description: 'Formule long séjour',
          returnOffsetDays: 15,
          returnHint: 'séjour 15 jours',
        },
      ],
      sites: [
        { key: 'carcans', label: 'Carcans' },
        { key: 'igesa', label: 'IGESA' },
      ],
      bikeCategories: [
        {
          key: 'vtc_vtt',
          label: 'VTC / VTT',
          description: 'Vélos adultes classiques pour balade ou piste.',
          sizeSlotsPerUnit: 1,
          personCountPerUnit: 1,
          prices: {
            '2h': 10,
            'half-day': 12,
            day: 15,
            '24h': 17.5,
            '7d': 59,
            '15d': 105,
          },
        },
        {
          key: 'velo_enfant',
          label: 'Vélo enfant',
          description: 'Configuration enfant adaptée aux petits gabarits.',
          sizeSlotsPerUnit: 1,
          personCountPerUnit: 1,
          prices: {
            '2h': 9,
            'half-day': 10,
            day: 13,
            '24h': 15,
            '7d': 45,
            '15d': 80,
          },
        },
        {
          key: 'tandem',
          label: 'Tandem',
          description: 'Une unité, deux personnes, deux tailles à prévoir.',
          sizeSlotsPerUnit: 2,
          personCountPerUnit: 2,
          prices: {
            '2h': 12,
            'half-day': 24,
            day: 30,
            '24h': 35,
            '7d': 118,
            '15d': 210,
          },
        },
        {
          key: 'vtc_electrique',
          label: 'VTC électrique',
          description: 'Confort et assistance pour les longues sorties.',
          sizeSlotsPerUnit: 1,
          personCountPerUnit: 1,
          prices: {
            '2h': 30,
            'half-day': 35,
            day: 45,
            '24h': 50,
            '7d': 180,
            '15d': 320,
          },
        },
        {
          key: 'vtt_electrique',
          label: 'VTT électrique',
          description: 'Assistance sportive pour terrain plus engagé.',
          sizeSlotsPerUnit: 1,
          personCountPerUnit: 1,
          prices: {
            '2h': 35,
            'half-day': 42,
            day: 50,
            '24h': 55,
            '7d': 260,
            '15d': 390,
          },
        },
        {
          key: 'suiveur',
          label: 'Suiveur',
          description: 'Pour enfant autonome mais encore accompagné.',
          sizeSlotsPerUnit: 1,
          personCountPerUnit: 1,
          prices: {
            '2h': 8,
            'half-day': 10,
            day: 13,
            '24h': 15,
            '7d': 45,
            '15d': 80,
          },
        },
        {
          key: 'draisienne',
          label: 'Draisienne',
          description: 'Pour les tout-petits en apprentissage.',
          sizeSlotsPerUnit: 1,
          personCountPerUnit: 1,
          prices: {
            '2h': 4,
            'half-day': 7,
            day: 10,
            '24h': 12,
            '7d': 45,
            '15d': 80,
          },
        },
      ],
      addonCategories: [
        {
          key: 'remorque',
          label: 'Remorque',
          description: 'Transport enfant ou matériel complémentaire.',
          prices: {
            '2h': 10,
            'half-day': 12,
            day: 15,
            '24h': 17.5,
            '7d': 59,
            '15d': 105,
          },
        },
        {
          key: 'siege_bebe',
          label: 'Siège bébé',
          description: 'Ajout pratique pour les plus jeunes enfants.',
          prices: {
            '2h': 1,
            'half-day': 2,
            day: 4,
            '24h': 5,
            '7d': 15,
            '15d': 25,
          },
        },
        {
          key: 'rack_surf',
          label: 'Rack de surf',
          description: 'Support complémentaire pour les sorties plage.',
          prices: {
            '2h': 8,
            'half-day': 10,
            day: 13,
            '24h': 15,
            '7d': 45,
            '15d': 80,
          },
        },
      ],
      steps: [
        {
          kind: 'bikes',
          label: 'Vélos',
          short: 'Quantités',
          title: 'Choisissez vos compagnons de route',
          description:
            'Vous pouvez réserver plusieurs catégories en même temps, par exemple adulte et enfant. Les tailles se génèrent automatiquement selon le nombre de vélos.',
        },
        {
          kind: 'schedule',
          label: 'Forfait',
          short: 'Dates',
          title: 'Définissez votre forfait et votre départ',
          description:
            'Le montant suit le forfait choisi. La date de retour est estimée automatiquement selon la durée sélectionnée.',
        },
        {
          kind: 'options',
          label: 'Options',
          short: 'Extras',
          title: 'Ajoutez les compléments utiles',
          description:
            'Remorque, siège bébé ou rack de surf peuvent être ajoutés à votre réservation et seront intégrés au montant total.',
        },
        {
          kind: 'contact',
          label: 'Contact',
          short: 'Coordonnées',
          title: 'Ajoutez vos coordonnées',
          description:
            'Le contact reste en fin de parcours, juste avant la validation du récapitulatif.',
          fields: [
            {
              type: 'text',
              name: 'first_name',
              label: 'Prénom',
              placeholder: 'Votre prénom',
              required: true,
            },
            {
              type: 'text',
              name: 'last_name',
              label: 'Nom',
              placeholder: 'Votre nom',
              required: true,
            },
            {
              type: 'email',
              name: 'email',
              label: 'Email',
              placeholder: 'vous@exemple.fr',
              required: true,
            },
            {
              type: 'tel',
              name: 'phone',
              label: 'Téléphone',
              placeholder: '+33 6 00 00 00 00',
              required: true,
            },
          ],
        },
        {
          kind: 'review',
          label: 'Montant',
          short: 'Récap',
          title: 'Dernière étape',
          description:
            'Le récapitulatif reprend chaque ligne sélectionnée avec le montant issu de la grille tarifaire 2024.',
        },
      ],
    },
  },
  {
    type: 'featureCards',
    props: {
      id: 'reservation-options',
      width: 'wide',
      title: 'Nos options de location',
      description:
        'Des formules flexibles pour des séjours courts, longs ou en groupe.',
      centered: true,
      items: [
        {
          icon: 'bike',
          title: 'Multi-catégories',
          description:
            'Adultes, enfants et configurations mixtes dans une seule réservation.',
        },
        {
          icon: 'calendar',
          title: 'Forfaits 2024',
          description:
            'Le montant dépend directement du temps de location choisi.',
        },
        {
          icon: 'shield',
          title: 'Tailles adaptées',
          description:
            'Chaque vélo sélectionné génère une taille personne pour préparer le bon matériel.',
        },
        {
          icon: 'route',
          title: 'Total instantané',
          description:
            'Le récap calcule le prix de chaque ligne et le total final.',
        },
      ],
    },
  },
  {
    type: 'contactSites',
    props: {
      id: 'reservation-sites',
      width: 'wide',
      eyebrow: 'Informations',
      title: 'Nos sites',
      description: 'Retrouvez les points de retrait et les contacts utiles',
      contacts: [
        {
          icon: 'email',
          label: 'Email',
          value: 'contact@atlanticbike.fr',
          href: 'mailto:contact@atlanticbike.fr',
        },
        {
          icon: 'phone',
          label: 'Téléphone',
          value: '+33 5 56 03 22 33',
          href: 'tel:+33556032233',
        },
      ],
      sites: [
        {
          name: 'Maubuisson',
          description: '111 avenue de maubuisson, 33121 Carcans Maubuisson',
          linkLabel: 'Voir carte',
          href: '../Cartes/index.html#map-contact-title',
        },
        {
          name: 'Igesa Carcans',
          description:
            'Notre site partenaire pour des expériences de cyclisme uniques',
          linkLabel: 'Voir carte',
          href: '../Cartes/index.html#map-contact-title',
        },
      ],
      mapMedia: {
        icon: 'map',
        tone: 'neutral',
      },
    },
  },
  {
    type: 'infoSplit',
    props: {
      id: 'reservation-hours',
      width: 'wide',
      icon: 'clock',
      eyebrow: 'Organisation',
      title: 'Horaires de prise en charge et de retour',
      description:
        'Nos équipes vous accueillent chaque jour pour la remise et le retour du matériel. Les horaires exacts peuvent ensuite être connectés à vos données métier.',
      details: [
        'Prise en charge de 9h00 à 12h30 et de 14h00 à 18h30.',
        'Retour possible jusqu’à 18h30 au site sélectionné lors de la réservation.',
        'Un rappel automatique peut être branché plus tard sur la confirmation client.',
      ],
      media: {
        icon: 'image',
        tone: 'neutral',
      },
    },
  },
  {
    type: 'faq',
    props: {
      id: 'reservation-faq',
      width: 'narrow',
      title: 'FAQ',
      items: [
        {
          question: 'Puis-je modifier ma réservation après validation ?',
          answer:
            'Oui. Le mockup peut ensuite être relié à un espace client ou à un contact direct pour gérer les changements de dates, de site ou de type de vélo.',
        },
        {
          question:
            'Les accessoires sont-ils inclus dans toutes les formules ?',
          answer:
            'Les accessoires peuvent être proposés en option ou inclus selon la formule. Le flow dynamique permet déjà d’isoler ces choix par étape.',
        },
        {
          question: 'Quand dois-je arriver pour récupérer mon vélo ?',
          answer:
            'Il est recommandé d’arriver quelques minutes avant l’horaire choisi afin de vérifier le matériel et finaliser la remise.',
        },
        {
          question: 'Puis-je réserver pour plusieurs personnes ?',
          answer:
            'Oui. Le stepper prend déjà en compte la notion de groupe via le nombre de personnes et peut être enrichi avec des profils par participant.',
        },
        {
          question: 'Le formulaire est-il prêt pour une connexion API ?',
          answer:
            'Oui. La logique multi-étapes et le récapitulatif sont déjà séparés du markup de page, ce qui facilite le branchement à un backend ou à un moteur de réservation.',
        },
      ],
    },
  },
  {
    type: 'cta',
    props: {
      id: 'reservation-help',
      title: 'Besoin d’aide ?',
      description:
        'Notre équipe peut vous accompagner pour choisir la bonne formule avant réservation.',
      actions: [{ label: 'Nous contacter', href: '../contact/index.html#contact-support-title', variant: 'primary' }],
    },
  },
];

window.AtlanticBikeUI.renderNavbar(
  document.querySelector('[data-navbar-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'reservation',
  },
);

window.AtlanticBikeUI.renderPage(
  document.querySelector('[data-page-root]'),
  reservationSections,
);

window.AtlanticBikeUI.renderFooter(
  document.querySelector('[data-footer-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'reservation',
  },
);
