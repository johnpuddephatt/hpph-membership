/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
     container: {
            screens: { mobile: "2560px", tablet: "2560px", desktop: "2560px" },
        },
    extend: {},
    fontFamily: {
        sans: ['"Basis Grotesque"', ...defaultTheme.fontFamily.sans],
        mono: [
            '"Basis Grotesque Mono"',
            "mono",
            ...defaultTheme.fontFamily.sans,
        ],
    },
    letterSpacing: {
        normal: "-0.015em",
    },
    colors: {
        current: "currentColor",

        transparent: {
            DEFAULT: "#00000000",
        },
        white: {
            DEFAULT: "#FFFFFF",
        },

        black: {
            DEFAULT: "#000000",
        },
        gray: {
            DEFAULT: "#ededed",
            light: "#b5b5b5",
            medium: "#6f6f6f",
            dark: "#393939",
        },

        yellow: {
            DEFAULT: "#ffe621",
            dark: "#f9da5d",
        },

        sand: {
            DEFAULT: "#e6e4dd",
            dark: "#d6d4cd",
        },

        orange: {
            DEFAULT: "#f2b062",
        },

        pink: {
            DEFAULT: "#f4b8f3",
        },
      },
      extend: {
            maxWidth: {
                "8xl": "90rem",
            },
        },
    },
  plugins: [],
}
