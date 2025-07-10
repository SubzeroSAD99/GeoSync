import Employee from "../models/Employee.mjs";

const EMPLOYEES = [
  {
    fullName: "antonio kauan lopes freitas",
    cpf: "10179366335",
    password: "99",
    role: "administrador",
    phoneNumber: "558896459091",
  },
  {
    fullName: "bruno feliciano de lima alves",
    cpf: "06988874330",
    password: "99",
    role: "administrador",
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
    role: "administrador",
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
    role: "administrador",
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

Employee.bulkCreate(EMPLOYEES, { ignoreDuplicates: true });
