import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
//import VueRouter from 'vue-router';
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'
import router from  './router/index'


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';

import axios from 'axios'
import VueAxios from 'vue-axios'
const app = createApp(App);
app.use(PrimeVue);
//app.use(VueRouter);
app.use(router)
app.use(VueAxios, axios);
app.component('Button',Button);
app.component('InputText',InputText);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('ColumnGroup',ColumnGroup);
app.mount('#app')
