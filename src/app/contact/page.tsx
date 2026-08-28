import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Have something to build, or just want to say hi? Send a message
        below.
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
