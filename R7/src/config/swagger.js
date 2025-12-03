import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "A7",
      version: "1.0.0",
      description: "Aula A7",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor aula A7",
    },
  ],
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
