const puppeteer = require("puppeteer");
const { once } = require("events");

const BASE_URL = `http://presencatelessaude.hujm.ufmt.br/sints/presenca/registrar/ODkx`;
//20/07/2021
//Tabagismo e família: aspectos comportamentais e genéticos
//=CONCATENAR("[";"'";D2;"'";",";"'";K2;"'";",";"'";L2;"'";",";"'";N2;C2;" - ";D2;" - ";E2;" - ";F2;" - ";G2;" - ";H2;" - ";I2;" - ";J2;" - ";K2;" - ";L2;"'";",";"]";",")
var List = [
  [
    "marcio.ramos@ebserh.gov.br",
    "Marcio Ramos",
    "69258279115",
    "+5565992184639",
    "Masculino",
    "técnico em citopatologia ",
    "Brasil",
    "Mato Grosso",
    "CUIABÁ",
  ],
  [
    "Joaci.Pereira@ebserh.gov.br",
    "JOACI DO NASCIMENTO PEREIRA",
    "62011405300",
    "+5583991556348",
    "Masculino",
    "Enfermeiro",
    "Brasil",
    "Paraíba",
    "Cajazeiras",
  ],
  [
    "joaowmouraa@gmail.com",
    "João Wennydy Santos Moura",
    "04636400550",
    "77999267466",
    "Masculino",
    "Estudante de medicina",
    "Brasil",
    "Bahia",
    "Teofilândia-Ba",
  ],
  [
    "Valquiriadossantosbarbozasanto@gmail.com",
    "Valquiria dos santos barboza",
    "02693185191",
    "66996029395",
    "Feminino",
    "Manicure",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "neph.mococa.lao@gmail.com",
    "Luciene Antunes de Oliveira",
    "96266325691",
    "19997776673",
    "Feminino",
    "Cirurgiã-Dentista",
    "Brasil",
    "São Paulo",
    "Mococa",
  ],
  [
    "p1ci.mariosergiosouza@smeduquedecaxias.rj.gov.br",
    "MÁRIO SÉRGIO MONTEIRO DE SOUZA",
    "81949448720",
    "21996172688",
    "Masculino",
    "PROFESSOR  E COORDENADOR DO PSE E DO CRESCER SAUDÁVEL PELA SME DE DUQUE DE CAXIAS/RJ",
    "Brasil",
    "Rio de Janeiro",
    "DUQUE DE CAXIAS",
  ],
  [
    "irineide.ramos@professor.al.gov.br",
    "Irineide Urbano Ramos",
    "04095968419",
    "082994035651",
    "Feminino",
    "Professora ",
    "Brasil",
    "Alagoas",
    "Palmeira dos Índios ",
  ],
  [
    "Camposjosianibatista@gmail.com",
    "Josiane Batista de Campos ",
    "01993912118",
    "65999090994",
    "Feminino",
    "Vigilante ",
    "Brasil",
    "Mato Grosso",
    "Sinop mt",
  ],
  [
    "my-chelleps@hotmail.com",
    "Michele Pereira da Silva Barbosa",
    "04610991101",
    "65999995518",
    "Feminino",
    "Enfermeira",
    "Brasil",
    "Mato Grosso",
    "Nova Olímpia",
  ],
  [
    "leonicecaceres@hotmail.com",
    "Leonilce Torres sassi ",
    "01470503166",
    "66996598481",
    "Feminino",
    "Estudante ",
    "Brasil",
    "Mato Grosso",
    "Sinop mt ",
  ],
  [
    "robertomacedo343@gmail.com",
    "JOSÉ ROBERTO MACEDO",
    "01470480360",
    "88988127454",
    "Masculino",
    "Acadêmico de Letras e Psicologia",
    "Brasil",
    "Ceará",
    "Juazeiro do Norte ",
  ],
  [
    "luaanmeneses1@gmail.com",
    "Antônio luan dias de Meneses ",
    "07393465558",
    "79996934004",
    "Masculino",
    "Funcionário público ",
    "Brasil",
    "Sergipe",
    "",
  ],
  [
    "melo.gisely@gmail.com",
    "GISELY MARIA MELO MOREIRA LOPES DA COSTA",
    "32753179115",
    "65996058109",
    "Feminino",
    "ENFERMAGEM",
    "Brasil",
    "Mato Grosso",
    "Cuiabá",
  ],
  [
    "edupsern@gmail.com",
    "MARIA FELIPE DE ARAUJO LEMOS",
    "05774250482",
    "+999651264",
    "Feminino",
    "assessora ",
    "Brasil",
    "Rio Grande do Norte",
    "NATAL",
  ],
  [
    "janaina.assad@gmail.com",
    "Janaína Oliveira de Paula Villa Assad ",
    "03027311131",
    "66984060337",
    "Feminino",
    "Estudante de Enfermagem ",
    "Brasil",
    "Mato Grosso",
    "Itanhangá",
  ],
  [
    "joicemarinakrause@gmail.com",
    "Joice marina krause",
    "99883112149",
    "66996910225",
    "Feminino",
    "Do lar",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "drathaisaliceschneider_protese@outlook.com",
    "Thais Alice Schneider",
    "06126089138",
    "66996980704",
    "Feminino",
    "Cirurgia Dentista",
    "Brasil",
    "Mato Grosso",
    "Claudia",
  ],
  [
    "durcilene125@gmail.com",
    "Durcilene Gomes de Lima Andrade",
    "00455974136",
    "65992731899",
    "Feminino",
    "Tecnico em Farmacia",
    "Brasil",
    "Mato Grosso",
    "Cuiaba",
  ],
  [
    "rosani@gmail.com",
    "Rosani Zottele Salvador",
    "97841200706",
    "27998240765",
    "Feminino",
    "DEntista",
    "Brasil",
    "Espírito Santo",
    "",
  ],
  [
    "netemonteiro2017@gmail.com",
    "Josinete de oliveira monteiro Martins",
    "78715598268",
    "66999222191",
    "Feminino",
    "Zeladora",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "lethicia_leeh22@hotmail.com",
    "Lethicia Victoria Zandarin Chiste libanio",
    "04113350140",
    "66996159136",
    "Feminino",
    "cirurgiã dentista",
    "Brasil",
    "Mato Grosso",
    "cláudia",
  ],
  [
    "fro_enf@hotmail.com",
    "Fabiana Rodrigues de Oliveira Antunes",
    "00196849080",
    "65999279730",
    "Feminino",
    "Enfermeira",
    "Brasil",
    "Mato Grosso",
    "Campo Novo do Parecis",
  ],
  [
    "sueli_porfiroramos@hotmail.com",
    "sueli porfiro ramos ",
    "92924212120",
    "66999970977",
    "Feminino",
    "enfermeira",
    "Brasil",
    "Mato Grosso",
    "claudia",
  ],
  [
    "maralyce1@hotmail.com",
    "Maralice Silva Melo",
    "01495814165",
    "66984392296",
    "Feminino",
    "Nutricionista",
    "Brasil",
    "Mato Grosso",
    "Alto Boa Vista ",
  ],
  [
    "Joaci.Pereira@ebserh.gov.br",
    "JOACI DO NASCIMENTO PEREIRA",
    "62011405300",
    "83988723406",
    "Masculino",
    "Enfermeiro",
    "Brasil",
    "Paraíba",
    "Cajazeiras",
  ],
  [
    "lorisvansilva@gmail.com",
    "Lourisvan dos santos silva ",
    "09630652463",
    "11999553995",
    "Masculino",
    "Enfermeiro ",
    "Brasil",
    "Alagoas",
    "Pariconha ",
  ],
  [
    "ednaraufrn@gmail.com",
    "Ednara Taíssa da Silva",
    "04335591446",
    "84998695324",
    "Feminino",
    "Assistente Adm.",
    "Brasil",
    "Rio Grande do Norte",
    "Santa Cruz",
  ],
  [
    "yasmin.moraes1@outlook.com",
    "Yasmin Fernanda Vieira de Moraes",
    "05976337112",
    "65993190732",
    "Feminino",
    "Estudante de Nutrição",
    "Brasil",
    "Mato Grosso",
    "Nova Ubiratã",
  ],
  [
    "jepinheiro10@hotmail.com",
    "Jeane de Souza Pinheiro",
    "89606086968",
    "66999827227",
    "Feminino",
    "Enfermeira",
    "Brasil",
    "Mato Grosso",
    "Paranaíta",
  ],
  [
    "miriandeabreusilva73@gmail.com",
    "MÍRIAN MENDES DE ABREU SILVA",
    "01269105701",
    "21991147200",
    "Feminino",
    "Dentista",
    "Brasil",
    "Rio de Janeiro",
    "Rio de Janeiro",
  ],
  [
    "psetere@gmail.com",
    "Valéria de Almeida Machado",
    "07337792719",
    "21991030529",
    "Feminino",
    "Auxiliar Administrativo",
    "Brasil",
    "Rio de Janeiro",
    "Teresópolis",
  ],
  [
    "edivaldo.gomes@ebserh.gov.com",
    "EDIVALDO FERREIRA GOMES",
    "86929720100",
    "65993250471",
    "Masculino",
    "TECNICO EM NECROPSIA",
    "Brasil",
    "Mato Grosso",
    "CUIABÁ",
  ],
  [
    "primariasaude2011@gmail.com",
    "YANA LAURA MELLO SANTOS",
    "08088133408",
    "87999807889",
    "Feminino",
    "ADMINISTRADOR",
    "Brasil",
    "Pernambuco",
    "PETROLINA",
  ],
  [
    "odeniziahugo@hotmail.com",
    "Odenizia Batista dos Santos",
    "70097135291",
    "66984676001",
    "Feminino",
    "Professora",
    "Brasil",
    "Mato Grosso",
    "Cotriguaçu",
  ],
  [
    "zandarinmagalhaes@hotmail.com",
    "MARILEIDE DE LOURDES ZANDARIN VILLELA MAGALHAES",
    "43620957991",
    "66999851867",
    "Feminino",
    "ENFERMEIRA",
    "Brasil",
    "Mato Grosso",
    "CLAUDIA",
  ],
  [
    "rosangelavigano@hotmail.com",
    "ROSANGELA MARIA VIGANO BRAMBILLA",
    "62767585153",
    "6684324108",
    "Feminino",
    "Professora",
    "Brasil",
    "Mato Grosso",
    "Cotriguaçu-MT",
  ],
  [
    "beatrizamaro.mt@gmail.com",
    "Beatriz Amaro Rocha",
    "01754598196",
    "66999845218",
    "Feminino",
    "Enfermeira",
    "Brasil",
    "Mato Grosso",
    "Campo Verde",
  ],
  [
    "palomacecilia_@hotmail.com",
    "Paloma Cecilia Queiroz Ferreira",
    "96486309253",
    "65999524968",
    "Feminino",
    "Nutricionista",
    "Brasil",
    "Mato Grosso",
    "Nova Ubiratã",
  ],
  [
    "laisreiscastro64@gmail.com",
    "Laís Reis de Castro",
    "19125380249",
    "69993405445",
    "Feminino",
    "Psicóloga Educacional",
    "Brasil",
    "Rondônia",
    "Porto Velho",
  ],
  [
    "elzaguimaraestga@hotmail.com",
    "Elza Caetano Guimaraes",
    "65184025120",
    "65999480547",
    "Feminino",
    " Coord. Atenção Básica em Salde",
    "Brasil",
    "Mato Grosso",
    "Arenápolis",
  ],
  [
    "laca_duarte@hotmail.com",
    "Larissa karla Duarte da Silva",
    "01883947103",
    "65999306256",
    "Feminino",
    "enfermeira",
    "Brasil",
    "Mato Grosso",
    "Sapezal",
  ],
  [
    "ademarmacaubas@ses.mt.gov.br",
    "Ademar Sales Macaúbas",
    "63023377120",
    "65981290726",
    "Masculino",
    "Assistente social",
    "Brasil",
    "Mato Grosso",
    "Cuiabá",
  ],
  [
    "taynara.p.lima@hotmail.com",
    "Taynara Pereira Lima",
    "02648531130",
    "66996161875",
    "Feminino",
    "Nutricionista",
    "Brasil",
    "Mato Grosso",
    "Nova Ubiratã",
  ],
  [
    "mariamedeiros@ses.mt.gov.br",
    "Maria Leonor Gomes Medeiros",
    "52394219172",
    "65984031634",
    "Feminino",
    "Pedagoga",
    "Brasil",
    "Mato Grosso",
    "Sao Felix do Araguaia",
  ],
  [
    "rayanedsanutri@gmail.com",
    "Rayane de Sousa Assis",
    "15531010737",
    "21974870111",
    "Feminino",
    "Nutricionista",
    "Brasil",
    "Rio de Janeiro",
    "JAPERI",
  ],
  [
    "valmiraayabe@hotmail.com",
    "Valmira Tavares Xavier Ayabe",
    "32780753153",
    "996389964",
    "Feminino",
    "Enfermeira",
    "Brasil",
    "Mato Grosso",
    "Tangará da Serra",
  ],
  [
    "sec_saudesfa@yahoo.com",
    "Leandro Barros Sousa",
    "02101500175",
    "66992086767",
    "Masculino",
    "Assessor de Atenção Básica",
    "Brasil",
    "Mato Grosso",
    "Sao Félix do Araguaia",
  ],
  [
    "francieli_vareschini@hotmail.com",
    "FRANCIELI VARESCHINI",
    "04436791181",
    "66996230931",
    "Feminino",
    "ENFERMEIRA COORDENADORA",
    "Brasil",
    "Mato Grosso",
    "CLÁUDIA",
  ],
  [
    "maurojunior-10@hotmail.com",
    "Mauro da Silva Santos Júnior",
    "35068003883",
    "66996018329",
    "Masculino",
    "Profissional de Educação Física",
    "Brasil",
    "Mato Grosso",
    "Nova Santa Helena",
  ],
  [
    "julianacbassis@hotmail.com",
    "JULIANA CRISTINA BREDER ASSIS",
    "99334879653",
    "65999837766",
    "Feminino",
    "NUTRICIONISTA",
    "Brasil",
    "Mato Grosso",
    "CUIABÁ",
  ],
  [
    "fabiana_anezi@hotmail.com",
    "Fabiana Anezi Almeida",
    "62105639100",
    "66984113235",
    "Feminino",
    "Assistente Social ",
    "Brasil",
    "Mato Grosso",
    "Canabrava do Norte",
  ],
  [
    "psemaceio2017@gmail.com",
    "Adriana Paula Xavier Araujo",
    "02469330467",
    "82988873025",
    "Feminino",
    "Assistente Social",
    "Brasil",
    "Alagoas",
    "Maceió",
  ],
  [
    "mariacampos@ses.mt.gov.br",
    "Maria da Penha Ferrer de Francesco Campos ",
    "56920032104",
    "65999218585",
    "Feminino",
    "Nutricionista ",
    "Brasil",
    "Mato Grosso",
    "Cuiabá ",
  ],
  [
    "alinealmeida82@hotmail.com",
    "Aline dos Santos Almeida",
    "05670833732",
    "21988317690",
    "Feminino",
    "Assistente Social ",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo ",
  ],
  [
    "leticia.nutri.bg@hotmail.com",
    "Leticia Santos Lima",
    "04660607186",
    "66984419982",
    "Feminino",
    "Nutricionista ",
    "Brasil",
    "Mato Grosso",
    "Canabrava do Norte ",
  ],
  [
    "psepaulistape@gmail.com",
    "Rúbia de Santana Simões",
    "07355598481",
    "081997984014",
    "Feminino",
    "Administradora (Coordenação Programa Saúde na Escola)",
    "Brasil",
    "Pernambuco",
    "Paulista",
  ],
  [
    "manoelajaciaraenfa@gmail.com",
    "MANOELA JACIARA SILVA CRUZ",
    "09205413488",
    "84997026071",
    "Feminino",
    "Enfermeira ",
    "Brasil",
    "Rio Grande do Norte",
    "CAICÓ",
  ],
  [
    "jaquelineoa@hotmail.com",
    "Jaqueline de Oliveira Azevedo ",
    "14047251720",
    "21964106648",
    "Feminino",
    "Assistente social",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo ",
  ],
  [
    "camilla.opaixao@gmail.com",
    "Camilla Oliveira Paixão",
    "13979907759",
    "21979827902",
    "Feminino",
    "Nutricionista",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo",
  ],
  [
    "fernandamvitorino@gmail.com",
    "Fernanda Mesquita Vitorino",
    "11285988760",
    "21997763292",
    "Feminino",
    "Assistente Social",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo ",
  ],
  [
    "alinefnat@yahoo.com.br",
    "Aline Fortunato da Silva",
    "07435784737",
    "21986128457",
    "Feminino",
    "Nutricionista ",
    "Brasil",
    "Rio de Janeiro",
    "SÃO GONÇALO",
  ],
  [
    "gerusa.paz@hotmail.com",
    "Gerusa Paz da Silva Farias",
    "01029760748",
    "21964412043",
    "Feminino",
    "Fonoaudiólogo",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo",
  ],
  [
    "joananutri_2008@yahoo.com.br",
    "JoanaDarc dos Santos Henriques",
    "03316422803",
    "021995115594",
    "Feminino",
    "Nutricionista",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo ",
  ],
  [
    "anamartinscarneirocunha@gmail.com",
    "Ana Paula Martins Carneiro da Cumha",
    "09277236701",
    "21999535122",
    "Feminino",
    "Assistente Social",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo",
  ],
  [
    "marqueselaine21@hotmail.com",
    "Elaine Marques da Silva",
    "01901450724",
    "21970172329",
    "Feminino",
    "Nutricionista",
    "Brasil",
    "Rio de Janeiro",
    "SÃO GONÇALO",
  ],
  [
    "nathyfono@hotmail.com",
    "Nathália Christina da Silva Matheus ",
    "11415480702",
    "21987669917",
    "Feminino",
    "Fonoaudióloga ",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo ",
  ],
  [
    "clovisfigueira2013@gmail.com",
    "Clóvis FIgueira ",
    "91215986220",
    "992865478",
    "Masculino",
    "Orientador Educacional",
    "Brasil",
    "Rondônia",
    "Jaru ",
  ],
  [
    "carlos.cardoso34@hotmail.com",
    "CARLOS ROBERTO CARDOSO",
    "77958543115",
    "65999221876",
    "Masculino",
    "Técnico de enfermagem",
    "Brasil",
    "Mato Grosso",
    "Cuiabá",
  ],
  [
    "elineuza_60@hotmail.com",
    "Elineuza Costa dos Santos Crescencio",
    "20976704404",
    "82988874155",
    "Feminino",
    "Professor - Coordenador PSE - AL",
    "Brasil",
    "Alagoas",
    "Maceió",
  ],
  [
    "anamartinscarneirocunha@gmail.com",
    "Ana Paula Martins Carneiro da Cumha",
    "09277236701",
    "21999535122",
    "Feminino",
    "Assistente Social",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo",
  ],
  [
    "sarahmsantos@gmail.com",
    "Sarah Magalhães Santos ",
    "10242048714",
    "21991316011",
    "Feminino",
    "Fonoaudiologa",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo ",
  ],
  [
    "coordnasf21@gmail.com",
    "Mônica Cristina Marques de Almeida",
    "00691034702",
    "021980999031",
    "Feminino",
    "Psicóloga",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo",
  ],
  [
    "gpejg2019@gmail.com",
    "Ellen Kristina Nunes Leal",
    "11568024401",
    "985948497",
    "Feminino",
    "Estudante",
    "Brasil",
    "Pernambuco",
    "Jaboatão dos Guararapes",
  ],
  [
    "taaynaravieira@gmail.com",
    "Taynara Vieira",
    "04199475150",
    "66984035944",
    "Feminino",
    "Nutricionista ",
    "Brasil",
    "Mato Grosso",
    "São Félix do Araguaia ",
  ],
  [
    "teresacristinafadel30@gmail.com",
    "Teresa Cristina Combat Fadel",
    "89877896753",
    "991304978",
    "Feminino",
    "Psicóloga",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo ",
  ],
  [
    "alinemassis@hotmail.com",
    "Aline de Magalhães Assis",
    "04885947154",
    "65981569509",
    "Feminino",
    "Estagiária de nutrição ",
    "Brasil",
    "Mato Grosso",
    "Nova Ubiratã ",
  ],
  [
    "isllav.schimoller@gmail.com",
    "Islla Victor Schimoller",
    "02401510117",
    "65996947455",
    "Feminino",
    "Estagiária de nutrição",
    "Brasil",
    "Mato Grosso",
    "Cuiabá",
  ],
  [
    "yasmin.moraes1@outlook.com",
    "Yasmin Fernanda Vieira de Moraes",
    "05976337112",
    "65993190732",
    "Feminino",
    "Estudante de Nutrição ",
    "Brasil",
    "Mato Grosso",
    "Nova Ubiratã",
  ],
  [
    "teresacristinafadel30@gmail.com",
    "Teresa Cristina Combat Fadel",
    "89877896753",
    "991304978",
    "Feminino",
    "Psicóloga",
    "Brasil",
    "Rio de Janeiro",
    "",
  ],
  [
    "anapsfodonto@hotmail.com",
    "Ana Paula Bervian",
    "02315178150",
    "66984510563",
    "Feminino",
    "Cirurgiã Dentista",
    "Brasil",
    "Mato Grosso",
    "Cotriguaçu",
  ],
  [
    "maju.andromeda@hotmail.com",
    "Maiara Barboza Teixeira ",
    "02390814123",
    "66984226374",
    "Feminino",
    "Enfermeira ",
    "Brasil",
    "Mato Grosso",
    "Cotriguaçu",
  ],
  [
    "adorileocardoso@gmail.com",
    "Ana Lúcia Dorileo Cardoso",
    "35388013120",
    "65999821644",
    "Feminino",
    "Enfermeira ",
    "Brasil",
    "Mato Grosso",
    "Cuiabá ",
  ],
  [
    "helia.paiva@ufpe.br",
    "HÉLIA GLAUCE DE MELO PAIVA",
    "85711640453",
    "81997341287",
    "Feminino",
    "Estudante",
    "Brasil",
    "Pernambuco",
    "Camaragibe",
  ],
  [
    "iucara.naiana@gmail.com",
    "IUÇARA NAIANA FERNANDES LIMA",
    "99684420382",
    "86994155666",
    "Feminino",
    "Fonoaudióloga",
    "Brasil",
    "Piauí",
    "Teresina",
  ],
  [
    "sdasilvavidigal@gmail.com",
    "Simone Da Silva Vidigal ",
    "00888711182",
    "65999093369",
    "Feminino",
    "Técnico de enfermagem ",
    "Brasil",
    "Mato Grosso",
    "Cuiabá ",
  ],
  [
    "luanna-clemente@hotmail.com",
    "Luanna clemente silva costa",
    "2675741183",
    "6698449607",
    "Feminino",
    "Asb",
    "Brasil",
    "Mato Grosso",
    "São Félix do araguaia",
  ],
  [
    "angelnane@gmail.com",
    "Elaine Cristina de Souza Berenguer ",
    "05481657422",
    "81997751219",
    "Feminino",
    "Coordenação PSE ",
    "Brasil",
    "Pernambuco",
    "Igarassu ",
  ],
  [
    "sirleylima@ses.mt.gov.br",
    "Sirley Gomes de Lima",
    "26267606848",
    "65999135852",
    "Feminino",
    "Pedagoga",
    "Brasil",
    "Mato Grosso",
    "Cuiabá",
  ],
  [
    "jucialexandre@hotmail.com",
    "Jucielle de Pontes Alexandre Fuzinato",
    "02608273122",
    "66984422302",
    "Feminino",
    "Direto de departamento da saude",
    "Brasil",
    "Mato Grosso",
    "Nova Monte Verde",
  ],
  [
    "nemingotti@gmail.com",
    "Nedi Salete Mingotti ",
    "02380494932",
    "66999582779",
    "Feminino",
    "Auxiliar de saúde bucal ",
    "Brasil",
    "Mato Grosso",
    "Tapurah ",
  ],
  [
    "professorcelestino1244@gmail.com ",
    "Edimildson Celestino de Barros ",
    "60140372504",
    "79998187900",
    "Masculino",
    "Funcionario Publico ",
    "Brasil",
    "Sergipe",
    "Barra dos Coqueiros ",
  ],
  [
    "simonerollemberg@yahoo.com",
    "Simone Rollemberg dos Santos ",
    "00981610595",
    "0799999553831",
    "Feminino",
    "Professora",
    "Brasil",
    "Sergipe",
    "Barra dos Coqueiros ",
  ],
  [
    "enfgabi84@gmail.com",
    "Amanda Gabriela da Costa Fonseca",
    "00705485102",
    "65999578589",
    "Feminino",
    "ENFERMEIRA",
    "Brasil",
    "Mato Grosso",
    "Chapada dos Guimarães",
  ],
  [
    "anapaularabelo.01@gmail.com",
    "Ana Paula Rabelo Gomes",
    "00673240533",
    "79999969230",
    "Feminino",
    "Funcionário público",
    "Brasil",
    "Sergipe",
    "Barra dos Coqueiros",
  ],
  [
    "rosana.silva@edu.mt.gov.br",
    "Rosana Aparecida Siano da Silva ",
    "04227403812",
    "66992357393",
    "Feminino",
    "Professora ",
    "Brasil",
    "Mato Grosso",
    "Rondonópolis ",
  ],
  [
    "elza_sc@hotmail.com",
    "Elza Santos Costa",
    "55084079104",
    "66984335908",
    "Feminino",
    "Psicóloga",
    "Brasil",
    "Mato Grosso",
    "Novo Santo Antônio",
  ],
  [
    "erikamesquita28@gmail.com",
    "Erika Mesquita",
    "02770880624",
    "35984184741",
    "Feminino",
    "Psicóloga",
    "Brasil",
    "Minas Gerais",
    "Pouso Alegre ",
  ],
  [
    "Jameskiriosoliveiranobre@yahoo.com",
    "James kirios de Oliveira nobre ",
    "88042413149",
    "65992190165",
    "Masculino",
    "Técnico em enfermagem ",
    "",
    "",
    "Cuiabá ",
  ],
  [
    "andrea_oliveira81@hotmail.com",
    "Andrea Santos Oliveira",
    "01579406599",
    "73991281601",
    "Feminino",
    "estudante em odontologia",
    "Brasil",
    "Bahia",
    "Camacan",
  ],
  [
    "tanialealmoreira@hotmail.com",
    "Tania Leal Moreira ",
    "65097513215",
    "69992561686",
    "Feminino",
    "Enfermeira ",
    "Brasil",
    "Rondônia",
    "Ouro Preto do Oeste ",
  ],
  [
    "paulahelena.espeleta@gmail.com",
    "PAULA HELENA ESPELETA NICOLETTI",
    "35101770884",
    "65996240305",
    "Feminino",
    "ENFERMEIRA",
    "Brasil",
    "Mato Grosso",
    "ARENÁPOLIS",
  ],
  [
    "sonildadias@hotmail.com",
    "Sonilda Dias Moreira r. Santos",
    "80810691191",
    "6684049017",
    "Feminino",
    "Professora",
    "Brasil",
    "",
    "Primavera do Leste",
  ],
  [
    "rosimerecozzi@gmail.com",
    "Rosimere Pereira de Oliveira ",
    "10254789757",
    "21997842952",
    "Feminino",
    "Enfermeira ",
    "Brasil",
    "Rio de Janeiro",
    "São Gonçalo ",
  ],
  [
    "zanela02@hotmail.com",
    "Fabiana Zanela",
    "01069903140",
    "65996728769",
    "Feminino",
    "Técnica de enfermagem",
    "Brasil",
    "Mato Grosso",
    "Cuiabá MT",
  ],
  [
    "janetejagaja@hotmail.com",
    "JANETE FRANCISCA DE MORAIS CARVALHO",
    "44197942168",
    "65984052117",
    "Feminino",
    "TEC de enfermagem",
    "Brasil",
    "Mato Grosso",
    "Cuiabá",
  ],
  [
    "kauanefolettoh@gmail.com",
    "KauaneYasmim Tavares Foletto",
    "10641444974",
    "66996730592",
    "Feminino",
    "estudante",
    "Brasil",
    "Mato Grosso",
    "SINOP MT ",
  ],
  [
    "jrgabrieldeoliveira@gmail.com",
    "João Ricardo Gabriel de Oliveira",
    "90872150968",
    "66996196109",
    "Masculino",
    "Profissional de Ed. Física",
    "Brasil",
    "Mato Grosso",
    "Sorriso",
  ],
  [
    "joycy_gata2012@hotmail.com",
    "Joice dos santos macedo",
    "03429662273",
    "66992572046",
    "Feminino",
    "Estudantes ",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "ednaturcatto@gmail.com",
    "Edna Simões Turcatto ",
    "33513872615",
    "69992535753",
    "Feminino",
    "Médico ",
    "Brasil",
    "Rondônia",
    "Machadinho D’oeste",
  ],
  [
    "ionaracbsouza@gmail.com",
    "Ionara cibele barcelo de Souza ",
    "08273637450",
    "996434441",
    "Feminino",
    "Estudante ",
    "Brasil",
    "Pernambuco",
    "Glória do goita ",
  ],
  [
    "regiane_mt@hotmail.com",
    "Regiane Rodrigues de Araujo Rosa ",
    "84784369104",
    "65992653836",
    "Feminino",
    "Técnico de enfermagem ",
    "Brasil",
    "Mato Grosso",
    "Cuiabá ",
  ],
  [
    "joyjoilson@hotmail.com",
    "Joilson de Souza Rosa ",
    "62741438153",
    "65993583737",
    "Masculino",
    "Técnico de enfermagem ",
    "Brasil",
    "Mato Grosso",
    "Cuiabá ",
  ],
  [
    "pabulavelozo30@gmail.com",
    "Pabula velozo de oliveira",
    "06135244116",
    "66999085442",
    "Feminino",
    "Recepcionista",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "lizabelajules236@hotmail.com",
    "LIZ FHALON QUIROZ GASCON",
    "91951833619",
    "72071686",
    "Feminino",
    "Odontopediatra ",
    "Bolívia",
    "Minas Gerais",
    "La Paz",
  ],
  [
    "rosangela.matos@hotmail.com",
    "Rosangela Simao de Matos",
    "00103585109",
    "67999162737",
    "Feminino",
    "Tecnico em Enfermagem",
    "Brasil",
    "Mato Grosso",
    "",
  ],
  [
    "paty.mart@hotmail.com",
    "Patricia Martins Bispo",
    "97249289187",
    "65992173622",
    "Feminino",
    "Técnica de enfermagem ",
    "Brasil",
    "Mato Grosso",
    "Cuiabá ",
  ],
  [
    "alanehellen@gmail.com",
    "Alane Hellen dos Santos",
    "09588003407",
    "84998079854",
    "Feminino",
    "Enfermeira",
    "Brasil",
    "Rio Grande do Norte",
    "Caicó",
  ],
  [
    "catiacilenelimadealmeida@gmail.com",
    "Cátia Cilene Lima de Almeida ",
    "34098666200",
    "6692810891",
    "Feminino",
    "Professora",
    "Brasil",
    "Mato Grosso",
    "Cotriguaçu ",
  ],
  [
    "milasamya@gmail.com",
    "Jamile Samya dias de Sousa ",
    "02659023395",
    "86998471135",
    "Feminino",
    "Nutricionista ",
    "Brasil",
    "Piauí",
    "Paulistana ",
  ],
  [
    "netemonteiro2017@gmail.com",
    "Josinete de oliveira monteiro Martins",
    "78715598268",
    "66999222191",
    "Feminino",
    "Zeladora",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "RICKPIPOCA157@HOTMAIL.COM",
    "ROZANGELA DOS REIS ALMENDRO",
    "52254488104",
    "65999797778",
    "Feminino",
    "TECNICA DE ENFERMAGEM",
    "Brasil",
    "Mato Grosso",
    "CUIABÁ",
  ],
  [
    "netemonteiro2017@gmail.com",
    "Josinete de oliveira monteiro Martins",
    "78715598268",
    "66999222191",
    "Feminino",
    "Zeladora",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "andersontorres1692@gmail.com",
    "anderson farias torres",
    "06124629194",
    "66999688656",
    "Masculino",
    "auxiliar de vendas",
    "",
    "",
    "",
  ],
  [
    "Joycy_gata2012@hotmail.com",
    "Joice dos santos macedo",
    "03429662273",
    "66992572046",
    "Feminino",
    "Estudante",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "larissaarielguilhen@gmail.com",
    "LARISSA ARIEL DOS SANTOS GUILHEN",
    "06191817100",
    "66996346833",
    "Feminino",
    "TEC. ENFERMAGEM",
    "Brasil",
    "Mato Grosso",
    "SINOP",
  ],
  [
    "joycy_gata2012@hotmail.com",
    "Joice dos Santos macedo ",
    "03429662273",
    "66992572046",
    "Feminino",
    "Estudantes ",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "bimociene@hotmail.com",
    "IMOCIENE BARROS GONÇALVES",
    "90178980463",
    "87999770078",
    "Feminino",
    "AGENTE COMUNITÁRIA DE SAÚDE",
    "Brasil",
    "Pernambuco",
    "FLORESTA",
  ],
  [
    "bimociene@hotmail.com",
    "IMOCIENE BARROS GONÇALVES",
    "90178980463",
    "87999770078",
    "Feminino",
    "AGENTE COMUNITÁRIA DE SAÚDE",
    "Brasil",
    "Pernambuco",
    "FLORESTA",
  ],
  [
    "alerrandra0000azzz@gmail.com",
    "ALERRANDRA GABRIELY RODRIGUES",
    "06322101170",
    "+5566996377919",
    "Feminino",
    "Repositora ",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "rochafrancineide629@gmail.com",
    "Tainara Rodrigues Rocha ",
    "05387076233",
    "66996378122",
    "Feminino",
    "Técnico em enfermagem ",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "rochafrancineide629@gmail.com",
    "Tainara Rodrigues Rocha ",
    "05387076233",
    "66996378122",
    "Feminino",
    "Técnico em enfermagem ",
    "Brasil",
    "Mato Grosso",
    "Sinop",
  ],
  [
    "frazaoraynner@gmail.com",
    "Raynner Sousa Chaves Frazão",
    "05529983383",
    "99984665477",
    "Masculino",
    "Enfermairo",
    "Brasil",
    "Maranhão",
    "Grajaú",
  ],
  [
    "taaynaravieira@gmail.com",
    "Taynara Vieira",
    "04199475150",
    "66984095944",
    "Feminino",
    "Nutricionista",
    "Brasil",
    "Mato Grosso",
    "São Félix do Araguaia",
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

  console.log("Fim");
}
async function putInformation() {
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
    await page.waitForTimeout(500);

    await page.click('input[name="formConfirm:nome"]');
    await page.keyboard.type(`${firstName}`);
    await page.click('input[name="formConfirm:sobrenome"]');
    await page.keyboard.type(`${lastName}`);
    await page.click('input[name="formConfirm:email"]');
    await page.keyboard.type(`${email}`);
    await page.click('input[name="formConfirm:celular"]');
    await page.keyboard.type(`${celular}`);
    await page.click('input[name="formConfirm:celular"]');
    await page.keyboard.type(`${celular}`);

    if (sexo == "m") {
      await page.click('div[id="formConfirm:sexo"]');
      await page.keyboard.press("ArrowDown");
    }
    await page.click('div[id="formConfirm:cbo"]');

    await page.keyboard.press("Space");
    await page.waitForTimeout(1000);

    await page.keyboard.type(`${profissao}`);

    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    //cidade estado cbo
    await page.keyboard.press("Tab");

    await page.keyboard.press("Space");
    await page.waitForTimeout(1000);

    await page.keyboard.type(`${estado}`);

    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    await page.keyboard.press("Tab");

    await page.keyboard.press("Space");
    await page.waitForTimeout(1000);

    await page.keyboard.type(`${cidade}`);
    await page.waitForTimeout(500);
    await page.keyboard.press("Enter");

    await page.waitForTimeout(500);
    await page.click('button[name="formConfirm:j_idt100"]');
    await page.waitForTimeout(2000);
    const title = await page.title();
    console.log("----");
    if (title == "SISTEMA DE INFORMAÇÃO TELEEDUCAÇÃO-MT SIT-MT") {
      console.log("Deu erro: ");
    } else {
      console.log("Feito Cpf: " + cpf);
    }
  } catch (err) {
    console.log("Ja cadastrado: " + cpf);
    console.log(err);
  }
}
