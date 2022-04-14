///import * as plugins from "website-scraper/plugins";

import scrape from "website-scraper";

import { once } from "events";
import puppeteer from "puppeteer";
import PuppeteerPlugin from "website-scraper-puppeteer";
import path from "path";
import crypto from 'crypto';
const BASE_URL = `https://psicologos.seguronanuvem.com.br/`;

class MyPlugin {
  apply(registerAction) {
  }
  }

scrape({
  urls: ["https://www.peteletricaufmt.com/"],
  directory:
    "C:/Users/vitor/OneDrive/Documentos/programacao/Automacao-Puppeeteer/clonador de site/peteletricaufmt",
  plugins: [
    new PuppeteerPlugin({
      launchOptions: { headless: false } /* optional */,
      scrollToBottom: { timeout: 10000, viewportN: 10 } /* optional */,
      blockNavigation: true /* optional */,
    }),
  ],
  subdirectories: [
    {
      directory:
        "C:/Users/vitor/OneDrive/Documentos/programacao/Automacao-Puppeeteer/clonador de site/peteletricaufmt/img",
      extensions: [".jpg", ".png", ".svg"],
    },
    {
      directory:
        "C:/Users/vitor/OneDrive/Documentos/programacao/Automacao-Puppeeteer/clonador de site/peteletricaufmt/js",
      extensions: [".js"],
    },
    {
      directory:
        "C:/Users/vitor/OneDrive/Documentos/programacao/Automacao-Puppeeteer/clonador de site/peteletricaufmt/css",
      extensions: [".css"],
    },
  ],
  sources: [
    { selector: "img", attr: "src" },
    { selector: 'link[rel="stylesheet"]', attr: "href" },
    { selector: "script", attr: "src" },
  ],

  urlFilter: (url) => url.startsWith("https://www.peteletricaufmt.com/"), // Filter links to other websites
  recursive: true,
  maxRecursiveDepth: 1000,
  filenameGenerator: "bySiteStructure",
  plugins: [new MyPlugin()],
});

// a();
// async function  a() {
// // const result =   await scrape({
// //   urls: ['https://www.peteletricaufmt.com/'],
// //   directory: 'C:/Users/vitor/OneDrive/Documentos/programacao/Automacao-Puppeeteer/clonador de site/peteletricaufmt',
// //   plugins: [
// //     new PuppeteerPlugin({
// //       launchOptions: { headless: false }, /* optional */
// //       scrollToBottom: { timeout: 10000, viewportN: 10 }, /* optional */
// //       blockNavigation: true, /* optional */
// //     })
// //   ],
// //   subdirectories: [
// //     {directory: 'img', extensions: ['.jpg', '.png', '.svg']},
// //     {directory: 'js', extensions: ['.js']},
// //     {directory: 'css', extensions: ['.css']}
// //   ],
// //   urlFilter: (url) => url.startsWith('https://www.peteletricaufmt.com/'), // Filter links to other websites
// //   recursive: true,
// //   maxRecursiveDepth: 1000,
// //   filenameGenerator: 'bySiteStructure',

// // });
// registerAction('saveResource', async ({resource}) => {
//   const filename = resource.getFilename();
//   const text = resource.getText();
//   await saveItSomewhere("/filename", text);
// });

// }
