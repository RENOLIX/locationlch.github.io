import { useEffect, useMemo, useState } from "react";

type Page = "accueil" | "flotte" | "secondaire" | "apropos" | "contact";

type Vehicle = {
  name: string;
  category: string;
  activity: string;
  image: string;
  fallback: string;
  desc: string;
};

const base = import.meta.env.BASE_URL;
const logoUrl = `${base}images/lch-logo.png`;
const phoneNumber = "0560666705";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1900&q=86",
    title: "Location de vehicules et gestion de flotte pour entreprises.",
  },
  {
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1900&q=86",
    title: "LLD, LMD, utilitaires, motos et materiel roulant.",
  },
  {
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1900&q=86",
    title: "Votre mobilite devient un levier de performance.",
  },
];

const brandLogos = [
  ["Renault", "https://cdn.simpleicons.org/renault/ffffff"],
  ["Dacia", "https://cdn.simpleicons.org/dacia/ffffff"],
  ["Opel", "https://cdn.simpleicons.org/opel/ffffff"],
  ["Geely", "https://commons.wikimedia.org/wiki/Special:FilePath/Geely%20logo.svg"],
  ["MG", "https://cdn.simpleicons.org/mg/ffffff"],
  ["Fiat", "https://cdn.simpleicons.org/fiat/ffffff"],
  ["Volkswagen", "https://cdn.simpleicons.org/volkswagen/ffffff"],
  ["Audi", "https://cdn.simpleicons.org/audi/ffffff"],
  ["Kia", "https://cdn.simpleicons.org/kia/ffffff"],
  ["Hyundai", "https://cdn.simpleicons.org/hyundai/ffffff"],
  ["Toyota", "https://cdn.simpleicons.org/toyota/ffffff"],
  ["Peugeot", "https://cdn.simpleicons.org/peugeot/ffffff"],
];

const fallbackCar = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=82";

