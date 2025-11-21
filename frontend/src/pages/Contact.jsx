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
  FaHome
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
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
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envie-nos uma Mensagem
              </h2>

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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Descreva a sua questão em detalhe..."
                  />
                </div>

                {/* Privacy Notice */}
                <div className="text-sm text-gray-500">
                  Ao submeter este formulário, concorda com a nossa{' '}
                  <Link to="/privacy" className="text-primary-600 hover:underline">
                    Política de Privacidade
                  </Link>
                  . Os seus dados serão utilizados apenas para responder à sua mensagem.
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Informações de Contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">geral@realestate-pt.com</p>
                    <p className="text-gray-600 text-sm">suporte@realestate-pt.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <FaPhone className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Telefone</h4>
                    <p className="text-gray-600">+351 210 000 000</p>
                    <p className="text-gray-500 text-sm">Chamada para rede fixa nacional</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Morada</h4>
                    <p className="text-gray-600">Lisboa, Portugal</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <FaClock className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Horário</h4>
                    <p className="text-gray-600">Segunda a Sexta</p>
                    <p className="text-gray-600">09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-primary-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Tempo de Resposta
              </h4>
              <p className="text-gray-600 text-sm">
                Respondemos a todas as mensagens num prazo máximo de <strong>48 horas úteis</strong>.
                Para questões urgentes, contacte-nos por telefone.
              </p>
            </div>

            {/* Data Protection Notice */}
            <div className="bg-gray-100 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Proteção de Dados
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Para questões relacionadas com os seus dados pessoais ou exercer os seus direitos ao abrigo do RGPD:
              </p>
              <p className="text-sm">
                <strong>Email:</strong> privacidade@realestate-pt.com
              </p>
              <Link to="/privacy" className="text-primary-600 hover:underline text-sm">
                Ver Política de Privacidade
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Links Úteis
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-primary-600 text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <Link to={item.link} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  {item.linkText} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alternative Dispute Resolution */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Resolução Alternativa de Litígios
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Em conformidade com a legislação europeia e portuguesa, informamos que, em caso de litígio,
              pode recorrer a uma entidade de resolução alternativa de litígios de consumo:
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href="https://www.consumidor.gov.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Portal do Consumidor
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
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
