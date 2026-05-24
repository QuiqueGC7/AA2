import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const savedTheme = localStorage.getItem("theme") ?? "light"

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: savedTheme,
    themes: {
      light: {
        dark: false,
        colors: {
          primary:    "#42b883",
          secondary:  "#2c3e50",
          background: "#ffffff",
          surface:    "#f8f8f8",
          error:      "#e74c3c",
          info:       "#3498db",
          success:    "#27ae60",
          warning:    "#f39c12",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary:    "#42b883",
          secondary:  "#95a5a6",
          background: "#121212",
          surface:    "#1e1e1e",
          error:      "#cf6679",
          info:       "#2196f3",
          success:    "#4caf50",
          warning:    "#fb8c00",
        },
      },
      warm: {
        dark: false,
        colors: {
          primary:    "#e67e22",
          secondary:  "#8e44ad",
          background: "#fdf6ec",
          surface:    "#fef9f2",
          error:      "#c0392b",
          info:       "#2980b9",
          success:    "#27ae60",
          warning:    "#d35400",
        },
      },
    },
  },
})