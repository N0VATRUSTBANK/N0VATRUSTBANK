<script setup>
import { ref } from "vue";

const channels = [
  {
    title: "24/7 phone support",
    detail: "1-800-NOVA-BANK",
    sub: "Call any time. Average wait under 2 minutes.",
    icon: "phone",
    href: "tel:18006682226",
  },
  {
    title: "Email us",
    detail: "support@novatrust.com",
    sub: "Replies within 4 business hours.",
    icon: "mail",
    href: "mailto:support@novatrust.com",
  },
  {
    title: "Secure message",
    detail: "Sign in to message",
    sub: "Encrypted conversation tied to your account.",
    icon: "chat",
    to: "/login",
  },
  {
    title: "Visit a branch",
    detail: "Find one near you",
    sub: "Over 240 locations across 18 states.",
    icon: "branch",
    href: "#",
  },
];

const escalations = [
  {
    eyebrow: "If you suspect fraud",
    title: "Report fraud",
    text: "Freeze your card instantly from the credit card page, then call our 24/7 fraud line. We'll cover any unauthorized charges.",
    cta: { label: "Freeze my card", to: "/login" },
  },
  {
    eyebrow: "Security",
    title: "Stay protected",
    text: "Enable 2FA, review login activity, and learn how to spot phishing. NovaTrust will never ask for your PIN, password, or OTP.",
    cta: { label: "Security tips", href: "#fraud" },
  },
];

const faqs = [
  {
    q: "How long do transfers take?",
    a: "Internal transfers settle instantly. ACH typically takes 1–3 business days, wire transfers same-day domestically and 1–2 days internationally.",
  },
  {
    q: "Is my money insured?",
    a: "Yes. Eligible deposits are FDIC-insured up to $250,000 per depositor, per account category.",
  },
  {
    q: "How do I report a lost or stolen card?",
    a: "Sign in and freeze your card from the credit card page, then call 1-800-NOVA-BANK. We'll send a replacement, usually within 3 business days.",
  },
  {
    q: "Why was my transfer declined?",
    a: "Transfers may be held for compliance review, insufficient funds, or unusual activity. Sign in to see the exact status, or call us for help.",
  },
  {
    q: "How do I close my account?",
    a: "You can close most accounts from your settings. For accounts with active loans or balances, please call us so we can walk you through it.",
  },
];

const open = ref(0);
const toggle = (i) => (open.value = open.value === i ? -1 : i);
</script>

<template>
  <div class="support-page">
    <!-- Hero -->
    <section class="hero">
      <span class="eyebrow">Customer Support</span>
      <h1>We're here whenever you need us.</h1>
      <p>
        Real people, 24 hours a day. Whether it's a quick question or something
        urgent — we'll help you sort it out fast.
      </p>
    </section>

    <!-- Channels -->
    <section class="channels">
      <component
        v-for="c in channels"
        :is="c.to ? 'RouterLink' : 'a'"
        :key="c.title"
        :to="c.to"
        :href="c.href"
        class="channel"
      >
        <span class="channel-icon">
          <svg v-if="c.icon === 'phone'" viewBox="0 0 24 24" width="22" height="22"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
          </svg>
          <svg v-else-if="c.icon === 'mail'" viewBox="0 0 24 24" width="22" height="22"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <svg v-else-if="c.icon === 'chat'" viewBox="0 0 24 24" width="22" height="22"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="22" height="22"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        <h3>{{ c.title }}</h3>
        <strong>{{ c.detail }}</strong>
        <span class="channel-sub">{{ c.sub }}</span>
      </component>
    </section>

    <!-- Escalations -->
    <section class="escalations">
      <article
        v-for="e in escalations"
        :key="e.title"
        class="escalation"
        :id="e.title === 'Report fraud' ? 'fraud' : 'security'"
      >
        <span class="eyebrow eyebrow-dark">{{ e.eyebrow }}</span>
        <h2>{{ e.title }}</h2>
        <p>{{ e.text }}</p>
        <RouterLink v-if="e.cta.to" :to="e.cta.to" class="esc-cta">
          {{ e.cta.label }} →
        </RouterLink>
        <a v-else :href="e.cta.href" class="esc-cta">
          {{ e.cta.label }} →
        </a>
      </article>
    </section>

    <!-- FAQ -->
    <section id="faq" class="faq">
      <header class="section-head">
        <h2>Frequently asked questions</h2>
        <p>Quick answers to what we hear most.</p>
      </header>

      <ul class="faq-list">
        <li v-for="(item, i) in faqs" :key="item.q" :class="{ open: open === i }">
          <button type="button" class="faq-q" @click="toggle(i)" :aria-expanded="open === i">
            <span>{{ item.q }}</span>
            <svg viewBox="0 0 24 24" width="18" height="18"
              fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div v-if="open === i" class="faq-a">{{ item.a }}</div>
        </li>
      </ul>
    </section>

    <!-- Final CTA -->
    <section class="cta-band">
      <div>
        <h2>Still need help?</h2>
        <p>Sign in to start a secure conversation with our support team.</p>
      </div>
      <RouterLink to="/login" class="btn btn-light">Sign in to message us</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.support-page {
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
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.btn-light {
  background: #fff;
  color: var(--brand);
}
.btn-light:hover { background: #f3f5f8; }

/* ---------- Eyebrow ---------- */
.eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 14px;
  font-weight: 600;
}
.eyebrow-dark {
  color: var(--brand);
  margin-bottom: 8px;
}

/* ---------- Hero ---------- */
.hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #c41230 140%);
  color: #fff;
  border-radius: 22px;
  padding: 56px 48px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
  text-align: left;
}
.hero h1 {
  margin: 0 0 14px;
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.hero p {
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.05rem;
  max-width: 640px;
  line-height: 1.55;
}

/* ---------- Channels ---------- */
.channels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.channel {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-decoration: none;
  color: var(--ink);
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.channel:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: #dce1e7;
}
.channel-icon {
  width: 44px;
  height: 44px;
  background: rgba(196, 18, 48, 0.08);
  color: var(--brand);
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.channel h3 {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}
.channel strong {
  font-size: 1.05rem;
  color: var(--ink);
  font-weight: 700;
}
.channel-sub {
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* ---------- Escalations ---------- */
.escalations {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.escalation {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.escalation h2 {
  margin: 0 0 4px;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ink);
}
.escalation p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.95rem;
  line-height: 1.55;
}
.esc-cta {
  margin-top: 10px;
  color: var(--brand);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
}
.esc-cta:hover { text-decoration: underline; }

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

/* ---------- FAQ ---------- */
.faq-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.faq-list li {
  border-bottom: 1px solid var(--border);
}
.faq-list li:last-child { border-bottom: none; }
.faq-q {
  width: 100%;
  background: transparent;
  border: none;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
  font-family: inherit;
}
.faq-q:hover { background: #f8fafc; }
.faq-q svg {
  color: var(--muted);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}
.faq-list li.open .faq-q svg {
  transform: rotate(180deg);
  color: var(--brand);
}
.faq-a {
  padding: 0 22px 20px;
  color: var(--ink-soft);
  font-size: 0.95rem;
  line-height: 1.6;
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
  .escalations { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .hero { padding: 36px 24px; }
  .hero h1 { font-size: 1.8rem; }
  .cta-band { flex-direction: column; align-items: flex-start; padding: 24px; }
}
</style>
