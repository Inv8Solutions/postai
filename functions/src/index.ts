import { onRequest } from "firebase-functions/v2/https";

export const healthcheck = onRequest((req, res) => {
  res.status(200).json({ status: "ok", timestamp: Date.now() });
});
