import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBuilding, FaUsers, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encontre o Seu Imóvel Ideal em Portugal
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              A plataforma profissional para compra, venda e arrendamento de imóveis
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/properties" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2">
                  <FaSearch />
                  <span>Procurar Imóveis</span>
                </div>
              </Link>
              <Link to="/register" className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors">
                Anunciar Imóvel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Por que Escolher-nos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 p-4 rounded-full">
                  <FaBuilding className="text-4xl text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Milhares de Imóveis</h3>
              <p className="text-gray-600">
                Acesso a propriedades em todos os distritos de Portugal
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 p-4 rounded-full">
                  <FaUsers className="text-4xl text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Agentes Verificados</h3>
              <p className="text-gray-600">
                Trabalhe com profissionais certificados pela AMI
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 p-4 rounded-full">
                  <FaChartLine className="text-4xl text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calculadora IMT</h3>
              <p className="text-gray-600">
                Calcule automaticamente o imposto de transmissão
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Junte-se a milhares de utilizadores satisfeitos
          </p>
          <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Criar Conta Gratuita
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
