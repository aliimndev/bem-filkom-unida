import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";
// FIXED: Import icons dari lucide-react (asumsi sudah install)
import { MapPin, Mail, Phone, Clock } from "lucide-react";

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section className={cn("py-16 md:py-24", className)}>{children}</section>
  );
}

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("Please fill in name, email, and message.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);
      setStatus(null);
      const resp = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!resp.ok) {
        const errorMsg =
          resp.status >= 500
            ? "Server error. Please try again later."
            : "Failed to send. Please check your input.";
        throw new Error(errorMsg);
      }
      form.reset();
      setStatus("Your message has been sent. Thank you!");
    } catch (err) {
      setStatus(
        err instanceof Error
          ? err.message
          : "Failed to send. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const getStatusClass = (message: string) => {
    if (message.includes("Failed") || message.includes("Please"))
      return "text-destructive";
    return "text-green-600";
  };

  return (
    <div>
      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute -top-32 left-1/2 size-[550px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.25),transparent_60%)] blur-3xl" />
        </div>
        <div className="container text-center max-w-3xl">
          <Reveal y={10}>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60 backdrop-blur">
              <span className="size-2 rounded-full bg-primary" /> Contact BEM
              FILKOM
            </div>
          </Reveal>
          <Reveal y={18} delay={100}>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Let's Connect
            </h1>
          </Reveal>
          <Reveal y={18} delay={160}>
            <p className="mt-4 text-muted-foreground">
            Punya pertanyaan, ide, atau masukan? Silahkan hubungi kami. Terima kasih.&#128588;
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="container grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan Disini</CardTitle>
              <CardDescription>
              Isi formulir dan kami akan menghubungi anda kembali
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    className="min-h-[140px]"
                    required
                  />
                </div>
                {status && (
                  <p
                    className={`text-sm ${getStatusClass(status)}`}
                    aria-live="polite"
                  >
                    {status}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-primary-foreground"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
                <CardDescription>
                Hubungi kami melalui kontak berikut.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {/* */}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>
                    Fakultas Ilmu Komputer, Universitas Djuanda, Bogor
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span> bem.filkom@unida.ac.id</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span> +62 882‑9199‑1658 (Hilmi)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Mon–Fri, 09:00–17:00 WIB</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lokasi</CardTitle>
                <CardDescription>
                  Temui Kami di Universitas Djuanda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.9382309549555!2d106.84977649999999!3d-6.654578499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c95387c8d3eb%3A0x941f12ea770a2c9e!2sDjuanda%20University!5e0!3m2!1sen!2sid!4v1759589847287!5m2!1sen!2sid"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
