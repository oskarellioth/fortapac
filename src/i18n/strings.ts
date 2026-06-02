export type Locale = "sv" | "en";

export const LOCALES: Locale[] = ["sv", "en"];
export const DEFAULT_LOCALE: Locale = "sv";

// Slugs per locale — used to build canonical URLs and the language switcher.
export const ROUTES = {
  home: { sv: "/", en: "/en" },
  about: { sv: "/om-oss", en: "/en/about" },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function routeFor(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

// Find which RouteKey (if any) the given pathname maps to, ignoring locale.
export function routeKeyForPath(pathname: string): RouteKey | null {
  // Normalise trailing slash
  const p = pathname.replace(/\/$/, "") || "/";
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    const { sv, en } = ROUTES[key];
    if (p === sv.replace(/\/$/, "") || p === en.replace(/\/$/, "")) return key;
    // also match the bare "/" → home/sv
    if (key === "home" && (p === "/" || p === "/en")) return "home";
  }
  return null;
}

export const STRINGS = {
  // ───── Header / nav / mega ─────
  nav_products: { sv: "Produkter", en: "Products" },
  nav_industries: { sv: "Industrier", en: "Industries" },
  nav_material: { sv: "Material", en: "Materials" },
  nav_about: { sv: "Om oss", en: "About us" },
  nav_sustainability: { sv: "Hållbarhet", en: "Sustainability" },
  nav_contact: { sv: "Kontakt", en: "Contact" },
  cta_get_quote: { sv: "Begär offert", en: "Get a quote" },
  open_menu: { sv: "Öppna meny", en: "Open menu" },

  mega_eyebrow: { sv: "Produkter", en: "Products" },
  mega_headline: {
    sv: "Vävda lösningar för last, lagring och transport.",
    en: "Woven solutions for load, storage and transport.",
  },
  mega_intro: {
    sv: "Tillverkade i vår egen fabrik. Specificerade, lagerförda och stödda från Sverige.",
    en: "Manufactured at our own factory. Specified, stocked and supported from Sweden.",
  },
  mega_view_all: { sv: "Se alla produkter", en: "View all products" },
  mega_product_photo: { sv: "Produktbild kommer snart", en: "Product photo coming soon" },
  mega_focus_badge: { sv: "Produkt i fokus", en: "Featured product" },
  mega_focus_link: { sv: "Visa produktdetaljer", en: "View product details" },

  spec_swl: { sv: "SWL", en: "SWL" },
  spec_safety_factor: { sv: "Säkerhetsfaktor", en: "Safety factor" },
  spec_uv: { sv: "UV", en: "UV" },
  spec_material: { sv: "Material", en: "Material" },
  spec_stabilised: { sv: "Stabiliserad", en: "Stabilised" },
  spec_optional: { sv: "Tillval", en: "Optional" },

  addon_custom_sizes: { sv: "Anpassade lösningar", en: "Custom solutions" },
  addon_custom_sub: { sv: "Skräddarsytt efter dina behov", en: "Tailored to your needs" },
  addon_printed_logos: { sv: "Tryck & logotyp", en: "Print & branding" },
  addon_print_sub: { sv: "Högkvalitativ profilering", en: "High-quality branding" },
  addon_uv_options: { sv: "UV-alternativ", en: "UV options" },
  addon_uv_sub: { sv: "Ökad hållbarhet", en: "Increased durability" },
  addon_liners_coatings: { sv: "Liners & beläggningar", en: "Liners & coatings" },
  addon_liners_sub: { sv: "Extra skydd och täthet", en: "Extra protection and sealing" },
  addon_tech_support: { sv: "Teknisk support", en: "Technical support" },
  addon_support_sub: { sv: "Rådgivning i varje steg", en: "Guidance at every stage" },

  // ───── Industries mega menu ─────
  ind_mega_eyebrow: { sv: "Industrier", en: "Industries" },
  ind_mega_headline: {
    sv: "Vävda förpackningar för last, lagring och transport.",
    en: "Woven packaging for load, storage and transport.",
  },
  ind_mega_intro: {
    sv: "Anpassade lösningar som skyddar dina produkter, stödjer din verksamhet och driver din affär framåt.",
    en: "Engineered solutions that protect your products, support your operations and move your business forward.",
  },
  ind_mega_view_all: { sv: "Se alla industrier", en: "View all industries" },

  industry_construction_desc: {
    sv: "Storsäckar, överdrag och liners för cement, sand, ballast och byggmaterial.",
    en: "Bulk bags, covers and liners for cement, sand, aggregates and building materials.",
  },
  industry_agriculture_desc: {
    sv: "PP-säckar och storsäckar för spannmål, utsäde, foder och gödsel.",
    en: "PP woven sacks and bulk bags for grain, seeds, feed and fertilisers.",
  },
  industry_chemicals_desc: {
    sv: "Säckar och liners för pulver, granulat och farligt material.",
    en: "Sacks and liners for powders, granules and hazardous materials.",
  },
  industry_forestry_desc: {
    sv: "UV-stabiliserade överdrag för timmerstaplar och massaved.",
    en: "UV-stabilised covers for stacked timber and pulp protection.",
  },
  industry_mining_name: { sv: "Gruva & Mineral", en: "Mining & Minerals" },
  industry_mining_desc: {
    sv: "Tunga storsäckar och skyddsöverdrag för utvunnet material och malm.",
    en: "Heavy-duty bulk bags and protective covers for mined materials and ores.",
  },
  industry_logistics_full: { sv: "Logistik & Lager", en: "Logistics & Storage" },
  industry_logistics_desc: {
    sv: "Överdrag, liners och dunnage för lagring, hantering och transport.",
    en: "Covers, liners and dunnage solutions for storage, handling and transport.",
  },

  // Right showcase value props (white-on-navy)
  value_protects_title: { sv: "Skyddar produkter", en: "Protects products" },
  value_protects_sub: { sv: "Konstruerade för säkerhet och pålitlighet", en: "Engineered for safety and reliability" },
  value_weather_title: { sv: "Väderbeständiga", en: "Weather resistant" },
  value_weather_sub: { sv: "Byggda att prestera i tuffa förhållanden", en: "Built to perform in tough conditions" },
  value_heavy_title: { sv: "Byggda för tunga laster", en: "Built for heavy loads" },
  value_heavy_sub: { sv: "Starka material för krävande behov", en: "Strong materials for demanding needs" },
  value_sustainable_title: { sv: "Hållbara alternativ", en: "Sustainable options" },
  value_sustainable_sub: { sv: "Ansvarsfulla lösningar för en bättre framtid", en: "Responsible solutions for a better future" },

  // Bottom addon strip — industries variant
  ind_addon_custom: { sv: "Skräddarsydda lösningar", en: "Custom solutions" },
  ind_addon_custom_sub: { sv: "Anpassat efter dina behov", en: "Tailored to your needs" },
  ind_addon_quality: { sv: "Konsekvent kvalitet", en: "Consistent quality" },
  ind_addon_quality_sub: { sv: "Pålitliga material och strikta standarder", en: "Trusted materials and strict standards" },
  ind_addon_global: { sv: "Global leverans", en: "Global supply" },
  ind_addon_global_sub: { sv: "Pålitlig leverans världen över", en: "Reliable delivery worldwide" },
  ind_addon_support: { sv: "Teknisk support", en: "Technical support" },
  ind_addon_support_sub: { sv: "Expertis i varje steg", en: "Expert guidance at every step" },

  // ───── Products ─────
  product_fibc_name: { sv: "FIBC Storsäckar", en: "FIBC Bulk Bags" },
  product_fibc_short: {
    sv: "500–2 000 kg SWL säckar för torra, flytande och pastösa produkter.",
    en: "500–2,000 kg SWL containers for dry, flowable and paste-like products.",
  },
  product_fibc_focus: {
    sv: "Starka, pålitliga och UN-certifierade för säker transport av torra, flytande och pastösa produkter.",
    en: "Strong, reliable and UN-certified for safe transport of dry, flowable and paste-like products.",
  },
  product_fibc_card: {
    sv: "Robusta storsäckar för pulver, granulat och bulkvaror.",
    en: "Heavy duty bulk bags for powders, granules and commodities.",
  },
  product_fibc_capacity: { sv: "SWL 500–2 000 kg", en: "SWL 500–2000 kg" },

  product_sacks_name: { sv: "PP Vävda Säckar", en: "PP Woven Sacks" },
  product_sacks_short: {
    sv: "Ventilsäckar, öppen mynning och leno-säckar för spannmål, foder, kemikalier m.m.",
    en: "Valve, open-mouth and leno sacks for grain, feed, chemicals and more.",
  },
  product_sacks_focus: {
    sv: "Flexibla, vävda säckar i många utföranden — för spannmål, foder, kemi, bygg och industri.",
    en: "Flexible woven sacks in many configurations — for grain, feed, chemicals, construction and industry.",
  },
  product_sacks_card: {
    sv: "Starka och mångsidiga säckar för industri och jordbruk.",
    en: "Strong and versatile sacks for industrial and agricultural applications.",
  },
  product_sacks_capacity: { sv: "10–100 kg kapacitet", en: "10–100 kg capacity" },

  product_forestry_name: { sv: "Skyddsöverdrag", en: "Protective Covers" },
  product_forestry_short: {
    sv: "UV-stabiliserade överdrag för timmer, flis och massaved.",
    en: "UV-stabilised covers for timber, wood chip and pulpwood.",
  },
  product_forestry_focus: {
    sv: "UV-stabiliserade överdrag som skyddar timmerstaplar, flis och massaved mot väder och vind.",
    en: "UV-stabilised covers that protect timber stacks, wood chip and pulpwood from the elements.",
  },
  product_forestry_card: {
    sv: "Hållbara överdrag för timmerstaplar och skogsbruk.",
    en: "Durable covers for timber stacks and forestry operations.",
  },
  product_forestry_capacity: { sv: "UV-stabiliserade", en: "UV stabilised" },

  product_covers_name: { sv: "Innerpåsar & Liners", en: "Inner Bags & Liners" },
  product_covers_short: {
    sv: "Tältdukar, markskydd och containerliners i olika utföranden.",
    en: "Tarpaulins, ground covers and container liners in many configurations.",
  },
  product_covers_focus: {
    sv: "Innerpåsar och liners i PE och PP — extra skydd, täthet och separation för dina förpackningar.",
    en: "Inner bags and liners in PE and PP — extra protection, sealing and separation for your packaging.",
  },
  product_covers_card: {
    sv: "Skyddsöverdrag och liners för transport, lager och arbetsplats.",
    en: "Protective covers and liners built for transport, storage and site use.",
  },
  product_covers_capacity: { sv: "Måttbeställda", en: "Custom made" },

  product_rolls_name: { sv: "Väv & Rullar", en: "Fabric & Rolls" },
  product_rolls_short: {
    sv: "Vävd polypropenväv på rulle för industriella applikationer.",
    en: "Woven polypropylene fabric on the roll for industrial applications.",
  },
  product_rolls_focus: {
    sv: "Vävd PP-väv på rulle — råmaterial för konfektion, isolering, separation och förstärkning.",
    en: "Woven PP fabric on the roll — raw material for fabrication, insulation, separation and reinforcement.",
  },
  product_rolls_card: {
    sv: "Vävd polypropenväv på rulle för industriellt bruk.",
    en: "Woven polypropylene fabric on the roll for industrial use.",
  },
  product_rolls_capacity: { sv: "Bredd på beställning", en: "Width to order" },

  product_accessories_name: { sv: "Tillbehör", en: "Accessories" },
  product_accessories_short: {
    sv: "Lyftöglor, snören och andra komponenter som kompletterar din lösning.",
    en: "Lifting loops, cords and other components that complete your solution.",
  },
  product_accessories_focus: {
    sv: "Lyftöglor, snören, ventiler och tillbehör som kompletterar och anpassar din emballagelösning.",
    en: "Lifting loops, cords, valves and accessories that complete and customise your packaging.",
  },
  product_accessories_card: {
    sv: "Komponenter och tillbehör som kompletterar våra produkter.",
    en: "Components and accessories that complete our product range.",
  },
  product_accessories_capacity: { sv: "Måttanpassade", en: "Made to spec" },

  // ───── Home ─────
  home_title: { sv: "Fortapac | Byggda att bära", en: "Fortapac | Built to carry" },
  home_meta: {
    sv: "Vävt polypropylenemballage — FIBC storsäckar, PP-säckar och överdrag. Direkt från vår moderfabrik, lagerförda och med support i Sverige.",
    en: "Woven polypropylene packaging — FIBC bulk bags, PP sacks and covers. Factory-direct from our parent producer, stocked and supported in Sweden.",
  },
  hero_photo_label: { sv: "Hjältebild", en: "Hero photography" },
  hero_h1_a: { sv: "Byggda", en: "Built" },
  hero_h1_b: { sv: "att bära", en: "to carry" },
  hero_p: {
    sv: "FIBC storsäckar, PP-säckar och skyddsöverdrag — tillverkade i vår moderfabrik, lagerförda och servade i Sverige. Direkt från fabrik, utan mellanhand.",
    en: "FIBC bulk bags, PP sacks and protective covers — manufactured at our parent factory, stocked and serviced in Sweden. Factory-direct, without the middleman.",
  },
  hero_btn_explore: { sv: "Utforska produkter", en: "Explore products" },
  hero_btn_quote: { sv: "Begär offert", en: "Get a quote" },
  made_in: { sv: "Lagerförda och servade i Sverige", en: "Stocked & supported in Sweden" },

  products_eyebrow: { sv: "Våra produkter", en: "Our products" },
  products_h2: {
    sv: "Vävt emballage byggt för tunga jobb.",
    en: "Engineered woven packaging for heavy work.",
  },
  view_all: { sv: "Se alla produkter", en: "View all products" },

  spec_eyebrow: { sv: "Tekniskt genomtänkt", en: "Technical by design" },
  spec_h2: {
    sv: "Byggd att prestera. Spec för spec.",
    en: "Built to perform. Spec by spec.",
  },
  spec_swl_range: { sv: "SWL-intervall", en: "SWL range" },
  spec_recyclable: { sv: "Återvinningsbar PP", en: "Recyclable PP" },

  industries_eyebrow: { sv: "Byggd för industrin", en: "Built for industry" },
  industries_h2: {
    sv: "Anlitad i branscherna som bygger vår värld.",
    en: "Trusted across the industries that build our world.",
  },
  industries_link: { sv: "Utforska branscher", en: "Explore industries" },
  industry_construction: { sv: "Bygg", en: "Construction" },
  industry_agriculture: { sv: "Jordbruk", en: "Agriculture" },
  industry_chemicals: { sv: "Kemi", en: "Chemicals" },
  industry_forestry: { sv: "Skogsbruk", en: "Forestry" },
  industry_logistics: { sv: "Logistik", en: "Logistics" },

  materials_eyebrow: { sv: "Material & hantverk", en: "Material & craftsmanship" },
  materials_h2: { sv: "Styrka du kan se.", en: "Strength you can see." },
  materials_p: {
    sv: "Vävt av högkvalitativa polypropylentejper med precisionsvävteknik. Vår varp- och inslagskonstruktion ger draghållfasthet, rena fyllningar och lång livslängd — i fält, i hamn och på arbetsplatsen.",
    en: "Woven from high grade polypropylene tapes using precision loom technology. Our warp and weft construction delivers tensile strength, clear fills and long service life in the field, in ports and on the job.",
  },
  materials_link: { sv: "Läs mer om våra material", en: "Learn more about our materials" },
  materials_weave_label: { sv: "Vävmakro", en: "Weave macro" },
  warp: { sv: "VARP", en: "WARP" },
  weft: { sv: "INSLAG", en: "WEFT" },

  sustainability_eyebrow: { sv: "Bättre från grunden", en: "Better by design" },
  sustainability_h2: {
    sv: "Praktiskt idag. Ansvarsfullt imorgon.",
    en: "Practical today. Responsible tomorrow.",
  },
  sus_reusable_h: { sv: "Återanvändbar av naturen", en: "Reusable by nature" },
  sus_reusable_p: {
    sv: "Byggd för flergångsbruk, designad att minska engångsavfall och totalkostnad.",
    en: "Built for repeat use, designed to reduce single use waste and lower total cost.",
  },
  sus_impact_h: { sv: "Lägre påverkan", en: "Lower impact" },
  sus_impact_p: {
    sv: "Polypropylen är lätt, återvinningsbar och effektiv för säkrare transport.",
    en: "Polypropylene is lightweight, recyclable and efficient for safer transport.",
  },
  sus_lasts_h: { sv: "Konstruerad att hålla", en: "Engineered to last" },
  sus_lasts_p: {
    sv: "UV-stabiliserad och fältbeprövad — byggd för att klara verkliga förhållanden längre.",
    en: "UV stabilised and field proven, made to handle real conditions for longer.",
  },
  sus_label: { sv: "Insydd etikett", en: "Sewn-in label" },

  cta_h2: {
    sv: "Behöver du rätt säck för jobbet?",
    en: "Need the right bag for the job?",
  },
  cta_p: {
    sv: "Vårt svenska team speccar säcken, vår fabrik bygger den. Snabba offerter, fabrikspris, bevisad prestanda.",
    en: "Our Swedish team specs your bag, our factory builds it. Fast quotes, factory pricing, proven performance.",
  },

  // ───── Footer ─────
  footer_blurb: {
    sv: "Vävt polypropylenemballage — tillverkat i vår moderfabrik, lagerfört och med support i Sverige.",
    en: "Woven polypropylene packaging — manufactured at our parent factory, stocked and supported in Sweden.",
  },
  footer_col_products: { sv: "Produkter", en: "Products" },
  footer_col_industries: { sv: "Branscher", en: "Industries" },
  footer_col_company: { sv: "Företag", en: "Company" },
  footer_col_contact: { sv: "Kontakt", en: "Contact" },
  footer_col_newsletter: { sv: "Nyhetsbrev", en: "Newsletter" },
  footer_about_link: { sv: "Om Fortapac", en: "About Fortapac" },
  footer_quality: { sv: "Kvalitet & standarder", en: "Quality & Standards" },
  footer_resources: { sv: "Resurser", en: "Resources" },
  footer_newsletter_p: {
    sv: "Produktnyheter, insikter och hållbarhetsuppdateringar.",
    en: "Product updates, insights and sustainability news.",
  },
  footer_email_placeholder: { sv: "Din e-post", en: "Your email" },
  footer_copyright: {
    sv: "© 2026 Fortapac AB. Med ensamrätt.",
    en: "© 2026 Fortapac AB. All rights reserved.",
  },
  footer_privacy: { sv: "Integritetspolicy", en: "Privacy Policy" },
  footer_terms: { sv: "Användarvillkor", en: "Terms of Use" },
  footer_cookies: { sv: "Cookie-inställningar", en: "Cookie Settings" },

  // ───── About page ─────
  about_title: {
    sv: "Om Fortapac | Svensk närvaro. Direkt från fabrik.",
    en: "About Fortapac | Swedish presence. Factory direct.",
  },
  about_meta: {
    sv: "Fortapac är ett svensk–indiskt joint venture: halvägt av en börsnoterad tillverkare av vävt polypropylen, halvägt av vårt svenska säljteam. Byggt i fabriken, sålt utan mellanhand.",
    en: "Fortapac is a Swedish–Indian joint venture: half-owned by a publicly listed woven polypropylene producer, half-owned by our Swedish sales and support team. Built at the factory, sold without the middleman.",
  },
  about_eyebrow: { sv: "Om Fortapac", en: "About Fortapac" },
  about_h1_a: { sv: "Svensk närvaro.", en: "Swedish presence." },
  about_h1_b: { sv: "Direkt från fabrik", en: "Factory direct" },
  about_hero_p: {
    sv: "Fortapac är ett svensk–indiskt joint venture. Halvägt av en börsnoterad tillverkare av vävt polypropylen, halvägt av det svenska team du jobbar med. Storskalig tillverkning på ena sidan, lokalt ansvar på den andra — och inget däremellan.",
    en: "Fortapac is a Swedish–Indian joint venture. Half-owned by a publicly listed woven polypropylene producer, half-owned by the Swedish team you work with. Industrial-scale manufacturing on one side, local accountability on the other — and nothing in between.",
  },
  about_pillars_eyebrow: { sv: "Så är vi byggda", en: "How we're built" },
  about_pillars_h2: {
    sv: "Tre saker du kan räkna med.",
    en: "Three things you can count on.",
  },
  pillar1_num: { sv: "01 — LOKAL", en: "01 — LOCAL" },
  pillar1_h: { sv: "Svenskstyrt", en: "Swedish-led" },
  pillar1_p: {
    sv: "Försäljning, lager och teknisk support i Sverige. Du pratar med personerna som ansvarar för din order — svensk arbetstid, din tidszon.",
    en: "Sales, stock and technical support based in Sweden. You talk to the people responsible for your order, on Swedish business hours, in your time zone.",
  },
  pillar2_num: { sv: "02 — DIREKT", en: "02 — DIRECT" },
  pillar2_h: { sv: "Direkt från fabrik", en: "Factory direct" },
  pillar2_p: {
    sv: "Byggd i vår moderfabriks vävsalar, fraktad till vårt svenska lager och vidare till dig. Inga handelshuspåslag, ingen extra QC-mellanhand, ingen bruten telefonlina mellan dig och specen.",
    en: "Built at our parent's loom rooms, shipped to our Swedish warehouse, and on to your site. No trading-house markup, no extra quality middleman, no broken phone line between you and the spec.",
  },
  pillar3_num: { sv: "03 — TRYGGHET", en: "03 — BACKED" },
  pillar3_h: { sv: "Börsnoterad partner i ryggen", en: "Listed-partner backed" },
  pillar3_p: {
    sv: "Halvägt av en börsnoterad tillverkningspartner. Industriell kapacitet, reviderade räkenskaper och leveranssäkerheten som följer med båda — utan att du själv behöver jaga en fabrik.",
    en: "Half-owned by a publicly listed manufacturing partner. Industrial-scale capacity, audited financials, and the supply security that comes with both — without you ever needing to chase a factory directly.",
  },
  about_story_eyebrow: { sv: "Varför det betyder något", en: "Why it matters" },
  about_story_h2: {
    sv: "Byggt kring två styrkor.",
    en: "Built around two strengths.",
  },
  about_story_p1: {
    sv: "De flesta importörer av vävt polypropylenemballage är handelshus: en hemsida, ett skrivbord i Stockholm och en lång telefonlina till en fabrik de aldrig besökt. Vi är byggda annorlunda.",
    en: "Most importers of woven polypropylene packaging are trading houses: a website, a desk in Stockholm and a long phone line to a factory you've never visited. We're built differently.",
  },
  about_story_p2_sv: {
    sv: "Fortapac är halvägt av **fabriken själv** — en börsnoterad tillverkare med betydande PP-vävkapacitet — och halvägt av det **svenska team** du arbetar med dagligen. Två ägare, en ansvarsfull leverantörskedja.",
    en: "Fortapac is half-owned by the **factory itself** — a publicly listed manufacturer with significant woven PP capacity — and half-owned by the **Swedish team** you work with day to day. Two owners, one accountable supply chain.",
  },
  about_story_p3: {
    sv: "Den strukturen förändrar vad vi kan erbjuda. Vi styr vävprogrammet, så vi kan garantera specen. Vi sitter innanför tillverkningsmarginalen, så vi kan ge fabrikspris. Och vi lagerför i Sverige de artiklar våra kunder oftast använder — så ett trasigt truckhjul eller ett akut jobb inte betyder sex veckors leveranstid från Asien.",
    en: "That structure changes what we can offer. We control the loom programme, so we can guarantee specs. We're inside the manufacturing margin, so we can pass on factory pricing. And we hold stock in Sweden of the lines our customers use most, so a forklift breakdown or a last-minute job doesn't mean a six-week lead time from Asia.",
  },
  about_story_p4: {
    sv: "Vi konstruerar, speccar, testar, granskar. Vår moderbolagsfabrik tillverkar. Du får en svensk kontaktperson och en ansvarsfull leverantörskedja. Det är modellen.",
    en: "We engineer, we specify, we test, we audit. Our parent manufactures. You get one Swedish point of contact and one accountable supply chain. That's the model.",
  },
  about_cta_h2: {
    sv: "Vill du prata med det svenska teamet?",
    en: "Want to talk to the Swedish team?",
  },
  about_cta_p: {
    sv: "Berätta om din last, plats och förhållanden. Vi speccar rätt säck, offererar inom dagar och skickar från lager när vi kan.",
    en: "Tell us about your load, site and conditions. We'll spec the right bag, quote in days, and ship from stock when we can.",
  },
  about_cta_btn: { sv: "Hör av dig", en: "Get in touch" },

  // ───── Language switcher ─────
  switch_to_sv: { sv: "Svenska", en: "Svenska" },
  switch_to_en: { sv: "English", en: "English" },
} as const;

export type StringKey = keyof typeof STRINGS;

export function t(key: StringKey, locale: Locale): string {
  return STRINGS[key][locale];
}
