import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import LottieAnimation from "lottie-web-vue";

const app = createApp(App);
app.use(LottieAnimation);
app.mount("#app");
