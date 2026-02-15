#!/usr/bin/env node

/**
 * Script de génération du sitemap.xml
 * Génère automatiquement un sitemap à partir de la base de données des produits naturels
 *
 * Usage: node scripts/generateSitemap.js
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_URL = "https://tradimedika.com";
const OUTPUT_PATH = join(__dirname, "../public/sitemap.xml");

// Charger la base de données
const db = JSON.parse(
  readFileSync(join(__dirname, "../src/data/db.json"), "utf-8"),
);

// Fonction pour générer un slug à partir du nom du produit naturel
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\-\u00C0-\u024F\u1E00-\u1EFF]+/g, "");
}

// Fonction pour formater une date en format ISO (YYYY-MM-DD)
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Date de dernière modification (aujourd'hui)
const today = formatDate(new Date());

// Pages statiques du site
const staticPages = [
  { loc: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { loc: "/remedes", changefreq: "daily", priority: "0.9", lastmod: today },
  {
    loc: "/mentions-legales",
    changefreq: "monthly",
    priority: "0.3",
    lastmod: today,
  },
  {
    loc: "/politique-confidentialite",
    changefreq: "monthly",
    priority: "0.3",
    lastmod: today,
  },
  {
    loc: "/gestion-cookies",
    changefreq: "monthly",
    priority: "0.3",
    lastmod: today,
  },
];

// Générer les URLs des produits naturels à partir de la DB
const remedyPages = db.map((remedy) => {
  const slug = generateSlug(remedy.name);
  return {
    loc: `/remedes/${encodeURIComponent(slug)}`,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: today,
  };
});

// Combiner toutes les pages
const allPages = [...staticPages, ...remedyPages];

// Générer le XML du sitemap
function generateSitemapXML(pages) {
  const urls = pages
    .map((page) => {
      return `  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Générer et écrire le sitemap
const sitemapXML = generateSitemapXML(allPages);
writeFileSync(OUTPUT_PATH, sitemapXML, "utf-8");

console.log("✅ Sitemap généré avec succès !");
console.log(`📍 Fichier : ${OUTPUT_PATH}`);
console.log(`📊 Statistiques :`);
console.log(`   - Pages statiques : ${staticPages.length}`);
console.log(`   - Pages de produits naturels : ${remedyPages.length}`);
console.log(`   - Total : ${allPages.length} URLs`);
