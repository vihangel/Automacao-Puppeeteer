///import * as plugins from "website-scraper/plugins";

const scrape = require("website-scraper");

const { once } = require("events");
const puppeteer = require("puppeteer");
const PuppeteerPlugin = require("website-scraper-puppeteer");
const path = require("path");
const BASE_URL = `https://psicologos.seguronanuvem.com.br/`;

async function openPage() {
  console.log("iniciando...");
  const browser = await puppeteer.launch({
    headless: false,
  });

  let page = await browser.newPage();
  await page.goto(BASE_URL);
  await page.waitForTimeout(2000);
  await page.click('input[id="id_sc_field_login"]');

  await page.keyboard.type("lousanymacedo");
  await page.waitForTimeout(500);
  await page.keyboard.press("Tab");
  await page.keyboard.type("macedo53");
  await page.click('input[id="id-opt-periodo-2"]');
  await page.click('a[id="sub_form_b"]');
  await page.waitForTimeout(2000);
  console.log(`starting..`);
}
class MyPlugin {
    openPage()
}
scrape({
  // Forneça a URL do site que você quer copiar
  urls: ["https://psicologos.seguronanuvem.com.br/v1/seg_menu/"],

  // Especifique a pasta onde os arquivos do site serão salvos em pasta-do-site
  directory: path.resolve(__dirname, "dentro do site1"),
  headless: false,
  // carregue o plugin do Puppeteer
  plugins: [new MyPlugin()],
});
