import Header from "./Header";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen text-gray-800">
        {children}
        <section className="bg-indigo-700 py-16 px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Contato</h2>
          <p className="text-indigo-100 mb-8">
            Entre em contato comigo pelas redes abaixo:
          </p>
          <div className="flex justify-center gap-6 text-3xl">
            <a
              href="https://github.com/igrrsantos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-300 transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/igrrsantos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-300 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:igrrsantos@gmail.com"
              className="text-white hover:text-indigo-300 transition"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
