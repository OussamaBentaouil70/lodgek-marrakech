/* ------------------------------------------------------------------ */
/*  Lodgek Marrakech — all site content lives here                      */
/* ------------------------------------------------------------------ */

export interface Photo {
  src: string;
  alt: string;
}

import heroImage from "../../images/hero image.png";
import candlelitReceptionsImage from "../../images/Elegant Candlelit Receptions.png";
import exclusivePartiesImage from "../../images/Exclusive Parties & Events.png";
import contactImage from "../../images/Let's Create Your Dream Celebration in Marrakech.png";
import palmGardenImage from "../../images/Palm Garden Ceremonies.png";
import poolsideCocktailsImage from "../../images/Poolside Cocktail Experiences.png";
import privateDinnersImage from "../../images/Private Dinners & Celebrations.png";
import privateGardenPartiesImage from "../../images/Private Garden Parties.png";
import romanticMomentsImage from "../../images/Romantic Wedding Moments.png";
import weddingsImage from "../../images/Weddings & Romantic Ceremonies.png";
import whatsappIcon from "../../images/whatsapp-white-icon.webp";

/**
 * Local event photography supplied with the project. The filenames mirror the
 * section and experience titles used throughout the page.
 */
export const photos = {
  hero: { src: heroImage, alt: "A palm garden ceremony set with rows of chairs and a floral arch" },
  intro: { src: weddingsImage, alt: "A couple celebrating beneath a floral wedding arch in a palm garden" },
  promise: { src: exclusivePartiesImage, alt: "Guests enjoying an evening celebration among illuminated palm trees" },
  contact: { src: contactImage, alt: "A palm garden wedding ceremony prepared for an unforgettable celebration" },

  gardenCeremony: { src: weddingsImage, alt: "A couple celebrating beneath a floral wedding arch in a palm garden" },
  candleTable: { src: privateDinnersImage, alt: "An intimate candlelit dinner with flowers and warm evening light" },
  tentParty: { src: exclusivePartiesImage, alt: "Guests enjoying an evening celebration among illuminated palm trees" },

  palmCeremony: { src: palmGardenImage, alt: "A palm garden ceremony with elegant outdoor seating" },
  romanticMoment: { src: romanticMomentsImage, alt: "A romantic wedding moment beneath a floral arch" },
  candlelitReception: { src: candlelitReceptionsImage, alt: "An elegant candlelit reception with a richly styled dinner table" },
  poolside: { src: poolsideCocktailsImage, alt: "A poolside cocktail experience in Marrakech" },
  gardenParty: { src: privateGardenPartiesImage, alt: "A private garden party beneath palm trees and warm lanterns" },
} satisfies Record<string, Photo>;

export { whatsappIcon };

/* ------------------------------ Brand ------------------------------- */

export const brand = {
  name: "Lodgek Marrakech",
  primary: "Lodgek",
  secondary: "Marrakech",
  location: "Marrakech",
};

// Add the business phone number in international format, digits only (e.g. "212600000000").
export const whatsappBusinessNumber = "212728585823";

export const whatsappLink = (message: string) =>
  `https://wa.me/${whatsappBusinessNumber}?text=${encodeURIComponent(message)}`;

export const defaultWhatsappMessage =
  "Hello Lodgek Marrakech, I would like help planning a celebration in Marrakech.";

export const navLinks = [
  { label: "What we create", href: "#celebrations" },
  { label: "Our promise", href: "#promise" },
  { label: "Experiences", href: "#experiences" },
  { label: "Contact", href: "#contact" },
];

/* --------------------------- Section 2 ------------------------------ */

export interface Celebration {
  title: string;
  description: string;
  photo: Photo;
  gallery: Photo[];
}

// Each category opens its own popup gallery using its supplied section image.
export const celebrations: Celebration[] = [
  {
    title: "Weddings & Romantic Ceremonies",
    description:
      "Celebrate your love with beautiful floral settings, romantic garden ceremonies and unforgettable destination weddings designed around your story.",
    photo: photos.gardenCeremony,
    gallery: [photos.gardenCeremony],
  },
  {
    title: "Private Dinners & Celebrations",
    description:
      "Bring your loved ones together for elegant candlelit dinners, engagement parties, birthdays and meaningful private occasions.",
    photo: photos.candleTable,
    gallery: [photos.candleTable],
  },
  {
    title: "Exclusive Parties & Events",
    description:
      "Host stylish cocktail receptions, private gatherings and special events in exceptional garden settings with personalized styling and entertainment.",
    photo: photos.tentParty,
    gallery: [photos.tentParty],
  },
];

/* --------------------------- Section 3 ------------------------------ */

export const promises = [
  {
    title: "Bespoke Event Design",
    description:
      "Every detail is tailored to your style, from floral arrangements and décor to lighting, tablescapes and the overall atmosphere.",
  },
  {
    title: "Exceptional Venues",
    description:
      "Discover romantic gardens, elegant villas and distinctive Moroccan settings selected to complement your celebration.",
  },
  {
    title: "Seamless Coordination",
    description:
      "From trusted suppliers and guest arrangements to event-day logistics, we coordinate the details so you can enjoy every moment.",
  },
];

/* --------------------------- Section 4 ------------------------------ */

export interface SignatureExperience {
  title: string;
  description: string;
  photo: Photo;
}

export const signatureExperiences: SignatureExperience[] = [
  {
    title: "Palm Garden Ceremonies",
    description:
      "Exchange vows in a tropical garden, surrounded by lush palms, delicate florals and the people who matter most.",
    photo: photos.palmCeremony,
  },
  {
    title: "Romantic Wedding Moments",
    description:
      "Create heartfelt memories with personalized ceremonies, beautiful décor and thoughtful touches inspired by your love story.",
    photo: photos.romanticMoment,
  },
  {
    title: "Elegant Candlelit Receptions",
    description:
      "Gather around beautifully styled tables for intimate dinners and sophisticated wedding receptions.",
    photo: photos.candlelitReception,
  },
  {
    title: "Poolside Cocktail Experiences",
    description:
      "Welcome guests into relaxed lounge settings with beautiful pools, Moroccan-inspired décor and a refreshing garden atmosphere.",
    photo: photos.poolside,
  },
  {
    title: "Private Garden Parties",
    description:
      "Celebrate with stylish cocktail gatherings, music, warm lighting and beautifully designed outdoor spaces that capture the spirit of Marrakech.",
    photo: photos.gardenParty,
  },
];

/* ----------------------------- Inquiry ------------------------------ */

export interface EventInquiry {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budget: string;
  currency: string;
  message: string;
}

export const eventTypeOptions = [
  "Wedding",
  "Romantic ceremony",
  "Engagement party",
  "Private dinner",
  "Birthday celebration",
  "Cocktail reception",
  "Private garden party",
  "Corporate event",
  "Other",
];

export const currencyOptions = [
  { value: "EUR", label: "EUR — Euro" },
  { value: "MAD", label: "MAD — Moroccan dirham" },
  { value: "USD", label: "USD — US dollar" },
  { value: "GBP", label: "GBP — Pound sterling" },
];

export const defaultEventInquiry = (): EventInquiry => ({
  name: "",
  email: "",
  phone: "",
  eventType: "Wedding",
  eventDate: "",
  guestCount: "",
  budget: "",
  currency: "EUR",
  message: "",
});

export const formatEventDate = (iso: string) => {
  if (!iso) return "Date to be confirmed";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
