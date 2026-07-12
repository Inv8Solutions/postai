// Pre-written post copy, keyed by language then theme. Each theme holds one or
// more variants: `h` headline, `s` subtext, `c` full caption.
//
// This is the same bank the client renders in its offline preview
// (src/pages/Generate.vue). It is mirrored here so the server-side
// PlaceholderProvider produces identical, human-reviewed copy without any
// vendor dependency. Keep the two copies in sync until a real TextProvider
// replaces the placeholder.

import type { Language, Theme } from "./types.js";

/** A single pre-written variant. */
export interface ContentVariant {
  /** Headline. */
  h: string;
  /** Subtext. */
  s: string;
  /** Full caption. */
  c: string;
}

export type ContentBank = Record<Language, Record<Theme, ContentVariant[]>>;

export const contentBank: ContentBank = {
  Filipino: {
    promo: [{ h: "🏷 Espesyal na Alok!", s: "Limitadong panahon — huwag palampasin!", c: "Huwag palampasin! 🏷 Espesyal na promosyon ngayon — kumita ng malaking tipid. Mag-mensahe o bumisita para malaman ang detalye. #Promo #Sulit" }],
    announcement: [{ h: "📣 Malaking Balita!", s: "May bago kaming darating para sa inyo", c: "May bagong balita kami! 📣 Sobrang excited na kaming ibahagi ito. Abangan ang susunod naming post! #Anunsyo" }],
    holiday: [{ h: "🎊 Maligayang Kapistahan!", s: "Mula sa aming pamilya sa inyo", c: "Maligayang Pasko at Manigong Bagong Taon mula sa aming pamilya! 🎊 Salamat sa inyong walang sawang suporta! #MaligayanPasko" }],
    tips: [{ h: "💡 Payo ng Araw", s: "Kapaki-pakinabang na impormasyon", c: "💡 Payo ng araw: Ang tamang pag-aalaga ay nagsisimula sa tamang kaalaman. Ibahagi namin ang aming mga natutunan! #Tips" }],
    general: [{ h: "Magandang Umaga! ☀️", s: "Handa kaming maglingkod sa inyo", c: "Magandang umaga sa lahat ng aming mga suki! ☀️ Handa na kaming maglingkod sa inyo ngayon. Kita-kits! #MagandangUmaga" }],
    product: [{ h: "⭐ Paborito ng Mga Suki!", s: "Kailangan ninyong subukan ito", c: "Ito ang paborito ng aming mga suki! ⭐ Ang aming pinaka-popular na produkto ay laging available. Subukan ninyo! #Bestseller" }],
  },
  Taglish: {
    promo: [{ h: "🏷 Special Offer Today!", s: "Limited time — grab it now!", c: "Huwag palampasin! 🏷 Special promo ngayon — kumita ng malaking tipid sa aming pinakamainam na deal. #Promo #Sulit" }],
    announcement: [{ h: "📣 Big News!", s: "Something new is coming", c: "May bagong balita kami! 📣 Sobrang excited na kaming i-share ito. Stay tuned! #Announcement" }],
    holiday: [{ h: "🎊 Happy Holidays!", s: "From our family to yours", c: "Happy Holidays mula sa aming pamilya! 🎊 Salamat sa inyong patuloy na support sa buong taon. #HappyHolidays" }],
    tips: [{ h: "💡 Quick Tip For You", s: "Useful advice from us", c: "💡 Tip ng araw: Proper care starts with the right knowledge. I-follow ang aming page para sa mga kapaki-pakinabang na tips! #Tips" }],
    general: [{ h: "Good Morning! ☀️", s: "Ready to serve you today", c: "Magandang umaga sa lahat ng aming mga suki! ☀️ Ready na kaming maglingkod sa inyo ngayon. Kita-kits! #GoodMorning" }],
    product: [{ h: "⭐ Bestseller Alert!", s: "You have to try this", c: "Ito ang paborito ng aming mga suki! ⭐ Our most popular product is always available for you. Subukan ninyo! #Bestseller" }],
  },
  English: {
    promo: [{ h: "🏷 Special Offer Today!", s: "Limited time deal — grab it now!", c: "Don't miss out! 🏷 We have a special promo running today. Message us or visit the store to find out more. #Promo" }],
    announcement: [{ h: "📣 Big News!", s: "Something exciting is coming your way", c: "We have exciting news to share with you! 📣 We can't wait to tell you all about it. Stay tuned! #Announcement" }],
    holiday: [{ h: "🎊 Happy Holidays!", s: "From our family to yours", c: "Merry Christmas and Happy New Year from all of us! 🎊 Thank you for your unwavering support throughout the year! #HappyHolidays" }],
    tips: [{ h: "💡 Quick Tip For You", s: "Useful advice from our team", c: "💡 Tip of the day: Proper care starts with the right knowledge. Follow our page for helpful tips every day! #Tips" }],
    general: [{ h: "Good Morning! ☀️", s: "Ready to serve you today", c: "Good morning to all our valued customers! ☀️ We're ready and excited to serve you today. See you soon! #GoodMorning" }],
    product: [{ h: "⭐ Customer Favorite!", s: "You have to try this", c: "This is our customers' all-time favorite! ⭐ Our most popular item is always available for you. Try it today! #BestSeller" }],
  },
};
