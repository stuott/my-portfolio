import { Button } from "@components/common";
import Section from "@components/layout/Section";
import emailjs from "@emailjs/browser";
import {
  faEnvelope,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
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

  return (
    <Section id="contact" title="Contact Me" className="xl:pl-0 xl:pr-16">
      <div className="flex gap-4">
        <FontAwesomeIcon icon={faPhone} size="xl" />
        <p>(920) 286-1509</p>
      </div>
      <div className="flex gap-4">
        <FontAwesomeIcon icon={faEnvelope} size="xl" />
        <p>steven.ott.tech@gmail.com</p>
      </div>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-10 items-center">
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
            <ContactField
              label="Your Name"
              type="text"
              id="name"
              name="from_name"
              placeholder="Marcus Arelius"
            />
            <ContactField
              label="Your Email"
              type="email"
              id="email"
              name="reply_to"
              placeholder="marelius@gmail.com"
            />
          </div>
          <ContactField
            label="Subject"
            type="text"
            id="subject"
            name="subject"
            placeholder="I have a question"
          />
          <ContactField
            label="Message"
            id="message"
            name="message"
            placeholder="Hi Steven, I have a question about your work..."
            expandable
          />
          <Button
            type="submit"
            className="w-20"
            bg="cyan-900"
            hoverBg="cyan-800"
            icon={faPaperPlane}
            flipped
          >
            send
          </Button>
          {status && <p>{status}</p>}
        </div>
      </form>
    </Section>
  );
};

interface ContactFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  type?: string;
  expandable?: boolean;
}

const ContactField = ({
  label,
  id,
  type,
  name,
  placeholder,
  expandable,
}: ContactFieldProps) => {
  const fieldClassName = classNames(
    "bg-zinc-900 p-3 border border-zinc-700 placeholder-gray-400/30",
    "hover:bg-zinc-800 focus:bg-zinc-800",
    { "min-h-32": expandable }
  );

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id}>{label}</label>
      {expandable ? (
        <textarea
          id={id}
          name={name}
          className={fieldClassName}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          className={fieldClassName}
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
};

export default Contact;
