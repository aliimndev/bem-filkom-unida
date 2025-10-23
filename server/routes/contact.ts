import { Router } from "express";
import { ContactCreateResponse, ContactListResponse, ContactMessage, ContactMessageInput } from "@shared/api";
import { sendContactEmail } from "../lib/email";
import { logContactMessage } from "../lib/email-logger";

export const contactRouter = Router();

const messages: ContactMessage[] = [];

contactRouter.get("/", (_req, res) => {
  const response: ContactListResponse = { ok: true, messages };
  res.status(200).json(response);
});

contactRouter.post("/", async (req, res) => {
  const body: ContactMessageInput = req.body ?? {};
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  const item: ContactMessage = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };
  messages.unshift(item);

  // Kirim email ke bem.filkom@unida.ac.id dengan logging sebagai backup
  try {
    // Coba kirim email dulu
    await sendContactEmail({ name, email, subject, message });
    console.log('✅ Email berhasil dikirim ke bem.filkom@unida.ac.id');
  } catch (emailError) {
    console.log('❌ Email gagal, menggunakan logging sebagai backup...');
    // Backup: Log pesan ke file dan console
    await logContactMessage({ name, email, subject, message });
  }

  const response: ContactCreateResponse = { ok: true, message: item };
  res.status(201).json(response);
});
