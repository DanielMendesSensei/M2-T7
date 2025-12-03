import { Router } from "express";
import { postController } from "../controllers/postController.js";
// import { validate } from "../middlewares/validate.js";
// import { postValidation } from "../validations/postValidation.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unico do post
 *           example: 1
 *         title:
 *           type: string
 *           description: Titulo do post
 *           example: "Meu primeiro post"
 *         content:
 *           type: string
 *           nullable: true
 *           description: Conteudo do post
 *           example: "Este e o conteudo do meu post..."
 *         tags:
 *           type: string
 *           nullable: true
 *           description: Tags do post (JSON como string)
 *           example: "[\"javascript\", \"nodejs\"]"
 *         isPublished:
 *           type: boolean
 *           description: Status de publicacao
 *           example: false
 *         userId:
 *           type: integer
 *           description: ID do autor do post
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criacao
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualizacao
 *         user:
 *           $ref: '#/components/schemas/User'
 *     PostInput:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *           description: Titulo do post
 *           example: "Meu primeiro post"
 *         content:
 *           type: string
 *           nullable: true
 *           description: Conteudo do post
 *           example: "Este e o conteudo do meu post..."
 *         tags:
 *           type: string
 *           nullable: true
 *           description: Tags do post (JSON como string)
 *           example: "[\"javascript\", \"nodejs\"]"
 *         isPublished:
 *           type: boolean
 *           description: Status de publicacao
 *           example: false
 *         userId:
 *           type: integer
 *           description: ID do autor do post
 *           example: 1
 *     PostUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Titulo do post
 *           example: "Titulo atualizado"
 *         content:
 *           type: string
 *           nullable: true
 *           description: Conteudo do post
 *           example: "Conteudo atualizado..."
 *         tags:
 *           type: string
 *           nullable: true
 *           description: Tags do post (JSON como string)
 *           example: "[\"react\", \"frontend\"]"
 *         isPublished:
 *           type: boolean
 *           description: Status de publicacao
 *           example: true
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts (requer autenticacao)
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Criar novo post
 *     description: Cria um novo post no sistema (requer autenticacao)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: Post criado com sucesso
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
 *                   example: "Post created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Erro de validacao
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token invalido ou nao fornecido
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
router.post(
  "/posts",
  authenticate,
  //validate(postValidation.create),
  postController.create
);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Listar todos os posts
 *     description: Retorna uma lista de todos os posts (requer autenticacao)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
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
 *         description: Termo de busca por titulo ou conteudo
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filtrar por ID do autor
 *       - in: query
 *         name: isPublished
 *         schema:
 *           type: boolean
 *         description: Filtrar por status de publicacao
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
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
 *                     $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token invalido ou nao fornecido
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
  "/posts",
  authenticate,
  //validate(postValidation.getAll),
  postController.getAll
);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Buscar post por ID
 *     description: Retorna os dados de um post especifico (requer autenticacao)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token invalido ou nao fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Post nao encontrado
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
  "/posts/:id",
  authenticate,
  //validate(postValidation.getById),
  postController.getById
);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Atualizar post
 *     description: Atualiza os dados de um post existente (requer autenticacao)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
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
 *                   example: "Post updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token invalido ou nao fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Post nao encontrado
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
  "/posts/:id",
  authenticate,
  //validate(postValidation.update),
  postController.update
);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Deletar post
 *     description: Remove um post do sistema (requer autenticacao)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
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
 *                   example: "Post deleted successfully"
 *       401:
 *         description: Token invalido ou nao fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Post nao encontrado
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
  "/posts/:id",
  authenticate,
  //validate(postValidation.delete),
  postController.delete
);

/**
 * @swagger
 * /api/posts/{id}/toggle-publish:
 *   patch:
 *     summary: Alternar status de publicacao
 *     description: Alterna o status de publicacao de um post (publicado/nao publicado)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Status de publicacao alterado com sucesso
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
 *                   example: "Post publish status toggled successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token invalido ou nao fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Post nao encontrado
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
router.patch(
  "/posts/:id/toggle-publish",
  authenticate,
  //validate(postValidation.togglePublish),
  postController.togglePublish
);

export default router;
