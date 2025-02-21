import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '475px',
                'sm': '680px',
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    }
};
export default config;
