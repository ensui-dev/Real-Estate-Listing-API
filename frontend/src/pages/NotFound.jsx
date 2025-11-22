import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4 mb-2">
          Página Não Encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          A página que procura não existe ou foi movida.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center space-x-2">
          <FaHome />
          <span>Voltar ao Início</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
