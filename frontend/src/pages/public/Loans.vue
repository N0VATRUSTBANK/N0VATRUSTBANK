<script setup>
const products = [
  {
    name: "Personal Loan",
    rate: "8.99",
    max: "$50,000",
    term: "1 – 5 years",
    blurb: "Consolidate debt, cover emergencies, or fund a project — flexible terms, no collateral.",
    icon: "personal",
  },
  {
    name: "Auto Loan",
    rate: "5.49",
    max: "$75,000",
    term: "Up to 7 years",
    blurb: "New or used, drive away with predictable monthly payments and no prepayment penalty.",
    icon: "auto",
  },
  {
    name: "Home Loan",
    rate: "6.25",
    max: "$500,000",
    term: "15 – 30 years",
    blurb: "Buy, build, or refinance with low down payments and locked-in rates.",
    icon: "home",
  },
  {
    name: "Student Loan",
    rate: "4.99",
    max: "$100,000",
    term: "Up to 10 years",
    blurb: "Cover tuition, books, and living costs with deferred payment options while you study.",
    icon: "student",
  },
];

const benefits = [
  { title: "Decisions in minutes", text: "Pre-qualify online without affecting your credit score." },
  { title: "No hidden fees", text: "Transparent pricing. No origination, prepayment, or annual fees." },
  { title: "Flexible terms", text: "Choose payment plans that fit your budget and lifestyle." },
];

const steps = [
  { n: "01", title: "Apply online", text: "Tell us about you and the amount you'd like to borrow." },
  { n: "02", title: "Get a decision", text: "We review your application — most decisions in minutes." },
  { n: "03", title: "Receive your funds", text: "Approved? Funds land in your account within 1 business day." },
];
</script>

<template>
  <div class="loans-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">NovaTrust Loans</span>
        <h1>Borrow with confidence.</h1>
        <p>
          Personal, auto, home, and student loans with competitive rates and
          transparent terms. Pre-qualify in minutes — no impact to your credit.
        </p>
        <div class="hero-ctas">
          <RouterLink to="/preapproval" class="btn btn-primary">Check pre-approval</RouterLink>
          <a href="#products" class="btn btn-ghost">Compare loans</a>
        </div>
      </div>
      <div class="hero-stats">
        <div><strong>4.99%</strong><span>APR from</span></div>
        <div><strong>$500K</strong><span>Up to</span></div>
        <div><strong>24h</strong><span>Funding</span></div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="products">
      <header class="section-head">
        <h2>Find the right loan for you</h2>
        <p>Four flexible products built around real life.</p>
      </header>

      <div class="grid">
        <article v-for="p in products" :key="p.name" class="loan-card" :class="p.icon">
          <div class="badge">
            <svg v-if="p.icon === 'personal'" viewBox="0 0 24 24" width="22" height="22"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
            <svg v-else-if="p.icon === 'auto'" viewBox="0 0 24 24" width="22" height="22"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 13l2-6h14l2 6" /><path d="M3 13v5h2v-2h14v2h2v-5" />
              <circle cx="7" cy="16" r="1.5" /><circle cx="17" cy="16" r="1.5" />
            </svg>
            <svg v-else-if="p.icon === 'home'" viewBox="0 0 24 24" width="22" height="22"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" />
            </svg>
            <svg v-else viewBox="0 0 24 24" width="22" height="22"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5a6 6 0 0 0 12 0v-5" />
            </svg>
          </div>
          <h3>{{ p.name }}</h3>
          <p class="blurb">{{ p.blurb }}</p>
          <dl class="specs">
            <div><dt>APR from</dt><dd>{{ p.rate }}%</dd></div>
            <div><dt>Up to</dt><dd>{{ p.max }}</dd></div>
            <div><dt>Term</dt><dd>{{ p.term }}</dd></div>
          </dl>
          <RouterLink to="/register" class="apply">Apply →</RouterLink>
        </article>
      </div>
    </section>

    <!-- Benefits -->
    <section class="benefits">
      <article v-for="b in benefits" :key="b.title" class="benefit">
        <h3>{{ b.title }}</h3>
        <p>{{ b.text }}</p>
      </article>
    </section>

    <!-- How it works -->
    <section class="how">
      <header class="section-head">
        <h2>How it works</h2>
      </header>
      <ol class="steps">
        <li v-for="s in steps" :key="s.n">
          <span class="step-n">{{ s.n }}</span>
          <h4>{{ s.title }}</h4>
          <p>{{ s.text }}</p>
        </li>
      </ol>
    </section>

    <!-- Final CTA -->
    <section class="cta-band">
      <div>
        <h2>Ready to get started?</h2>
        <p>Pre-qualify in minutes — no impact to your credit score.</p>
      </div>
      <RouterLink to="/preapproval" class="btn btn-primary">Check pre-approval</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.loans-page {
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

/* ---------- Hero ---------- */
.hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #c41230 140%);
  color: #fff;
  border-radius: 22px;
  padding: 56px 48px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 32px;
  align-items: center;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
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
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 20px;
}
.hero-stats div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}
.hero-stats strong {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.hero-stats span {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.65);
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

/* ---------- Products ---------- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}
.loan-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.loan-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: #dce1e7;
}
.badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(196, 18, 48, 0.08);
  color: var(--brand);
  margin-bottom: 4px;
}
.loan-card.auto .badge { background: rgba(13, 148, 136, 0.1); color: #0d9488; }
.loan-card.home .badge { background: rgba(37, 99, 235, 0.1); color: #2563eb; }
.loan-card.student .badge { background: rgba(168, 85, 247, 0.1); color: #a855f7; }
.loan-card h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
}
.blurb {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.95rem;
  line-height: 1.5;
}
.specs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 8px 0 14px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
}
.specs div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
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
.apply {
  margin-top: auto;
  align-self: flex-start;
  color: var(--brand);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
}
.apply:hover { text-decoration: underline; }

/* ---------- Benefits ---------- */
.benefits {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.benefit {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px;
}
.benefit h3 {
  margin: 0 0 6px;
  font-size: 1rem;
  font-weight: 700;
}
.benefit p {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* ---------- Steps ---------- */
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.steps li {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  position: relative;
}
.step-n {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--brand);
  letter-spacing: 0.08em;
  margin-bottom: 10px;
}
.steps h4 {
  margin: 0 0 6px;
  font-size: 1.05rem;
  font-weight: 700;
}
.steps p {
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
.cta-band .btn-primary {
  background: #fff;
  color: var(--brand);
  box-shadow: none;
}
.cta-band .btn-primary:hover {
  background: #f3f5f8;
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 40px 28px;
  }
  .hero h1 { font-size: 2.1rem; }
  .benefits,
  .steps {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .hero { padding: 32px 22px; }
  .hero h1 { font-size: 1.8rem; }
  .hero-stats strong { font-size: 1.3rem; }
  .specs { grid-template-columns: repeat(3, 1fr); gap: 6px; padding: 10px; }
  .cta-band { flex-direction: column; align-items: flex-start; padding: 24px; }
}
</style>
