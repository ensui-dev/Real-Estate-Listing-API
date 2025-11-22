import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaStar, FaRocket, FaBuilding, FaArrowRight, FaChevronDown } from 'react-icons/fa';

const Pricing = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      name: 'Básico',
      subtitle: 'Para particulares',
      price: 'Grátis',
      period: '',
      description: 'Ideal para quem quer vender ou arrendar um imóvel ocasionalmente.',
      features: [
        { text: 'Até 2 anúncios ativos', included: true },
        { text: '5 fotografias por anúncio', included: true },
        { text: 'Listagem básica', included: true },
        { text: 'Contacto direto com interessados', included: true },
        { text: 'Suporte por email', included: true },
        { text: 'Destaque na pesquisa', included: false },
        { text: 'Estatísticas avançadas', included: false },
        { text: 'Selo de verificação', included: false },
      ],
      cta: 'Começar Grátis',
      ctaLink: '/register?role=seller',
      popular: false,
      icon: FaStar,
    },
    {
      name: 'Profissional',
      subtitle: 'Para agentes imobiliários',
      price: '29',
      period: '/mês',
      description: 'Ferramentas profissionais para agentes licenciados AMI.',
      features: [
        { text: 'Anúncios ilimitados', included: true },
        { text: '20 fotografias por anúncio', included: true },
        { text: 'Listagem prioritária', included: true },
        { text: 'Perfil de agente verificado', included: true },
        { text: 'Estatísticas detalhadas', included: true },
        { text: 'Destaque na pesquisa', included: true },
        { text: 'Suporte prioritário', included: true },
        { text: 'CRM básico integrado', included: true },
      ],
      cta: 'Começar Teste Grátis',
      ctaLink: '/register?role=agent',
      popular: true,
      icon: FaRocket,
    },
    {
      name: 'Empresarial',
      subtitle: 'Para agências',
      price: 'Personalizado',
      period: '',
      description: 'Soluções completas para agências e promotoras imobiliárias.',
      features: [
        { text: 'Tudo do plano Profissional', included: true },
        { text: 'Gestão de equipas', included: true },
        { text: 'Marca personalizada', included: true },
        { text: 'API de integração', included: true },
        { text: 'Relatórios avançados', included: true },
        { text: 'Account manager dedicado', included: true },
        { text: 'Formação da equipa', included: true },
        { text: 'SLA garantido', included: true },
      ],
      cta: 'Contactar Vendas',
      ctaLink: '/contact',
      popular: false,
      icon: FaBuilding,
    },
  ];

  const faqs = [
    {
      question: 'Posso experimentar antes de pagar?',
      answer: 'Sim! O plano Profissional inclui um período de teste gratuito de 14 dias, sem necessidade de cartão de crédito.'
    },
    {
      question: 'Posso mudar de plano a qualquer momento?',
      answer: 'Absolutamente. Pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações são aplicadas no próximo ciclo de faturação.'
    },
    {
      question: 'Quais são os métodos de pagamento aceites?',
      answer: 'Aceitamos cartões de crédito/débito (Visa, Mastercard), MB Way, transferência bancária e débito direto SEPA.'
    },
    {
      question: 'Existe compromisso de permanência?',
      answer: 'Não. Todos os nossos planos são mensais e pode cancelar a qualquer momento sem penalizações.'
    },
    {
      question: 'Os preços incluem IVA?',
      answer: 'Os preços apresentados não incluem IVA. Para clientes empresariais em Portugal, será acrescido IVA à taxa legal em vigor (23%).'
    },
    {
      question: 'Preciso de licença AMI para o plano Profissional?',
      answer: 'Sim, o plano Profissional é destinado a agentes imobiliários licenciados. Verificamos o número de licença AMI durante o registo.'
    },
  ];

  return (
    <div className="min-h-screen bg-sand-50 pt-28">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 overflow-hidden">
        {/* Portuguese Pattern Overlay */}
        <div className="absolute inset-0 bg-portuguese-pattern opacity-10"></div>

        {/* Decorative Blur Circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-terracotta-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-golden-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Planos e Preços
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Escolha o plano ideal para as suas necessidades.
            Sem surpresas, sem custos ocultos.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-20 relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-terracotta-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Planos Para Cada Necessidade
            </h2>
            <p className="section-subtitle">
              Desde particulares a grandes agências, temos a solução certa para si
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? 'ring-2 ring-terracotta-500 md:scale-105 relative z-10'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white text-center py-2 text-sm font-semibold">
                    Mais Popular
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                    </div>
                    <div className={`p-3 rounded-xl shadow-lg ${
                      plan.popular
                        ? 'bg-gradient-to-br from-terracotta-500 to-terracotta-600 shadow-terracotta-500/20'
                        : 'bg-gradient-to-br from-primary-500 to-primary-600 shadow-primary-500/20'
                    }`}>
                      <plan.icon className="text-white text-xl" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-terracotta-600' : 'text-gray-900'}`}>
                      {plan.price === 'Grátis' || plan.price === 'Personalizado'
                        ? plan.price
                        : `€${plan.price}`}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500">{plan.period}</span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <div className={`p-1 rounded-full mr-3 flex-shrink-0 ${
                            plan.popular ? 'bg-terracotta-100' : 'bg-green-100'
                          }`}>
                            <FaCheck className={`text-xs ${
                              plan.popular ? 'text-terracotta-600' : 'text-green-600'
                            }`} />
                          </div>
                        ) : (
                          <div className="p-1 rounded-full mr-3 flex-shrink-0 bg-gray-100">
                            <FaTimes className="text-xs text-gray-400" />
                          </div>
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.ctaLink}
                    className={`block w-full text-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white hover:from-terracotta-600 hover:to-terracotta-700 shadow-lg shadow-terracotta-500/25 hover:shadow-xl hover:shadow-terracotta-500/30'
                        : 'btn-secondary hover:bg-primary-50'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Comparação Detalhada
            </h2>
            <p className="section-subtitle">
              Veja em detalhe o que cada plano oferece
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-primary-600 to-primary-700">
                  <th className="py-5 px-6 text-left text-white font-medium">Funcionalidade</th>
                  <th className="py-5 px-6 text-center text-white font-semibold">Básico</th>
                  <th className="py-5 px-6 text-center font-semibold bg-terracotta-500 text-white">Profissional</th>
                  <th className="py-5 px-6 text-center text-white font-semibold">Empresarial</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Número de anúncios', basic: '2', pro: 'Ilimitado', enterprise: 'Ilimitado' },
                  { feature: 'Fotografias por anúncio', basic: '5', pro: '20', enterprise: 'Ilimitado' },
                  { feature: 'Vídeos', basic: '-', pro: '1 por anúncio', enterprise: 'Ilimitado' },
                  { feature: 'Visitas virtuais 360', basic: '-', pro: 'Sim', enterprise: 'Sim' },
                  { feature: 'Destaque na pesquisa', basic: '-', pro: 'Sim', enterprise: 'Premium' },
                  { feature: 'Estatísticas', basic: 'Básicas', pro: 'Detalhadas', enterprise: 'Avançadas + API' },
                  { feature: 'Selo de verificação', basic: '-', pro: 'Agente AMI', enterprise: 'Agência' },
                  { feature: 'Suporte', basic: 'Email', pro: 'Prioritário', enterprise: 'Dedicado 24/7' },
                  { feature: 'CRM integrado', basic: '-', pro: 'Básico', enterprise: 'Completo' },
                  { feature: 'Gestão de equipa', basic: '-', pro: '-', enterprise: 'Sim' },
                  { feature: 'API de integração', basic: '-', pro: '-', enterprise: 'Sim' },
                  { feature: 'White-label', basic: '-', pro: '-', enterprise: 'Sim' },
                ].map((row, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-sand-50/50' : 'bg-white'} hover:bg-primary-50/50 transition-colors`}>
                    <td className="py-4 px-6 text-gray-700 font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {row.basic === '-' ? <FaTimes className="text-gray-300 mx-auto" /> : row.basic}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-900 bg-terracotta-50/50">
                      {row.pro === '-' ? <FaTimes className="text-gray-300 mx-auto" /> :
                       row.pro === 'Sim' ? <FaCheck className="text-terracotta-500 mx-auto" /> : row.pro}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {row.enterprise === '-' ? <FaTimes className="text-gray-300 mx-auto" /> :
                       row.enterprise === 'Sim' ? <FaCheck className="text-green-500 mx-auto" /> : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Perguntas Frequentes
            </h2>
            <p className="section-subtitle">
              Tem dúvidas? Encontre as respostas abaixo
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-sand-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <FaChevronDown
                    className={`text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-20 overflow-hidden">
        {/* Portuguese Pattern Overlay */}
        <div className="absolute inset-0 bg-portuguese-pattern opacity-10"></div>

        {/* Decorative Blur Circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-terracotta-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-golden-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            A nossa equipa está disponível para ajudar a encontrar a melhor solução para si.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-sand-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
            >
              Falar com a Equipa
            </Link>
            <Link
              to="/register"
              className="bg-terracotta-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-terracotta-600 transition-all duration-300 shadow-lg shadow-terracotta-500/25 hover:shadow-xl inline-flex items-center justify-center"
            >
              Comecar Agora <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              'Pagamento Seguro',
              'Cancelamento Fácil',
              'Sem Compromisso',
              'Suporte em Português'
            ].map((badge, index) => (
              <div key={index} className="flex items-center bg-sand-50 px-4 py-2 rounded-full">
                <div className="bg-green-100 p-1 rounded-full mr-2">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-gray-700 font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
