import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";
import "./assets/css/dashboard.css";
import "./assets/css/app-shell.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
