import { Router } from 'express';

const router = Router();

import { getChatsWithUser, getPeopleWithWhomUserChatted, sendMessage } from './chat.controller';

/**
 * @swagger
 * /chat/send:
 *   post:
 *     summary: Enviar un missatge de xat
 *     tags: [chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *               recieved:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Chat sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 chat:
 *                   type: object
 *       500:
 *         description: Failed to send chat
 */
router.post("/send", sendMessage);

/**
 * @swagger
 * /chat/people/{name}:
 *   get:
 *     summary: Obtenir persones amb qui l'usuari ha xatejat
 *     tags: [chat]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nom de l'usuari
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: People found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       404:
 *         description: No people found
 *       500:
 *         description: Failed to get people
 */
router.get("/people/:name", getPeopleWithWhomUserChatted);

/**
 * @swagger
 * /chat/chats/{name1}/{name2}:
 *   get:
 *     summary: Obtenir les converses entre dos usuaris
 *     tags: [chat]
 *     parameters:
 *       - in: path
 *         name: name1
 *         required: true
 *         description: Nom de l'usuari 1
 *         schema:
 *           type: string
 *       - in: path
 *         name: name2
 *         required: true
 *         description: Nom de l'usuari 2
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chats found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   from:
 *                     type: string
 *                   to:
 *                     type: string
 *                   message:
 *                     type: string
 *                   recieved:
 *                     type: boolean
 *       404:
 *         description: No chats found
 *       500:
 *         description: Failed to get chats
 */
router.get('/chats/:name1/:name2', getChatsWithUser);

export default router;
