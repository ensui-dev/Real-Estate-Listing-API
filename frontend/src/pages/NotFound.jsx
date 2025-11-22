import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col justify-center items-center px-4 pt-28 relative overflow-hidden">
      {/* Portuguese pattern background */}
      <div className="absolute inset-0 bg-portuguese-pattern opacity-5"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-terracotta-200 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-primary-300 rounded-full opacity-15 animate-float"></div>

      <div className="text-center relative z-10">
        {/* Floating map marker icon */}
        <div className="mb-6 flex justify-center">
          <div className="animate-float">
            <FaMapMarkerAlt className="text-6xl text-terracotta-400 drop-shadow-lg" />
          </div>
        </div>

        {/* Large gradient 404 text */}
        <h1 className="text-[10rem] md:text-[12rem] font-bold leading-none bg-gradient-to-r from-primary-600 to-terracotta-500 bg-clip-text text-transparent drop-shadow-sm">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4 mb-3">
          Página Não Encontrada
        </h2>

        <p className="text-gray-600 mb-4 max-w-md mx-auto">
          A página que procura não existe ou foi movida.
        </p>

        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
          Parece que se perdeu no caminho. Não se preocupe, vamos ajudá-lo a encontrar o seu lar!
        </p>

        <Link
          to="/"
          className="btn-primary inline-flex items-center space-x-2 group"
        >
          <FaHome className="transition-transform group-hover:scale-110" />
          <span>Voltar ao Início</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
