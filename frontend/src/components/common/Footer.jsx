import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaHome } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaHome className="text-primary-500 text-2xl" />
              <span className="font-bold text-xl text-white">LusitanEstate</span>
            </div>
            <p className="text-sm text-gray-400">
              Plataforma profissional de imóveis para o mercado português.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/properties" className="hover:text-primary-500 transition-colors">
                  Imóveis
                </Link>
              </li>
              <li>
                <Link to="/agencies" className="hover:text-primary-500 transition-colors">
                  Agências
                </Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-primary-500 transition-colors">
                  Agentes
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-500 transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="text-white font-semibold mb-4">Para Profissionais</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register?role=agent" className="hover:text-primary-500 transition-colors">
                  Tornar-me Agente
                </Link>
              </li>
              <li>
                <Link to="/register?role=seller" className="hover:text-primary-500 transition-colors">
                  Anunciar Imóvel
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary-500 transition-colors">
                  Planos e Preços
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="hover:text-primary-500 transition-colors">
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary-500 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-primary-500 transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-500 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} LusitanEstate. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
