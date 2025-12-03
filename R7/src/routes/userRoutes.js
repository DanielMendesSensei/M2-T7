import { Router } from "express";
import { userController } from "../controllers/userController.js";
// import { validate } from "../middlewares/validate.js";
// import { userValidation } from "../validations/userValidation.js";
// import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unico do usuario
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do usuario
 *           example: "Joao Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuario
 *           example: "joao@email.com"
 *         age:
 *           type: integer
 *           nullable: true
 *           description: Idade do usuario
 *           example: 25
 *         isActive:
 *           type: boolean
 *           description: Status do usuario
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criacao
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualizacao
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuario
 *           example: "Joao Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuario
 *           example: "joao@email.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuario
 *           example: "senha123"
 *         age:
 *           type: integer
 *           nullable: true
 *           description: Idade do usuario
 *           example: 25
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuario
 *           example: "Joao Silva Atualizado"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuario
 *           example: "joao.novo@email.com"
 *         age:
 *           type: integer
 *           nullable: true
 *           description: Idade do usuario
 *           example: 26
 *         isActive:
 *           type: boolean
 *           description: Status do usuario
 *           example: true
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         data:
 *           type: object
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error message"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Criar novo usuario
 *     description: Cria um novo usuario no sistema
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validacao
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email ja existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/users",
  //authenticate,
  //validate(userValidation.create),
  userController.create
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos os usuarios
 *     description: Retorna uma lista de todos os usuarios cadastrados
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numero da pagina
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de itens por pagina
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Termo de busca por nome ou email
 *     responses:
 *       200:
 *         description: Lista de usuarios retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/users",
  //authenticate,
  //validate(userValidation.getAll),
  userController.getAll
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Buscar usuario por ID
 *     description: Retorna os dados de um usuario especifico
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/users/:id",
  //authenticate,
  //validate(userValidation.getById),
  userController.getById
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualizar usuario
 *     description: Atualiza os dados de um usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuario atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email ja existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
  "/users/:id",
  //authenticate,
  //validate(userValidation.update),
  userController.update
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deletar usuario
 *     description: Remove um usuario do sistema
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuario
 *     responses:
 *       200:
 *         description: Usuario deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       404:
 *         description: Usuario nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
  "/users/:id",
  //authenticate,
  //validate(userValidation.delete),
  userController.delete
);

export default router;
