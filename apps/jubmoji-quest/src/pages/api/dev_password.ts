import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { password } = req.body;

    if (password !== process.env.DEV_CONSOLE_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "Success" });
  }
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
