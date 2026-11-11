export type CordColor =
  | "bone"
  | "sand"
  | "gold"
  | "olive"
  | "ink"
  | "ivory"
  | "bordeaux";

export type Size = "mini" | "midi" | "maxi";
export type Strap = "shoulder" | "crossbody" | "top-handle" | "clutch";

export type Product = {
  slug: string;
  sku: string;
  name: Record<"en" | "ar" | "fr" | "de", string>;
  silhouette: "tote" | "crossbody" | "clutch" | "bucket" | "shoulder";
  summary: Record<"en" | "ar" | "fr" | "de", string>;
  description: Record<"en" | "ar" | "fr" | "de", string>;
  priceEur: number;
  colors: CordColor[];
  sizes: Size[];
  straps: Strap[];
  dimensions: { w: number; h: number; d: number };
  leadWeeks: string;
  seoKeywords: Record<"en" | "ar" | "fr" | "de", string[]>;
  hero: boolean;
  image?: string;
  cutout?: string;
};

export const cordPalette: Record<
  CordColor,
  { hex: string; label: Record<"en" | "ar" | "fr" | "de", string> }
> = {
  bone: {
    hex: "#F4EFE6",
    label: { en: "Bone", ar: "عظمي", fr: "Os", de: "Knochen" },
  },
  sand: {
    hex: "#D9C7A8",
    label: { en: "Sand", ar: "رملي", fr: "Sable", de: "Sand" },
  },
  gold: {
    hex: "#C4A574",
    label: { en: "Desert gold", ar: "ذهب الصحراء", fr: "Or du désert", de: "Wüstengold" },
  },
  olive: {
    hex: "#3F4A3C",
    label: { en: "Date olive", ar: "زيتوني", fr: "Olive", de: "Olive" },
  },
  ink: {
    hex: "#0A0A0A",
    label: { en: "Ink", ar: "حبر", fr: "Encre", de: "Tinte" },
  },
  ivory: {
    hex: "#FBF7F0",
    label: { en: "Ivory", ar: "عاجي", fr: "Ivoire", de: "Elfenbein" },
  },
  bordeaux: {
    hex: "#5C2A33",
    label: { en: "Bordeaux", ar: "بوردو", fr: "Bordeaux", de: "Bordeaux" },
  },
};

