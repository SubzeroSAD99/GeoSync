import Employee from "../models/Employee.mjs";

const EMPLOYEES = [
  {
    fullName: "ANTONIO KAUAN LOPES FREITAS",
    cpf: "10179366335",
    password: "99",
    role: "administrador",
  },
  {
    fullName: "BRUNO FELICIANO DE LIMA ALVES",
    cpf: "06988874330",
    password: "99",
    role: "administrador",
  },
  {
    fullName: "CAETANO SILVA SOEIRO FILHO",
    cpf: "09583615331",
    password: "99",
  },
  {
    fullName: "FRANCISCO DAS CHAGAS PONTES NETO",
    cpf: "78018293368",
    password: "99",
    role: "administrador",
  },
  {
    fullName: "FRANCISCO EDSON SOEIRO CARNEIRO",
    cpf: "60618481370",
    password: "99",
  },
  { fullName: "HENRIQUE SALES SOEIRO", cpf: "07475196330", password: "99" },
  {
    fullName: "MARCOS ANTÔNIO SOEIRO FONTELES",
    cpf: "05650564337",
    password: "99",
  },
  {
    fullName: "RAIMUNDO NONATO NASCIMENTO FILHO",
    cpf: "60619184370",
    password: "99",
  },
  {
    fullName: "JHONATAN DOS SANTOS FREITAS",
    cpf: "04256885340",
    password: "99",
  },
  {
    fullName: "JONAS SAULO LEORNE PONTES",
    cpf: "64457923320",
    password: "99",
    role: "administrador",
  },
  {
    fullName: "KAUAN DE SOUSA VASCONCELOS",
    cpf: "07997814361",
    password: "99",
  },
];

Employee.bulkCreate(EMPLOYEES, { ignoreDuplicates: true });