const vehicles: Vehicle[] = [
  {
    name: "Renault Clio",
    category: "Mobilite urbaine",
    activity: "Location des vehicules",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Gu%C3%A9rande_-_44350_-_2021.06.16_-_Titi_Floris_-_Renault_Clio_IV_%C2%A9_Anthony_Levrot.jpg/960px-Gu%C3%A9rande_-_44350_-_2021.06.16_-_Titi_Floris_-_Renault_Clio_IV_%C2%A9_Anthony_Levrot.jpg",
    fallback: fallbackCar,
    desc: "Citadine ideale pour les commerciaux, missions urbaines et deplacements quotidiens.",
  },
  {
    name: "Renault Symbol",
    category: "Mobilite urbaine",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2021%20Renault%20Symbol%201.6%20Zen.jpg",
    fallback: fallbackCar,
    desc: "Berline compacte economique pour parc entreprise et deplacements administratifs.",
  },
  {
    name: "Dacia Stepway",
    category: "Mobilite urbaine",
    activity: "Location des vehicules",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/2023_Dacia_Sandero_Stepway_1.0_tCe_Bi-Fuel_Expression_at_Dacia_Manchester_01.jpg/960px-2023_Dacia_Sandero_Stepway_1.0_tCe_Bi-Fuel_Expression_at_Dacia_Manchester_01.jpg",
    fallback: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=82",
    desc: "Polyvalente, robuste et adaptee aux trajets mixtes ville-route.",
  },
  {
    name: "Opel Astra",
    category: "Management et cadres",
    activity: "Location des vehicules",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/004_Car_dyno_testing_-_new_car_test_of_Opel_Astra_K_at_Opel_factory_in_Gliwice%2C_Poland.jpg/960px-004_Car_dyno_testing_-_new_car_test_of_Opel_Astra_K_at_Opel_factory_in_Gliwice%2C_Poland.jpg",
    fallback: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=82",
    desc: "Confort et image professionnelle pour managers et responsables.",
  },
  {
    name: "Geely Emgrand",
    category: "Management et cadres",
    activity: "Location des vehicules",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Geely_Emgrand_EC7_in_China.jpg/960px-Geely_Emgrand_EC7_in_China.jpg",
    fallback: fallbackCar,
    desc: "Berline de representation pour trajets cadres et visites clients.",
  },
  {
    name: "MG5",
    category: "Management et cadres",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2020%20SAIC%20MG%205%20%28front%29.jpg",
    fallback: fallbackCar,
    desc: "Berline confortable pour missions longues et parc direction operationnelle.",
  },
  {
    name: "Fiat Tipo",
    category: "Management et cadres",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2018%20Fiat%20Tipo%20Hatchback%20Lounge.jpg",
    fallback: fallbackCar,
    desc: "Solution sobre et efficace pour collaborateurs mobiles.",
  },
  {
    name: "Doblo panorama vitre",
    category: "Management et cadres",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fiat%20Doblo%20Cargo%20MTP07.jpg",
    fallback: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=82",
    desc: "Volume et confort pour equipes, navettes et besoins mixtes.",
  },
  {
    name: "VW Passat",
    category: "Direction et prestige",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/20200603%20Volkswagen%20Passat.jpg",
    fallback: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=82",
    desc: "Berline premium pour direction et representation.",
  },
  {
    name: "Audi / Golf",
    category: "Direction et prestige",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi%20A6%20e-tron%20Concept%20001.jpg",
    fallback: fallbackCar,
    desc: "Image premium, confort et polyvalence pour dirigeants.",
  },
  {
    name: "Kia Sportage",
    category: "Direction et prestige",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2018%20Kia%20Sportage%20GT-Line%20S%20facelift%20Front.jpg",
    fallback: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=82",
    desc: "SUV de standing pour routes longues et visites terrain.",
  },
  {
    name: "Hyundai Tucson",
    category: "Direction et prestige",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hyundai%20Tucson%20Front.JPG",
    fallback: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=82",
    desc: "SUV confortable pour direction, sites et partenaires.",
  },
  {
    name: "Renault Kangoo",
    category: "Utilitaire et logistique",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Renault%20Kangoo%20front%2020071212.jpg",
    fallback: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=82",
    desc: "Utilitaire compact pour maintenance, intervention et livraison.",
  },
  {
    name: "Fiat Doblo",
    category: "Utilitaire et logistique",
    activity: "Location des vehicules",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fiat%20Doblo%20Cargo%20MTP07.jpg",
    fallback: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=82",
    desc: "Volume utile pour logistique urbaine et transport professionnel.",
  },
  {
    name: "Pick-up",
    category: "Utilitaire et logistique",
    activity: "Location des vehicules",
    image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=900&q=82",
    fallback: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=900&q=82",
    desc: "Vehicule robuste pour sites, chantiers et zones difficiles.",
  },
  {
    name: "Motos de livraison",
    category: "Motos",
    activity: "Location des Motos",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=82",
    fallback: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=82",
    desc: "Motos standard et livraison rapide pour mobilite urbaine.",
  },
  {
    name: "Bus et mini-bus",
    category: "Materiel roulant",
    activity: "Location tout materiels roulant",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=82",
    fallback: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=82",
    desc: "Transport du personnel, navettes et missions groupe.",
  },
  {
    name: "Camions et engins TP",
    category: "Materiel roulant",
    activity: "Location tout materiels roulant",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Big%20heavy%20trucks%20and%20excavator%20machine%20working.jpg",
    fallback: "https://commons.wikimedia.org/wiki/Special:FilePath/Excavator%205.jpg",
    desc: "Camions, engins travaux publics et materiel roulant operationnel.",
  },
  {
    name: "Vehicules a la vente",
    category: "Vente",
    activity: "Vente tout type de vehicule avec facturation",
    image: "https://images.unsplash.com/photo-1562141961-9a85d0197a60?auto=format&fit=crop&w=900&q=82",
    fallback: fallbackCar,
    desc: "Vente de tout type de vehicule avec facturation et dossier administratif.",
  },
];

const primaryActivities = [
  ["Location des vehicules", "LLD ou LMD : touristique, utilitaire, pick-up et vehicules entreprise."],
  ["Location tout materiels roulant", "Bus, mini-bus, engins travaux publics et camions."],
  ["Location des Motos", "Motos standard et motos de livraison pour vos equipes terrain."],
  ["Vente tout type de vehicule", "Vente avec facturation et accompagnement administratif."],
];

const secondaryActivities = [
  ["Maintenance Auto", "Entretien, revision, diagnostic et suivi technique du parc."],
  ["Vente piece de rechange", "Approvisionnement de pieces pour limiter l'immobilisation."],
  ["Suivi de disponibilite", "Organisation des interventions et priorisation des vehicules critiques."],
];

