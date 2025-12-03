import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const userService = {
  async createUser(userData) {
    const { name, email, password, age } = userData;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        age,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async getAllUsers(filters) {
    const { page = 1, limit = 10, isActive } = filters;
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    const where = {};
    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    const [users, count] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
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
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: take,
      },
    };
  },

  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        posts: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async updateUser(userId, userData) {
    const { name, email, password, age, isActive } = userData;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (age !== undefined) updateData.age = age;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Hash password if provided
    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    try {
      const user = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: updateData,
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("User not found");
      }
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      await prisma.user.delete({
        where: { id: parseInt(userId) },
      });

      return { message: "User deleted successfully" };
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("User not found");
      }
      throw error;
    }
  },
};
