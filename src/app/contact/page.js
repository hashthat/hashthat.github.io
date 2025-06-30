"use client";
/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import cosmic from "../../../public/background/CosmicJellyfish.png";
import Navigation from "../components/navigation";

export default function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("FAILED...", error.text);
        }
      );

    e.target.reset(); // Clear the form
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Image
        src={cosmic}
        alt="Cosmic background"
        sizes="100vw"
        priority
        fill
        className="-z-50 w-full object-cover object-center opacity-65"
      />

      <Navigation />

      <div className="w-full max-w-2xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Let's Get in Touch!
          </h1>
          <p className="text-gray-300 mb-6 text-center">
            I'd love to hear from you! Whether you have a question, want to collaborate, or just want to say hi, feel free to drop me a message using the form below.
          </p>

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="I look forward to hearing from you!"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      <footer className="w-full p-4 text-center text-white">
        <p className="text-sm">
          © {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
