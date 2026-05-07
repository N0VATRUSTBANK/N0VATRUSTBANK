<template>
  <h1>Accounts</h1>
  <div class="grid">
    <div class="card">
      <h3>Checking</h3>
      <p>Everyday banking with no monthly fees, free ATM access, and instant alerts.</p>
      <RouterLink to="/register" class="cta">Open Checking</RouterLink>
    </div>
    <div class="card">
      <h3>Savings</h3>
      <p>High-yield savings with daily compounding interest and zero hidden fees.</p>
      <RouterLink to="/register" class="cta">Open Savings</RouterLink>
    </div>
    <div class="card">
      <h3>Business</h3>
      <p>Built for small businesses — invoicing, payroll, and multi-user access.</p>
      <RouterLink to="/register" class="cta">Open Business</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.card {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.cta {
  display: inline-block;
  margin-top: 12px;
  background: #b31b1b;
  color: #fff;
  padding: 10px 16px;
  border-radius: 6px;
  text-decoration: none;
}
</style>
