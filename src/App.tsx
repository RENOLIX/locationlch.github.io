import { useEffect, useMemo, useState } from "react";
import LiquidGlass from "liquid-glass-react";

type Page = "accueil" | "vehicules" | "services" | "marques" | "contact";

type Vehicle = {
  name: string;
  category: string;
  tag: string;
  image: string;
  seats: string;
  use: string;
};

const logoUrl = `${import.meta.env.BASE_URL}images/lch-logo.png`;

const heroImage =
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=82";

const brandLogos = [
  ["Renault", "https://cdn.simpleicons.org/renault/073B78"],
  ["Dacia", "https://cdn.simpleicons.org/dacia/073B78"],
  ["Peugeot", "https://cdn.simpleicons.org/peugeot/073B78"],
  ["Fiat", "https://cdn.simpleicons.org/fiat/073B78"],
  ["Opel", "https://cdn.simpleicons.org/opel/073B78"],
  ["Volkswagen", "https://cdn.simpleicons.org/volkswagen/073B78"],
  ["Audi", "https://cdn.simpleicons.org/audi/073B78"],
  ["Kia", "https://cdn.simpleicons.org/kia/073B78"],
  ["Hyundai", "https://cdn.simpleicons.org/hyundai/073B78"],
  ["MG", "https://cdn.simpleicons.org/mg/073B78"],
  ["Geely", "https://cdn.simpleicons.org/geely/073B78"],
  ["Toyota", "https://cdn.simpleicons.org/toyota/073B78"],
];

const vehicles: Vehicle[] = [
  {
    name: "Renault Clio",
    category: "Mobilite urbaine",
    tag: "Commercial",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
    seats: "5 places",
    use: "Visites client, ville, equipe terrain",
  },
  {
    name: "Dacia Stepway",
    category: "Mobilite urbaine",
    tag: "Economique",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    seats: "5 places",
    use: "Deplacements mixtes et trajets regionaux",
  },
  {
    name: "Opel Astra",
    category: "Management et cadres",
    tag: "Confort",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
    seats: "5 places",
    use: "Managers, responsables et cadres mobiles",
  },
  {
    name: "MG5 / Fiat Tipo",
    category: "Management et cadres",
    tag: "Berline",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    seats: "5 places",
    use: "Route, missions longues, image corporate",
  },
  {
    name: "VW Passat / Audi",
    category: "Direction et prestige",
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    seats: "5 places",
    use: "Direction, accueil partenaires, representation",
  },
  {
    name: "Kia Sportage / Tucson",
    category: "Direction et prestige",
    tag: "SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
    seats: "5 places",
    use: "Direction, sites, routes longues",
  },
  {
    name: "Renault Kangoo",
    category: "Utilitaire et logistique",
    tag: "Utilitaire",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80",
    seats: "2-5 places",
    use: "Intervention, livraison, maintenance",
  },
  {
    name: "Pick-up / Doblo",
    category: "Utilitaire et logistique",
    tag: "Terrain",
    image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=900&q=80",
    seats: "2-5 places",
    use: "Logistique, sites industriels, chantiers",
  },
  {
    name: "Motos de livraison",
    category: "Motos professionnelles",
    tag: "Livraison",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
    seats: "1-2 places",
    use: "Livraison rapide et mobilite urbaine",
  },
];

const services = [
  ["Location LLD / LMD", "Contrats longs ou moyens termes pour voitures touristiques, utilitaires et pick-up."],
  ["Materiel roulant", "Bus, mini-bus, camions et engins TP pour les besoins d'exploitation."],
  ["Motos professionnelles", "Motos standard et motos de livraison pour les equipes mobiles."],
  ["Vente avec facturation", "Vente de vehicules avec dossier administratif et facturation claire."],
  ["Maintenance auto", "Entretien, suivi technique et pieces de rechange pour garder le parc disponible."],
];

function getPageFromHash(): Page {
  const value = window.location.hash.replace("#/", "").split("?")[0] || "accueil";
  return ["accueil", "vehicules", "services", "marques", "contact"].includes(value)
    ? (value as Page)
    : "accueil";
}

function GlassAction({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "light";
}) {
  return (
    <span className="liquid-button-wrap">
      <LiquidGlass
        className={`liquid-action ${variant}`}
        displacementScale={38}
        blurAmount={0.08}
        saturation={135}
        aberrationIntensity={1.1}
        elasticity={0.22}
        cornerRadius={999}
        padding="12px 18px"
        onClick={onClick}
      >
        <span>{children}</span>
      </LiquidGlass>
    </span>
  );
}

function AppHeader({ page, go }: { page: Page; go: (page: Page) => void }) {
  const nav: Array<[Page, string]> = [
    ["accueil", "Accueil"],
    ["vehicules", "Vehicules"],
    ["services", "Services"],
    ["marques", "Marques"],
    ["contact", "Contact"],
  ];

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => go("accueil")} aria-label="Accueil LCH Auto">
        <img src={logoUrl} alt="EURL LCH Automotive Fleet" />
      </button>
      <nav aria-label="Navigation principale">
        {nav.map(([id, label]) => (
          <button className={page === id ? "active" : ""} key={id} type="button" onClick={() => go(id)}>
            {label}
          </button>
        ))}
      </nav>
      <button className="header-cta" type="button" onClick={() => go("contact")}>
        Devis flotte
      </button>
    </header>
  );
}

