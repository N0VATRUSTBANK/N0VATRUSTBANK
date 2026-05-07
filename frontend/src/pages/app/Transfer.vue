<script setup>
const tiles = [
  { to: "/app/transfer/zelle", label: "Zelle®" },
  { to: "/app/transfer/wire", label: "Wire Transfer" },
  { to: "/app/transfer/ach", label: "ACH Transfer" },
  { to: "/app/transfer/bills", label: "Pay Bills" },
  { to: "/app/transfer/check", label: "Mobile Check" },
  { to: "/app/transfer/btc", label: "Bitcoin" },
  { to: "/app/transfer/internal", label: "Internal Transfer" },
  { to: "/app/transfer/send-money", label: "Inter-Send" },
];
</script>

<template>
  <div class="page-wrapper">
    <h2>Choose a transfer method</h2>
    <div class="grid">
      <RouterLink
        v-for="t in tiles"
        :key="t.to"
        :to="t.to"
        class="tile"
      >
        {{ t.label }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper { padding: 20px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 16px;
}
.tile {
  background: #fff;
  padding: 25px;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: #111;
  font-weight: bold;
  text-align: center;
  transition: transform 0.15s ease;
}
.tile:hover { transform: translateY(-3px); }
</style>
