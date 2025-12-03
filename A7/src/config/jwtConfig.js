export default {
  secret: process.env.JWT_SECRET, // SE BASEA NA STRING PARA CIFRAR AS INFORMAÇÕES
  expiresIn: "1h", // TEMPO DE DURAÇÃO DO TOKEN
};
