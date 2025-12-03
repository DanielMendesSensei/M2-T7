import UserService from "./User.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";

class AuthService {
  async register(username, password, type) {
    const user_exist = await UserService.findByUsername(username);
    if (user_exist) throw new Error("Esse usuário já existe!");
    const hash = await bcrypt.hash(password, 10); // CIFRANDO A SENHA
    const user = await UserService.createUser({
      username: username,
      password: hash,
      type: type,
    });
  }

  async authenticate({ username, password }) {
    const user_exist = await UserService.findByUsername(username);
    if (!user_exist) throw new Error("Credencias inválidas");
    // COMPARA E DESCRIPTOGRA A SENHA BASEADA NA SUA SENHA NO BANCO
    const match = await bcrypt.compare(password, user_exist.password);
    if (!match) throw new Error("Credenciais inválidas");
    const payload = { sub: user_exist.id, username: user_exist.username };
    // TOKEN SENDO CRIADO
    const token = jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return token;
  }
}

export default new AuthService();
