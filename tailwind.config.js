/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        spacegrotesk: ["Space Grotesk", "sans-serif"],
      },
      transitionProperty: {
        'width': 'width',
      },
      boxShadow: {
        cardShadow:
          "rgb(174 203 247 / 25%) 0px 50px 120px -20px, rgb(251 250 250 / 30%) 0px 30px 60px -30px, rgb(255 255 255 / 35%) 0px -2px 6px 0px inset",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "header-image": "url('/images/blog_images/header.png')",
        frame: "url('/images/Frame.png')",
      },
      colors: {
        borderColor: "#333333",
        buttonTextColor: "#888888",
        inputTextColor: "#444444",
        primary: "#0784C6",
        muted: "#959595",
        gray: "#272727",
        tableContent: "#999999",
        boxBorder: "#484C56",
        compColor: "#292929",
        compColor2: "#121212",
        modalBg: "#181818",
        textColor1: "#D0D0D0",
        whitey: "#FFFFFFCC", 
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        spacegrotesk: ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        bouncing: {
          "0%": {
            transform: "translateY(-20%)",
            "animation-timing-function": "cubic-bezier(0, 0, 10, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "60%": {
            transform: "translateY(-10%)",
            "animation-timing-function": "cubic-bezier(0, 0, 1, 1)",
          },
          "80%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 1, 1)",
          },
          "90%": {
            transform: "translateY(-3%)",
            "animation-timing-function": "cubic-bezier(0, 0, 5, 1)",
          },
          "100%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        shivering: {
          "0%": {
            transform: "translateX(-10%)",
            "animation-timing-function": "cubic-bezier(0, 0, 10, 1)",
          },
          "100%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        bouncing: "bouncing 1.5s ease-in-out",
        shivering: "shivering 1s infinite",
      },
    },
    plugins: [],
  },
};
