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
  FaArrowRight,
  FaStar
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-sand-50 pt-28">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-portuguese-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-golden-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Sobre a <span className="text-golden-400">Lusitan</span>Estate
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              A plataforma de referência para o mercado imobiliário português,
              conectando compradores, vendedores e profissionais do setor.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-6">
                Simplificar a jornada para encontrar a sua{' '}
                <span className="gradient-text">casa de sonho</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Simplificar e modernizar o processo de compra, venda e arrendamento de imóveis em Portugal.
                Acreditamos que encontrar a casa perfeita deve ser uma experiência transparente,
                eficiente e acessível a todos.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Desenvolvemos uma plataforma que une tecnologia de ponta com um profundo conhecimento
                do mercado imobiliário português, oferecendo ferramentas que capacitam tanto
                particulares como profissionais do setor.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Transparência', 'Inovação', 'Confiança'].map((value) => (
                  <div key={value} className="flex items-center bg-primary-50 px-4 py-2 rounded-xl">
                    <FaCheckCircle className="text-primary-600 mr-2" />
                    <span className="font-medium text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-gradient-to-br from-white to-primary-50/50 p-8">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: '10K+', label: 'Imóveis Listados', color: 'primary' },
                  { value: '500+', label: 'Agentes Ativos', color: 'terracotta' },
                  { value: '50K+', label: 'Utilizadores', color: 'golden' },
                  { value: '18', label: 'Distritos', color: 'primary' },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className={`text-4xl font-bold font-display mb-2 ${
                      stat.color === 'terracotta' ? 'text-terracotta-600' :
                      stat.color === 'golden' ? 'text-golden-600' : 'text-primary-600'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              Princípios que nos guiam
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Princípios que guiam cada decisão e interação na nossa plataforma.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaShieldAlt,
                title: 'Segurança e Privacidade',
                description: 'Protegemos os seus dados com os mais elevados padrões de segurança, em total conformidade com o RGPD e a legislação portuguesa.',
                gradient: 'from-primary-500 to-primary-600'
              },
              {
                icon: FaHandshake,
                title: 'Integridade',
                description: 'Verificamos todos os anúncios e promovemos práticas éticas, garantindo uma experiência justa para todos os utilizadores.',
                gradient: 'from-terracotta-500 to-terracotta-600'
              },
              {
                icon: FaChartLine,
                title: 'Inovação Contínua',
                description: 'Investimos constantemente em novas funcionalidades e tecnologias para melhorar a experiência dos nossos utilizadores.',
                gradient: 'from-golden-500 to-golden-600'
              }
            ].map((value, index) => (
              <div key={index} className="group feature-card">
                <div className={`feature-card-icon bg-gradient-to-br ${value.gradient}`}>
                  <value.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold font-display text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              O Que Oferecemos
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Soluções completas para todas as necessidades do mercado imobiliário.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaHome,
                title: 'Para Compradores',
                description: 'Pesquise milhares de imóveis com filtros avançados. Guarde favoritos, receba alertas e contacte diretamente os anunciantes.',
                link: '/properties',
                linkText: 'Ver Imóveis'
              },
              {
                icon: FaUsers,
                title: 'Para Vendedores',
                description: 'Publique anúncios com fotografias ilimitadas, descrições detalhadas e alcance milhares de potenciais compradores.',
                link: '/register?role=seller',
                linkText: 'Começar a Vender'
              },
              {
                icon: FaHandshake,
                title: 'Para Agentes',
                description: 'Ferramentas profissionais para gestão de carteira, CRM integrado e visibilidade aumentada para os seus anúncios.',
                link: '/register?role=agent',
                linkText: 'Registar como Agente'
              },
              {
                icon: FaMapMarkerAlt,
                title: 'Para Agências',
                description: 'Soluções empresariais com gestão de equipas, relatórios analíticos e integrações personalizadas.',
                link: '/contact',
                linkText: 'Contactar-nos'
              }
            ].map((service, index) => (
              <div key={index} className="card hover:border-primary-200 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-primary-600 text-xl" />
                </div>
                <h3 className="text-lg font-bold font-display text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                <Link
                  to={service.link}
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform duration-300"
                >
                  {service.linkText} <FaArrowRight className="ml-2 text-xs" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Cobertura Nacional
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Presentes em todos os 18 distritos de Portugal continental e regiões autónomas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              'Lisboa', 'Porto', 'Faro', 'Setúbal', 'Braga', 'Coimbra',
              'Aveiro', 'Leiria', 'Santarém', 'Viseu', 'Viana do Castelo', 'Vila Real',
              'Évora', 'Beja', 'Portalegre', 'Castelo Branco', 'Guarda', 'Bragança'
            ].map((district) => (
              <div
                key={district}
                className="bg-sand-100 hover:bg-primary-50 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-md cursor-pointer group"
              >
                <FaMapMarkerAlt className="text-primary-400 group-hover:text-primary-600 mx-auto mb-2 transition-colors" />
                <span className="text-gray-700 font-medium text-sm">{district}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Incluindo as Regiões Autónomas da <span className="font-semibold text-primary-600">Madeira</span> e dos <span className="font-semibold text-primary-600">Açores</span>
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
        <div className="absolute inset-0 bg-portuguese-pattern opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaStar className="text-golden-400" />
            <span className="text-white/90 text-sm">Junte-se a milhares de utilizadores satisfeitos</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de utilizadores que já encontraram o seu imóvel ideal através da nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/properties" className="btn-secondary bg-white">
              Explorar Imóveis
            </Link>
            <Link to="/register" className="btn-primary bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700">
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-12 bg-sand-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">
            Tem alguma questão ou sugestão?
          </p>
          <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center group">
            Entre em contacto connosco
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
