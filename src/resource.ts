import crypto from "crypto";
import express from "express";
import pgp from "pg-promise";
import { validate } from "./validateCpf";
import { getAccount } from "./application";
const app = express();
app.use(express.json());

export async function getAccountByEmail(email: string) {
  const connection = pgp()("postgres://postgres:123@localhost:5432/app");
  const [acc] = await connection.query("select * from cccat16.account where email = $1", [email]);
  await connection.$pool.end();
}

export async function getAccountById(accountId: string) {
  const connection = pgp()("postgres://postgres:123@localhost:5432/app");
  const [acc] = await connection.query("select * from cccat16.account where account_id = $1", [accountId]);
  await connection.$pool.end();
}

export async function saveAccount(accountId: string) {
  const connection = pgp()("postgres://postgres:123@localhost:5432/app");
  await connection.query(
    "insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
    [
      id,
      req.body.name,
      req.body.email,
      req.body.cpf,
      req.body.carPlate,
      !!req.body.isPassenger,
      !!req.body.isDriver,
    ]
  );
  await connection.$pool.end();
}



app.post("/signup", async function (req, res) {
  let result;
  try {
    const id = crypto.randomUUID();

    if (acc) result = -4; 
    if (!req.body.name.match(/[a-zA-Z] [a-zA-Z]+/)) result = - 3;
    if (!req.body.email.match(/^(.+)@(.+)$/)) result = -2;
    if (!validate(req.body.cpf)) result = -1;
    if (req.body.isDriver && req.body.carPlate && !req.body.carPlate.match(/[A-Z]{3}[0-9]{4}/)) result = - 5;    
  
    
    if (typeof result === "number") {
      res.status(422).send(result + "");
    } else {
      const obj = {
        accountId: id,
      };
      result = obj; 
      res.json(result);
    }
  } finally {
    await connection.$pool.end();
  }
});

app.get("/accounts/:accountId", async function (req, res) {
  const connection = pgp()("postgres://postgres:123@localhost:5432/app");
  const [account] = await connection.query(
    "select * from cccat16.account where account_id = $1",
    [req.params.accountId]
  );
  await connection.$pool.end();
  res.json(account);
});


app.listen(3000);
