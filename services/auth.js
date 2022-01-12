const axios = require("axios");

export async function signIn(email, senha) {
  const response = await axios.post(
    "http://192.168.0.20:5555/api/v0/auth/Login",
    {
      email: email,
      senha: senha,
    }
  );
  return response;
}

export async function signUp(nome, email, cpf, telefone, senha) {
  const response = await axios.post(
    "http://192.168.0.20:5555/api/v0/auth/Register",
    {
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      senha: senha,
    }
  );
  return response;
}
