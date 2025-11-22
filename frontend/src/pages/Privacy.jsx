import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaArrowLeft, FaUserShield, FaDatabase, FaLock, FaGlobe } from 'react-icons/fa';

const Privacy = () => {
  const lastUpdated = '21 de Novembro de 2024';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <FaArrowLeft className="mr-2" />
          Voltar ao Inicio
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-primary-100 p-3 rounded-full">
              <FaShieldAlt className="text-primary-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Politica de Privacidade</h1>
              <p className="text-gray-500">Ultima atualização: {lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-lg text-gray-600 mb-6">
              A RealEstate PT compromete-se a proteger a privacidade e os dados pessoais dos seus utilizadores. Esta Política de Privacidade explica como recolhemos, utilizamos, armazenamos e protegemos os seus dados pessoais, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento (UE) 2016/679) e a Lei n.º 58/2019, de 8 de agosto.
            </p>
          </div>

          {/* Quick Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <FaUserShield className="text-primary-600 text-2xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Os Seus Direitos</p>
              <p className="text-xs text-gray-500">RGPD Artigos 15-22</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <FaDatabase className="text-primary-600 text-2xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Dados Mínimos</p>
              <p className="text-xs text-gray-500">Só o necessário</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <FaLock className="text-primary-600 text-2xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Segurança</p>
              <p className="text-xs text-gray-500">Encriptação SSL/TLS</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <FaGlobe className="text-primary-600 text-2xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Transparência</p>
              <p className="text-xs text-gray-500">Informação clara</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 - Controller */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Responsável pelo Tratamento</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                O responsável pelo tratamento dos seus dados pessoais é:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-none space-y-2">
                  <li><strong>Entidade:</strong> RealEstate PT</li>
                  <li><strong>Morada:</strong> Lisboa, Portugal</li>
                  <li><strong>Email:</strong> privacidade@realestate-pt.com</li>
                  <li><strong>Website:</strong> lusitanestate.netlify.app</li>
                </ul>
              </div>
              <p className="mt-4">
                Para qualquer questão relacionada com a proteção dos seus dados pessoais, pode contactar-nos através do email acima indicado ou através da nossa <Link to="/contact" className="text-primary-600 hover:underline">página de contacto</Link>.
              </p>
            </div>
          </section>

          {/* Section 2 - Data Collected */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Dados Pessoais Recolhidos</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Recolhemos os seguintes tipos de dados pessoais, dependendo da forma como interage com a nossa plataforma:
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">2.1 Dados de Registo</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Nome completo</li>
                <li>Endereço de email</li>
                <li>Palavra-passe (armazenada de forma encriptada)</li>
                <li>Número de telefone (opcional)</li>
                <li>Tipo de conta (comprador, vendedor, agente, agência)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">2.2 Dados de Perfil Profissional (Agentes/Agências)</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Número de licença AMI (Agente de Mediação Imobiliária)</li>
                <li>Nome da agência</li>
                <li>NIF/NIPC</li>
                <li>Morada profissional</li>
                <li>Fotografia de perfil</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">2.3 Dados de Anúncios</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Informações sobre imóveis (morada, características, preço)</li>
                <li>Fotografias dos imóveis</li>
                <li>Documentos relacionados com os imóveis</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">2.4 Dados de Utilização</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Endereço IP</li>
                <li>Tipo de navegador e dispositivo</li>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Data e hora de acesso</li>
                <li>Pesquisas realizadas</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">2.5 Dados de Comunicação</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mensagens enviadas através da plataforma</li>
                <li>Pedidos de informação sobre imóveis</li>
                <li>Comunicações com o suporte</li>
              </ul>
            </div>
          </section>

          {/* Section 3 - Legal Basis */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Base Legal para o Tratamento</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                O tratamento dos seus dados pessoais baseia-se nas seguintes bases legais, conforme previsto no artigo 6.º do RGPD:
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 mt-4">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Finalidade</th>
                      <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Base Legal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Gestão de conta e autenticação</td>
                      <td className="border border-gray-200 px-4 py-2">Execução de contrato (Art. 6.º(1)(b))</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Publicação e gestão de anúncios</td>
                      <td className="border border-gray-200 px-4 py-2">Execução de contrato (Art. 6.º(1)(b))</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Comunicações transacionais</td>
                      <td className="border border-gray-200 px-4 py-2">Execução de contrato (Art. 6.º(1)(b))</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Marketing direto</td>
                      <td className="border border-gray-200 px-4 py-2">Consentimento (Art. 6.º(1)(a))</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Cookies não essenciais</td>
                      <td className="border border-gray-200 px-4 py-2">Consentimento (Art. 6.º(1)(a))</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Melhoria dos serviços</td>
                      <td className="border border-gray-200 px-4 py-2">Interesse legítimo (Art. 6.º(1)(f))</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Prevenção de fraude</td>
                      <td className="border border-gray-200 px-4 py-2">Interesse legítimo (Art. 6.º(1)(f))</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Cumprimento de obrigações legais</td>
                      <td className="border border-gray-200 px-4 py-2">Obrigação legal (Art. 6.º(1)(c))</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4 - Purposes */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Finalidades do Tratamento</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">Utilizamos os seus dados pessoais para as seguintes finalidades:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Prestação de Serviços:</strong> Permitir o registo, autenticação e utilização das funcionalidades da plataforma.</li>
                <li><strong>Gestão de Anúncios:</strong> Publicar, gerir e promover anúncios de imóveis.</li>
                <li><strong>Comunicação:</strong> Facilitar a comunicação entre compradores, vendedores e agentes.</li>
                <li><strong>Suporte ao Cliente:</strong> Responder a questões e resolver problemas reportados.</li>
                <li><strong>Segurança:</strong> Detetar e prevenir atividades fraudulentas ou abusivas.</li>
                <li><strong>Melhoria dos Serviços:</strong> Analisar padrões de utilização para melhorar a experiência do utilizador.</li>
                <li><strong>Cumprimento Legal:</strong> Cumprir obrigações legais e regulamentares aplicáveis.</li>
                <li><strong>Marketing:</strong> Enviar comunicações promocionais (apenas com o seu consentimento prévio).</li>
              </ul>
            </div>
          </section>

          {/* Section 5 - Data Sharing */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Partilha de Dados</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Os seus dados pessoais podem ser partilhados com as seguintes categorias de destinatários:
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">5.1 Outros Utilizadores</h3>
              <p className="mb-4">
                Quando publica um anúncio, determinadas informações (nome, contacto profissional, detalhes do imóvel) são visíveis para outros utilizadores da plataforma.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">5.2 Prestadores de Serviços</h3>
              <p className="mb-4">Trabalhamos com prestadores de serviços que nos auxiliam na operação da plataforma:</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li><strong>Alojamento:</strong> Fly.io (servidores) e Netlify (frontend)</li>
                <li><strong>Armazenamento:</strong> Amazon Web Services (AWS S3) para imagens</li>
                <li><strong>Base de Dados:</strong> MongoDB Atlas</li>
                <li><strong>Email:</strong> Serviços de email transacional</li>
              </ul>
              <p className="mb-4">
                Todos os prestadores de serviços estão vinculados por acordos de processamento de dados e são obrigados a tratar os seus dados apenas de acordo com as nossas instruções.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">5.3 Autoridades</h3>
              <p>
                Podemos divulgar dados pessoais quando exigido por lei ou por ordem de autoridade competente, nomeadamente tribunais, autoridades fiscais ou a CNPD.
              </p>
            </div>
          </section>

          {/* Section 6 - International Transfers */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Transferências Internacionais</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Alguns dos nossos prestadores de serviços podem estar localizados fora do Espaço Económico Europeu (EEE). Nestas situações, asseguramos que as transferências de dados são efetuadas de acordo com o RGPD através de:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Decisões de adequação da Comissão Europeia (como o EU-US Data Privacy Framework)</li>
                <li>Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia</li>
                <li>Certificações e códigos de conduta aprovados</li>
              </ul>
              <p className="mt-4">
                Pode obter mais informações sobre as salvaguardas aplicáveis contactando-nos através dos meios indicados nesta política.
              </p>
            </div>
          </section>

          {/* Section 7 - Retention */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Prazo de Conservação</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Conservamos os seus dados pessoais apenas durante o período necessário para as finalidades para as quais foram recolhidos:
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 mt-4">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Tipo de Dados</th>
                      <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Prazo de Conservação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Dados de conta</td>
                      <td className="border border-gray-200 px-4 py-2">Enquanto a conta estiver ativa + 2 anos após encerramento</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Anúncios e conteúdo</td>
                      <td className="border border-gray-200 px-4 py-2">Enquanto publicados + 1 ano após remoção</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Comunicações</td>
                      <td className="border border-gray-200 px-4 py-2">2 anos após a última interação</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Dados de faturação</td>
                      <td className="border border-gray-200 px-4 py-2">10 anos (obrigação fiscal)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Logs de segurança</td>
                      <td className="border border-gray-200 px-4 py-2">1 ano</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Dados de cookies</td>
                      <td className="border border-gray-200 px-4 py-2">Conforme indicado na Política de Cookies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 8 - Your Rights */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Os Seus Direitos</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Nos termos do RGPD (Artigos 15.º a 22.º) e da Lei n.º 58/2019, tem os seguintes direitos relativamente aos seus dados pessoais:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Direito de Acesso</h4>
                  <p className="text-sm text-gray-600">Obter confirmação sobre se tratamos os seus dados e aceder aos mesmos.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Direito de Retificação</h4>
                  <p className="text-sm text-gray-600">Corrigir dados inexatos ou completar dados incompletos.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Direito ao Apagamento</h4>
                  <p className="text-sm text-gray-600">Solicitar o apagamento dos seus dados em determinadas circunstâncias.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Direito à Limitação</h4>
                  <p className="text-sm text-gray-600">Limitar o tratamento dos seus dados em certas situações.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Direito à Portabilidade</h4>
                  <p className="text-sm text-gray-600">Receber os seus dados num formato estruturado e de uso corrente.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Direito de Oposição</h4>
                  <p className="text-sm text-gray-600">Opor-se ao tratamento baseado em interesses legítimos ou marketing direto.</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Como Exercer os Seus Direitos</h3>
              <p className="mb-4">
                Para exercer qualquer um dos direitos acima, pode:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Enviar email para: <strong>privacidade@realestate-pt.com</strong></li>
                <li>Utilizar o <Link to="/contact" className="text-primary-600 hover:underline">formulário de contacto</Link></li>
                <li>Aceder às definições da sua conta para gerir alguns dos seus dados</li>
              </ul>
              <p>
                Responderemos ao seu pedido no prazo de <strong>30 dias</strong>, podendo este prazo ser prorrogado por mais 60 dias em casos de especial complexidade, sendo notificado dessa prorrogação.
              </p>
            </div>
          </section>

          {/* Section 9 - CNPD */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Direito de Reclamação</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Se considerar que o tratamento dos seus dados pessoais viola o RGPD ou a legislação nacional de proteção de dados, tem o direito de apresentar uma reclamação junto da autoridade de controlo competente:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Comissão Nacional de Proteção de Dados (CNPD)</p>
                <ul className="list-none space-y-1 text-sm">
                  <li><strong>Morada:</strong> Av. D. Carlos I, 134 - 1.º, 1200-651 Lisboa</li>
                  <li><strong>Telefone:</strong> +351 213 928 400</li>
                  <li><strong>Email:</strong> geral@cnpd.pt</li>
                  <li><strong>Website:</strong> <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.cnpd.pt</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 10 - Security */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Segurança dos Dados</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Implementámos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Encriptação:</strong> Comunicações protegidas por SSL/TLS (HTTPS)</li>
                <li><strong>Palavras-passe:</strong> Armazenadas com hashing seguro (bcrypt)</li>
                <li><strong>Acesso Restrito:</strong> Acesso aos dados limitado a pessoal autorizado</li>
                <li><strong>Monitorização:</strong> Sistemas de deteção de intrusões e anomalias</li>
                <li><strong>Backups:</strong> Cópias de segurança regulares e encriptadas</li>
                <li><strong>Formação:</strong> Formação regular da equipa em proteção de dados</li>
              </ul>
            </div>
          </section>

          {/* Section 11 - Minors */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Menores</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                A nossa plataforma não se destina a menores de 18 anos. Não recolhemos intencionalmente dados pessoais de menores. Em Portugal, nos termos da Lei n.º 58/2019, a idade mínima para consentimento em relação a serviços da sociedade da informação é de 13 anos.
              </p>
              <p>
                Se tomarmos conhecimento de que recolhemos dados de um menor sem o devido consentimento parental, tomaremos medidas para eliminar essa informação dos nossos sistemas.
              </p>
            </div>
          </section>

          {/* Section 12 - Changes */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">12. Alterações a esta Política</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações nas nossas práticas ou por outros motivos operacionais, legais ou regulamentares.
              </p>
              <p className="mb-4">
                Notificaremos sobre alterações significativas através de:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Aviso na plataforma</li>
                <li>Email para utilizadores registados</li>
                <li>Atualização da data de "Última atualização" no topo desta página</li>
              </ul>
            </div>
          </section>

          {/* Section 13 - Contact */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">13. Contactos</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Para questões sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email de Privacidade:</strong> privacidade@realestate-pt.com</li>
                <li><strong>Email Geral:</strong> geral@realestate-pt.com</li>
                <li><strong>Formulário:</strong> <Link to="/contact" className="text-primary-600 hover:underline">Página de Contacto</Link></li>
              </ul>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentos Relacionados</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms" className="text-primary-600 hover:text-primary-700 hover:underline">
              Termos e Condições
            </Link>
            <Link to="/cookies" className="text-primary-600 hover:text-primary-700 hover:underline">
              Política de Cookies
            </Link>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
