import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaStar, FaRocket, FaBuilding, FaArrowRight } from 'react-icons/fa';

const Pricing = () => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Planos e Preços
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Escolha o plano ideal para as suas necessidades.
            Sem surpresas, sem custos ocultos.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary-500 text-white text-center py-2 text-sm font-semibold">
                    Mais Popular
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                    </div>
                    <div className="bg-primary-100 p-3 rounded-full">
                      <plan.icon className="text-primary-600 text-xl" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
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
                          <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        ) : (
                          <FaTimes className="text-gray-300 mt-1 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.ctaLink}
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comparação Detalhada
            </h2>
            <p className="text-lg text-gray-600">
              Veja em detalhe o que cada plano oferece.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-gray-600 font-medium">Funcionalidade</th>
                  <th className="py-4 px-6 text-center text-gray-900 font-semibold">Básico</th>
                  <th className="py-4 px-6 text-center text-primary-600 font-semibold bg-primary-50">Profissional</th>
                  <th className="py-4 px-6 text-center text-gray-900 font-semibold">Empresarial</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Número de anúncios', basic: '2', pro: 'Ilimitado', enterprise: 'Ilimitado' },
                  { feature: 'Fotografias por anúncio', basic: '5', pro: '20', enterprise: 'Ilimitado' },
                  { feature: 'Vídeos', basic: '-', pro: '1 por anúncio', enterprise: 'Ilimitado' },
                  { feature: 'Visitas virtuais 360°', basic: '-', pro: 'Sim', enterprise: 'Sim' },
                  { feature: 'Destaque na pesquisa', basic: '-', pro: 'Sim', enterprise: 'Premium' },
                  { feature: 'Estatísticas', basic: 'Básicas', pro: 'Detalhadas', enterprise: 'Avançadas + API' },
                  { feature: 'Selo de verificação', basic: '-', pro: 'Agente AMI', enterprise: 'Agência' },
                  { feature: 'Suporte', basic: 'Email', pro: 'Prioritário', enterprise: 'Dedicado 24/7' },
                  { feature: 'CRM integrado', basic: '-', pro: 'Básico', enterprise: 'Completo' },
                  { feature: 'Gestão de equipa', basic: '-', pro: '-', enterprise: 'Sim' },
                  { feature: 'API de integração', basic: '-', pro: '-', enterprise: 'Sim' },
                  { feature: 'White-label', basic: '-', pro: '-', enterprise: 'Sim' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-700">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {row.basic === '-' ? <FaTimes className="text-gray-300 mx-auto" /> : row.basic}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-900 bg-primary-50">
                      {row.pro === '-' ? <FaTimes className="text-gray-300 mx-auto" /> :
                       row.pro === 'Sim' ? <FaCheck className="text-green-500 mx-auto" /> : row.pro}
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
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Tem dúvidas? Encontre as respostas abaixo.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            A nossa equipa está disponível para ajudar a encontrar a melhor solução para si.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Falar com a Equipa
            </Link>
            <Link
              to="/register"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-900 transition-colors border border-primary-500 inline-flex items-center justify-center"
            >
              Começar Agora <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span>Cancelamento Fácil</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span>Sem Compromisso</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span>Suporte em Português</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
