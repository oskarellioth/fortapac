import { config, fields, collection, singleton } from "@keystatic/core";

/**
 * Bilingual helpers.
 *
 * Keystatic has no built-in i18n, and the two usual workarounds are a separate
 * collection per locale or paired fields on one entry. Paired fields win here:
 * the team edits Swedish and English side by side and can see at a glance when
 * a translation is missing, rather than hunting for the matching entry in
 * another collection and hoping the slugs still line up.
 */
const bilingual = (label: string, description?: string) =>
  fields.object(
    {
      sv: fields.text({ label: "Svenska", multiline: false }),
      en: fields.text({ label: "English", multiline: false }),
    },
    { label, description, layout: [6, 6] },
  );

const bilingualLong = (label: string, description?: string) =>
  fields.object(
    {
      sv: fields.text({ label: "Svenska", multiline: true }),
      en: fields.text({ label: "English", multiline: true }),
    },
    { label, description, layout: [6, 6] },
  );

export default config({
  // GitHub storage: Save becomes a commit to the repo, so the CMS works from
  // any machine for anyone with write access, rather than only against the
  // local filesystem. Local mode could never work on Vercel, whose filesystem
  // is read-only and has no checkout, which is why the hosted admin was blank.
  //
  // Requires a Keystatic GitHub App, which supplies KEYSTATIC_GITHUB_CLIENT_ID,
  // KEYSTATIC_GITHUB_CLIENT_SECRET and KEYSTATIC_SECRET. Visiting /keystatic
  // without those walks through creating it.
  storage: {
    kind: "github",
    repo: { owner: "oskarellioth", name: "fortapac" },
  },

  ui: {
    brand: { name: "Fortapac" },
    navigation: {
      Pages: ["homePage", "aboutPage"],
      Catalogue: ["products", "industries"],
      Settings: ["navigation", "siteSettings"],
    },
  },

  singletons: {
    homePage: singleton({
      label: "Home page",
      path: "src/content/home",
      format: { data: "json" },
      schema: {
        heroTitleLine1: bilingual("Hero headline, line 1"),
        heroTitleLine2: bilingual("Hero headline, line 2"),
        heroBody: bilingualLong("Hero paragraph"),
        heroButtonPrimary: bilingual("Hero button, primary"),
        heroButtonSecondary: bilingual("Hero button, secondary"),
        heroBadge: bilingual("Flag badge text"),
        heroImage: fields.image({
          label: "Hero photo, desktop",
          directory: "public/hero",
          publicPath: "/hero/",
          description: "Landscape. Roughly 2400x1200. Product on the right.",
        }),
        heroImageMobile: fields.image({
          label: "Hero photo, mobile",
          directory: "public/hero",
          publicPath: "/hero/",
          description: "Portrait crop for phones.",
        }),

        productsEyebrow: bilingual("Products section, eyebrow"),
        productsHeading: bilingual("Products section, heading"),
        productsLink: bilingual("Products section, link text"),

        specEyebrow: bilingual("Spec band, eyebrow"),
        specHeading: bilingual("Spec band, heading"),
        specSwlValue: fields.text({ label: "Spec: SWL value", defaultValue: "1,000-2,000 kg" }),
        specSwlLabel: bilingual("Spec: SWL label"),
        specSafetyValue: fields.text({ label: "Spec: safety factor value", defaultValue: "5:1" }),
        specSafetyLabel: bilingual("Spec: safety factor label"),
        specUvValue: fields.text({ label: "Spec: UV value", defaultValue: "UV" }),
        specUvLabel: bilingual("Spec: UV label"),
        specRecycleValue: fields.text({ label: "Spec: recyclable value", defaultValue: "100%" }),
        specRecycleLabel: bilingual("Spec: recyclable label"),

        industriesEyebrow: bilingual("Industries section, eyebrow"),
        industriesHeading: bilingual("Industries section, heading"),
        industriesLink: bilingual("Industries section, link text"),

        materialsEyebrow: bilingual("Materials section, eyebrow"),
        materialsHeading: bilingual("Materials section, heading"),
        materialsBody: bilingualLong("Materials section, paragraph"),
        materialsLink: bilingual("Materials section, link text"),

        sustainabilityEyebrow: bilingual("Sustainability, eyebrow"),
        sustainabilityHeading: bilingual("Sustainability, heading"),
        sustainabilityCards: fields.array(
          fields.object({
            title: bilingual("Title"),
            body: bilingualLong("Body"),
          }),
          {
            label: "Sustainability cards",
            itemLabel: (props) => props.fields.title.fields.en.value || "Card",
          },
        ),

        ctaHeading: bilingual("Contact band, heading"),
        ctaBody: bilingualLong("Contact band, paragraph"),

        seoTitle: bilingual("SEO title"),
        seoDescription: bilingualLong("SEO description"),
      },
    }),

    aboutPage: singleton({
      label: "About page",
      path: "src/content/about",
      format: { data: "json" },
      schema: {
        heroEyebrow: bilingual("Hero eyebrow"),
        heroTitleLine1: bilingual("Hero headline, line 1"),
        heroTitleLine2: bilingual("Hero headline, line 2"),
        heroBody: bilingualLong("Hero paragraph"),

        pillarsEyebrow: bilingual("Pillars, eyebrow"),
        pillarsHeading: bilingual("Pillars, heading"),
        pillars: fields.array(
          fields.object({
            number: fields.text({ label: "Number label", description: "e.g. 01 - LOCAL" }),
            title: bilingual("Title"),
            body: bilingualLong("Body"),
          }),
          {
            label: "Pillars",
            itemLabel: (props) => props.fields.title.fields.en.value || "Pillar",
          },
        ),

        storyEyebrow: bilingual("Story, eyebrow"),
        storyHeading: bilingual("Story, heading"),
        storyParagraphs: fields.array(
          bilingualLong("Paragraph", "Wrap words in **double asterisks** to bold them."),
          {
            label: "Story paragraphs",
            itemLabel: (props) => props.fields.en.value?.slice(0, 45) || "Paragraph",
          },
        ),

        ctaHeading: bilingual("Contact band, heading"),
        ctaBody: bilingualLong("Contact band, paragraph"),
        ctaButton: bilingual("Contact band, button"),

        seoTitle: bilingual("SEO title"),
        seoDescription: bilingualLong("SEO description"),
      },
    }),

    navigation: singleton({
      label: "Navigation",
      path: "src/content/navigation",
      format: { data: "json" },
      schema: {
        navProducts: bilingual("Nav: Products"),
        navIndustries: bilingual("Nav: Industries"),
        navMaterials: bilingual("Nav: Materials"),
        navSustainability: bilingual("Nav: Sustainability"),
        navAbout: bilingual("Nav: About"),
        navContact: bilingual("Nav: Contact"),
        ctaQuote: bilingual("Get a quote button"),

        productsMegaHeading: bilingual("Products menu, heading"),
        productsMegaBody: bilingualLong("Products menu, paragraph"),
        productsMegaLink: bilingual("Products menu, link text"),
        productsMegaAddons: fields.array(
          fields.object({
            title: bilingual("Title"),
            subtitle: bilingual("Subtitle"),
            icon: fields.image({
              label: "Icon",
              directory: "public/icons",
              publicPath: "/icons/",
            }),
          }),
          {
            label: "Products menu, bottom strip",
            itemLabel: (props) => props.fields.title.fields.en.value || "Item",
          },
        ),

        industriesMegaHeading: bilingual("Industries menu, heading"),
        industriesMegaBody: bilingualLong("Industries menu, paragraph"),
        industriesMegaLink: bilingual("Industries menu, link text"),
        industriesMegaValues: fields.array(
          fields.object({
            title: bilingual("Title"),
            subtitle: bilingual("Subtitle"),
            icon: fields.image({
              label: "Icon, white line art",
              directory: "public/icons",
              publicPath: "/icons/",
            }),
          }),
          {
            label: "Industries menu, value tiles",
            itemLabel: (props) => props.fields.title.fields.en.value || "Tile",
          },
        ),
        industriesMegaAddons: fields.array(
          fields.object({
            title: bilingual("Title"),
            subtitle: bilingual("Subtitle"),
            icon: fields.image({
              label: "Icon",
              directory: "public/icons",
              publicPath: "/icons/",
            }),
          }),
          {
            label: "Industries menu, bottom strip",
            itemLabel: (props) => props.fields.title.fields.en.value || "Item",
          },
        ),
      },
    }),

    siteSettings: singleton({
      label: "Site settings",
      path: "src/content/site",
      format: { data: "json" },
      schema: {
        companyName: fields.text({ label: "Company name", defaultValue: "Fortapac AB" }),
        city: fields.text({ label: "City", defaultValue: "Göteborg, Sweden" }),
        email: fields.text({ label: "Contact email", defaultValue: "hello@fortapac.se" }),
        footerBlurb: bilingualLong("Footer blurb"),
        madeIn: bilingual("Flag badge text"),
        newsletterBody: bilingualLong("Newsletter blurb"),
        newsletterPlaceholder: bilingual("Newsletter input placeholder"),
        copyright: bilingual("Copyright line"),
        footerColProducts: bilingual("Footer column: Products"),
        footerColIndustries: bilingual("Footer column: Industries"),
        footerColCompany: bilingual("Footer column: Company"),
        footerColContact: bilingual("Footer column: Contact"),
        footerColNewsletter: bilingual("Footer column: Newsletter"),
        footerAbout: bilingual("Footer link: About"),
        footerQuality: bilingual("Footer link: Quality"),
        footerResources: bilingual("Footer link: Resources"),
        footerPrivacy: bilingual("Footer link: Privacy"),
        footerTerms: bilingual("Footer link: Terms"),
        footerCookies: bilingual("Footer link: Cookies"),
      },
    }),
  },

  collections: {
    products: collection({
      label: "Products",
      slugField: "key",
      path: "src/content/products/*",
      format: { data: "json" },
      columns: ["key"],
      schema: {
        key: fields.slug({
          name: {
            label: "Key",
            description: "Internal id. Changing this can break links, so leave it alone once set.",
          },
        }),
        order: fields.integer({ label: "Sort order", defaultValue: 0 }),
        name: bilingual("Product name"),
        menuBlurb: bilingualLong("Menu description", "Short line in the Products menu."),
        focusBlurb: bilingualLong("Featured description", "Longer line in the menu's dark panel."),
        cardBlurb: bilingualLong("Card description", "Used on the home page grid."),
        cardMeta: bilingual("Card footer text", "e.g. SWL 500-2000 kg"),
        icon: fields.image({
          label: "Line art icon",
          directory: "public/products",
          publicPath: "/products/",
        }),
        photo: fields.image({
          label: "Featured photo",
          directory: "public/products/focus",
          publicPath: "/products/focus/",
          description: "16:9 landscape, roughly 1600x900.",
        }),
        specs: fields.array(
          fields.object({
            value: fields.text({ label: "Value" }),
            label: bilingual("Label"),
          }),
          {
            label: "Spec strip",
            itemLabel: (props) => props.fields.value.value || "Spec",
          },
        ),
      },
    }),

    industries: collection({
      label: "Industries",
      slugField: "key",
      path: "src/content/industries/*",
      format: { data: "json" },
      columns: ["key"],
      schema: {
        key: fields.slug({ name: { label: "Key" } }),
        order: fields.integer({ label: "Sort order", defaultValue: 0 }),
        name: bilingual("Industry name"),
        blurb: bilingualLong("Description"),
        icon: fields.image({
          label: "Line art icon",
          directory: "public/icons/industries",
          publicPath: "/icons/industries/",
        }),
        photo: fields.image({
          label: "Featured photo",
          directory: "public/industries/focus",
          publicPath: "/industries/focus/",
          description: "16:9 landscape, roughly 1600x900.",
        }),
      },
    }),
  },
});
