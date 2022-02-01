const puppeteer = require("puppeteer");
const { once } = require("events");

const BASE_URL = `https://www.detran.mt.gov.br/`;

class GetUserByBot {
  // retorna um josn com os dados da pagina
  async collectDataFromBrowser(Renach = `646632256`, cpf = `04157908163`) {
    console.log(`Pupeeter`);

    const browser = await puppeteer.launch({
      headless: true,
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

    if (pages.length > 2) {
      page = pages[2];
    }

    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("table tr td"));
      return tds.map((td) => td.innerText);
    });
    const campo = "Categoria Permitida";
    const name = await page.evaluate(() => {
      const tds = Array.from(document.querySelector(`td > ${campo}`));
      console.log(tds);
    });

    // const response = data.map((item) => {
    //   const newItem = item
    //     .replace(/\t/g, "")
    //     .replace(/\n/g, " ")
    //     .replace(/([a-z](?=[0-9]))/g, "$1 ")
    //     .replace(/([A-Z](?=[0-9]))/g, "$1 ")
    //     .replace(/([a-z](?=[A-Z]))/g, "$1 ")
    //     .trim();

    //   if (newItem.length != 0) {
    //     return newItem;
    //   }
    //   return null;
    // });

    // // remove null values of array
    // const newJson2 = response.filter((item) => item != null);
    // console.log(newJson2);

    //Pegando variaveis necessarias
    //newJson2.indexOf("Nome").split(" ", indexOf(" "));

    browser.close();
    return newJson2;
  }

  readAndCleanJson(file) {
    //{
    //LER arquivo json
    // const fs = require("fs");
    // const data = fs.readFileSync(file);
    // const json = JSON.parse(data);
    //}

    const json = file;
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
    return newJson2;
  }
}

module.exports = new GetUserByBot();
