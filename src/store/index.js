import {createPinia, defineStore} from 'pinia'
import {state} from "./modules/state.js"
import {actions} from "./modules/actions.js"
import {getters} from "./modules/getters.js";

export const useStore = defineStore( 'store',{
    state: () => (state),
    getters: getters,
    actions: actions
})

export const store = createPinia()
