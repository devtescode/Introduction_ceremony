import heroImage from "../assets/nikkah-hero.jpg";
import brideImage from "../assets/bride.jpg";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Product } from "@/lib/types";
import { getIntroductionImages, type IntroductionImage } from "../lib/introduction-storage";
import { Loader2 } from "lucide-react";

const couple = [
  {
    role: "Groom",
    name: "Agboola Toheeb Akinyemi",
    initials: "AT",
    note: "A refined portrait space for the groom’s photograph, framed for a formal Introduction ceremony presentation.",
  },
  {
    role: "Bride",
    name: "Adewale Roqeebat Ololade",
    initials: "AR",
    note: "A graceful portrait space for the bride’s photograph, designed to keep her image elegant and prominent.",
  },
];

const eventDetails = [
  ["Event", "Introduction Ceremony"],
  ["Date", "10 May 2026"],
  ["Location", "Bintinlaye, Ajimosin, Ibadan"],
  ["Landmark", "Tobest Block Industry"],
];

const directionSteps = [
  "From anywhere, take a cab going to Academy–Olomi.",
  "From Academy Bridge top, take a bike or maruwa going to Olunde.",
  "After dropping at Olunde, take a bike going to Ajimosin.",
  "Drop at Tobest Block Industry in Bintinlaye.",
];

const gallery = ["Family arrival", "Bride portrait", "Groom portrait", "Traditional decor", "Blessing moment", "Guest celebration"];

export function IntroductionPage() {
  const [images, setImages] = useState<IntroductionImage[]>([]);

  useEffect(() => {
    const syncImages = () => setImages(getIntroductionImages());
    syncImages();
    window.addEventListener("storage", syncImages);
    window.addEventListener("introduction-images-updated", syncImages);

    return () => {
      window.removeEventListener("storage", syncImages);
      window.removeEventListener("introduction-images-updated", syncImages);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-ceremony text-foreground">
      <HeroSection />
      <CoupleSection images={images} />
      <EventSection />
      <GallerySection images={images} />
      {/* <ResponseSection /> */}
    </main>
  );
}

function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] px-5 py-5 sm:px-8 lg:px-12">
      <img
        src={heroImage}
        alt="Elegant emerald and gold Introduction ceremony decor"
        width={1600}
        height={960}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-veil" />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-veil-foreground/20 pb-5 text-veil-foreground">
        <span className="font-display text-2xl font-semibold tracking-tight">T & R</span>
        <div className="hidden items-center gap-7 text-sm sm:flex">
          <a className="transition hover:text-gold" href="#couple">Couple</a>
          <a className="transition hover:text-gold" href="#event">Event</a>
          <a className="transition hover:text-gold" href="#location">Location</a>
          <a className="transition hover:text-gold" href="#gallery">Gallery</a>
          <Link
            to="/admin"
            className="rounded-full border border-veil-foreground/30 bg-background/70 px-4 py-2 text-sm font-semibold transition duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
          >
            Admin
          </Link>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden flex h-11 w-11 items-center justify-center rounded-full border border-veil-foreground/30 bg-background/80 text-veil-foreground shadow-sm transition hover:border-gold hover:text-gold"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className={`block h-0.5 w-6 bg-veil-foreground transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-veil-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-veil-foreground transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
      </nav>
      <div
        className={`sm:hidden absolute top-20 right-5 z-20 w-[min(92vw,18rem)] rounded-[28px] border border-veil-foreground/20 bg-background/95 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 ease-out ${mobileMenuOpen ? "opacity-100 scale-100 visible" : "pointer-events-none opacity-0 scale-95 invisible"}`}
      >
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">Jump to</p>
        <a
          className="block rounded-2xl px-4 py-3 text-base font-semibold text-foreground transition hover:bg-gold/10 hover:text-gold"
          href="#couple"
          onClick={() => setMobileMenuOpen(false)}
        >
          Couple
        </a>
        <a
          className="mt-2 block rounded-2xl px-4 py-3 text-base font-semibold text-foreground transition hover:bg-gold/10 hover:text-gold"
          href="#event"
          onClick={() => setMobileMenuOpen(false)}
        >
          Event
        </a>
        <a
          className="mt-2 block rounded-2xl px-4 py-3 text-base font-semibold text-foreground transition hover:bg-gold/10 hover:text-gold"
          href="#location"
          onClick={() => setMobileMenuOpen(false)}
        >
          Location
        </a>
        <a
          className="mt-2 block rounded-2xl px-4 py-3 text-base font-semibold text-foreground transition hover:bg-gold/10 hover:text-gold"
          href="#gallery"
          onClick={() => setMobileMenuOpen(false)}
        >
          Gallery
        </a>
        <Link
          className="mt-3 flex items-center justify-center rounded-full border border-veil-foreground/20 bg-background px-4 py-3 text-base font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-gold hover:bg-gold/10 hover:text-gold"
          to="/admin"
          onClick={() => setMobileMenuOpen(false)}
        >
          Admin
        </Link>
      </div>
      <div className="relative z-10 mx-auto flex min-h-[76vh] max-w-7xl items-end pb-8 pt-20 text-veil-foreground">
        <div className="max-w-5xl">
          <p className="mb-4 inline-flex border border-veil-foreground/20 px-4 py-2 text-sm uppercase tracking-normal text-white">
            10 May 2026 · <strong>Ibadan</strong>
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[0.94] sm:text-7xl lg:text-8xl">
            Introduction Ceremony
          </h1>
          <p className="mt-5 max-w-3xl font-display text-3xl leading-tight text-veil-foreground sm:text-5xl">
            Agboola Toheeb Akinyemi & Adewale Roqeebat Ololade
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-veil-foreground/86">
            A polished celebration page for family, guests, portraits, directions, and the memorable beginning of a beautiful union.
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 z-10 hidden h-28 w-28 items-center justify-center rounded-full border border-gold/50 bg-background/10 text-center font-display text-gold backdrop-blur-md animate-float-soft lg:flex">
        Intro<br />2026
      </div>
    </section>
  );
}

