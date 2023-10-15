import { defineConfig } from "cypress"
const path = require("path")
require("dotenv").config({ path: ".env.local" })

export default defineConfig({
  env: { ...process.env },
  e2e: {
    setupNodeEvents(on, config): void {},
  },
})
