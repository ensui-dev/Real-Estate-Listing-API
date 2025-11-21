import React from 'react';
import { Link } from 'react-router-dom';
import { FaCookieBite, FaArrowLeft, FaCog, FaChartBar, FaBullhorn, FaCheck } from 'react-icons/fa';

const Cookies = () => {
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
              <FaCookieBite className="text-primary-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Politica de Cookies</h1>
              <p className="text-gray-500">Ultima atualização: {lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-lg text-gray-600 mb-6">
              Esta Política de Cookies explica o que são cookies, como os utilizamos no website RealEstate PT, e como pode gerir as suas preferências. Esta política está em conformidade com a Diretiva ePrivacy (2002/58/CE), transposta para a legislação portuguesa pela Lei n.º 41/2004, de 18 de agosto, alterada pela Lei n.º 46/2012, de 29 de agosto, e com o RGPD.
            </p>
          </div>

          {/* Cookie Categories Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <FaCheck className="text-green-600 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Essenciais</p>
              <p className="text-xs text-gray-500">Sempre ativos</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <FaCog className="text-blue-600 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Funcionais</p>
              <p className="text-xs text-gray-500">Com consentimento</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <FaChartBar className="text-purple-600 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Analíticos</p>
              <p className="text-xs text-gray-500">Com consentimento</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <FaBullhorn className="text-orange-600 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Marketing</p>
              <p className="text-xs text-gray-500">Com consentimento</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. O Que São Cookies?</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo (computador, tablet ou telemóvel) quando visita um website. Os cookies são amplamente utilizados para fazer os websites funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.
              </p>
              <p className="mb-4">
                Os cookies podem ser "persistentes" ou "de sessão":
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cookies de Sessão:</strong> São temporários e são eliminados quando fecha o navegador.</li>
                <li><strong>Cookies Persistentes:</strong> Permanecem no seu dispositivo até expirarem ou serem eliminados manualmente.</li>
              </ul>
              <p className="mt-4">
                Os cookies podem também ser classificados como:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Cookies Próprios (First-party):</strong> Definidos pelo website que está a visitar.</li>
                <li><strong>Cookies de Terceiros (Third-party):</strong> Definidos por outros domínios que não o website que está a visitar.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Base Legal</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                A utilização de cookies em Portugal é regulada pela Lei n.º 41/2004, alterada pela Lei n.º 46/2012, que transpõe a Diretiva ePrivacy (2002/58/CE) para o ordenamento jurídico português.
              </p>
              <p className="mb-4">
                De acordo com esta legislação:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Cookies Essenciais:</strong> Não necessitam de consentimento, pois são estritamente necessários para a prestação do serviço expressamente solicitado pelo utilizador.
                </li>
                <li>
                  <strong>Cookies Não Essenciais:</strong> Requerem o seu consentimento prévio, informado, livre e inequívoco antes de serem instalados no seu dispositivo.
                </li>
              </ul>
              <p className="mt-4">
                A definição de consentimento aplicável é a prevista no RGPD (Artigo 4.º, n.º 11), devendo ser dado através de uma ação afirmativa clara.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Nota Importante:</strong> As configurações do navegador que permitem cookies não constituem, por si só, consentimento válido para a utilização de cookies num website específico.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Cookies Que Utilizamos</h2>
            <div className="prose max-w-none text-gray-700">

              {/* Essential Cookies */}
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">ESSENCIAIS</span>
                Cookies Estritamente Necessários
              </h3>
              <p className="mb-4">
                Estes cookies são indispensáveis para o funcionamento do website e não podem ser desativados. São normalmente definidos em resposta a ações suas, como definir preferências de privacidade, iniciar sessão ou preencher formulários.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Cookie</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Finalidade</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Duração</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">auth_token</td>
                      <td className="border border-gray-200 px-3 py-2">Autenticação do utilizador</td>
                      <td className="border border-gray-200 px-3 py-2">7 dias</td>
                      <td className="border border-gray-200 px-3 py-2">Próprio</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">session_id</td>
                      <td className="border border-gray-200 px-3 py-2">Gestão de sessão</td>
                      <td className="border border-gray-200 px-3 py-2">Sessão</td>
                      <td className="border border-gray-200 px-3 py-2">Próprio</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">cookie_consent</td>
                      <td className="border border-gray-200 px-3 py-2">Armazena preferências de cookies</td>
                      <td className="border border-gray-200 px-3 py-2">1 ano</td>
                      <td className="border border-gray-200 px-3 py-2">Próprio</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">csrf_token</td>
                      <td className="border border-gray-200 px-3 py-2">Proteção contra ataques CSRF</td>
                      <td className="border border-gray-200 px-3 py-2">Sessão</td>
                      <td className="border border-gray-200 px-3 py-2">Próprio</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Functional Cookies */}
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">FUNCIONAIS</span>
                Cookies de Funcionalidade
              </h3>
              <p className="mb-4">
                Estes cookies permitem funcionalidades melhoradas e personalização, como memorizar as suas preferências de idioma ou região.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Cookie</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Finalidade</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Duração</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">user_preferences</td>
                      <td className="border border-gray-200 px-3 py-2">Preferências de visualização</td>
                      <td className="border border-gray-200 px-3 py-2">1 ano</td>
                      <td className="border border-gray-200 px-3 py-2">Próprio</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">recent_searches</td>
                      <td className="border border-gray-200 px-3 py-2">Histórico de pesquisas</td>
                      <td className="border border-gray-200 px-3 py-2">30 dias</td>
                      <td className="border border-gray-200 px-3 py-2">Próprio</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">saved_properties</td>
                      <td className="border border-gray-200 px-3 py-2">Imóveis favoritos</td>
                      <td className="border border-gray-200 px-3 py-2">90 dias</td>
                      <td className="border border-gray-200 px-3 py-2">Próprio</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Analytics Cookies */}
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-2">ANALÍTICOS</span>
                Cookies de Análise
              </h3>
              <p className="mb-4">
                Estes cookies permitem-nos contar visitas e fontes de tráfego para medir e melhorar o desempenho do nosso site.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Cookie</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Finalidade</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Duração</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">_ga</td>
                      <td className="border border-gray-200 px-3 py-2">Google Analytics - Distinguir utilizadores</td>
                      <td className="border border-gray-200 px-3 py-2">2 anos</td>
                      <td className="border border-gray-200 px-3 py-2">Terceiros</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">_ga_*</td>
                      <td className="border border-gray-200 px-3 py-2">Google Analytics - Estado da sessão</td>
                      <td className="border border-gray-200 px-3 py-2">2 anos</td>
                      <td className="border border-gray-200 px-3 py-2">Terceiros</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">_gid</td>
                      <td className="border border-gray-200 px-3 py-2">Google Analytics - Distinguir utilizadores</td>
                      <td className="border border-gray-200 px-3 py-2">24 horas</td>
                      <td className="border border-gray-200 px-3 py-2">Terceiros</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Marketing Cookies */}
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3 flex items-center">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs mr-2">MARKETING</span>
                Cookies de Marketing
              </h3>
              <p className="mb-4">
                Estes cookies são utilizados para apresentar anúncios mais relevantes para si e os seus interesses.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Cookie</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Finalidade</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Duração</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">_fbp</td>
                      <td className="border border-gray-200 px-3 py-2">Facebook Pixel - Rastreamento</td>
                      <td className="border border-gray-200 px-3 py-2">3 meses</td>
                      <td className="border border-gray-200 px-3 py-2">Terceiros</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs">ads_prefs</td>
                      <td className="border border-gray-200 px-3 py-2">Preferências de publicidade</td>
                      <td className="border border-gray-200 px-3 py-2">1 ano</td>
                      <td className="border border-gray-200 px-3 py-2">Terceiros</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Como Gerir Cookies</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">4.1 Banner de Cookies</h3>
              <p className="mb-4">
                Quando visita o nosso website pela primeira vez, é apresentado um banner de cookies onde pode aceitar ou recusar diferentes categorias de cookies. As suas preferências são guardadas e respeitadas em visitas subsequentes.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">4.2 Alterar Preferências</h3>
              <p className="mb-4">
                Pode alterar as suas preferências de cookies a qualquer momento através do link "Definições de Cookies" disponível no rodapé do website.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">4.3 Configurações do Navegador</h3>
              <p className="mb-4">
                Pode também gerir cookies através das configurações do seu navegador. Abaixo encontra links para instruções dos navegadores mais comuns:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/pt-PT/kb/cookies-informacao-websites-guardam-no-computador" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Safari
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/pt-pt/microsoft-edge/eliminar-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Microsoft Edge
                  </a>
                </li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Atenção:</strong> Ao desativar cookies essenciais, algumas funcionalidades do website podem não funcionar corretamente, como o sistema de autenticação.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Cookies de Terceiros</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Utilizamos serviços de terceiros que podem definir os seus próprios cookies no seu dispositivo. Estes terceiros têm as suas próprias políticas de privacidade:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Google Analytics:</strong>{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Política de Privacidade do Google
                  </a>
                </li>
                <li>
                  <strong>Facebook (Meta):</strong>{' '}
                  <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Política de Privacidade da Meta
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                Para optar por não receber publicidade personalizada, pode visitar:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Your Online Choices (UE)
                  </a>
                </li>
                <li>
                  <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Network Advertising Initiative
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Outras Tecnologias de Rastreamento</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Além de cookies, podemos utilizar outras tecnologias semelhantes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Local Storage:</strong> Armazenamento de dados no navegador para melhorar a experiência do utilizador.
                </li>
                <li>
                  <strong>Session Storage:</strong> Armazenamento temporário de dados durante a sessão de navegação.
                </li>
                <li>
                  <strong>Pixels/Web Beacons:</strong> Pequenas imagens utilizadas para rastrear interações com emails e páginas.
                </li>
              </ul>
              <p className="mt-4">
                Estas tecnologias estão sujeitas aos mesmos requisitos de consentimento que os cookies, quando aplicável.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Atualizações a Esta Política</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nas tecnologias que utilizamos ou por requisitos legais. Recomendamos que reveja esta página regularmente.
              </p>
              <p>
                A data da última atualização é indicada no topo desta página. Alterações significativas serão comunicadas através de um aviso no website.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Contactos</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Se tiver questões sobre a nossa utilização de cookies ou sobre esta política, contacte-nos:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> privacidade@realestate-pt.com</li>
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
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700 hover:underline">
              Política de Privacidade
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

export default Cookies;
