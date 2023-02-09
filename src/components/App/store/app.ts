import {makeAutoObservable} from 'mobx';
import * as mobx from "mobx";

export enum Theme {
    Dark = "Dark",
    Light = "Light"
}

class app {
    theme: Theme = Theme.Light

    constructor() {
        makeAutoObservable(this)
    }

    setTheme = (theme: Theme) => {
        this.theme = theme
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }

    getDefaultTheme = () =>{

        const storedTheme = localStorage.getItem("theme");

        const prefersDark =
            window.matchMedia &&
            window.matchMedia(`(prefers-color-scheme: ${Theme.Dark})`).matches;

        if (storedTheme === Theme.Dark || (storedTheme === null && prefersDark)) {
            this.setTheme(Theme.Dark)
        }
    }

}

export default new app()
