import {createApp} from 'vue'

import "bootstrap/js/dist/base-component"
import "bootstrap/js/dist/popover"
import "bootstrap/js/dist/dropdown"
import "bootstrap/js/dist/collapse"
/**
 * IMPORT LIB TOAST
 * @see https://github.com/Maronato/vue-toastification/tree/next
 **/
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

// test
// Import custom css
import "../sass/main.scss";

const vm = createApp(App);

// Options for toastification
const options = {
    // You can set your default options here
};

vm.use(router);

vm.use(Toast, options);

vm.mount('#app');
