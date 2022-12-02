import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import "./style/main.scss"
import {components} from '@/components';
import router from "@/router";
import {store} from "@/store";
const app = createApp(App)
components.forEach(component => {
    app.component(component.name, component);
});
app.use(router).use(store)
app.mount('#app')