export const products: Product[] = [
  {
    slug: "dune",
    sku: "DG-DUNE",
    name: {
      en: "Dune",
      ar: "كثيب",
      fr: "Dune",
      de: "Dune",
    },
    silhouette: "tote",
    summary: {
      en: "Resort tote in taut bone cord. Made to order.",
      ar: "حقيبة منتجع من حبل عظمي مشدود. حسب الطلب.",
      fr: "Cabas resort en corde os, tendue. Sur commande.",
      de: "Resort-Tote aus straffem Knochenkordel. Auf Bestellung.",
    },
    description: {
      en: "A structured tote knotted from cotton cord. Built for Dubai light and Mediterranean afternoons. Lined, with a concealed magnet and blind-stamped monogram.",
      ar: "حقيبة منظمة معقودة من حبل قطني. لضوء دبي وظهيرات المتوسط. بطانة ومغناطيس خفي وختم الشعار.",
      fr: "Cabas structuré noué en corde de coton. Pour la lumière de Dubaï et les après-midi méditerranéens. Doublé, aimant dissimulé, monogramme à froid.",
      de: "Strukturierte Tote aus Baumwollkordel. Für Dubai-Licht und mediterrane Nachmittage. Gefüttert, versteckter Magnet, Blindprägung.",
    },
    priceEur: 420,
    colors: ["bone", "sand", "ivory", "ink"],
    sizes: ["midi", "maxi"],
    straps: ["shoulder", "top-handle"],
    dimensions: { w: 32, h: 28, d: 12 },
    leadWeeks: "2–4",
    hero: true,
    image: "/products/dune-hero.jpg",
    cutout: "/products/dune-hero.png",
    seoKeywords: {
      en: ["handmade macrame tote", "knotted cord bag", "resort macrame bag Dubai"],
      ar: ["شنطة مكرمية دبي", "حقيبة مكراميه", "شنطة يد يدوية الصنع"],
      fr: ["sac macramé fait main", "sac en corde", "cabas noué"],
      de: ["Makramee Tasche", "handgeknüpfte Tasche", "Seiltasche"],
    },
  },
  {
    slug: "noir",
    sku: "DG-NOIR",
    name: { en: "Noir", ar: "نوار", fr: "Noir", de: "Noir" },
    silhouette: "clutch",
    summary: {
      en: "Evening clutch. Tight knots, no fringe.",
      ar: "كلاتش مسائي. عقد مشدود بلا شراشيب.",
      fr: "Pochette du soir. Nœuds serrés, sans franges.",
      de: "Abendclutch. Enge Knoten, ohne Fransen.",
    },
    description: {
      en: "A compact evening piece in ink or gold cord. Holds a phone, a key, a lipstick. Intended for dinners in Paris and hotel lobbies in Mayfair.",
      ar: "قطعة مسائية صغيرة بحبل حبر أو ذهب. للهاتف والمفتاح وأحمر الشفاه.",
      fr: "Pièce du soir compacte en corde encre ou or. Téléphone, clé, rouge.",
      de: "Kompaktes Abendstück in Tinte oder Gold. Telefon, Schlüssel, Lippenstift.",
    },
    priceEur: 280,
    colors: ["ink", "gold", "ivory", "bordeaux"],
    sizes: ["mini"],
    straps: ["clutch", "shoulder"],
    dimensions: { w: 22, h: 14, d: 5 },
    leadWeeks: "2–3",
    hero: false,
    seoKeywords: {
      en: ["macrame clutch", "evening knotted bag", "bridal macrame clutch"],
      ar: ["كلاتش مكرمية", "شنطة سهرة يدوية"],
      fr: ["pochette macramé", "sac du soir noué"],
      de: ["Makramee Clutch", "Abendtasche geknüpft"],
    },
  },
  {
    slug: "oasis",
    sku: "DG-OASIS",
    name: { en: "Oasis", ar: "واحة", fr: "Oasis", de: "Oasis" },
    silhouette: "crossbody",
    summary: {
      en: "Crossbody with a long cord strap. Hands free.",
      ar: "كروس بودي بحزام حبل طويل.",
      fr: "Sac bandoulière à longue anse en corde.",
      de: "Umhängetasche mit langem Kordelriemen.",
    },
    description: {
      en: "Worn across the body. The strap is the same cord as the bag — one material, one thought. For souks, airports, and late walks.",
      ar: "تُلبس عبر الجسم. الحزام من نفس الحبل.",
      fr: "Porté en travers. La bandoulière est la même corde que le sac.",
      de: "Quer getragen. Der Riemen ist dieselbe Kordel wie die Tasche.",
    },
    priceEur: 360,
    colors: ["olive", "sand", "ink", "bone"],
    sizes: ["mini", "midi"],
    straps: ["crossbody", "shoulder"],
    dimensions: { w: 24, h: 18, d: 8 },
    leadWeeks: "2–4",
    hero: false,
    seoKeywords: {
      en: ["macrame crossbody", "handmade cord bag"],
      ar: ["شنطة كروس بودي مكرمية"],
      fr: ["sac macramé bandoulière"],
      de: ["Makramee Umhängetasche"],
    },
  },
  {
    slug: "ember",
    sku: "DG-EMBER",
    name: { en: "Ember", ar: "جمرة", fr: "Ember", de: "Ember" },
    silhouette: "bucket",
    summary: {
      en: "Bucket silhouette. Drawcord close.",
      ar: "شكل سطل. إغلاق بحبل سحب.",
      fr: "Seau. Fermeture à cordon.",
      de: "Bucket. Kordelzug.",
    },
    description: {
      en: "A soft cylinder that holds its mouth with a drawcord of the same fibre. Bordeaux or olive for evenings that start in daylight.",
      ar: "أسطوانة ناعمة تُغلق بحبل من نفس الألياف.",
      fr: "Cylindre souple fermé par un cordon de la même fibre.",
      de: "Weicher Zylinder, geschlossen mit derselben Faser.",
    },
    priceEur: 390,
    colors: ["bordeaux", "olive", "sand", "ink"],
    sizes: ["midi"],
    straps: ["shoulder", "top-handle"],
    dimensions: { w: 22, h: 24, d: 22 },
    leadWeeks: "3–4",
    hero: false,
    seoKeywords: {
      en: ["macrame bucket bag", "knotted cord bucket"],
      ar: ["شنطة باكيت مكرمية"],
      fr: ["sac seau macramé"],
      de: ["Makramee Beuteltasche"],
    },
  },
  {
    slug: "ivory-veil",
    sku: "DG-IVORY",
    name: {
      en: "Ivory Veil",
      ar: "حجاب عاجي",
      fr: "Voile ivoire",
      de: "Elfenbeinschleier",
    },
    silhouette: "clutch",
    summary: {
      en: "Bridal ivory. Quiet hardware.",
      ar: "عاجي للعروس. معدن هادئ.",
      fr: "Ivoire nuptial. Quincaillerie silencieuse.",
      de: "Brauteljenbein. Ruhiges Metall.",
    },
    description: {
      en: "Ivory cord, almost no shine. For ceremonies, Eid, and rooms where the dress is the event. Optional date knotted into the lining tape.",
      ar: "حبل عاجي بلا لمعان تقريباً. للمناسبات والعيد.",
      fr: "Corde ivoire, presque sans éclat. Cérémonies, Aïd.",
      de: "Elfenbeinkordel, fast ohne Glanz. Zeremonien, Festtage.",
    },
    priceEur: 310,
    colors: ["ivory", "bone", "gold"],
    sizes: ["mini"],
    straps: ["clutch", "shoulder"],
    dimensions: { w: 20, h: 13, d: 4 },
    leadWeeks: "3–5",
    hero: false,
    seoKeywords: {
      en: ["bridal macrame clutch", "ivory knotted bag"],
      ar: ["كلاتش عروس مكرمية"],
      fr: ["pochette mariée macramé"],
      de: ["Braut Clutch Makramee"],
    },
  },
  {
    slug: "atlas",
    sku: "DG-ATLAS",
    name: { en: "Atlas", ar: "أطلس", fr: "Atlas", de: "Atlas" },
    silhouette: "shoulder",
    summary: {
      en: "Shoulder bag with density. City weight.",
      ar: "حقيبة كتف كثيفة. وزن المدينة.",
      fr: "Sac porté épaule, dense. Poids de ville.",
      de: "Schultertasche mit Dichte. Stadtgewicht.",
    },
    description: {
      en: "Tighter knotting than Dune. Built to keep shape in a crowd. For Berlin mornings and London trains.",
      ar: "عقد أضيق من دون. يحافظ على شكله في الزحام.",
      fr: "Nouage plus serré que Dune. Tient la forme dans la foule.",
      de: "Enger geknüpft als Dune. Hält die Form in der Menge.",
    },
    priceEur: 440,
    colors: ["ink", "olive", "bone", "sand"],
    sizes: ["midi", "maxi"],
    straps: ["shoulder", "crossbody"],
    dimensions: { w: 30, h: 22, d: 10 },
    leadWeeks: "3–4",
    hero: false,
    seoKeywords: {
      en: ["luxury macrame handbag", "handmade macrame bag UK"],
      ar: ["حقيبة يد مكرمية فاخرة"],
      fr: ["sac à main macramé luxe"],
      de: ["Makramee Handtasche kaufen Deutschland"],
    },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function heroProduct() {
  return products.find((p) => p.hero) ?? products[0];
}

export const customSurcharge = 40;
