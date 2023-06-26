/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        spacegrotesk: ["Space Grotesk", "sans-serif"],
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'header-image': "url('/images/blog_images/header.png')",
        'frame': "url('/images/Frame.png')"
      },
      colors:{
        'borderColor':'#333333',
        'buttonTextColor':'#888888',
        'inputTextColor':'#444444',
        'primary':'#28A1FF',
        'muted':'#959595',
        'gray': "#272727",
        'tableContent':'#999999',
        'boxBorder':'#484C56'
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
          "60%":{
            transform: "translateY(-10%)",
            "animation-timing-function": "cubic-bezier(0, 0, 1, 1)",
          },
          "80%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 1, 1)",
          },
          "90%":{
            transform: "translateY(-3%)",
            "animation-timing-function": "cubic-bezier(0, 0, 5, 1)",
          },
          "100%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        bouncing: "bouncing 1.5s ease-in-out",
      },
    },
  },
  plugins: [],
}
