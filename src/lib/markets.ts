export type MarketId = "uae" | "france" | "germany" | "uk" | "russia";

export const markets: Record<
  MarketId,
  {
    name: Record<"en" | "ar" | "fr" | "de", string>;
    currency: "AED" | "EUR" | "GBP" | "RUB";
    fxFromEur: number;
    dutyNote: Record<"en" | "ar" | "fr" | "de", string>;
    transit: Record<"en" | "ar" | "fr" | "de", string>;
    keywords: Record<"en" | "ar" | "fr" | "de", string[]>;
  }
> = {
  uae: {
    name: {
      en: "United Arab Emirates",
      ar: "الإمارات العربية المتحدة",
      fr: "Émirats arabes unis",
      de: "Vereinigte Arabische Emirate",
    },
    currency: "AED",
    fxFromEur: 4.0,
    dutyNote: {
      en: "Duties and VAT are calculated at checkout where required. Dubai is a priority atelier route.",
      ar: "تُحسب الرسوم والضريبة عند الدفع عند الحاجة. دبي مسار أولوية للورشة.",
      fr: "Droits et TVA calculés au paiement si requis. Dubaï est une route prioritaire.",
      de: "Zölle und MwSt. werden an der Kasse berechnet, sofern nötig. Dubai ist eine Prioritätsroute.",
    },
    transit: {
      en: "After making: 4–7 days by courier to Dubai and Abu Dhabi.",
      ar: "بعد الصنع: 4–7 أيام إلى دبي وأبوظبي.",
      fr: "Après confection : 4–7 jours vers Dubaï et Abou Dhabi.",
      de: "Nach der Fertigung: 4–7 Tage nach Dubai und Abu Dhabi.",
    },
    keywords: {
      en: ["macrame bag Dubai", "handmade bag UAE", "macrame bag shipped to Dubai"],
      ar: ["شنطة مكرمية دبي", "حقائب يد دبي"],
      fr: ["sac macramé Dubaï"],
      de: ["Makramee Tasche Dubai"],
    },
  },
  france: {
    name: { en: "France", ar: "فرنسا", fr: "France", de: "Frankreich" },
    currency: "EUR",
    fxFromEur: 1,
    dutyNote: {
      en: "EU VAT included in the displayed euro price for French delivery.",
      ar: "ضريبة الاتحاد الأوروبي مشمولة في سعر اليورو للتوصيل إلى فرنسا.",
      fr: "TVA UE incluse dans le prix en euros pour la France.",
      de: "EU-MwSt. im Europreis für Frankreich enthalten.",
    },
    transit: {
      en: "After making: 3–6 days to metropolitan France.",
      ar: "بعد الصنع: 3–6 أيام إلى فرنسا.",
      fr: "Après confection : 3–6 jours en France métropolitaine.",
      de: "Nach der Fertigung: 3–6 Tage nach Frankreich.",
    },
    keywords: {
      en: ["macrame bag France", "handmade bag Paris"],
      ar: ["شنطة مكرمية فرنسا"],
      fr: ["sac macramé Paris", "livraison France", "sac macramé fait main"],
      de: ["Makramee Tasche Frankreich"],
    },
  },
  germany: {
    name: { en: "Germany", ar: "ألمانيا", fr: "Allemagne", de: "Deutschland" },
    currency: "EUR",
    fxFromEur: 1,
    dutyNote: {
      en: "EU VAT included. Returns follow German Widerruf windows stated at checkout.",
      ar: "ضريبة الاتحاد مشمولة. الإرجاع وفق نافذة Widerruf الألمانية.",
      fr: "TVA UE incluse. Retours selon le délai Widerruf allemand.",
      de: "EU-MwSt. enthalten. Widerruf gemäß Angaben an der Kasse.",
    },
    transit: {
      en: "After making: 3–6 days within Germany.",
      ar: "بعد الصنع: 3–6 أيام داخل ألمانيا.",
      fr: "Après confection : 3–6 jours en Allemagne.",
      de: "Nach der Fertigung: 3–6 Werktage in Deutschland.",
    },
    keywords: {
      en: ["macrame bag Germany"],
      ar: ["شنطة مكرمية ألمانيا"],
      fr: ["sac macramé Allemagne"],
      de: ["Makramee Tasche kaufen Deutschland", "Versand nach Deutschland"],
    },
  },
  uk: {
    name: {
      en: "United Kingdom",
      ar: "المملكة المتحدة",
      fr: "Royaume-Uni",
      de: "Vereinigtes Königreich",
    },
    currency: "GBP",
    fxFromEur: 0.86,
    dutyNote: {
      en: "UK import VAT may be collected by the courier. Shown as an estimate at checkout.",
      ar: "قد تحصّل شركة الشحن ضريبة الاستيراد البريطانية. تقدير عند الدفع.",
      fr: "La TVA d’importation UK peut être perçue par le coursier.",
      de: "UK-Einfuhr-MwSt. kann vom Kurier erhoben werden.",
    },
    transit: {
      en: "After making: 4–7 days to the UK.",
      ar: "بعد الصنع: 4–7 أيام إلى المملكة المتحدة.",
      fr: "Après confection : 4–7 jours vers le Royaume-Uni.",
      de: "Nach der Fertigung: 4–7 Tage ins Vereinigte Königreich.",
    },
    keywords: {
      en: ["macrame bag shipped to UK", "handmade macrame bag UK"],
      ar: ["شنطة مكرمية بريطانيا"],
      fr: ["sac macramé Royaume-Uni"],
      de: ["Makramee Tasche UK"],
    },
  },
  russia: {
    name: { en: "Russia", ar: "روسيا", fr: "Russie", de: "Russland" },
    currency: "EUR",
    fxFromEur: 1,
    dutyNote: {
      en: "Orders to Russia are accepted after a private shipping quote. Payment in euro pending courier confirmation.",
      ar: "طلبات روسيا بعد عرض شحن خاص. الدفع باليورو بعد تأكيد الناقل.",
      fr: "Commandes vers la Russie après devis privé. Paiement en euros après confirmation.",
      de: "Bestellungen nach Russland nach privatem Versandangebot.",
    },
    transit: {
      en: "Quoted per piece. Telegram atelier channel for status.",
      ar: "يُعرض لكل قطعة. قناة تيليغرام لحالة الطلب.",
      fr: "Devis à la pièce. Canal Telegram pour le suivi.",
      de: "Angebot pro Stück. Telegram-Kanal für den Status.",
    },
    keywords: {
      en: ["macrame bag Russia"],
      ar: ["شنطة مكرمية روسيا"],
      fr: ["sac macramé Russie"],
      de: ["Makramee Tasche Russland"],
    },
  },
};

export function formatMoney(eur: number, currency: "AED" | "EUR" | "GBP" | "RUB") {
  const fx = { AED: 4, EUR: 1, GBP: 0.86, RUB: 100 }[currency];
  const value = Math.round(eur * fx);
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency === "RUB" ? "EUR" : currency,
    maximumFractionDigits: 0,
  }).format(currency === "RUB" ? eur : value);
}
