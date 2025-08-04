import Employee from "../models/Employee.mjs";
import Municipality from "../models/Municipality.mjs";
import Equipment from "../models/Equipment.mjs";
import XLSX from "xlsx";
import Client from "../models/Client.mjs";

const EMPLOYEES = [
  {
    fullName: "antonio kauan lopes freitas",
    cpf: "10179366335",
    password: "99",
    role: "aux. administrativo",
    phoneNumber: "558896459091",
  },

  {
    fullName: "antonio ermeson braga rios",
    cpf: "11036835359",
    password: "99",
    phoneNumber: "558899381123",
  },

  {
    fullName: "bruno feliciano de lima alves",
    cpf: "06988874330",
    password: "99",
    role: "ge. administrativo",
    phoneNumber: "558899582603",
  },
  {
    fullName: "caetano silva soeiro filho",
    cpf: "09583615331",
    password: "99",
    phoneNumber: "558896092114",
  },
  {
    fullName: "francisco das chagas pontes neto",
    cpf: "78018293368",
    password: "99",
    role: "socio",
  },
  {
    fullName: "francisco edson soeiro carneiro",
    cpf: "60618481370",
    password: "99",
    phoneNumber: "558896370202",
  },
  {
    fullName: "henrique sales soeiro",
    cpf: "07475196330",
    password: "99",
    phoneNumber: "558898194815",
  },
  {
    fullName: "marcos antonio soeiro fonteles",
    cpf: "05650564337",
    password: "99",
    phoneNumber: "558899751665",
  },
  {
    fullName: "raimundo nonato nascimento filho",
    cpf: "60619184370",
    password: "99",
    phoneNumber: "558897711179",
  },
  {
    fullName: "jonathan dos santos freitas",
    cpf: "04256885340",
    password: "99",
    phoneNumber: "558591159472",
  },
  {
    fullName: "jonas saulo leorne pontes",
    cpf: "64457923320",
    password: "99",
    role: "socio",
  },
  {
    fullName: "kauan de sousa vasconcelos",
    cpf: "07997814361",
    password: "99",
  },
  {
    fullName: "jose anilo lopes",
    cpf: "00000000000",
    password: "99",
    role: "topografo",
  },
  {
    fullName: "jose arcanjo junior",
    cpf: "11111111111",
    password: "99",
    role: "topografo",
  },
];

