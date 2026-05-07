<script setup>
const cards = [
  {
    name: "Platinum",
    tagline: "Everyday rewards, premium feel.",
    apr: "16.99",
    limit: "$25,000",
    fee: "$0",
    perks: ["2% cashback on every purchase", "0% intro APR for 12 months", "Priority customer support"],
    theme: "platinum",
  },
  {
    name: "Gold",
    tagline: "Built for travelers.",
    apr: "18.49",
    limit: "$10,000",
    fee: "$95",
    perks: ["3x points on travel & dining", "Airport lounge access", "Trip cancellation insurance"],
    theme: "gold",
    badge: "Most popular",
  },
  {
    name: "Business",
    tagline: "Your team's expense engine.",
    apr: "15.99",
    limit: "$50,000",
    fee: "$0",
    perks: ["Multi-user accounts & role limits", "Real-time expense tracking", "QuickBooks integration"],
    theme: "business",
  },
];

const features = [
  {
    title: "$0 fraud liability",
    text: "We've got your back. You're never on the hook for unauthorized charges.",
  },
  {
    title: "Instant card freeze",
    text: "Lock and unlock your card from the app the moment something feels off.",
  },
  {
    title: "Tap to pay anywhere",
    text: "Contactless payments with Apple Pay, Google Pay, and Samsung Pay.",
  },
  {
    title: "No foreign transaction fees",
    text: "Travel without surprise charges on most cards. Spend abroad like you do at home.",
  },
];
</script>

