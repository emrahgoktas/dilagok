export type Article = {
  slug: string;
  title: Record<"en" | "ar" | "fr" | "de", string>;
  excerpt: Record<"en" | "ar" | "fr" | "de", string>;
  body: Record<"en" | "ar" | "fr" | "de", string>;
  cover?: string;
  alt?: string;
  tags?: string[];
  seoTitle?: Record<"en" | "ar" | "fr" | "de", string>;
  seoDescription?: Record<"en" | "ar" | "fr" | "de", string>;
  geoAnswer?: Record<"en" | "ar" | "fr" | "de", string>;
  date?: string;
  published?: boolean;
};

export const journal: Article[] = [
  {
    slug: "how-a-knotted-cord-bag-is-made",
    title: {
      en: "How a knotted cord bag is made",
      ar: "كيف تُصنع شنطة من الحبل المعقود",
      fr: "Comment se noue un sac en corde",
      de: "Wie eine geknüpfte Kordeltasche entsteht",
    },
    excerpt: {
      en: "One fibre, measured, tensioned, and knotted in Turkey. No cut pattern. Two to four weeks.",
      ar: "ليف واحد يُقاس ويُشد ويُعقد في تركيا. بلا باترون مقصوص. أسبوعان إلى أربعة.",
      fr: "Une fibre, mesurée, tendue, nouée en Turquie. Pas de patron découpé. Deux à quatre semaines.",
      de: "Eine Faser, gemessen, gespannt, in der Türkei geknüpft. Kein Schnittmuster. Zwei bis vier Wochen.",
    },
    body: {
      en: "DILAGOK bags begin as cotton cord, not as a printed pattern. Dila Gök measures the silhouette, tensions the first column of knots, then builds density until the bag holds itself. Hardware is quiet. The monogram is blind-stamped, not printed. Production is made to order, typically two to four weeks, then couriered to the UAE, France, Germany, the United Kingdom, and by quote to Russia.",
      ar: "تبدأ حقائب ديلاغوك من حبل قطني لا من باترون مطبوع. تقيس ديلا غوك الظل، تشد عمود العقد الأول، ثم تزيد الكثافة حتى تمسك الحقيبة شكلها. المعدن هادئ. الشعار ختم أعمى. الإنتاج حسب الطلب خلال أسبوعين إلى أربعة ثم الشحن إلى الإمارات وفرنسا وألمانيا وبريطانيا وروسيا حسب العرض.",
      fr: "Les sacs DILAGOK naissent d’une corde de coton, non d’un patron imprimé. Dila Gök mesure la silhouette, tend la première colonne de nœuds, puis densifie jusqu’à ce que le sac se tienne. Quincaillerie discrète. Monogramme à froid. Sur commande, deux à quatre semaines, puis envoi vers les EAU, la France, l’Allemagne, le Royaume-Uni, et la Russie sur devis.",
      de: "DILAGOK-Taschen beginnen als Baumwollkordel, nicht als Druckschnitt. Dila Gök misst die Silhouette, spannt die erste Knotensäule und verdichtet, bis die Tasche steht. Ruhiges Metall. Blindprägung. Auf Bestellung, zwei bis vier Wochen, Versand in die VAE, nach Frankreich, Deutschland, Großbritannien und auf Angebot nach Russland.",
    },
  },
  {
    slug: "caring-for-macrame-handbags",
    title: {
      en: "Caring for macrame handbags",
      ar: "العناية بحقائب المكرامية",
      fr: "Entretenir un sac macramé",
      de: "Pflege von Makramee-Handtaschen",
    },
    excerpt: {
      en: "Shade, a soft brush, no machine. Cord is fibre, not leather.",
      ar: "ظل، فرشاة ناعمة، بلا غسالة. الحبل ليف لا جلد.",
      fr: "Ombre, brosse douce, pas de machine. La corde est une fibre.",
      de: "Schatten, weiche Bürste, keine Maschine. Kordel ist Faser.",
    },
    body: {
      en: "Keep the bag out of standing water and hot car dashboards. Brush dust with a dry clothes brush. Spot-clean with a barely damp cloth. Do not machine wash. If the silhouette slumps, rest it stuffed with tissue overnight. Gold cord may darken at wear points; that is the fibre, not a defect.",
      ar: "أبعدي الحقيبة عن الماء الراكد ولوحة السيارة الحارة. فرّي الغبار بفرشاة جافة. بقعة بقطعة شبه جافة. لا غسالة. إذا تهدل الشكل احشيه بورق ليلاً.",
      fr: "Évitez l’eau stagnante et la planche de bord brûlante. Brossez la poussière à sec. Détachez avec un linge à peine humide. Pas de machine. Si la silhouette s’affaisse, bourrez de papier une nuit.",
      de: "Kein stehendes Wasser, kein heißes Armaturenbrett. Staub trocken bürsten. Flecken mit kaum feuchtem Tuch. Nicht in die Maschine. Bei erschlaffter Form über Nacht mit Seidenpapier füllen.",
    },
  },
  {
    slug: "resort-bag-vs-evening-clutch",
    title: {
      en: "Resort bag vs evening clutch",
      ar: "حقيبة المنتجع مقابل كلاتش المساء",
      fr: "Sac resort ou pochette du soir",
      de: "Resort-Tasche oder Abendclutch",
    },
    excerpt: {
      en: "Dune carries the day in Dubai. Noir holds a Paris night. Same atelier, different tension.",
      ar: "دون لنهارات دبي. نوار لليل باريس. الورشة نفسها، الشد مختلف.",
      fr: "Dune pour le jour à Dubaï. Noir pour une nuit à Paris. Même atelier, autre tension.",
      de: "Dune für den Tag in Dubai. Noir für eine Nacht in Paris. Selbes Atelier, andere Spannung.",
    },
    body: {
      en: "Choose Dune or Atlas when you need volume and a shoulder. Choose Noir or Ivory Veil when the dress is the event and the bag should disappear except as texture. Oasis is the city hybrid. Ember is for hands that want a drawcord, not a flap. All are knotted in Turkey and sold as made-to-order cord couture.",
      ar: "اختاري دون أو أطلس للحجم والكتف. نوار أو حجاب عاجي حين يكون الفستان هو الحدث. واحة هجين المدينة. جمرة لحبل السحب. كلها تُعقد في تركيا حسب الطلب.",
      fr: "Dune ou Atlas pour le volume et l’épaule. Noir ou Voile ivoire quand la robe est l’événement. Oasis pour la ville. Ember pour un cordon, pas un rabat. Tous noués en Turquie, sur commande.",
      de: "Dune oder Atlas für Volumen und Schulter. Noir oder Elfenbeinschleier, wenn das Kleid das Ereignis ist. Oasis für die Stadt. Ember für Kordelzug. Alle in der Türkei geknüpft, auf Bestellung.",
    },
  },
];

export function getArticle(slug: string) {
  return journal.find((a) => a.slug === slug);
}
