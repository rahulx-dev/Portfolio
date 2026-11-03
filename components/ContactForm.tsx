"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams(formData as unknown as Record<string, string>).toString();

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 border border-[#262626] bg-[#141414] text-[#F5F5F5]">
        <p className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
          Message sent. I usually reply within a day.
        </p>
        <p className="font-body text-sm text-[#A3A3A3]">
          Thank you for reaching out. You can also email me directly at{" "}
          <a
            href="mailto:code.rahulx@gmail.com"
            className="text-[#A3E635] hover:underline"
          >
            code.rahulx@gmail.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label htmlFor="contact-name" className="block font-mono-label text-xs text-[#737373] mb-1.5">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="w-full px-4 py-3 bg-[#141414] border border-[#262626] focus:border-[#A3E635] text-white placeholder-[#525252] text-sm focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block font-mono-label text-xs text-[#737373] mb-1.5">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-[#141414] border border-[#262626] focus:border-[#A3E635] text-white placeholder-[#525252] text-sm focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="contact-details" className="block font-mono-label text-xs text-[#737373] mb-1.5">
          Project details
        </label>
        <textarea
          id="contact-details"
          name="details"
          required
          rows={4}
          placeholder="What do you want to build?"
          className="w-full px-4 py-3 bg-[#141414] border border-[#262626] focus:border-[#A3E635] text-white placeholder-[#525252] text-sm focus:outline-none transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="font-body text-xs text-[#D4D4D4] bg-[#141414] p-3 border border-[#262626]">
          Something went wrong. Please email directly at{" "}
          <a href="mailto:code.rahulx@gmail.com" className="text-[#A3E635] underline">
            code.rahulx@gmail.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-[44px] px-8 py-3 bg-[#A3E635] hover:bg-white text-[#0A0A0A] font-mono-label text-xs font-bold tracking-wider rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
