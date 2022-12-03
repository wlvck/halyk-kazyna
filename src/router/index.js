import {createRouter, createWebHistory} from 'vue-router';
// import PdfDocument from "@/pages/PdfDocument";
import TheHome from "@/pages/TheHome.vue"
import ConfirmAgreement from "@/pages/ConfirmAgreement.vue"
import PdfDocument from "@/pages/PdfDocument";
import TheSettings from "@/pages/TheSettings";

const routes = [
    {
        path: '/',
        redirect: '/kazyna'
    },
    {
        path: '/start',
        redirect: '/kazyna'
    },
    {
        path: '/kazyna',
        name: 'Home',
        component: TheHome,
        children: [
            {
                path: 'settings',
                name: 'Settings',
                component: TheSettings
            }
        ]
    },
    {
        path: '/confirm-agreement',
        name: 'ConfirmAgreement',
        component: ConfirmAgreement
    },
    {
        path: '/document/:documentName',
        name: 'PdfDocument',
        component: PdfDocument
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router