import React from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

export enum Theme {
    Light = "lightTheme",
    Dark = "darkTheme",
}

export enum ActionType {
    SetTheme = "SET_THEME",
    ToggleTheme = "TOGGLE_THEM",
    SetSplashScreenDone = "SET_SPLASH_SCREEN_DONE",
}

type Dispatch = (action: Action) => void;
type GlobalState = { theme: Theme; splashScreenDone: boolean };
type Action =
    | { type: ActionType.SetTheme; value: Theme }
    | { type: ActionType.SetSplashScreenDone; value: boolean }
    | { type: ActionType.ToggleTheme; value: any };

interface GlobalStateProviderProps {
    children: React.ReactElement;
    defaultTheme: Theme;
    useDarkModeBasedOnUsersPreference: boolean;
    useSplashScreenAnimation: boolean;
}

const GlobalStateContext = React.createContext<
    { globalState: GlobalState; dispatch: Dispatch } | undefined
>(undefined);

export function GlobalStateProvider(
    props: GlobalStateProviderProps
): React.ReactElement {
    const [globalState, dispatch] = React.useReducer(globalStateReducer, {
        theme: initTheme(),
        // If useSplashScreenAnimation=false, we skip the animation by setting the initial value to true
        splashScreenDone: props.useSplashScreenAnimation ? false : true,
    });
    return (
        <GlobalStateContext.Provider value={{ globalState, dispatch }}>
            {props.children}
        </GlobalStateContext.Provider>
    );
}

export function useGlobalState(): {
    globalState: GlobalState;
    dispatch: Dispatch;
} {
    const context = React.useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error(
            "useGlobalState must be used within a GlobalStateProvider"
        );
    }
    return context;
}

function globalStateReducer(state: GlobalState, action: Action) {
    switch (action.type) {
        case ActionType.SetTheme: {
            return { ...state, theme: action.value };
        }
        case ActionType.SetSplashScreenDone: {
            return { ...state, splashScreenDone: action.value };
        }
        case ActionType.ToggleTheme: {
            if (state.theme === Theme.Dark) {
                localStorage.setItem("theme", Theme.Light);
                return { ...state, theme: Theme.Light };
            } else {
                localStorage.setItem("theme", Theme.Dark);
                return { ...state, theme: Theme.Dark };
            }
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
}

function initTheme(): Theme {
    if (typeof window === "undefined") {
        return Theme.Light;
    }

    return localStorage.getItem("theme") === Theme.Dark
        ? Theme.Dark
        : Theme.Light;
}

function initializeTheme(defaultTheme: Theme, useDarkMode: boolean): Theme {
    const darkModeEnabled = useMediaQuery(
        "(prefers-color-scheme: dark)",
        (isMatch) => {
            const updatedTheme = isMatch ? Theme.Dark : Theme.Light;
            document.body.setAttribute("data-theme", updatedTheme);
        }
    );
    let initialTheme = defaultTheme;
    if (useDarkMode && darkModeEnabled) {
        initialTheme = Theme.Dark;
    }
    return initialTheme;
}