function BrandMarquee() {
  const logos = [...brandLogos, ...brandLogos];

  return (
    <section className="brand-strip" aria-label="Marques disponibles">
      <div className="brand-strip-head">
        <span>Marques disponibles</span>
        <strong>Tourisme, prestige, utilitaire et livraison</strong>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {logos.map(([name, logo], index) => (
            <div className="brand-chip" key={`${name}-${index}`}>
              <img src={logo} alt={`Logo ${name}`} loading="lazy" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero({ go }: { go: (page: Page) => void }) {
  return (
    <section className="hero">
      <img className="hero-photo" src={heroImage} alt="Vehicule professionnel LCH Auto en circulation" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-card">
          <span className="eyebrow">EURL LCH Automotive Fleet</span>
          <h1>Location et gestion de flotte pour entreprises.</h1>
          <p>
            LLD, LMD, utilitaires, pick-up, motos, bus, mini-bus et materiel roulant. Une flotte
            organisee pour que votre mobilite devienne un levier de performance.
          </p>
          <div className="hero-actions">
            <GlassAction onClick={() => go("vehicules")}>Voir les vehicules</GlassAction>
            <GlassAction onClick={() => go("contact")} variant="light">Demander un devis</GlassAction>
          </div>
        </div>
      </div>
    </section>
  );
}

function VehicleGrid({ limit }: { limit?: number }) {
  const [category, setCategory] = useState("Tous");
  const categories = ["Tous", ...Array.from(new Set(vehicles.map((vehicle) => vehicle.category)))];
  const visible = useMemo(() => {
    const filtered = category === "Tous" ? vehicles : vehicles.filter((vehicle) => vehicle.category === category);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [category, limit]);

  return (
    <section className="section vehicle-section">
      <div className="section-heading split">
        <div>
          <span className="eyebrow blue">Vehicules disponibles</span>
          <h2>Un catalogue clair par usage entreprise.</h2>
        </div>
        <div className="filters" aria-label="Filtre categories vehicules">
          {categories.map((item) => (
            <button className={category === item ? "active" : ""} key={item} type="button" onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="vehicle-grid">
        {visible.map((vehicle) => (
          <article className="vehicle-card" key={vehicle.name}>
            <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
            <div className="vehicle-body">
              <span>{vehicle.category}</span>
              <h3>{vehicle.name}</h3>
              <p>{vehicle.use}</p>
              <div className="vehicle-meta">
                <strong>{vehicle.tag}</strong>
                <strong>{vehicle.seats}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomePage({ go }: { go: (page: Page) => void }) {
  return (
    <>
      <Hero go={go} />
      <BrandMarquee />
      <section className="section intro-grid">
        {[
          ["LLD / LMD", "Contrats adaptes aux cycles d'exploitation."],
          ["Parc multi-gammes", "Citadines, cadres, prestige, utilitaires, motos."],
          ["Suivi technique", "Maintenance auto et pieces de rechange."],
        ].map(([title, text]) => (
          <article key={title}>
            <span>{title}</span>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <VehicleGrid limit={6} />
      <section className="section cta-band">
        <h2>Une flotte a mettre en place rapidement ?</h2>
        <button type="button" onClick={() => go("contact")}>Parler a LCH Auto</button>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <span className="eyebrow blue">Services</span>
        <h1>Location, vente, maintenance et gestion operationnelle.</h1>
      </div>
      <div className="service-list">
        {services.map(([title, text], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BrandsPage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <span className="eyebrow blue">Marques</span>
        <h1>Des marques reconnues pour chaque niveau de mobilite.</h1>
      </div>
      <BrandMarquee />
      <div className="brand-grid">
        {brandLogos.map(([name, logo]) => (
          <article key={name}>
            <img src={logo} alt={`Logo ${name}`} loading="lazy" />
            <strong>{name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  const [need, setNeed] = useState("Location LLD / LMD");

  return (
    <section className="page-shell contact-page">
      <div className="page-title">
        <span className="eyebrow blue">Contact commercial</span>
        <h1>Construisons votre prochaine flotte.</h1>
        <p>
          Indiquez le nombre de vehicules, la duree, la categorie souhaitee et le niveau de maintenance attendu.
        </p>
      </div>
      <form className="contact-form">
        <label>
          Nom de l'entreprise
          <input type="text" placeholder="Votre societe" />
        </label>
        <label>
          Besoin principal
          <select value={need} onChange={(event) => setNeed(event.target.value)}>
            <option>Location LLD / LMD</option>
            <option>Utilitaires et logistique</option>
            <option>Motos de livraison</option>
            <option>Vente de vehicules</option>
            <option>Maintenance et pieces</option>
          </select>
        </label>
        <div className="form-summary">
          <span>Demande preparee</span>
          <strong>{need}</strong>
        </div>
        <label>
          Message
          <textarea rows={5} placeholder="Nombre de vehicules, duree, type de flotte..." />
        </label>
        <button type="button">Envoyer la demande</button>
      </form>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const go = (target: Page) => {
    window.location.hash = `/${target}`;
    setPage(target);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <AppHeader page={page} go={go} />
      <main>
        {page === "accueil" && <HomePage go={go} />}
        {page === "vehicules" && <VehicleGrid />}
        {page === "services" && <ServicesPage />}
        {page === "marques" && <BrandsPage />}
        {page === "contact" && <ContactPage />}
      </main>
      <footer>
        <strong>LCH Auto</strong>
        <span>EURL LCH Automotive Fleet - Location, vente, maintenance et gestion de flotte.</span>
        <button type="button" onClick={() => go("accueil")}>Retour accueil</button>
      </footer>
    </>
  );
}
