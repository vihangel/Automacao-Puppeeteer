const puppeteer = require("puppeteer");
const { once } = require("events");

const BASE_URL = `https://www.detran.mt.gov.br/`;

// retorna um josn com os dados da pagina
async function collectDataFromBrowser(
  Renach = `646632256`,
  cpf = `04157908163`
) {
  console.log(`starting..`);

  const browser = await puppeteer.launch({
    headless: false,
    //executablePath:
    //"/Users/aroldogoulart/workspace/personal/scrap/Chromium.app/Contents/MacOS/Chromium",
  });

  let page = await browser.newPage();
  await page.goto(BASE_URL);
  await page.waitForTimeout(2000);

  // pressionar em input principal
  await page.click('input[name="Renach"]');
  await page.keyboard.type(`${Renach}`);

  await page.click('input[name="CPF"]');
  await page.keyboard.type(`${cpf}`);

  await page.keyboard.press("Enter");
  console.log("apertou");
  await page.waitForTimeout(1000);

  const pages = await browser.pages();
  await page.waitForTimeout(2000);

  console.log("numero de paginas", pages.length);

  if (pages.length > 2) {
    page = pages[2];
  }

  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("table tr td"));
    return tds.map((td) => td.innerText);
  });

  // save json data
  const json = JSON.stringify(data);
  const fs = require("fs");
  fs.writeFileSync(`${Renach}.json`, json);

  browser.close();
}

// function to read json data and replace all /t /n and splace with ``
function readAndCleanJson(file) {
  const fs = require("fs");
  const data = fs.readFileSync(file);
  const json = JSON.parse(data);

  const newJson = json.map((item) => {
    const newItem = item
      .replace(/\t/g, "")
      .replace(/\n/g, " ")
      .replace(/([a-z](?=[0-9]))/g, "$1 ")
      .replace(/([A-Z](?=[0-9]))/g, "$1 ")
      .replace(/([a-z](?=[A-Z]))/g, "$1 ")
      .trim();

    if (newItem.length != 0) {
      return newItem;
    }
    return null;
  });

  // remove null values of array
  const newJson2 = newJson.filter((item) => item != null);
  console.log(newJson2);
}

collectDataFromBrowser();
readAndCleanJson(`646632256.json`);
