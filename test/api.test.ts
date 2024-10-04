import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Deve criar uma conta para o passageiro", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    isPassenger: true,
  };
  const expected = {
    accountTd: "270059c4-2491-4c80-b25f-ef2c223b6b80",
  };
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
  expect(responseSignup.status).toBe(200);
  const outputSignup = responseSignup.data;
  expect(outputSignup.accountId).toBeDefined();
  const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
});
test("Deve criar uma conta para o driver", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    carPlate: "AAA9999",
    isPassenger: false,
    isDriver:true
  };
  const expected = {
    accountTd: "270059c4-2491-4c80-b25f-ef2c223b6b80",
  };
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
  expect(responseSignup.status).toBe(200);
  const outputSignup = responseSignup.data;
  expect(outputSignup.accountId).toBeDefined();
  const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
  expect(outputGetAccount.car_plate).toBe(input.carPlate);

});
test("Não Deve criar uma conta para o passageiro se o nome invalido", async function () {
  const input = {
    name: "John",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",    
    isPassenger: true,
    
  };
  const expected = {
    accountTd: "270059c4-2491-4c80-b25f-ef2c223b6b80",
  };
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
  expect(responseSignup.status).toBe(422);
  const outputSignup = responseSignup.data;
  expect(outputSignup).toBe(-3);
});
