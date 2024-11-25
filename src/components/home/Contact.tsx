import emailjs from "@emailjs/browser";
import Section from "components/layout/Section";
import React, { useRef, useState } from "react";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  const successMessage =
    "Message sent successfully! Thanks for reaching out - I'll get back to you soon.";
  const failureMessage =
    "Failed to send message. Please try again later or email me directly at steven.ott.tech@gmail.com";

  // Handle form contact form submission using EmailJS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      try {
        const response = await emailjs.sendForm(
          "service_v1yo3gf",
          "template_hsfs5gb",
          form.current,
          { publicKey: "AD4BzZqxk8IwQGgoJ" }
        );
        if (response.status === 200) {
          setStatus(successMessage);
          form.current.reset();
        } else {
          setStatus(failureMessage);
        }
      } catch (error) {
        console.error("Error:", error);
        setStatus(failureMessage);
      }
    }
  };

  const fieldClassName =
    "bg-zinc-900 p-3 border border-zinc-700 placeholder-gray-400/30";

  return (
    <Section id="contact" title="Contact Me" className="bg-zinc-900/30">
      <form ref={form} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="from_name"
                required
                className={fieldClassName}
                placeholder="Marcus Arelius"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="reply_to"
                required
                className={fieldClassName}
                placeholder="marelius@gmail.com"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className={fieldClassName}
              placeholder="I have a question"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              className={fieldClassName + " min-h-32"}
              placeholder="Hi Steven, I have a question about your work..."
            />
          </div>
          <button className="bg-cyan-900 w-20 px-6 py-2" type="submit">
            Send
          </button>
          {status && <p>{status}</p>}
        </div>
      </form>
    </Section>
  );
};

export default Contact;
