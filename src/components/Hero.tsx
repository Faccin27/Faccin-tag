"use client";

import Image from "next/image";

import {
  FaSpotify,
  FaLinkedin,
  FaWhatsapp,
  FaGithub,
  FaEnvelope,
  FaUserPlus,
  FaCopy,
  FaGlobe,
  FaInstagram,
} from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import Me from "@/assets/me.png";
import { QrCodePix } from "qrcode-pix";

const CodePattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <pattern
      id="pattern-circles"
      x="0"
      y="0"
      width="50"
      height="50"
      patternUnits="userSpaceOnUse"
      patternContentUnits="userSpaceOnUse"
    >
      <circle
        id="pattern-circle"
        cx="10"
        cy="10"
        r="1.6257413380501518"
        fill="#000"
      ></circle>
    </pattern>
    <rect
      id="rect"
      x="0"
      y="0"
      width="100%"
      height="100%"
      fill="url(#pattern-circles)"
    ></rect>
  </svg>
);

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [qrCode, setQrCode] = useState("");
  const [copypasteCode, setCopypasteCode] = useState("");

  const generateQRCode = async () => {
    if (amount <= 0) return;
    try {
      const qrCodePix = QrCodePix({
        version: "01",
        key: "+5549999215720",
        name: "Guilherme Faccin",
        city: "SAO PAULO",
        transactionId: "123456789",
        message: "Pay me :)",
        cep: "89610000",
        value: amount,
      });

      const base64 = await qrCodePix.base64();
      setQrCode(base64);

      const copypaste = qrCodePix.payload();
      setCopypasteCode(copypaste);
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error);
    }
  };

  const copyCopypasteCode = () => {
    if (copypasteCode) {
      navigator.clipboard.writeText(copypasteCode).then(() => {
        alert("Código PIX copiado para a área de transferência!");
      });
    }
  };

  const saveContact = () => {
    const contact = {
      name: "Guilherme Faccin",
      phone: "+5549999215720",
      email: "gfaccin27@gmail.com",
    };
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phone}
EMAIL:${contact.email}
END:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contact.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900"
    >
      <div className="absolute inset-0 z-0">
        <CodePattern />
      </div>

      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient-x"></div>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Guilherme Faccin
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Full-Stack Developer
            </h2>
            <motion.div
              className="lg:hidden mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="relative w-64 h-64 mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-3xl"
                  initial={{ rotate: 6, opacity: 0.5 }}
                  whileHover={{ rotate: 0, opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-600 dark:to-blue-600 rounded-3xl"
                  initial={{ rotate: -6, opacity: 0.5 }}
                  whileHover={{ rotate: 0, opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={Me || "/placeholder.svg"}
                    alt="Guilherme Faccin"
                    width={256}
                    height={256}
                    className="object-cover w-full h-full"
                    priority
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            <div className="flex flex-col space-y-3 mb-8">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <motion.button
                  onClick={() => setIsOpen(true)}
                  className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPix  className="w-6 h-6" />
                  <span className="font-bold">PIX</span>
                </motion.button>

                <motion.button
                  onClick={saveContact}
                  className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUserPlus className="w-6 h-6" />
                  <span className="font-bold">Salvar</span>
                </motion.button>
              </div>
              <a
                href="https://faccindev.pro"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
                rel="noreferrer"
              >
                <FaGlobe className="w-6 h-6" />
                <span className="font-bold">Website</span>
              </a>
              <a
                href="tel:+5549999215720"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <FaWhatsapp className="w-6 h-6" />
                <span className="font-bold">Whatsapp</span>
              </a>
              <a
                href="https://www.instagram.com/gui.faccin/"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
                rel="noreferrer"
              >
                <FaInstagram className="w-6 h-6" />
                <span className="font-bold">Instagram</span>
              </a>
              <a
                href="https://github.com/Faccin27"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
                rel="noreferrer"
              >
                <FaGithub className="w-6 h-6" />
                <span className="font-bold">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/guilherme-faccin"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
                rel="noreferrer"
              >
                <FaLinkedin className="w-6 h-6" />
                <span className="font-bold">LinkedIn</span>
              </a>
              <a
                href="mailto:gfaccin27@gmail.com"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
                rel="noreferrer"
              >
                <FaEnvelope className="w-6 h-6" />
                <span className="font-bold">Email</span>
              </a>

              <a
                href="https://open.spotify.com/user/gfaccin27"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
                rel="noreferrer"
              >
                <FaSpotify className="w-6 h-6" />
                <span className="font-bold">Spotify</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96 mx-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-3xl"
                initial={{ rotate: 6, opacity: 0.5 }}
                whileHover={{ rotate: 0, opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-600 dark:to-blue-600 rounded-3xl"
                initial={{ rotate: -6, opacity: 0.5 }}
                whileHover={{ rotate: 0, opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={Me || "/placeholder.svg"}
                  alt="Guilherme Faccin"
                  width={384}
                  height={384}
                  className="object-cover w-full h-full"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full animate-pulse"></div>
      </motion.div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            className="relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-indigo-950 rounded-2xl p-8 max-w-md w-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-[0_20px_50px_rgba(79,_70,_229,_0.4)] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="absolute inset-0 z-0 opacity-10">
              <CodePattern />
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-center">
                  Pagamento PIX
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-2"></div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) =>
                      setAmount(Number.parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800/80 dark:text-white transition-all duration-200"
                    placeholder="Digite o valor"
                  />
                </div>

                <motion.button
                  onClick={generateQRCode}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={amount <= 0}
                >
                  <span className="font-bold">Gerar QR Code</span>
                </motion.button>
              </div>

              <div className="mt-8 flex justify-center">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fechar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {qrCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            className="relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-indigo-950 rounded-2xl p-8 max-w-md w-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-[0_20px_50px_rgba(79,_70,_229,_0.4)] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="absolute inset-0 z-0 opacity-10">
              <CodePattern />
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-center">
                  QR Code PIX
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-2"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-xl shadow-lg mb-6">
                  <img
                    src={qrCode || "/placeholder.svg"}
                    alt="QR Code PIX"
                    className="w-48 h-48"
                  />
                </div>

                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 px-6 py-3 rounded-xl">
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      <span className="block text-sm font-medium">
                        Valor a pagar:
                      </span>
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        R$ {amount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                  Escaneie o código acima ou use a opção abaixo para copiar o
                  código
                </p>

                <motion.button
                  onClick={copyCopypasteCode}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCopy  className="w-5 h-5" />
                  <span className="font-bold">Copiar código PIX</span>
                </motion.button>
              </div>

              <div className="mt-6 flex justify-center">
                <motion.button
                  onClick={() => {
                    setQrCode("");
                    setIsOpen(false);
                  }}
                  className="px-6 py-2.5 text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fechar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
