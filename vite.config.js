const path = require("path");
const { resolve } = require('path');
const { defineConfig } = require('vite');
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const base = mode === "production" ? "/" + path.basename(process.cwd()) + "/" : "/";   // GitHub
// const base = "/"; // Netlify

module.exports = defineConfig({
  root: "src",
  base,
  mode,
  publicDir: "../public",
  build: {
    outDir: "../dist",
    assetsDir: "./",
    rollupOptions: {
      input: {
        main: resolve("src", 'index.html'),
        home: resolve("src", 'home.html'),
        about: resolve("src", 'about.html'),
        contact: resolve("src", 'contact.html'),
        offers: resolve("src", 'offers.html'),
        rooms: resolve("src", 'rooms.html'),
        roomDetails: resolve("src", 'room-details.html')
      }
    }
  }
});
