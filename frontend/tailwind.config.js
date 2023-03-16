/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/app.js", "./src/{pages,components}/*.jsx"],
  theme: {
    extend: {
      keyframes: {
        "pop-up-show": {
          '0%': { top: '-50%' },
          "70%": { top: "70%" },
          '100%': { top: '50%' },
        },

        "pop-up-hide": {
          '0%': { top: '50%' },
          "30%": { top: "70%" },
          '100%': { top: '-50%' },
        },

        "icon-show": {
          "0%": {
            opacity: 0,
            transform: "scale(10)"
          },
          "70%": { transform: "scale(0.2)" },
          "100%": {
            opacity: 1
          }
        },

        "icon-hide": {
          "0%": {
            opacity: 1
          },
          "30%": { transform: "scale(0.2)" },
          "100%": {
            opacity: 0,
            transform: "scale(10)"
          }
        }
      },

      animation: {
        "pop-up-show": 'pop-up-show .2s ease-in-out forwards',
        "pop-up-hide": 'pop-up-hide .2s ease-in-out forwards',
        "icon-show": "icon-show .2s ease-in-out forwards .2s",
        "icon-hide": "icon-hide .2s ease-in-out forwards"
      }
    },
  },
  plugins: [],
}
