<script setup>
import PublicHeader from "@/components/PublicHeader.vue";
import BankFooter from "@/components/BankFooter.vue";
</script>

<template>
  <PublicHeader />

  <main style="padding: 20px; max-width: 1100px; margin: 80px auto 20px;">
    <RouterView />
  </main>

  <BankFooter />
</template>