function CoupleSection({ images }: { images: IntroductionImage[] }) {
  const imageBySlot = useMemo(
    () => ({
      Groom: images.find((image) => image.slot === "groom"),
      Bride: images.find((image) => image.slot === "bride"),
    }),
    [images],
  );

  return (
    <section id="couple" className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-primary">The couple</p>
          <h2 className="mt-3 text-balance text-5xl font-semibold">Portrait-led profiles for the bride and groom.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {couple.map((person) => (
            <article key={person.role} className="grid overflow-hidden border border-border bg-card shadow-ceremony sm:grid-cols-[0.95fr_1.05fr]">
              <figure className="relative min-h-[360px] overflow-hidden bg-gradient-to-br from-primary via-surface to-gold p-5">
                <div className="absolute inset-5 border border-veil-foreground/35" />
                {imageBySlot[person.role as "Groom" | "Bride"] ? (
                  <img
                    src={imageBySlot[person.role as "Groom" | "Bride"]?.src}
                    alt={`${person.name} ${person.role.toLowerCase()} portrait`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={person.role === "Groom" ? heroImage : brideImage}
                    alt={`${person.name} ${person.role.toLowerCase()} portrait`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <figcaption className="absolute bottom-8 left-8 bg-background/85 px-4 py-3 font-semibold text-foreground backdrop-blur-sm">
                  {person.role} photo
                </figcaption>
              </figure>
              <div className="flex flex-col justify-end p-7 sm:p-8">
                <p className="text-sm font-semibold uppercase text-gold">{person.role}</p>
                <h3 className="mt-3 text-balance text-4xl font-semibold leading-tight sm:text-5xl">{person.name}</h3>
                <p className="mt-5 leading-7 text-muted-foreground">{person.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapWithDirections({ destination }: { destination: string }) {
  const [mapUrl, setMapUrl] = useState("");
  const destinationLat = 7.415;
  const destinationLng = 3.93;

  useEffect(() => {
    // Use OpenStreetMap which doesn't require API keys
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          // Create a URL that shows both user location and destination
          const userLat = coords.latitude;
          const userLng = coords.longitude;
          const bbox = `${Math.min(userLng, destinationLng) - 0.05}%2C${Math.min(userLat, destinationLat) - 0.05}%2C${Math.max(userLng, destinationLng) + 0.05}%2C${Math.max(userLat, destinationLat) + 0.05}`;
          const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${userLat}%2C${userLng}&marker=${destinationLat}%2C${destinationLng}`;
          setMapUrl(url);
        },
        () => {
          // If geolocation fails, show map centered on destination
          const url = `https://www.openstreetmap.org/export/embed.html?bbox=3.88%2C7.36%2C3.98%2C7.47&layer=mapnik&marker=${destinationLat}%2C${destinationLng}`;
          setMapUrl(url);
        },
        { enableHighAccuracy: true, timeout: 8000 },
      );
    } else {
      // Fallback if geolocation not supported
      const url = `https://www.openstreetmap.org/export/embed.html?bbox=3.88%2C7.36%2C3.98%2C7.47&layer=mapnik&marker=${destinationLat}%2C${destinationLng}`;
      setMapUrl(url);
    }
  }, []);

  if (!mapUrl) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center bg-surface text-surface-foreground">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: "420px", overflow: "hidden" }}>
      <iframe
        title="Directions from your location to Tobest Block Industry"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, position: "absolute", top: 0, left: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30px",
          background: "white",
          zIndex: 10,
        }}
      />
    </div>
  );
}

function EventSection() {
  const destination = "Tobest Block Industry, Bintinlaye, Ajimosin, Ibadan, Nigeria";
  const encodedDestination = encodeURIComponent(destination);
  const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}&travelmode=driving`;
  const fallbackMapUrl = `https://www.openstreetmap.org/search?query=${encodedDestination}`;

  function openDirections() {
    if (!navigator.geolocation) {
      window.open(navigationUrl, "_blank", "noopener,noreferrer");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const origin = `${coords.latitude},${coords.longitude}`;
        const liveDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodedDestination}&travelmode=driving`;
        window.open(liveDirectionsUrl, "_blank", "noopener,noreferrer");
      },
      () => {
        window.open(navigationUrl, "_blank", "noopener,noreferrer");
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  return (
    <section id="event" className="bg-surface px-5 py-20 text-surface-foreground sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Event details</p>
          <h2 className="mt-3 text-balance text-5xl font-semibold">Introduction, hosted in Ibadan.</h2>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {eventDetails.map(([label, value]) => (
              <div key={label} className="border border-border bg-card p-5">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-2 text-xl font-semibold">
                  {label === "Location" ? (
                    <span>Bintinlaye, Ajimosin, <strong>Ibadan</strong></span>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div id="location" className="border border-border bg-card p-5 shadow-ceremony sm:p-7">
          <p className="text-sm font-semibold uppercase text-primary">Location guide</p>
          <ol className="mt-5 grid gap-4">
            {directionSteps.map((step, index) => (
              <li key={step} className="grid grid-cols-[3rem_1fr] items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-xl text-primary-foreground">
                  {index + 1}
                </span>
                <span className="border-b border-border pb-4 leading-7 text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={openDirections}
            className="mt-6 inline-flex w-full items-center justify-center bg-primary px-5 py-4 text-center font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Navigate from my current location
          </button>
          {/* <a className="mt-3 inline-flex w-full items-center justify-center border border-border bg-background px-5 py-3 text-center font-semibold text-foreground transition hover:bg-secondary" href={fallbackMapUrl} target="_blank" rel="noreferrer">
            Open location without Google
          </a> */}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl overflow-hidden border border-border bg-card shadow-ceremony">
        <div className="border-b border-border px-5 py-4 sm:px-7">
          <h3 className="text-lg font-bold">Map</h3>
        </div>
        <MapWithDirections destination={destination} />
      </div>
    </section>
  );
}

function GallerySection({ images }: { images: IntroductionImage[] }) {
  const uploadedGallery = images.filter((image) => image.slot === "gallery");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://bridal-be.onrender.com/products/getallproducts");
        const data = await res.json();

        const formatted = Array.isArray(data)
          ? data.map((p: any) => ({
              ...p,
              id: p._id,
            }))
          : [];

        console.log("BACKEND DATA:", formatted); // ✅ DEBUG (important)

        setProducts(formatted);
      } catch (err) {
        console.log("FETCH ERROR:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="gallery" className="px-4 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm font-semibold uppercase text-primary">
              Gallery
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold">
              Ceremony Gallery
            </h2>
          </div>

          <p className="text-sm sm:text-base max-w-md text-muted-foreground text-center sm:text-right">
            Bride, groom, family, and ceremony images displayed beautifully.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-gold" size={44} />
            <p className="text-muted-foreground text-sm">Loading collection...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No images available
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* 🔥 BACKEND IMAGES DISPLAY */}
            {products.map((product, i) => (
              <figure
                key={product._id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.imageURL}
                    alt={product.name || "Gallery image"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <figcaption className="absolute bottom-3 left-3 bg-background/80 px-3 py-2 text-sm font-medium backdrop-blur-md rounded-md">
                  {String(i + 1).padStart(2, "0")} · {product.name || "Image"}
                </figcaption>
              </figure>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}

// function ResponseSection() {
//   return (
//     <section className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 lg:px-12">
//       <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
//         <div>
//           <p className="text-sm font-semibold uppercase text-gold">Guest response</p>
//           <h2 className="mt-3 text-balance text-5xl font-semibold">A refined invitation response area for invited guests.</h2>
//         </div>
//         <form className="grid gap-4 border border-primary-foreground/20 bg-primary-foreground/8 p-5 backdrop-blur-sm sm:p-7" onSubmit={(event) => event.preventDefault()}>
//           <input className="border border-primary-foreground/25 bg-background/95 px-4 py-3 text-foreground outline-none ring-ring transition focus:ring-2" placeholder="Guest name" />
//           <input className="border border-primary-foreground/25 bg-background/95 px-4 py-3 text-foreground outline-none ring-ring transition focus:ring-2" placeholder="Phone number" />
//           <button className="bg-gold px-5 py-4 font-semibold text-gold-foreground transition hover:-translate-y-0.5 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring" type="submit">
//             Submit response preview
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }