import { logEvents } from "../middlewares/logger.js";
import { User } from "../model/User.js";

class UserService {
  // O Método espera receber um objeto com nome, email e idade
  //   async createUser(name, email, age) {
  async createUser(objUser) {
    try {
      const { name, email, age } = objUser;

      const novoUsuario = await User.create({ name, email, age });

      return novoUsuario;
    } catch (error) {
      // JOGA NO NOSSO LOGGER
      await logEvents(
        `DEU RUIM NO SERVIÇO DE USUÁRIO. Erro: ${error}`,
        "user_service.log"
      );
    }
  }

  async getAllUsers(filters) {
    // O método espera receber um objeto de filtros,
    // onde posso paginar e buscar usuários ativos
    const { page, limit, isActive } = filters;

    // OBJETO VAZIO
    const clausulaWhere = {};
    // is Active tem que ser um boolean e preenchido
    if (isActive !== undefined) {
      clausulaWhere.isActive === "true"; // string to bool
    }

    100;
    const { count, rows: users } = await User.findAndCountAll({
      where: clausulaWhere,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    });

    10;
    return {
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit),
      },
    };
  }

  async deleteUser(userId) {
    // Retornar um objeto com o usuário encontrado
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();

    return { message: "Usuário deletado com sucesso!" };
  }

  //soft delete
  async softDeleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    await user.update({
      delete: true,
    });

    return { message: "Usuário deletado com sucesso!" };
  }
}

export default new UserService();
