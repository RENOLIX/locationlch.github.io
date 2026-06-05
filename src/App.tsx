import { useMemo, useRef, useState } from "react";

const services = [
  {
    icon: "01",
    title: "LLD et LMD",
    text: "Location longue et moyenne duree de vehicules touristiques, utilitaires et pick-up.",
  },
  {
    icon: "02",
    title: "Materiel roulant",
    text: "Bus, mini-bus, camions et engins de travaux publics pour les besoins operationnels.",
  },
  {
    icon: "03",
    title: "Motos professionnelles",
    text: "Motos standard et motos de livraison pour les equipes terrain et la distribution.",
  },
  {
    icon: "04",
    title: "Vente avec facturation",
    text: "Vente de tout type de vehicule avec dossier administratif clair et facturation.",
  },
  {
    icon: "05",
    title: "Maintenance auto",
    text: "Entretien, suivi technique et disponibilite de pieces de rechange automobiles.",
  },
];

const ranges = [
  {
    title: "Mobilite urbaine",
    tone: "cyan",
    models: ["Renault Clio", "Renault Symbol", "Dacia Stepway", "Citadines economiques"],
    text: "Des vehicules faciles a exploiter au quotidien pour les equipes commerciales et administratives.",
  },
  {
    title: "Management et cadres",
    tone: "gold",
    models: ["Opel Astra", "Geely Emgrand", "MG5", "Fiat Tipo", "Doblo panorama vitre"],
    text: "Une gamme confortable et presentable pour cadres, responsables de sites et collaborateurs mobiles.",
  },
  {
    title: "Direction et prestige",
    tone: "graphite",
    models: ["VW Passat", "Audi", "Golf", "Kia Sportage", "Hyundai Tucson"],
    text: "Des vehicules de standing pour la direction, les visites partenaires et les besoins premium.",
  },
  {
    title: "Utilitaire et logistique",
    tone: "green",
    models: ["Renault Kangoo", "Fiat Doblo", "Pick-up", "Motos de livraison"],
    text: "Des solutions robustes pour transport, intervention, livraison et logistique terrain.",
  },
];

const fleetData = {
  "Mobilite urbaine": { monthly: "Souple", users: "Equipes commerciales", vehicles: "Clio, Symbol, Stepway" },
  "Management et cadres": { monthly: "Confort", users: "Cadres et managers", vehicles: "Astra, Emgrand, MG5" },
  "Direction et prestige": { monthly: "Premium", users: "Direction", vehicles: "Passat, Audi, Tucson" },
  "Utilitaire et logistique": { monthly: "Robuste", users: "Operations et livraison", vehicles: "Kangoo, Doblo, pick-up" },
};

const steps = [
  "Analyse du besoin et du parc cible",
  "Selection des vehicules et durees de location",
  "Mise a disposition avec documents et suivi",
  "Maintenance, remplacement et pilotage du parc",
];

const logoUrl = `${import.meta.env.BASE_URL}images/lch-logo.png`;

function GlassButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
}) {
  return (
    <a href={href} className={`glass-link ${variant}`}>
      <span>{children}</span>
    </a>
  );
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedRange, setSelectedRange] = useState(ranges[0].title);
  const [selectedNeed, setSelectedNeed] = useState("Location LLD / LMD");
  const selectedFleet = useMemo(
    () => fleetData[selectedRange as keyof typeof fleetData],
    [selectedRange],
  );

  return (
    <main>
      <section ref={heroRef} className="hero" id="accueil">
        <header className="site-header">
          <a className="brand" href="#accueil" aria-label="LCH Auto accueil">
            <img src={logoUrl} alt="EURL LCH Automotive Fleet" />
          </a>
          <nav aria-label="Navigation principale">
            <a href="#services">Services</a>
            <a href="#gammes">Gammes</a>
            <a href="#gestion">Gestion</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">Partenaire des entreprises en gestion de mobilite</span>
            <h1>LCH Auto transforme votre flotte en levier de performance.</h1>
            <p>
              Concentrez-vous sur votre coeur de metier, nous organisons vos vehicules, vos utilitaires,
              vos motos et votre maintenance avec une approche claire, flexible et professionnelle.
            </p>
            <div className="hero-actions">
              <GlassButton href="#contact">Demander une proposition</GlassButton>
              <GlassButton href="#gammes" variant="ghost">Voir les gammes</GlassButton>
            </div>
          </div>

          <div className="fleet-console" aria-label="Console de gestion de flotte LCH Auto">
            <div className="console-top">
              <span>Fleet desk</span>
              <strong>{selectedRange}</strong>
            </div>
            <div className="fleet-tabs" role="tablist" aria-label="Gammes de vehicules">
              {ranges.map((range) => (
                <button
                  key={range.title}
                  type="button"
                  className={selectedRange === range.title ? "active" : ""}
                  onClick={() => setSelectedRange(range.title)}
                >
                  {range.title}
                </button>
              ))}
            </div>
            <div className="fleet-visual">
              <div className="vehicle-line sedan" />
              <div className="vehicle-line utility" />
              <div className="vehicle-line moto" />
            </div>
            <div className="hero-panel-slot">
              <div className="hero-panel">
                <span className="panel-kicker">Solution flotte</span>
                <strong>{selectedFleet.vehicles}</strong>
                <div className="panel-grid compact">
                  <span><small>Contrat</small>{selectedFleet.monthly}</span>
                  <span><small>Usage</small>{selectedFleet.users}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-strip" aria-label="Indicateurs LCH Auto">
        {[
          ["LLD / LMD", "Contrats adaptes aux cycles de vos equipes"],
          ["Multi-gammes", "Citadines, cadres, prestige, utilitaires"],
          ["Suivi technique", "Maintenance et pieces de rechange"],
        ].map(([title, text]) => (
          <article className="stat" key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </article>
        ))}
      </section>

      <section className="section services-section" id="services">
        <div className="section-heading">
          <span className="eyebrow dark">Activites principales</span>
          <h2>Une offre complete pour garder vos equipes mobiles.</h2>
        </div>
        <div className="services-grid">
          {services.map((service) => {
            return (
              <article className="service-card" key={service.title}>
                <span className="icon-box">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section fleet-section" id="gammes">
        <div className="section-heading split">
          <div>
            <span className="eyebrow dark">Gamme vehicules</span>
            <h2>Chaque poste de mobilite a sa bonne categorie.</h2>
          </div>
          <p>
            De la citadine economique au vehicule de direction, LCH Auto compose un parc coherent avec vos
            usages, vos budgets et votre image.
          </p>
        </div>
        <div className="range-grid">
          {ranges.map((range) => (
            <article className={`range-card ${range.tone} ${selectedRange === range.title ? "selected" : ""}`} key={range.title}>
              <h3>{range.title}</h3>
              <p>{range.text}</p>
              <div className="model-list">
                {range.models.map((model) => (
                  <span key={model}>{model}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="management-section" id="gestion">
        <div className="operations-board" aria-label="Tableau operationnel de mobilite">
          <div className="board-header">
            <span>Plan de mobilite</span>
            <strong>Entreprise</strong>
          </div>
          <div className="board-row">
            <span>Parc actif</span>
            <strong>Vehicules + motos + utilitaires</strong>
          </div>
          <div className="board-row">
            <span>Suivi</span>
            <strong>Maintenance et remplacement</strong>
          </div>
          <div className="board-row">
            <span>Documents</span>
            <strong>Facturation et dossiers clairs</strong>
          </div>
          <div className="board-progress">
            <span style={{ width: "78%" }} />
          </div>
        </div>
        <div className="management-copy">
          <span className="eyebrow dark">Gestion et exploitation</span>
          <h2>Une mobilite d'entreprise simple a piloter.</h2>
          <p>
            Nous construisons une solution autour de votre activite : disponibilite des vehicules,
            remplacement, entretien, suivi administratif et evolution du parc selon la croissance de votre entreprise.
          </p>
          <div className="step-list">
            {steps.map((step, index) => (
              <div className="step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="trust-item">
          <span className="trust-code">01</span>
          <h3>Contrats lisibles</h3>
          <p>Des durees, conditions et prestations formulees pour faciliter les decisions d'achat.</p>
        </div>
        <div className="trust-item">
          <span className="trust-code">02</span>
          <h3>Parc structure</h3>
          <p>Des categories claires pour mieux affecter les vehicules par role et mission.</p>
        </div>
        <div className="trust-item">
          <span className="trust-code">03</span>
          <h3>Vision entreprise</h3>
          <p>Une approche B2B pensee pour les directions, achats, operations et logistique.</p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <span className="eyebrow">Contact commercial</span>
          <h2>Construisons votre prochaine flotte.</h2>
          <p>
            Indiquez vos besoins : nombre de vehicules, duree, profils d'utilisation, maintenance souhaitee et
            niveau de service attendu.
          </p>
          <div className="contact-lines">
            <a href="tel:+213000000000"><strong>Tel</strong> +213 000 00 00 00</a>
            <a href="mailto:contact@locationlch.dz"><strong>Mail</strong> contact@locationlch.dz</a>
            <span><strong>Pays</strong> Algerie</span>
          </div>
        </div>
        <div className="contact-shell">
          <form className="contact-form">
            <label>
              Nom de l'entreprise
              <input type="text" placeholder="Votre societe" />
            </label>
            <label>
              Besoin principal
              <select value={selectedNeed} onChange={(event) => setSelectedNeed(event.target.value)}>
                <option>Location LLD / LMD</option>
                <option>Utilitaires et logistique</option>
                <option>Motos de livraison</option>
                <option>Vente de vehicules</option>
                <option>Maintenance et pieces</option>
              </select>
            </label>
            <div className="form-summary">
              <span>Demande preparee</span>
              <strong>{selectedNeed}</strong>
            </div>
            <label>
              Message
              <textarea rows={4} placeholder="Nombre de vehicules, duree, type de flotte..." />
            </label>
            <button type="button">
              Envoyer la demande
            </button>
          </form>
        </div>
      </section>

      <footer>
        <strong>LCH Auto</strong>
        <span>EURL LCH Automotive Fleet - Location, vente, maintenance et gestion de flotte.</span>
        <a href="#accueil">Retour en haut</a>
      </footer>
    </main>
  );
}
