import { defineStore } from 'pinia';

type RouterTransition = 'fade' | 'fade-slide' | 'scale' | 'slide-left' | 'slide-right' | false;

interface AppState {
    routerTransition: RouterTransition;
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        routerTransition: 'fade-slide'
    }),
    actions: {
        setRouterTransition(transition: RouterTransition) {
            this.routerTransition = transition;
        }
    }
});