const MUNICIPALITIES = [
  {
    name: "abaiara",
  },
  {
    name: "acarape",
  },
  {
    name: "acaraú",
  },
  {
    name: "acopiara",
  },
  {
    name: "aiuaba",
  },
  {
    name: "alcântaras",
  },
  {
    name: "altaneira",
  },
  {
    name: "alto santo",
  },
  {
    name: "amontada",
  },
  {
    name: "antonina do norte",
  },
  {
    name: "apuiarés",
  },
  {
    name: "aquiraz",
  },
  {
    name: "aracati",
  },
  {
    name: "aracoiaba",
  },
  {
    name: "ararendá",
  },
  {
    name: "araripe",
  },
  {
    name: "aratuba",
  },
  {
    name: "arneiroz",
  },
  {
    name: "assaré",
  },
  {
    name: "aurora",
  },
  {
    name: "baixio",
  },
  {
    name: "banabuiú",
  },
  {
    name: "barbalha",
  },
  {
    name: "barreira",
  },
  {
    name: "barro",
  },
  {
    name: "barroquinha",
  },
  {
    name: "baturité",
  },
  {
    name: "beberibe",
  },
  {
    name: "bela cruz",
  },
  {
    name: "boa viagem",
  },
  {
    name: "brejo santo",
  },
  {
    name: "camocim",
  },
  {
    name: "campos sales",
  },
  {
    name: "canindé",
  },
  {
    name: "capistrano",
  },
  {
    name: "caridade",
  },
  {
    name: "cariré",
  },
  {
    name: "caririaçu",
  },
  {
    name: "cariús",
  },
  {
    name: "carnaubal",
  },
  {
    name: "cascavel",
  },
  {
    name: "catarina",
  },
  {
    name: "catunda",
  },
  {
    name: "caucaia",
  },
  {
    name: "cedro",
  },
  {
    name: "chaval",
  },
  {
    name: "choró",
  },
  {
    name: "chorozinho",
  },
  {
    name: "coreaú",
  },
  {
    name: "crateús",
  },
  {
    name: "crato",
  },
  {
    name: "croatá",
  },
  {
    name: "cruz",
  },
  {
    name: "deputado irapuan pinheiro",
  },
  {
    name: "ereré",
  },
  {
    name: "eusébio",
  },
  {
    name: "farias brito",
  },
  {
    name: "forquilha",
  },
  {
    name: "fortaleza",
  },
  {
    name: "fortim",
  },
  {
    name: "frecheirinha",
  },
  {
    name: "general sampaio",
  },
  {
    name: "graça",
  },
  {
    name: "granja",
  },
  {
    name: "granjeiro",
  },
  {
    name: "groaíras",
  },
  {
    name: "guaiúba",
  },
  {
    name: "guaraciaba do norte",
  },
  {
    name: "guaramiranga",
  },
  {
    name: "hidrolândia",
  },
  {
    name: "horizonte",
  },
  {
    name: "ibaretama",
  },
  {
    name: "ibiapina",
  },
  {
    name: "ibicuitinga",
  },
  {
    name: "icapuí",
  },
  {
    name: "icó",
  },
  {
    name: "iguatu",
  },
  {
    name: "independência",
  },
  {
    name: "ipaporanga",
  },
  {
    name: "ipaumirim",
  },
  {
    name: "ipu",
  },
  {
    name: "ipueiras",
  },
  {
    name: "iracema",
  },
  {
    name: "irauçuba",
  },
  {
    name: "itaiçaba",
  },
  {
    name: "itaitinga",
  },
  {
    name: "itapajé",
  },
  {
    name: "itapipoca",
  },
  {
    name: "itapiúna",
  },
  {
    name: "itarema",
  },
  {
    name: "itatira",
  },
  {
    name: "jaguaretama",
  },
  {
    name: "jaguaribara",
  },
  {
    name: "jaguaribe",
  },
  {
    name: "jaguaruana",
  },
  {
    name: "jardim",
  },
  {
    name: "jati",
  },
  {
    name: "jijoca de jericoacoara",
  },
  {
    name: "juazeiro do norte",
  },
  {
    name: "jucás",
  },
  {
    name: "lavras da mangabeira",
  },
  {
    name: "limoeiro do norte",
  },
  {
    name: "madalena",
  },
  {
    name: "maracanaú",
  },
  {
    name: "maranguape",
  },
  {
    name: "marco",
  },
  {
    name: "martinópole",
  },
  {
    name: "massapê",
  },
  {
    name: "mauriti",
  },
  {
    name: "meruoca",
  },
  {
    name: "milagres",
  },
  {
    name: "milhã",
  },
  {
    name: "miraíma",
  },
  {
    name: "missão velha",
  },
  {
    name: "mombaça",
  },
  {
    name: "monsenhor tabosa",
  },
  {
    name: "morada nova",
  },
  {
    name: "moraújo",
  },
  {
    name: "morrinhos",
  },
  {
    name: "mucambo",
  },
  {
    name: "mulungu",
  },
  {
    name: "nova olinda",
  },
  {
    name: "nova russas",
  },
  {
    name: "novo oriente",
  },
  {
    name: "ocara",
  },
  {
    name: "orós",
  },
  {
    name: "pacajus",
  },
  {
    name: "pacatuba",
  },
  {
    name: "pacoti",
  },
  {
    name: "pacujá",
  },
  {
    name: "palhano",
  },
  {
    name: "palmácia",
  },
  {
    name: "paracuru",
  },
  {
    name: "paraipaba",
  },
  {
    name: "parambu",
  },
  {
    name: "paramoti",
  },
  {
    name: "pedra branca",
  },
  {
    name: "penaforte",
  },
  {
    name: "pentecoste",
  },
  {
    name: "pereiro",
  },
  {
    name: "pindoretama",
  },
  {
    name: "piquet carneiro",
  },
  {
    name: "pires ferreira",
  },
  {
    name: "poranga",
  },
  {
    name: "porteiras",
  },
  {
    name: "potengi",
  },
  {
    name: "potiretama",
  },
  {
    name: "quiterianópolis",
  },
  {
    name: "quixadá",
  },
  {
    name: "quixelô",
  },
  {
    name: "quixeramobim",
  },
  {
    name: "quixeré",
  },
  {
    name: "redenção",
  },
  {
    name: "reriutaba",
  },
  {
    name: "russas",
  },
  {
    name: "saboeiro",
  },
  {
    name: "salitre",
  },
  {
    name: "santa quitéria",
  },
  {
    name: "santana do acaraú",
  },
  {
    name: "santana do cariri",
  },
  {
    name: "são benedito",
  },
  {
    name: "são gonçalo do amarante",
  },
  {
    name: "são joão do jaguaribe",
  },
  {
    name: "são luís do curu",
  },
  {
    name: "senador pompeu",
  },
  {
    name: "senador sá",
  },
  {
    name: "sobral",
  },
  {
    name: "solonópole",
  },
  {
    name: "tabuleiro do norte",
  },
  {
    name: "tamboril",
  },
  {
    name: "tarrafas",
  },
  {
    name: "tauá",
  },
  {
    name: "tejuçuoca",
  },
  {
    name: "tianguá",
  },
  {
    name: "trairi",
  },
  {
    name: "tururu",
  },
  {
    name: "ubajara",
  },
  {
    name: "umari",
  },
  {
    name: "umirim",
  },
  {
    name: "uruburetama",
  },
  {
    name: "uruoca",
  },
  {
    name: "varjota",
  },
  {
    name: "várzea alegre",
  },
  {
    name: "viçosa do ceará",
  },
];

