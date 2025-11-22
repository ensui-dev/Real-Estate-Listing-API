import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaChartLine,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a RealEstate PT
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              A plataforma de referência para o mercado imobiliário português,
              conectando compradores, vendedores e profissionais do setor.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                A Nossa Missão
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Simplificar e modernizar o processo de compra, venda e arrendamento de imóveis em Portugal.
                Acreditamos que encontrar a casa perfeita deve ser uma experiência transparente,
                eficiente e acessível a todos.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Desenvolvemos uma plataforma que une tecnologia de ponta com um profundo conhecimento
                do mercado imobiliário português, oferecendo ferramentas que capacitam tanto
                particulares como profissionais do setor.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-primary-600">
                  <FaCheckCircle className="mr-2" />
                  <span>Transparência</span>
                </div>
                <div className="flex items-center text-primary-600">
                  <FaCheckCircle className="mr-2" />
                  <span>Inovação</span>
                </div>
                <div className="flex items-center text-primary-600">
                  <FaCheckCircle className="mr-2" />
                  <span>Confiança</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
                  <div className="text-gray-600">Imóveis Listados</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                  <div className="text-gray-600">Agentes Ativos</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
                  <div className="text-gray-600">Utilizadores</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-primary-600 mb-2">18</div>
                  <div className="text-gray-600">Distritos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Os Nossos Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Princípios que guiam cada decisão e interação na nossa plataforma.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Segurança e Privacidade</h3>
              <p className="text-gray-600">
                Protegemos os seus dados com os mais elevados padrões de segurança,
                em total conformidade com o RGPD e a legislação portuguesa.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHandshake className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Integridade</h3>
              <p className="text-gray-600">
                Verificamos todos os anúncios e promovemos práticas éticas,
                garantindo uma experiência justa para todos os utilizadores.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaChartLine className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Inovação Contínua</h3>
              <p className="text-gray-600">
                Investimos constantemente em novas funcionalidades e tecnologias
                para melhorar a experiência dos nossos utilizadores.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O Que Oferecemos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Soluções completas para todas as necessidades do mercado imobiliário.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <FaHome className="text-primary-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Para Compradores</h3>
              <p className="text-gray-600 text-sm mb-4">
                Pesquise milhares de imóveis com filtros avançados. Guarde favoritos,
                receba alertas e contacte diretamente os anunciantes.
              </p>
              <Link to="/properties" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                Ver Imóveis <FaArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <FaUsers className="text-primary-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Para Vendedores</h3>
              <p className="text-gray-600 text-sm mb-4">
                Publique anúncios com fotografias ilimitadas, descrições detalhadas
                e alcance milhares de potenciais compradores.
              </p>
              <Link to="/register?role=seller" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                Começar a Vender <FaArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <FaHandshake className="text-primary-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Para Agentes</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ferramentas profissionais para gestão de carteira, CRM integrado
                e visibilidade aumentada para os seus anúncios.
              </p>
              <Link to="/register?role=agent" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                Registar como Agente <FaArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <FaMapMarkerAlt className="text-primary-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Para Agências</h3>
              <p className="text-gray-600 text-sm mb-4">
                Soluções empresariais com gestão de equipas, relatórios analíticos
                e integrações personalizadas.
              </p>
              <Link to="/contact" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                Contactar-nos <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cobertura Nacional
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Presentes em todos os 18 distritos de Portugal continental e regiões autónomas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              'Lisboa', 'Porto', 'Faro', 'Setúbal', 'Braga', 'Coimbra',
              'Aveiro', 'Leiria', 'Santarém', 'Viseu', 'Viana do Castelo', 'Vila Real',
              'Évora', 'Beja', 'Portalegre', 'Castelo Branco', 'Guarda', 'Bragança'
            ].map((district) => (
              <div key={district} className="bg-gray-50 rounded-lg p-3 text-center hover:bg-primary-50 transition-colors">
                <span className="text-gray-700 font-medium">{district}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Incluindo as Regiões Autónomas da <strong>Madeira</strong> e dos <strong>Açores</strong>
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de utilizadores que já encontraram o seu imóvel ideal através da nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/properties"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Explorar Imóveis
            </Link>
            <Link
              to="/register"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-900 transition-colors border border-primary-500 inline-flex items-center justify-center"
            >
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">
            Tem alguma questão ou sugestão?
          </p>
          <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
            Entre em contacto connosco <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
