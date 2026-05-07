<script setup>
const offers = [
  { name: "Personal Loan", rate: "8.99%", term: "5 years", max: 50000 },
  { name: "Auto Loan", rate: "5.49%", term: "7 years", max: 75000 },
  { name: "Home Loan", rate: "6.25%", term: "30 years", max: 500000 },
  { name: "Student Loan", rate: "4.99%", term: "10 years", max: 100000 },
];

function apply(name) {
  alert(`Application for ${name} submitted. Our team will reach out.`);
}
</script>

<template>
  <h1 class="section-title">Loan Center</h1>

  <div class="summary-grid">
    <div class="box"><p>Active Loans</p><h2>0</h2></div>
    <div class="box"><p>Outstanding Balance</p><h2>$0</h2></div>
    <div class="box"><p>Lowest Rate</p><h2>4.99%</h2></div>
  </div>

  <h2 style="margin-top:30px;">Loan Offers</h2>
  <div class="offers">
    <div v-for="o in offers" :key="o.name" class="offer">
      <h3>{{ o.name }}</h3>
      <p>Rate: <strong>{{ o.rate }}</strong></p>
      <p>Term: <strong>{{ o.term }}</strong></p>
      <p>Up to: <strong>${{ o.max.toLocaleString() }}</strong></p>
      <button @click="apply(o.name)">Apply</button>
    </div>
  </div>
</template>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.box {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.offers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.offer {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.offer button {
  margin-top: 14px;
  width: 100%;
  padding: 12px;
  background: #b31b1b;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
