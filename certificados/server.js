const app = require("./config/express")();
const fs = require("fs");
const pdf = require("html-pdf");

function generatePDF() {
  const html = fs.readFileSync("index.html").toString();
console.log(html)
  const options = {
    type: "pdf", // allowed file types: png, jpeg, pdf
    quality: "75",
    renderDelay: 1000,
    //format: 'A4',
     height: "1870px",
     width: "2650px",
    
    orientation: "landscape",
   
    localUrlAccess: true, 
    //scale: 20,
  };
  
  pdf.create(html, options).toFile("./teste.pdf", function (err, res) {
    console.log("a");
    // { filename: '/app/businesscard.pdf' }
  });
}

app.post("/generate-pdf", generatePDF);

app.listen(() => {
  console.log(`Servidor rodando na porta 3000`);
  generatePDF();
});
