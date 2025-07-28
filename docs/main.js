import "../src/assets/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "../docs/App.vue";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
