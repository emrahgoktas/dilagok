export type ProductDraft = {
  slug: string;
  sku: string;
  nameEn: string;
  summaryEn: string;
  descriptionEn: string;
  geoAnswerEn: string;
  seoTitleEn: string;
  seoDescriptionEn: string;
  alt: string;
  priceEur: number;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  gtin?: string;
  hashtags: string[];
  igCaption: string;
  pinTitle: string;
  pinDescription: string;
  tiktokCaption: string;
  faqCount: number;
  translated: { ar: boolean; fr: boolean; de: boolean };
};

export type Check = {
  id: string;
  channel: string;
  label: string;
  ok: boolean;
  hint: string;
};

export function aspect(w?: number, h?: number) {
  if (!w || !h) return 0;
  return w / h;
}

export function scoreProduct(d: ProductDraft): Check[] {
  const ratio = aspect(d.imageWidth, d.imageHeight);
  const minSide = Math.min(d.imageWidth ?? 0, d.imageHeight ?? 0);
  const title = d.seoTitleEn || d.nameEn;
  const meta = d.seoDescriptionEn || d.summaryEn;

  return [
    {
      id: "slug",
      channel: "SEO",
      label: "Slug is short, latin, hyphenated",
      ok: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug) && d.slug.length <= 60,
      hint: "Use lowercase-hyphens, no stop words.",
    },
    {
      id: "title",
      channel: "SEO",
      label: "Title 45–60 characters",
      ok: title.length >= 45 && title.length <= 60,
      hint: `${title.length} chars. Brand + product + craft.`,
    },
    {
      id: "meta",
      channel: "SEO",
      label: "Meta description 140–160 characters",
      ok: meta.length >= 140 && meta.length <= 160,
      hint: `${meta.length} chars. One claim, one origin, one action.`,
    },
    {
      id: "h1",
      channel: "SEO",
      label: "Product name is unique and human",
      ok: d.nameEn.length >= 3 && d.nameEn.length <= 60,
      hint: "H1 should match the bag, not a keyword list.",
    },
    {
      id: "geo",
      channel: "GEO",
      label: "Direct answer for AI engines (40–90 words)",
      ok: (() => {
        const words = d.geoAnswerEn.trim().split(/\s+/).filter(Boolean).length;
        return words >= 40 && words <= 90;
      })(),
      hint: "State what it is, who knots it, where, lead time. No adjectives-only.",
    },
    {
      id: "faq",
      channel: "GEO",
      label: "At least two FAQ pairs",
      ok: d.faqCount >= 2,
      hint: "Real questions buyers and models ask.",
    },
    {
      id: "origin",
      channel: "GEO",
      label: "Origin / maker named in copy",
      ok: /turkey|türkiye|dila/i.test(`${d.descriptionEn} ${d.geoAnswerEn}`),
      hint: "Name Turkey and Dila Gök so entities resolve.",
    },
    {
      id: "sku",
      channel: "Google",
      label: "SKU present (Merchant ID / MPN fallback)",
      ok: d.sku.length >= 4,
      hint: "Stable SKU. GTIN optional for handmade.",
    },
    {
      id: "price",
      channel: "Google",
      label: "Price in EUR",
      ok: d.priceEur > 0,
      hint: "Google Merchant and Meta catalog require price.",
    },
    {
      id: "gimage",
      channel: "Google",
      label: "Main image ≥ 800px on the short side",
      ok: minSide >= 800,
      hint: minSide ? `${d.imageWidth}×${d.imageHeight}` : "Upload a still.",
    },
    {
      id: "alt",
      channel: "Google",
      label: "Alt text 12–125 characters, descriptive",
      ok: d.alt.length >= 12 && d.alt.length <= 125 && !/^img|image|photo/i.test(d.alt),
      hint: "Say the bag, colour, craft — not “image1”.",
    },
    {
      id: "ig-ratio",
      channel: "Instagram",
      label: "Feed-safe crop 4:5 to 1.91:1",
      ok: ratio >= 0.8 && ratio <= 1.91,
      hint: "Prefer 1080×1350 (4:5) or 1080×1080.",
    },
    {
      id: "ig-cap",
      channel: "Instagram",
      label: "Caption under 2,200 characters",
      ok: d.igCaption.length > 20 && d.igCaption.length <= 2200,
      hint: `${d.igCaption.length}/2200. First 125 chars must stand alone.`,
    },
    {
      id: "ig-hash",
      channel: "Instagram",
      label: "3–8 hashtags",
      ok: d.hashtags.length >= 3 && d.hashtags.length <= 8,
      hint: `${d.hashtags.length} tags. Avoid banned “follow” spam tags.`,
    },
    {
      id: "pin-ratio",
      channel: "Pinterest",
      label: "Vertical pin ~2:3",
      ok: ratio >= 0.55 && ratio <= 0.75,
      hint: "1000×1500 recommended. Square is demoted.",
    },
    {
      id: "pin-title",
      channel: "Pinterest",
      label: "Pin title ≤ 100 characters",
      ok: (d.pinTitle || d.nameEn).length > 8 && (d.pinTitle || d.nameEn).length <= 100,
      hint: `${(d.pinTitle || d.nameEn).length}/100`,
    },
    {
      id: "pin-desc",
      channel: "Pinterest",
      label: "Pin description ≤ 500 characters",
      ok: (d.pinDescription || d.summaryEn).length >= 40 && (d.pinDescription || d.summaryEn).length <= 500,
      hint: `${(d.pinDescription || d.summaryEn).length}/500`,
    },
    {
      id: "tt-cap",
      channel: "TikTok",
      label: "TikTok caption ≤ 2,200, hook in first line",
      ok: d.tiktokCaption.length > 8 && d.tiktokCaption.length <= 2200,
      hint: "9:16 video later; stills need a hook.",
    },
    {
      id: "tt-ratio",
      channel: "TikTok",
      label: "Vertical 9:16 preferred for TikTok/Reels",
      ok: ratio >= 0.5 && ratio <= 0.65,
      hint: "1080×1920. Optional if you only post feed stills.",
    },
    {
      id: "i18n",
      channel: "Markets",
      label: "AR, FR, DE names started",
      ok: d.translated.ar && d.translated.fr && d.translated.de,
      hint: "Required for hreflang and Gulf/EU GEO.",
    },
    {
      id: "threads",
      channel: "Threads",
      label: "Short caption ≤ 500 for Threads",
      ok: d.igCaption.length > 0 && d.igCaption.length <= 500,
      hint: "Reuse a tight IG first paragraph.",
    },
  ];
}

export function channelScore(checks: Check[]) {
  const groups = new Map<string, Check[]>();
  for (const c of checks) {
    const list = groups.get(c.channel) ?? [];
    list.push(c);
    groups.set(c.channel, list);
  }
  return [...groups.entries()].map(([channel, list]) => ({
    channel,
    ok: list.filter((c) => c.ok).length,
    total: list.length,
  }));
}
