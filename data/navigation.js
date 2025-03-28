export default [
  {
    label: "Accueil",

    url: "/",
  },
  {
    label: "a propos de nous",
    url: "/about",
  },
  {
    label: " Solutions & Réalisations",
    dropdown: [
      {
        label: "Services",
        url: "/service ",
      },

      {
        label: "Solutions innovantes",
        dropdown: [
          {
            label: "ECO-BOOT",
            url: "/service-details",
          },
          {
            label: "POLY-BOOT",
            url: "/service-details/poly-boot",
          },
        ],
      },
      {
        label: "Réalisations",
        url: "/Réalisations",
      },
      {
        label: "Team",
        dropdown: [
          {
            label: "Team",
            url: "/team",
          },
          {
            label: "Team Details",
            url: "/team-details",
          },
        ],
      },
      {
        label: "Portfolio",
        dropdown: [
          {
            label: "Portfolio 1",
            url: "/portfolio-1",
          },
          {
            label: "Portfolio 2",
            url: "/portfolio-2",
          },
          {
            label: "Portfolio Details",
            url: "/portfolio-details",
          },
        ],
      },
      {
        label: "Product",
        dropdown: [
          {
            label: "Product",
            url: "/product",
          },
          {
            label: "Product Details",
            url: "/product-details",
          },
          {
            label: "Cart",
            url: "/cart",
          },
          {
            label: "Checkout",
            url: "/checkout",
          },
        ],
      },
      {
        label: "Utilities",
        dropdown: [
          {
            label: "404",
            url: "/not-found",
          },
          {
            label: "FAQ",
            url: "/faq",
          },
        ],
      },
    ],
  },
  {
    label: "Calculette",
    url: "/Calculette",
  },
  {
    label: "Contact",
    url: "/contact",
  },
];