const EQUIPMENTS = [
  {
    name: "grx2 gnss receiver",
    manufacturer: "sokkia",
    serialNumber: 2004522031,
    model: "grx2",
    color: "branco e azul",
  },

  {
    name: "topcon gnss rtk hiper v",
    manufacturer: "topcon",
    serialNumber: 0,
    model: "hiper v",
    color: "preto e amarelo",
  },

  {
    name: "dji mavic 3 enterprise",
    manufacturer: "dji",
    serialNumber: null,
    model: "mavic 3 enterprise",
    color: "cinza escuro",
  },

  {
    name: "estação total leica tc407",
    manufacturer: "leica geosystems",
    serialNumber: null,
    model: "ts06 puls",
    color: "branco com detalhes em verde",
  },

  {
    name: "trimble gps pro-xt",
    manufacturer: "trimble",
    serialNumber: null,
    model: "pro-xt",
    color: "amarelo com detalhes pretos",
  },
];

const workbook = XLSX.readFile("./CLIENTES.xlsx");
const tab = workbook.SheetNames[0];
const spreadsheet = workbook.Sheets[tab];
const data = XLSX.utils.sheet_to_json(spreadsheet);

(async () => {
  const normalizedData = data.map((line) => {
    const normalizedLine = {};

    for (const [key, value] of Object.entries(line)) {
      normalizedLine[key] =
        typeof value === "string" ? value.toLowerCase() : value;
    }

    return normalizedLine;
  });

  await Client.bulkCreate(normalizedData, {
    ignoreDuplicates: true,
  });
})();

Employee.bulkCreate(EMPLOYEES, { ignoreDuplicates: true });
Municipality.bulkCreate(MUNICIPALITIES, { ignoreDuplicates: true });
Equipment.bulkCreate(EQUIPMENTS, { ignoreDuplicates: true });
