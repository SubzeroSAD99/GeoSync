import Employee from "../models/Employee.mjs";

const EMPLOYEES = [
  {
    fullName: "ANTONIO KAUAN LOPES FREITAS",
    cpf: "101.793.663-35",
    password: "99",
    position: "admin",
  },
  {
    fullName: "BRUNO FELICIANO DE LIMA ALVES",
    cpf: "069.888.743-30",
    password: "99",
    position: "admin",
  },
  {
    fullName: "CAETANO SILVA SOEIRO FILHO",
    cpf: "095.836.153-31",
    password: "99",
  },
  {
    fullName: "FRANCISCO DAS CHAGAS PONTES NETO",
    cpf: "780.182.933-68",
    password: "99",
    position: "admin",
  },
  {
    fullName: "FRANCISCO EDSON SOEIRO CARNEIRO",
    cpf: "606.184.813-70",
    password: "99",
  },
  { fullName: "HENRIQUE SALES SOEIRO", cpf: "074.751.963-30", password: "99" },
  {
    fullName: "MARCOS ANTÔNIO SOEIRO FONTELES",
    cpf: "056.505.643-37",
    password: "99",
  },
  {
    fullName: "RAIMUNDO NONATO NASCIMENTO FILHO",
    cpf: "606.191.843-70",
    password: "99",
  },
  {
    fullName: "JHONATAN DOS SANTOS FREITAS",
    cpf: "042.568.853-40",
    password: "99",
  },
  {
    fullName: "JONAS SAULO LEORNE PONTES",
    cpf: "644.579.233-20",
    password: "99",
    position: "admin",
  },
  {
    fullName: "KAUAN DE SOUSA VASCONCELOS",
    cpf: "079.978.143-61",
    password: "99",
  },
];

Employee.bulkCreate(EMPLOYEES, { ignoreDuplicates: true });