function getPageFromHash(): Page {
  const value = window.location.hash.replace("#/", "").split("?")[0] || "accueil";
  return ["accueil", "flotte", "secondaire", "apropos", "contact"].includes(value) ? (value as Page) : "accueil";
}

function AppHeader({ page, go }: { page: Page; go: (page: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links: Array<[Page, string]> = [
    ["accueil", "Accueil"],
    ["flotte", "La flotte"],
    ["secondaire", "Maintenance"],
    ["apropos", "A Propos"],
    ["contact", "Contact"],
  ];

  return (
    <>
      <div className="topbar">
        <div>
          <span>Tel : {phoneNumber}</span>
          <span>contact@locationlch.dz</span>
        </div>
        <strong>Partenaire des entreprises en gestion de mobilite</strong>
      </div>
      <header className="site-header">
        <button className="brand" type="button" onClick={() => go("accueil")} aria-label="Accueil LCH Auto">
          <img src={logoUrl} alt="EURL LCH Automotive Fleet" />
        </button>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map(([id, label]) => (
            <button className={page === id ? "active" : ""} key={id} type="button" onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="header-cta" type="button" onClick={() => go("contact")}>Demander un devis</button>
          <button className={`menu-toggle ${menuOpen ? "open" : ""}`} type="button" onClick={() => setMenuOpen((current) => !current)} aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {links.map(([id, label]) => (
              <button
                className={page === id ? "active" : ""}
                key={id}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  go(id);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

function BrandMarquee({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`brand-marquee ${dark ? "dark" : ""}`}>
      <div className="brand-marquee-title">
        <span>Marques disponibles</span>
        <strong>Renault, Dacia, Opel, Geely, MG, Fiat, VW, Audi, Kia, Hyundai...</strong>
      </div>
      <div className="marquee-window">
        <div className="marquee-track">
          {[...brandLogos, ...brandLogos].map(([name, src], index) => (
            <div className="brand-chip" key={`${name}-${index}`}>
              <div className="brand-mark">
                <img
                  className={`brand-logo brand-${name.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                  src={src}
                  alt={`Logo ${name}`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.parentElement?.classList.add("logo-missing");
                  }}
                />
                <strong>{name.slice(0, 3).toUpperCase()}</strong>
              </div>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero({ go }: { go: (page: Page) => void }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      {heroSlides.map((item, index) => (
        <img className={`hero-photo ${slide === index ? "active" : ""}`} src={item.image} alt={item.title} key={item.image} />
      ))}
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-badge">Partenaire des entreprises en gestion de mobilite</span>
          <h1>{heroSlides[slide].title}</h1>
          <p>Concentrez-vous sur votre coeur de metier, nous faisons de votre mobilite un levier de performance.</p>
          <div className="hero-actions">
            <button className="hero-primary" type="button" onClick={() => go("flotte")}>Voir la flotte</button>
            <button className="hero-secondary" type="button" onClick={() => go("contact")}>Demander un devis</button>
          </div>
        </div>
      </div>
      <div className="hero-controls">
        <div>
          {heroSlides.map((item, index) => (
            <button key={item.image} className={slide === index ? "active" : ""} type="button" onClick={() => setSlide(index)} aria-label={`Slide ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Activities({ go }: { go: (page: Page) => void }) {
  return (
    <section className="section activities">
      <div className="activities-shell">
        <div className="activities-intro">
          <span className="eyebrow blue">Activite principale</span>
          <h2>Des solutions de mobilite pour chaque usage professionnel.</h2>
          <p>
            LCH Auto structure la location, la vente et la mise a disposition de moyens roulants pour les
            entreprises : vehicules legers, utilitaires, motos, bus, camions et engins TP.
          </p>
          <div className="activity-metrics">
            <div><strong>LLD / LMD</strong><span>Contrats flexibles</span></div>
            <div><strong>Multi-gammes</strong><span>Urbain, cadre, prestige, logistique</span></div>
          </div>
          <button type="button" onClick={() => go("secondaire")}>Maintenance et pieces</button>
        </div>
        <div className="activity-grid">
          {primaryActivities.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="vehicle-card">
      <img
        src={vehicle.image}
        alt={vehicle.name}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = vehicle.fallback;
        }}
      />
      <div className="vehicle-info">
        <span>{vehicle.category}</span>
        <h3>{vehicle.name}</h3>
        <p>{vehicle.desc}</p>
        <strong>{vehicle.activity}</strong>
      </div>
    </article>
  );
}

function FleetSection({ preview = false }: { preview?: boolean }) {
  const [filter, setFilter] = useState("Tous");
  const filters = ["Tous", ...Array.from(new Set(vehicles.map((item) => item.category)))];
  const filtered = useMemo(() => {
    const list = filter === "Tous" ? vehicles : vehicles.filter((item) => item.category === filter);
    return preview ? list.slice(0, 8) : list;
  }, [filter, preview]);

  return (
    <section className="section fleet-zone">
      <div className="section-head split">
        <div>
          <span className="eyebrow blue">Gamme vehicules</span>
          <h2>Vehicules disponibles avec filtres par categorie.</h2>
        </div>
        <div className="fleet-filters">
          {filters.map((item) => (
            <button className={filter === item ? "active" : ""} key={item} type="button" onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="vehicle-grid">
        {filtered.map((vehicle) => (
          <VehicleCard key={`${vehicle.name}-${vehicle.category}`} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}

function HomePage({ go }: { go: (page: Page) => void }) {
  return (
    <>
      <Hero go={go} />
      <BrandMarquee dark />
      <Activities go={go} />
      <FleetSection preview />
      <section className="section about-preview">
        <div>
          <span className="eyebrow blue">Pourquoi LCH Auto</span>
          <h2>Un partenaire flotte, pas seulement un loueur.</h2>
        </div>
        <p>
          LCH Auto accompagne les entreprises dans la mise a disposition, la gestion et le suivi de leur
          mobilite : contrats LLD/LMD, parc multi-gammes, maintenance, pieces et vente avec facturation.
        </p>
        <button type="button" onClick={() => go("apropos")}>Decouvrir l'entreprise</button>
      </section>
    </>
  );
}

function FleetPage() {
  return (
    <main className="page">
      <div className="page-title">
        <span className="eyebrow blue">La flotte LCH Auto</span>
        <h1>Citadines, cadres, prestige, utilitaires, motos et materiel roulant.</h1>
        <p>Filtrez par gamme et consultez les modeles disponibles pour LLD, LMD, vente avec facturation ou mission operationnelle.</p>
      </div>
      <section className="page-intro-grid">
        <article>
          <span>01</span>
          <h3>Mobilite urbaine</h3>
          <p>Renault Clio, Symbol, Stepway et equivalents pour commerciaux, administrations et missions quotidiennes.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Cadres et direction</h3>
          <p>Berlines et SUV confortables pour managers, dirigeants, visites clients et representation.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Logistique et terrain</h3>
          <p>Utilitaires, pick-up, motos, bus, mini-bus, camions et engins TP selon la mission.</p>
        </article>
      </section>
      <FleetSection />
    </main>
  );
}

function SecondaryPage() {
  return (
    <main className="page">
      <div className="page-title">
        <span className="eyebrow blue">Activite secondaire</span>
        <h1>Maintenance Auto et vente piece de rechange.</h1>
        <p>Une flotte performante depend de la disponibilite. LCH Auto structure le suivi technique et l'approvisionnement.</p>
      </div>
      <section className="section secondary-grid">
        {secondaryActivities.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="maintenance-flow">
        <div>
          <span className="eyebrow blue">Process</span>
          <h2>Maintenance organisee pour garder la flotte disponible.</h2>
        </div>
        <ol>
          <li><strong>Diagnostic</strong><span>Controle rapide des besoins techniques et de l'urgence.</span></li>
          <li><strong>Planification</strong><span>Intervention programmee selon l'activite de l'entreprise.</span></li>
          <li><strong>Pieces</strong><span>Approvisionnement et remplacement des pieces de rechange.</span></li>
          <li><strong>Suivi</strong><span>Historique, disponibilite et priorisation des vehicules critiques.</span></li>
        </ol>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page">
      <div className="page-title">
        <span className="eyebrow blue">A propos</span>
        <h1>EURL LCH Automotive Fleet, sigle LCH Auto.</h1>
        <p>
          Nous aidons les entreprises a externaliser leur mobilite pour se concentrer sur leur coeur de metier.
          Notre role : selectionner, fournir, suivre et maintenir les moyens roulants adaptes a chaque mission.
        </p>
      </div>
      <section className="section secondary-grid about-capabilities">
        <article>
          <h3>Location entreprise</h3>
          <p>Contrats LLD et LMD pour vehicules touristiques, utilitaires, pick-up, motos et materiel roulant.</p>
        </article>
        <article>
          <h3>Gestion de mobilite</h3>
          <p>Une organisation pensee pour donner aux equipes le bon vehicule, au bon moment, selon la mission.</p>
        </article>
        <article>
          <h3>Vente et suivi</h3>
          <p>Vente avec facturation, accompagnement administratif, maintenance et pieces de rechange.</p>
        </article>
      </section>
      <section className="maintenance-flow about-flow">
        <div>
          <span className="eyebrow blue">Notre approche</span>
          <h2>Une gestion de flotte claire, suivie et adaptee aux entreprises.</h2>
        </div>
        <ol>
          <li><strong>Analyse du besoin</strong><span>Identification de la gamme, de la duree, du volume et de l'usage terrain.</span></li>
          <li><strong>Selection du parc</strong><span>Choix des vehicules selon les fonctions : urbain, cadres, direction, utilitaire ou logistique.</span></li>
          <li><strong>Mise a disposition</strong><span>Organisation de la location, de la vente avec facturation ou du materiel roulant demande.</span></li>
          <li><strong>Suivi operationnel</strong><span>Maintenance, pieces de rechange et accompagnement pour limiter l'immobilisation.</span></li>
        </ol>
      </section>
      <BrandMarquee />
    </main>
  );
}

function ContactPage() {
  return (
    <main className="page contact-page">
      <div className="page-title">
        <span className="eyebrow blue">Contact</span>
        <h1>Demander une proposition flotte.</h1>
        <p>Precisez la categorie, la duree, le nombre de vehicules et le niveau de service attendu.</p>
      </div>
      <aside className="contact-panel">
        <h3>Informations utiles</h3>
        <p>Pour une reponse precise, indiquez la gamme, la quantite, la duree souhaitee, la ville et le type d'utilisation.</p>
        <div><strong>Telephone</strong><span>{phoneNumber}</span></div>
        <div><strong>Email</strong><span>contact@locationlch.dz</span></div>
        <div><strong>Zone</strong><span>Algerie</span></div>
      </aside>
      <form className="contact-form">
        <label>Nom de l'entreprise<input placeholder="Votre societe" /></label>
        <label>Telephone<input placeholder="+213 ..." /></label>
        <label>Besoin<select><option>Location des vehicules LLD / LMD</option><option>Materiel roulant</option><option>Motos</option><option>Vente avec facturation</option><option>Maintenance et pieces</option></select></label>
        <label>Message<textarea rows={5} placeholder="Nombre de vehicules, categorie, duree..." /></label>
        <button type="button">Envoyer la demande</button>
      </form>
    </main>
  );
}

function SiteFooter({ go }: { go: (page: Page) => void }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-brands">
        <p>Marques disponibles</p>
        <div>
          {brandLogos.map(([name, src]) => (
            <span className="footer-brand-logo" key={name}>
              <img
                className={`brand-logo brand-${name.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                src={src}
                alt={name}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.parentElement?.classList.add("logo-missing");
                }}
              />
              <strong>{name.slice(0, 3).toUpperCase()}</strong>
            </span>
          ))}
        </div>
      </div>
      <div className="footer-main">
        <div>
          <img src={logoUrl} alt="LCH Auto" />
          <p>Partenaire des entreprises en location, vente, maintenance et gestion de flotte.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <button onClick={() => go("accueil")}>Accueil</button>
          <button onClick={() => go("flotte")}>La flotte</button>
          <button onClick={() => go("secondaire")}>Maintenance</button>
          <button onClick={() => go("apropos")}>A propos</button>
        </div>
        <div>
          <h4>Activites</h4>
          <span>Location des vehicules</span>
          <span>Location materiel roulant</span>
          <span>Location des motos</span>
          <span>Vente avec facturation</span>
        </div>
        <div>
          <h4>Contact</h4>
          <span>Algerie</span>
          <span>{phoneNumber}</span>
          <span>contact@locationlch.dz</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} LCH Auto. Tous droits reserves.</span>
        <span>EURL LCH Automotive Fleet</span>
      </div>
    </footer>
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
      {page === "accueil" && <HomePage go={go} />}
      {page === "flotte" && <FleetPage />}
      {page === "secondaire" && <SecondaryPage />}
      {page === "apropos" && <AboutPage />}
      {page === "contact" && <ContactPage />}
      <SiteFooter go={go} />
    </>
  );
}
