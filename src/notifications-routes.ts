import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const publicKey =
  "BJ20WkvSg7MYJqoMhBhO-6PbuYU_dUGFM4Fs4espcP6LZINfay3zMl55L74VYW40q-dMUalC_WmXiZHz6mxgi5c";
const privateKey = "5zL2MPKwAvSQd-_weG0J0UA3bGHmiuJt8J1UgmY4lUA";

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => ({ publicKey }));

  app.post("/push/register", (request, response) => {
    // Linkar a subscription com o usuario logado

    return response.status(201).send();
  });

  app.post("/push/send", async (request, response) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    WebPush.sendNotification(subscription, "Hello do backend");

    return response.status(201).send();
  });
}
