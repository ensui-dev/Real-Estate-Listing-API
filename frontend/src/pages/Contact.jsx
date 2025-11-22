import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaQuestionCircle,
  FaBuilding,
  FaUserTie,
  FaHome,
  FaChevronDown
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: 'general',
      message: ''
    });
    setIsSubmitting(false);
  };

  const categories = [
    { value: 'general', label: 'Questão Geral' },
    { value: 'support', label: 'Suporte Técnico' },
    { value: 'sales', label: 'Vendas e Planos' },
    { value: 'partnership', label: 'Parcerias' },
    { value: 'press', label: 'Imprensa' },
    { value: 'privacy', label: 'Privacidade e Dados' },
    { value: 'complaint', label: 'Reclamação' },
  ];

  const quickLinks = [
    {
      icon: FaQuestionCircle,
      title: 'Perguntas Frequentes',
      description: 'Encontre respostas para as questões mais comuns.',
      link: '/pricing#faq',
      linkText: 'Ver FAQs'
    },
    {
      icon: FaBuilding,
      title: 'Para Agências',
      description: 'Soluções empresariais personalizadas.',
      link: '/pricing',
      linkText: 'Ver Planos'
    },
    {
      icon: FaUserTie,
      title: 'Tornar-me Agente',
      description: 'Registe-se como profissional imobiliário.',
      link: '/register?role=agent',
      linkText: 'Registar'
    },
    {
      icon: FaHome,
      title: 'Anunciar Imóvel',
      description: 'Publique o seu imóvel na nossa plataforma.',
      link: '/register?role=seller',
      linkText: 'Começar'
    },
  ];

  const faqs = [
    {
      question: 'Qual é o tempo médio de resposta?',
      answer: 'Respondemos a todas as mensagens num prazo máximo de 48 horas úteis. Para questões urgentes, recomendamos o contacto telefónico.'
    },
    {
      question: 'Como posso contactar o suporte técnico?',
      answer: 'Pode contactar o suporte técnico através deste formulário selecionando a categoria "Suporte Técnico", ou enviando email diretamente para suporte@realestate-pt.com.'
    },
    {
      question: 'Onde posso encontrar informações sobre preços?',
      answer: 'Visite a nossa página de Preços para ver todos os planos disponíveis e suas funcionalidades. Para planos empresariais personalizados, entre em contacto connosco.'
    },
    {
      question: 'Como exerço os meus direitos de proteção de dados?',
      answer: 'Para questões relacionadas com RGPD e proteção de dados, envie um email para privacidade@realestate-pt.com com o seu pedido específico.'
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
            Contacte-nos
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contacto connosco e responderemos o mais brevemente possível.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="section-title mb-2">
                Envie-nos uma Mensagem
              </h2>
              <p className="section-subtitle mb-8">
                Preencha o formulário e entraremos em contacto consigo
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="O seu nome"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+351 912 345 678"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Resumo da sua questão"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Descreva a sua questão em detalhe..."
                  />
                </div>

                {/* Privacy Notice */}
                <div className="text-sm text-gray-500 bg-sand-100 p-4 rounded-xl">
                  Ao submeter este formulário, concorda com a nossa{' '}
                  <Link to="/privacy" className="text-primary-600 hover:underline font-medium">
                    Política de Privacidade
                  </Link>
                  . Os seus dados serão utilizados apenas para responder à sua mensagem.
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      A enviar...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Informações de Contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl mr-4 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">geral@realestate-pt.com</p>
                    <p className="text-gray-500 text-sm">suporte@realestate-pt.com</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl mr-4 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefone</h4>
                    <p className="text-gray-600">+351 210 000 000</p>
                    <p className="text-gray-500 text-sm">Chamada para rede fixa nacional</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl mr-4 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Morada</h4>
                    <p className="text-gray-600">Lisboa, Portugal</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl mr-4 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                    <FaClock className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Horário</h4>
                    <p className="text-gray-600">Segunda a Sexta</p>
                    <p className="text-gray-600">09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
              <div className="flex items-center mb-3">
                <div className="bg-primary-500 p-2 rounded-lg mr-3">
                  <FaClock className="text-white text-sm" />
                </div>
                <h4 className="font-semibold text-gray-900">
                  Tempo de Resposta
                </h4>
              </div>
              <p className="text-gray-600 text-sm">
                Respondemos a todas as mensagens num prazo máximo de <strong className="text-primary-700">48 horas úteis</strong>.
                Para questões urgentes, contacte-nos por telefone.
              </p>
            </div>

            {/* Data Protection Notice */}
            <div className="bg-gradient-to-br from-sand-100 to-sand-200 rounded-2xl p-6 border border-sand-300">
              <h4 className="font-semibold text-gray-900 mb-2">
                Proteção de Dados
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Para questões relacionadas com os seus dados pessoais ou exercer os seus direitos ao abrigo do RGPD:
              </p>
              <p className="text-sm mb-2">
                <strong>Email:</strong> privacidade@realestate-pt.com
              </p>
              <Link to="/privacy" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                Ver Política de Privacidade
                <FaChevronDown className="ml-1 -rotate-90 text-xs" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Links Úteis
            </h2>
            <p className="section-subtitle">
              Encontre rapidamente o que procura
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((item, index) => (
              <div key={index} className="feature-card group">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                  <item.icon className="text-white text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <Link to={item.link} className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                  {item.linkText}
                  <FaChevronDown className="ml-1 -rotate-90 text-xs" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Perguntas Frequentes
            </h2>
            <p className="section-subtitle">
              Respostas rápidas às questões mais comuns
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
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

      {/* Alternative Dispute Resolution */}
      <div className="bg-gradient-to-br from-sand-100 to-sand-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8">
            <h3 className="font-bold text-gray-900 text-xl mb-4">
              Resolução Alternativa de Litígios
            </h3>
            <p className="text-gray-600 mb-6">
              Em conformidade com a legislação europeia e portuguesa, informamos que, em caso de litígio,
              pode recorrer a uma entidade de resolução alternativa de litígios de consumo:
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.consumidor.gov.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Portal do Consumidor
              </a>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Plataforma ODR da UE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
