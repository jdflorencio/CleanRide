import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};

	const expected = {
		accountTd: '270059c4-2491-4c80-b25f-ef2c223b6b80',
	  };
	const output = await axios.post("http://localhost:3000/signup", input);
	console.log(output.status, output.data);

	expect(output.status).toBe(200);

});
