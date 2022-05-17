module.exports = {
  theme: {
    customColorPalette: {
      colors: {
        primary: "#a63a50ff",
        "primary-complimentary": "#3aa690",
        secondary: "#ffc145ff",
        "secondary-complimantary": "#4583ff",
        grey: "#CCC",
      },
    },
    fontFamily: {
      sans: ["sans-serif"],
    },
    extend: {
      flexGrow: {
        2: "2",
        3: "3",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [
    require("@markusantonwolf/tailwind-css-plugin-custom-color-palette"),
  ],
};
