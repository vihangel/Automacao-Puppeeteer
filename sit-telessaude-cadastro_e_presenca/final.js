const puppeteer = require("puppeteer");
const { once } = require("events");

const BASE_URL = `http://presencatelessaude.hujm.ufmt.br/sints/presenca/registrar/ODkx`;
//20/07/2021
//Tabagismo e família: aspectos comportamentais e genéticos
//=CONCATENAR("[";"'";D2;"'";",";"'";K2;"'";",";"'";L2;"'";",";"'";N2;C2;" - ";D2;" - ";E2;" - ";F2;" - ";G2;" - ";H2;" - ";I2;" - ";J2;" - ";K2;" - ";L2;"'";",";"]";",")
var List = [
 
  [
    "email",
    "nome",
    "cpf",
    "telefone",
    "sexo",
    "profissao",
    "pais",
    "estado",
    "cidade",
  ],
]; //Endereço de e-mail	Nome completo	CPF	Telefone celular - Ex: 6598765432	Sexo	Profissão	CNES:	Unidade de Saúde:	 País	Estado	Município (Cidade)

var cpf = `  `;
var cidade = ``;
var estado = ``;
var nome = ``;
var celular = ``;
var sexo = ``;
var profissao = ``;
var pais = ``;
var email = ``;
var firstName = ``;
var lastName = ``;

collectDataFromBrowser();
async function collectDataFromBrowser() {
  //inicialização
  console.log(`starting..`);

  const browser = await puppeteer.launch({
    headless: true,
  });

  console.log(List.length);

  let page = await browser.newPage();

  for (let i = 0; i < List.length; i++) {
    console.log(i);
    await page.goto(BASE_URL);
    await page.waitForTimeout(3000);

    email = List[i][0];
    nome = List[i][1];
    cpf = "--- ";
    cpf += List[i][2];
    celular = List[i][3];
    sexo = List[i][4].substring(0, 1);
    profissao = List[i][5].substring(0, 3);
    pais = List[i][6];

    estado = List[i][7].substring(0, 3);
    cidade = List[i][8].substring(0, 2);

    firstName = nome.split(" ").shift();
    lastName = nome.split(" ").slice(1, 10).join(" ");

    if (cidade == "") {
      cidade = "a";
    }
    if (estado == "") {
      estado = "a";
    }
    
    //bug da plataforma
    if (estado != "Mato Groso") {
      cidade = "c";
    }
    if (lastName == "") {
      lastName = "a";
      console.log(lastName);
    }
    // pressionar em input principal
    await page.keyboard.press("Tab");

    await page.keyboard.type(`${cpf}`);
    await page.waitForTimeout(1200);
    await page.keyboard.press("Enter");

    await page.waitForTimeout(2000);
    console.log("----");
    //Okay entrada pagina ^
    try {
      await page.click('div[id="formConfirm:estado_assistida_web_aula"]');
      await page.waitForTimeout(500);

      await page.keyboard.press("Space");
      await page.waitForTimeout(1000);

      await page.keyboard.type(`${estado}`);

      await page.keyboard.press("Enter");
      await page.waitForTimeout(500);
      await page.keyboard.press("Tab");

      await page.keyboard.press("Space");
      await page.waitForTimeout(1000);

      await page.keyboard.type(`${cidade}`);

      await page.keyboard.press("Enter");
      await page.waitForTimeout(1000);
      try {
        await page.click('input[name="formConfirm:nome"]');
        console.log("Cadastrando...");
        await page.keyboard.type(`${firstName}`);
        await page.waitForTimeout(500);
        await page.keyboard.press("Tab");
        //await page.click('input[name="formConfirm:sobrenome"]');
        await page.keyboard.type(`${lastName}`);
        await page.waitForTimeout(500);
        await page.click('input[name="formConfirm:email"]');
        await page.keyboard.type(`${email}`);
        await page.waitForTimeout(200);
        await page.click('input[name="formConfirm:celular"]');
        await page.keyboard.type(`${celular}`);
        await page.waitForTimeout(200);
        await page.click('input[name="formConfirm:celular"]');
        await page.keyboard.type(`${celular}`);
        await page.waitForTimeout(200);

        if (sexo == "m") {
          await page.click('div[id="formConfirm:sexo"]');
          await page.keyboard.press("ArrowDown");
        }
        await page.click('div[id="formConfirm:cbo"]');

        await page.keyboard.press("Space");
        await page.waitForTimeout(1000);

        await page.keyboard.type(`${profissao}`);
        await page.waitForTimeout(500);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(500);
        //cidade estado cbo
        await page.keyboard.press("Tab");

        await page.keyboard.press("Space");
        await page.waitForTimeout(1000);

        await page.keyboard.type(`${estado}`);
        await page.waitForTimeout(500);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(500);
        await page.keyboard.press("Tab");
        await page.waitForTimeout(500);
        await page.keyboard.press("Space");
        await page.waitForTimeout(1000);

        await page.keyboard.type(`${cidade}`);
        await page.waitForTimeout(500);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(500);
      } finally {
        await page.waitForTimeout(500);
        await page.click('button[name="formConfirm:j_idt100"]');
        await page.waitForTimeout(1500);
        const title = await page.title();

        if (title == "SISTEMA DE INFORMAÇÃO TELEEDUCAÇÃO-MT SIT-MT") {
          console.log("Deu algum erro ");
          //poderia tratar o erro porem ble deixa para outra hora
        } else {
          console.log("Feito Cpf: " + cpf);
        }
      }
    } catch (err) {
      console.log("Ja cadastrado: " + cpf);
      //console.log(err);
    }

    console.log("----");
    await page.goto(BASE_URL);
  }
  //faltou fechar a pagina
  console.log("Fim");
}
