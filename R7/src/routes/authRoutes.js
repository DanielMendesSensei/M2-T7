import { Router } from "express";
import { authController } from "../controllers/authController.js";
///import { validate } from "../middlewares/validate.js";
// import { authValidation } from "../validations/authValidation.js";
import { authenticate } from "../middlewares/authenticate.js";
// import { authLimiter } from "../middlewares/rateLimit.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterInput:
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
 *           description: Senha do usuario (minimo 6 caracteres)
 *           example: "senha123"
 *         age:
 *           type: integer
 *           nullable: true
 *           description: Idade do usuario
 *           example: 25
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
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
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Joao Silva"
 *                 email:
 *                   type: string
 *                   example: "joao@email.com"
 *             token:
 *               type: string
 *               description: JWT token de autenticacao
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Token JWT para autenticacao
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticacao e gerenciamento de sessao
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar novo usuario
 *     description: Cria uma nova conta de usuario e retorna o token de autenticacao
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Usuario registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
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
  "/auth/register",
  // authLimiter,
  //validate(authValidation.register),
  authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login
 *     description: Autentica o usuario e retorna o token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Credenciais invalidas ou conta inativa
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
  "/auth/login",
  // authLimiter,
  //validate(authValidation.login),
  authController.login
);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renovar token
 *     description: Gera um novo token JWT para o usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Token invalido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario nao encontrado ou inativo
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
router.post("/auth/refresh", authenticate, authController.refreshToken);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Obter perfil do usuario
 *     description: Retorna os dados do usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado com sucesso
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
 *       401:
 *         description: Token invalido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
router.get("/auth/profile", authenticate, authController.getProfile);

export default router;
