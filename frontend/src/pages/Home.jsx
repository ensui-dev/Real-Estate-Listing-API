import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBuilding, FaUsers, FaChartLine, FaShieldAlt, FaStar, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';

const Home = () => {
  const stats = [
    { number: '10K+', label: 'Imóveis', color: 'from-primary-500 to-primary-600' },
    { number: '500+', label: 'Agentes', color: 'from-terracotta-500 to-terracotta-600' },
    { number: '20', label: 'Distritos', color: 'from-golden-500 to-golden-600' },
    { number: '98%', label: 'Satisfação', color: 'from-emerald-500 to-emerald-600' },
  ];

  const features = [
    {
      icon: FaBuilding,
      title: 'Milhares de Imóveis',
      description: 'Acesso a propriedades em todos os 20 distritos de Portugal, das ilhas ao continente.',
      color: 'primary',
    },
    {
      icon: FaUsers,
      title: 'Agentes Certificados',
      description: 'Trabalhe com profissionais verificados e certificados pela AMI.',
      color: 'terracotta',
    },
    {
      icon: FaChartLine,
      title: 'Calculadora IMT',
      description: 'Calcule automaticamente o Imposto Municipal sobre Transmissões Onerosas.',
      color: 'golden',
    },
    {
      icon: FaShieldAlt,
      title: 'Segurança Total',
      description: 'Transações seguras e verificação de todas as propriedades listadas.',
      color: 'emerald',
    },
  ];

  const districts = ['Lisboa', 'Porto', 'Faro', 'Braga', 'Setubal', 'Coimbra'];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
        <div className="absolute inset-0 bg-portuguese-pattern opacity-10" />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-terracotta-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-golden-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
                <FaStar className="text-golden-400 mr-2" />
                #1 Plataforma Imobiliária em Portugal
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Encontre o Seu
                <span className="block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-golden-300 to-terracotta-300">
                    Imóvel Ideal
                  </span>
                </span>
                em Portugal
              </h1>

              <p className="text-xl text-primary-100 mb-10 max-w-xl mx-auto lg:mx-0">
                A plataforma de confiança para compra, venda e arrendamento de imóveis.
                De Lisboa ao Algarve, do Porto aos Açores.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
                <Link
                  to="/properties"
                  className="group inline-flex items-center justify-center bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FaSearch className="mr-2 group-hover:scale-110 transition-transform" />
                  Procurar Imóveis
                  <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Anunciar Imóvel
                </Link>
              </div>

              {/* Quick District Links */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                <span className="text-primary-200 text-sm mr-2 flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> Popular:
                </span>
                {districts.map((district) => (
                  <Link
                    key={district}
                    to={`/properties?district=${district}`}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white/90 text-sm transition-all duration-300 border border-white/10 hover:border-white/30"
                  >
                    {district}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
                    index === 0 ? 'translate-y-8' : index === 3 ? '-translate-y-8' : ''
                  }`}
                >
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mobile Stats */}
      <section className="lg:hidden bg-white py-8 -mt-8 relative z-10 mx-4 rounded-2xl shadow-float">
        <div className="grid grid-cols-2 gap-4 px-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Porque Escolher a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-terracotta-500">
                LusitanEstate
              </span>
              ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos a melhor experiência na procura do seu imóvel em Portugal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`feature-card-icon bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 group-hover:from-${feature.color}-100 group-hover:to-${feature.color}-200`}>
                  <feature.icon className={`text-2xl text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="absolute inset-0 bg-portuguese-pattern opacity-10" />

        {/* Decorative */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-terracotta-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-golden-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto para Encontrar o Seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-golden-300 to-terracotta-300">
              Novo Lar
            </span>
            ?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de portugueses que já encontraram o imóvel dos seus sonhos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Criar Conta Gratuita
              <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/properties"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
            >
              Ver Todos os Imóveis
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <span className="text-sm font-medium">De Confiança por:</span>
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="text-primary-500" />
              <span className="text-gray-600 font-medium">AMI Certificado</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaStar className="text-golden-500" />
              <span className="text-gray-600 font-medium">4.9/5 Avaliação</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUsers className="text-terracotta-500" />
              <span className="text-gray-600 font-medium">+50.000 Utilizadores</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
