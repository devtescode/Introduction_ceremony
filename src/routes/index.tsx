import { createFileRoute } from "@tanstack/react-router";

import App from "../App.jsx";
import heroImage from "../assets/nikkah-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Introduction Ceremony — Ibadan 2026" },
      {
        name: "description",
        content:
          "A refined Introduction ceremony website for Agboola Toheeb Akinyemi and Adewale Roqeebat Ololade on 10 May 2026 in Ibadan.",
      },
      { property: "og:title", content: "Introduction Ceremony — Ibadan 2026" },
      {
        property: "og:description",
        content: "Celebrate Toheeb and Roqeebat with event details, Ibadan directions, portrait spaces, gallery, and guest response information.",
      },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: App,
});