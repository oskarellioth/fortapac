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
      Pages: ["homePage", "aboutPage", "productFibcPage", "guideFibcPage", "contactPage"],
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

    contactPage: singleton({
      label: "Contact page",
      path: "src/content/contact",
      format: { data: "json" },
      // Keys must match src/content/contact.json exactly.
      schema: {
        heroEyebrow: bilingual("Hero eyebrow"),
        heroTitle: bilingual("Hero headline", "A full stop in brand orange is added automatically."),
        heroBody: bilingualLong("Hero paragraph"),

        benefits: fields.array(
          fields.object({
            title: bilingual("Title"),
            body: bilingualLong("Body"),
            icon: fields.text({ label: "Icon filename", description: "In public/icons/contact/." }),
          }),
          { label: "Benefits beside the form", itemLabel: (props) => props.fields.title.fields.en.value || "Benefit" },
        ),

        directHeading: bilingual("Reach us directly, heading"),
        detailsHeading: bilingual("Details, heading"),
        detailsEmailLabel: bilingual("Details, email label"),
        detailsPhoneLabel: bilingual("Details, phone label"),
        detailsAddressLabel: bilingual("Details, address label"),
        detailsHoursLabel: bilingual("Details, hours label"),
        detailsHours: bilingual("Opening hours"),
        responseNote: bilingual("Response time note"),

        formHeading: bilingual("Form, heading"),
        labelName: bilingual("Field, name"),
        labelCompany: bilingual("Field, company"),
        labelEmail: bilingual("Field, email"),
        labelPhone: bilingual("Field, phone"),
        labelProduct: bilingual("Field, product"),
        labelMessage: bilingual("Field, message"),
        messagePlaceholder: bilingualLong("Field, message placeholder"),
        optionalSuffix: bilingual("Optional marker"),
        requiredSuffix: bilingual("Required marker"),
        placeholderName: bilingual("Placeholder, name"),
        placeholderCompany: bilingual("Placeholder, company"),
        placeholderEmail: bilingual("Placeholder, email"),
        placeholderPhone: bilingual("Placeholder, phone"),
        placeholderProduct: bilingual("Placeholder, product dropdown"),
        productOptions: fields.array(bilingual("Option"), {
          label: "Product dropdown options",
          itemLabel: (props) => props.fields.en.value || "Option",
        }),

        consentLabel: bilingualLong(
          "Consent checkbox",
          "Required by GDPR. Do not remove the checkbox or weaken this wording without legal advice.",
        ),
        consentLinkText: bilingual("Consent, privacy policy link text"),
        submitButton: bilingual("Submit button"),
        submitSending: bilingual("Submit button, while sending"),

        successHeading: bilingual("Success, heading"),
        successBody: bilingualLong("Success, paragraph"),

        errorHeading: bilingual("Error, heading"),
        errorValidation: bilingualLong("Error, missing or invalid fields"),
        errorCaptcha: bilingualLong("Error, bot check failed"),
        errorRate: bilingualLong("Error, too many attempts"),
        errorServer: bilingualLong("Error, something broke on our side"),

        captchaNotice: bilingualLong(
          "Bot protection notice",
          "Names Cloudflare Turnstile. The privacy policy must keep naming it too.",
        ),

        seoTitle: bilingual("SEO title"),
        seoDescription: bilingualLong("SEO description"),
      },
    }),

    productFibcPage: singleton({
      label: "FIBC product page",
      path: "src/content/product-fibc",
      format: { data: "json" },
      // Keys must match src/content/product-fibc.json exactly, and every item in
      // an array must carry the same keys, or the entry blanks in the admin.
      schema: {
        crumbProducts: bilingual("Breadcrumb, products"),
        crumbHere: bilingual("Breadcrumb, this page"),

        heroEyebrow: bilingual("Hero eyebrow"),
        heroTitle: bilingual("Hero headline", "A full stop in brand orange is added automatically."),
        heroBody1: bilingualLong("Hero paragraph 1"),
        heroBody2: bilingualLong("Hero paragraph 2"),
        heroButton: bilingual("Hero button"),
        heroPhoto: fields.image({ label: "Hero photo", directory: "public/products/fibc", publicPath: "/products/fibc/" }),
        heroPhotoAlt: bilingualLong("Hero photo, alt text", "Describe the photo for screen readers and search."),

        specs: fields.array(
          fields.object({
            value: fields.text({ label: "Value", description: "Shown in both languages, e.g. 500-2 000 kg. Leave empty to use the worded value below." }),
            valueLabel: bilingual("Worded value", "Used only when Value is empty, e.g. Custom / Printed."),
            label: bilingual("Label"),
            icon: fields.text({ label: "Icon filename", description: "In public/icons/fibc/. Use a -light variant: this strip sits on navy." }),
          }),
          { label: "Spec strip", itemLabel: (props) => props.fields.label.fields.en.value || "Spec" },
        ),

        rangeEyebrow: bilingual("Range, eyebrow"),
        rangeHeading: bilingual("Range, heading"),
        range: fields.array(
          fields.object({
            name: bilingual("Name"),
            body: bilingualLong("Body"),
            photo: fields.image({ label: "Photo", directory: "public/products/fibc", publicPath: "/products/fibc/" }),
          }),
          { label: "Range cards", itemLabel: (props) => props.fields.name.fields.en.value || "Card" },
        ),

        builtEyebrow: bilingual("Configuration, eyebrow"),
        builtHeading: bilingual("Configuration, heading"),
        builtBody: bilingualLong("Configuration, paragraph"),
        matrix: fields.array(
          fields.object({
            label: bilingual("Row label"),
            options: bilingual("Options", "Separate with a middle dot, e.g. Circular · U-panel · 4-panel."),
            icon: fields.text({ label: "Icon filename", description: "In public/icons/fibc/." }),
          }),
          { label: "Configuration rows", itemLabel: (props) => props.fields.label.fields.en.value || "Row" },
        ),

        appEyebrow: bilingual("Applications, eyebrow"),
        appHeading: bilingual("Applications, heading"),
        appBody: bilingualLong("Applications, paragraph"),
        appPhoto: fields.image({ label: "Applications photo", directory: "public/products/fibc", publicPath: "/products/fibc/" }),
        appPhotoAlt: bilingualLong("Applications photo, alt text"),
        applications: fields.array(bilingual("Application"), {
          label: "Applications",
          itemLabel: (props) => props.fields.en.value || "Application",
        }),

        directEyebrow: bilingual("Manufacturing band, eyebrow"),
        directHeadingLine1: bilingual("Manufacturing band, heading line 1"),
        directHeadingLine2: bilingual("Manufacturing band, heading line 2"),
        directBody: bilingualLong("Manufacturing band, paragraph"),
        directColumns: fields.array(
          fields.object({
            label: bilingual("Label"),
            body: bilingualLong("Body"),
            icon: fields.text({ label: "Icon filename", description: "In public/icons/fibc/. Use a -light variant: this band is navy." }),
          }),
          { label: "Manufacturing columns", itemLabel: (props) => props.fields.label.fields.en.value || "Column" },
        ),

        helpEyebrow: bilingual("Help panel, eyebrow"),
        helpHeading: bilingual("Help panel, heading"),
        helpBody: bilingualLong("Help panel, paragraph"),
        helpButtonPrimary: bilingual("Help panel, primary button"),
        helpButtonSecondary: bilingual("Help panel, secondary button"),
        helpGuideLink: bilingual("Help panel, link to the selection guide"),

        seoTitle: bilingual("SEO title"),
        seoDescription: bilingualLong("SEO description"),
      },
    }),

    guideFibcPage: singleton({
      label: "FIBC selection guide",
      path: "src/content/guide-fibc",
      format: { data: "json" },
      // Every key here has to match src/content/guide-fibc.json exactly. A field
      // declared here but missing from the file, or present in the file but not
      // declared here, fails validation and blanks the whole entry in the admin.
      schema: {
        heroEyebrow: bilingual("Hero eyebrow"),
        heroTitle: bilingual("Hero headline"),
        heroIntro: bilingualLong("Hero paragraph"),

        summaryEyebrow: bilingual("Short answer, eyebrow"),
        summaryHeading: bilingual("Short answer, heading"),
        summaryBody: bilingualLong(
          "Short answer, paragraph",
          "The paragraph most likely to be quoted by search engines and AI assistants. It must make sense on its own, without the tables below.",
        ),

        stepsEyebrow: bilingual("Steps, eyebrow"),
        stepsHeading: bilingual("Steps, heading"),
        steps: fields.array(
          fields.object({
            number: fields.text({ label: "Number", description: "e.g. 01" }),
            title: bilingual("Title"),
            body: bilingualLong("Body"),
            note: bilingualLong("Note", "Optional. Shown in smaller type with an orange rule."),
          }),
          { label: "Steps", itemLabel: (props) => props.fields.title.fields.en.value || "Step" },
        ),

        densityEyebrow: bilingual("Density table, eyebrow"),
        densityHeading: bilingual("Density table, heading"),
        densityIntro: bilingualLong("Density table, intro"),
        densityColumns: fields.object(
          {
            material: bilingual("Column 1"),
            density: bilingual("Column 2"),
            volume: bilingual("Column 3"),
          },
          { label: "Density table, column headings" },
        ),
        densities: fields.array(
          fields.object({
            material: bilingual("Material"),
            density: fields.text({ label: "Bulk density, kg/m3", description: "e.g. 1 400-1 500" }),
            volume: fields.text({ label: "Volume per tonne, m3", description: "e.g. 0,67-0,71" }),
          }),
          { label: "Density rows", itemLabel: (props) => props.fields.material.fields.en.value || "Row" },
        ),

        typeEyebrow: bilingual("Type table, eyebrow"),
        typeHeading: bilingual("Type table, heading"),
        typeIntro: bilingualLong("Type table, intro"),
        typeColumns: fields.object(
          {
            type: bilingual("Column 1"),
            fabric: bilingual("Column 2"),
            grounding: bilingual("Column 3"),
            use: bilingual("Column 4"),
          },
          { label: "Type table, column headings" },
        ),
        types: fields.array(
          fields.object({
            type: fields.text({ label: "Type letter", description: "A, B, C or D" }),
            fabric: bilingualLong("Fabric"),
            grounding: bilingual("Grounding"),
            use: bilingualLong("Use for"),
          }),
          { label: "Types", itemLabel: (props) => `Type ${props.fields.type.value || "?"}` },
        ),
        typeWarning: bilingualLong(
          "Type table, warning",
          "Safety wording. Do not soften this without checking with the factory.",
        ),

        constructionEyebrow: bilingual("Constructions, eyebrow"),
        constructionHeading: bilingual("Constructions, heading"),
        constructions: fields.array(
          fields.object({ name: bilingual("Name"), body: bilingualLong("Body") }),
          { label: "Constructions", itemLabel: (props) => props.fields.name.fields.en.value || "Construction" },
        ),

        flowEyebrow: bilingual("Filling and discharge, eyebrow"),
        flowHeading: bilingual("Filling and discharge, heading"),
        fillingLabel: bilingual("Filling column label"),
        dischargeLabel: bilingual("Discharge column label"),
        filling: fields.array(
          fields.object({ name: bilingual("Name"), body: bilingualLong("Body") }),
          { label: "Filling options", itemLabel: (props) => props.fields.name.fields.en.value || "Option" },
        ),
        discharge: fields.array(
          fields.object({ name: bilingual("Name"), body: bilingualLong("Body") }),
          { label: "Discharge options", itemLabel: (props) => props.fields.name.fields.en.value || "Option" },
        ),

        checklistEyebrow: bilingual("Checklist, eyebrow"),
        checklistHeading: bilingual("Checklist, heading"),
        checklistIntro: bilingualLong("Checklist, intro"),
        checklist: fields.array(bilingualLong("Item"), {
          label: "Checklist items",
          itemLabel: (props) => props.fields.en.value?.slice(0, 45) || "Item",
        }),

        supplyEyebrow: bilingual("What we supply, eyebrow"),
        supplyHeading: bilingual("What we supply, heading"),
        supplyBody: bilingualLong(
          "What we supply, paragraph",
          "Only state what the factory has confirmed. While this still contains [FYLL I: ...] the site will refuse to build for the live domain.",
        ),

        ctaEyebrow: bilingual("Contact band, eyebrow"),
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

        // Registered-entity details. These appear only in the legal pages'
        // fine print, never in marketing copy: Fortapac is the brand
        // everywhere a customer sees it. Swedish law requires the registered
        // name and organisationsnummer on commercial communications.
        legalEntityName: fields.text({
          label: "Registered legal entity",
          defaultValue: "Britpac AB",
          description: "Legal pages only. Never shown in marketing copy.",
        }),
        orgNumber: fields.text({
          label: "Organisationsnummer",
          defaultValue: "",
          description: "Swedish company registration number, format NNNNNN-NNNN.",
        }),
        vatNumber: fields.text({
          label: "VAT number",
          defaultValue: "",
          description: "Momsregistreringsnummer, e.g. SE556123456701.",
        }),
        registeredAddress: fields.text({
          label: "Registered address",
          multiline: true,
          defaultValue: "",
          description: "Full postal address of the registered office.",
        }),
        privacyEmail: fields.text({
          label: "Data protection contact email",
          defaultValue: "",
          description: "Where privacy requests go. Falls back to the contact email.",
        }),

        // Used in structured data, which is how search engines connect the
        // site to the real company.
        phone: fields.text({
          label: "Phone number",
          defaultValue: "",
          description: "International format, e.g. +46 31 123 45 67.",
        }),
        linkedin: fields.text({
          label: "LinkedIn URL",
          defaultValue: "",
          description: "Company page. Helps search engines link the site to the company.",
        }),
        shareImage: fields.image({
          label: "Social share image",
          directory: "public/share",
          publicPath: "/share/",
          description:
            "1200x630. Shown when a link is shared in LinkedIn, Slack or email. Falls back to the hero photo if empty.",
        }),
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
    legal: collection({
      label: "Legal pages",
      slugField: "key",
      path: "src/content/legal/*",
      format: { data: "json" },
      columns: ["key"],
      schema: {
        key: fields.slug({
          name: {
            label: "Key",
            description:
              "privacy, terms or cookies. Determines the URL, so do not change it once live.",
          },
        }),
        order: fields.integer({ label: "Sort order", defaultValue: 0 }),
        title: bilingual("Page title"),
        intro: bilingualLong("Intro paragraph"),
        lastUpdated: fields.text({
          label: "Last updated",
          description: "Shown to visitors, e.g. 1 September 2026.",
          defaultValue: "",
        }),
        sections: fields.array(
          fields.object({
            heading: bilingual("Heading"),
            body: bilingualLong("Body", "Blank lines start a new paragraph."),
          }),
          {
            label: "Sections",
            itemLabel: (props) => props.fields.heading.fields.en.value || "Section",
          },
        ),
      },
    }),

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
