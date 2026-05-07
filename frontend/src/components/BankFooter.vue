<template>
  <footer class="bank-footer">
    <div class="footer-container">
      <div class="footer-col">
        <h4>NovaTrust Bank</h4>
        <p>A digital-first bank offering secure banking, cards, loans, and global payments.</p>
      </div>
      <div class="footer-col">
        <h4>Banking</h4>
        <RouterLink to="/public/accounts">Accounts</RouterLink>
        <RouterLink to="/public/loans">Loans</RouterLink>
        <RouterLink to="/public/credit-cards">Credit Cards</RouterLink>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <RouterLink to="/public/support">Customer Support</RouterLink>
        <RouterLink to="/public/support">Report Fraud</RouterLink>
        <RouterLink to="/public/support">Security Center</RouterLink>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <RouterLink to="/public/privacy">Privacy Policy</RouterLink>
        <RouterLink to="/public/terms">Terms &amp; Conditions</RouterLink>
        <RouterLink to="/public/accessibility">Accessibility</RouterLink>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2009 - 2026 NovaTrust Bank. All rights reserved.</p>
      <p class="footer-note">NovaTrust Bank is a simulated banking platform.</p>
    </div>
  </footer>
</template>