<template>
  <div class="cc-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">NovaTrust Cards</span>
        <h1>Cards that earn while you spend.</h1>
        <p>
          Cashback, travel points, and business tools — pick the card that fits
          your life. Pre-qualify in 60 seconds with no impact to your credit.
        </p>
        <div class="hero-ctas">
          <RouterLink to="/preapproval" class="btn btn-primary">Check pre-approval</RouterLink>
          <a href="#cards" class="btn btn-ghost">Compare cards</a>
        </div>
      </div>
      <div class="hero-card-stack" aria-hidden="true">
        <div class="hero-card hc-1">
          <span class="hc-brand">NovaTrust</span>
          <span class="hc-num">•••• 4290</span>
        </div>
        <div class="hero-card hc-2">
          <span class="hc-brand">NovaTrust</span>
          <span class="hc-num">•••• 1184</span>
        </div>
      </div>
    </section>

    <!-- Card products -->
    <section id="cards" class="products">
      <header class="section-head">
        <h2>Find your card</h2>
        <p>Three cards, designed for different priorities.</p>
      </header>

      <div class="grid">
        <article v-for="c in cards" :key="c.name" class="product">
          <div class="card-visual" :class="c.theme">
            <span v-if="c.badge" class="badge-pop">{{ c.badge }}</span>
            <div class="cv-top">
              <span class="cv-name">NovaTrust {{ c.name }}</span>
              <span class="cv-chip"></span>
            </div>
            <div class="cv-bottom">
              <span class="cv-num">•••• •••• •••• 0{{ c.name.length }}{{ c.name.length }}{{ c.name.length }}{{ c.name.length }}</span>
              <span class="cv-brand">NovaTrust</span>
            </div>
          </div>

          <h3>{{ c.name }}</h3>
          <p class="tagline">{{ c.tagline }}</p>

          <dl class="specs">
            <div><dt>APR from</dt><dd>{{ c.apr }}%</dd></div>
            <div><dt>Limit up to</dt><dd>{{ c.limit }}</dd></div>
            <div><dt>Annual fee</dt><dd>{{ c.fee }}</dd></div>
          </dl>

          <ul class="perks">
            <li v-for="p in c.perks" :key="p">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {{ p }}
            </li>
          </ul>

          <RouterLink to="/preapproval" class="apply">Pre-qualify →</RouterLink>
        </article>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <header class="section-head">
        <h2>Built-in protection. Always on.</h2>
      </header>
      <div class="features-grid">
        <article v-for="f in features" :key="f.title" class="feature">
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </article>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="cta-band">
      <div>
        <h2>See if you pre-qualify</h2>
        <p>Soft inquiry only — your credit score won't be affected.</p>
      </div>
      <RouterLink to="/preapproval" class="btn btn-light">Check pre-approval</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.cc-page {
  display: flex;
  flex-direction: column;
  gap: 56px;
}

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  cursor: pointer;
}
.btn-primary {
  background: var(--brand);
  color: #fff;
  box-shadow: 0 6px 16px rgba(196, 18, 48, 0.25);
}
.btn-primary:hover { background: var(--brand-strong); }
.btn-ghost {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}
.btn-light {
  background: #fff;
  color: var(--brand);
}
.btn-light:hover { background: #f3f5f8; }

/* ---------- Hero ---------- */
.hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #c41230 140%);
  color: #fff;
  border-radius: 22px;
  padding: 56px 48px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 32px;
  align-items: center;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
  overflow: hidden;
}
.eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
  font-weight: 600;
}
.hero h1 {
  margin: 0 0 14px;
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.hero p {
  margin: 0 0 24px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  max-width: 520px;
  line-height: 1.55;
}
.hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Floating preview cards */
.hero-card-stack {
  position: relative;
  height: 260px;
}
.hero-card {
  position: absolute;
  width: 280px;
  height: 170px;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  font-weight: 600;
}
.hero-card .hc-brand {
  font-size: 13px;
  letter-spacing: 0.04em;
  opacity: 0.95;
}
.hero-card .hc-num {
  font-size: 15px;
  letter-spacing: 0.16em;
}
.hc-1 {
  background: linear-gradient(135deg, #1f2937 0%, #0f172a 100%);
  top: 10px;
  left: 10px;
  transform: rotate(-6deg);
}
.hc-2 {
  background: linear-gradient(135deg, #c41230 0%, #8b0d22 100%);
  top: 70px;
  left: 140px;
  transform: rotate(4deg);
}

/* ---------- Section heads ---------- */
.section-head h2 {
  margin: 0;
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.section-head p {
  margin: 6px 0 24px;
  color: var(--muted);
}

/* ---------- Product grid ---------- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.product {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.product:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: #dce1e7;
}

/* Card visual */
.card-visual {
  position: relative;
  height: 165px;
  border-radius: 14px;
  padding: 18px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}
.card-visual.platinum {
  background: linear-gradient(135deg, #475569 0%, #1e293b 100%);
}
.card-visual.gold {
  background: linear-gradient(135deg, #c9a227 0%, #8a6a09 100%);
}
.card-visual.business {
  background: linear-gradient(135deg, #0f172a 0%, #000 100%);
}
.cv-top, .cv-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cv-name { font-weight: 700; font-size: 0.95rem; letter-spacing: 0.04em; }
.cv-chip {
  width: 32px;
  height: 22px;
  background: linear-gradient(135deg, #f1c40f, #b07f0a);
  border-radius: 4px;
}
.cv-num {
  letter-spacing: 0.18em;
  font-size: 0.85rem;
  opacity: 0.95;
}
.cv-brand { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; }

.badge-pop {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--brand);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  z-index: 2;
}

.product h3 {
  margin: 4px 0 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--ink);
}
.tagline {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}
.specs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 4px 0 6px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
}
.specs div { display: flex; flex-direction: column; gap: 2px; }
.specs dt {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 600;
}
.specs dd {
  margin: 0;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--ink);
}
.perks {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.perks li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--ink-soft);
}
.perks svg { color: var(--brand); flex-shrink: 0; }
.apply {
  margin-top: auto;
  align-self: flex-start;
  color: var(--brand);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
}
.apply:hover { text-decoration: underline; }

/* ---------- Features ---------- */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}
.feature {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px;
}
.feature h3 {
  margin: 0 0 6px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
}
.feature p {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* ---------- Final CTA ---------- */
.cta-band {
  background: linear-gradient(135deg, #c41230 0%, #8b0d22 100%);
  color: #fff;
  border-radius: 18px;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  box-shadow: 0 14px 30px rgba(196, 18, 48, 0.22);
}
.cta-band h2 {
  margin: 0 0 4px;
  font-size: 1.5rem;
  font-weight: 700;
}
.cta-band p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.95rem;
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 40px 28px;
  }
  .hero h1 { font-size: 2.1rem; }
  .hero-card-stack { display: none; }
}
@media (max-width: 480px) {
  .hero { padding: 32px 22px; }
  .hero h1 { font-size: 1.8rem; }
  .cta-band { flex-direction: column; align-items: flex-start; padding: 24px; }
}
</style>
