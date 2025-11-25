import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const userService = {
  async createUser(userData) {
    const { name, email, password, age } = userData;

    console.log(password);
    // HASH DA SENHA
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(`SENHA HASHADA: ${hashedPassword}`);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        age,
      },
    });

    // PRECISA RETORNAR OS DADOS DO USUÁRIO, MENOS A SENHA
    // const userWithotPassword = {user:[user.name, ...]}
    return user;
  },

  async getAllUsers(filters) {
    const { page = 1, limit = 10, isActive } = filters;
    // const offset = (page - 1) * limit;

    const whereClause = {};
    if (isActive !== undefined) {
      whereClause.isActive = isActive === "true";
    }

    const [users, count] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count({ where: whereClause }),
    ]);
    return {
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit),
      },
    };
  },

  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  async updateUser(userId, userData) {
    const { name, email, password, age, isActive } = userData;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (age !== undefined) updateData.age = age;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Criptografar a senha de novo
    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt(password, salt);

      updateData.password = hashedPassword;
    }

    try {
      const user = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: updateData,
      });

      return user;
    } catch (error) {
      throw new Error("Erro no UpdateUser - User Service");
    }
  },

  async deleteUser(userId) {
    const user = await prisma.user.delete({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();

    return { message: "User deleted successfully" };
  },
};
