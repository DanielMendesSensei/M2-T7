import { PrismaClient } from "@prisma/client";

class UserService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByUsername(username) {
    return this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async createUser({ username, password, type }) {
    return this.prisma.user.create({
      data: { username, password, user_type: type },
    });
  }
}

export default new UserService();
