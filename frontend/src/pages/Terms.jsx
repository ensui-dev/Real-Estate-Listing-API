import React from 'react';
import { Link } from 'react-router-dom';
import { FaBalanceScale, FaArrowLeft } from 'react-icons/fa';

const Terms = () => {
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
              <FaBalanceScale className="text-primary-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Termos e Condições</h1>
              <p className="text-gray-500">Ultima atualização: {lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-lg text-gray-600 mb-8">
              Bem-vindo ao RealEstate PT. Ao aceder e utilizar esta plataforma, concorda em cumprir e estar vinculado aos seguintes termos e condições de utilização. Por favor, leia-os atentamente antes de utilizar os nossos serviços.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Definições</h2>
            <div className="prose max-w-none text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>"Plataforma"</strong> refere-se ao website RealEstate PT, acessivel em lusitanestate.netlify.app e todos os seus subdomínios.</li>
                <li><strong>"Utilizador"</strong> designa qualquer pessoa que aceda ou utilize a Plataforma, seja como visitante, comprador, vendedor, agente imobiliário ou agência.</li>
                <li><strong>"Serviços"</strong> incluem todos os serviços disponibilizados através da Plataforma, nomeadamente a publicação, pesquisa e gestão de anúncios imobiliários.</li>
                <li><strong>"Conteúdo"</strong> refere-se a toda a informação, textos, imagens, fotografias e outros materiais publicados na Plataforma.</li>
                <li><strong>"Conta"</strong> significa o registo pessoal do Utilizador na Plataforma.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Aceitação dos Termos</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Ao aceder ou utilizar a Plataforma, o Utilizador declara ter lido, compreendido e aceite os presentes Termos e Condições na sua totalidade. Caso não concorde com algum dos termos aqui descritos, não deverá utilizar a Plataforma.
              </p>
              <p className="mb-4">
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entram em vigor imediatamente após a sua publicação na Plataforma. O uso continuado dos Serviços após tais modificações constitui aceitação dos novos Termos.
              </p>
              <p>
                O Utilizador deve ter pelo menos 18 anos de idade ou a idade legal de maioridade na sua jurisdição para utilizar esta Plataforma. Para menores de 18 anos, é necessária autorização parental ou do tutor legal, em conformidade com o artigo 8.º do RGPD e a Lei n.º 58/2019.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Registo e Conta de Utilizador</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">3.1 Criação de Conta</h3>
              <p className="mb-4">
                Para aceder a determinadas funcionalidades da Plataforma, o Utilizador deve criar uma conta, fornecendo informações verdadeiras, precisas, atuais e completas. O Utilizador é responsável por manter a confidencialidade das suas credenciais de acesso.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">3.2 Tipos de Conta</h3>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Comprador:</strong> Pode pesquisar imóveis e contactar anunciantes.</li>
                <li><strong>Vendedor:</strong> Pode publicar anúncios de imóveis para venda ou arrendamento.</li>
                <li><strong>Agente Imobiliário:</strong> Profissional certificado que pode representar clientes e gerir múltiplos anúncios.</li>
                <li><strong>Agência:</strong> Empresa imobiliária registada que pode gerir agentes e anúncios corporativos.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">3.3 Responsabilidades do Utilizador</h3>
              <p>
                O Utilizador é o único responsável por todas as atividades realizadas através da sua conta e compromete-se a notificar imediatamente qualquer utilização não autorizada ou violação de segurança.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Publicação de Anúncios</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">4.1 Requisitos de Conteúdo</h3>
              <p className="mb-4">Ao publicar anúncios na Plataforma, o Utilizador garante que:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Possui autorização legal para anunciar o imóvel;</li>
                <li>Todas as informações fornecidas são verdadeiras, precisas e atualizadas;</li>
                <li>As fotografias correspondem ao estado atual do imóvel;</li>
                <li>O preço indicado corresponde ao valor real pretendido;</li>
                <li>O imóvel cumpre com todas as normas legais aplicáveis em Portugal.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">4.2 Conteúdo Proibido</h3>
              <p className="mb-4">É expressamente proibido publicar:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Informações falsas, enganosas ou fraudulentas;</li>
                <li>Anúncios de imóveis inexistentes ou já vendidos/arrendados;</li>
                <li>Conteúdo que viole direitos de propriedade intelectual de terceiros;</li>
                <li>Material ofensivo, difamatório, discriminatório ou ilegal;</li>
                <li>Spam ou publicidade não relacionada com imóveis.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">4.3 Moderação</h3>
              <p>
                Reservamo-nos o direito de rever, editar ou remover qualquer anúncio que viole estes Termos, sem aviso prévio e sem direito a reembolso. Os anúncios estão sujeitos a aprovação antes da publicação.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Propriedade Intelectual</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Todo o conteúdo da Plataforma, incluindo mas não limitado a textos, gráficos, logótipos, ícones, imagens, clips de áudio, downloads digitais e compilações de dados, é propriedade da RealEstate PT ou dos seus fornecedores de conteúdo e está protegido pelas leis portuguesas e internacionais de propriedade intelectual.
              </p>
              <p className="mb-4">
                O Utilizador que publica conteúdo na Plataforma mantém os seus direitos de propriedade intelectual, mas concede à RealEstate PT uma licença mundial, não exclusiva, isenta de royalties, para utilizar, reproduzir, modificar e exibir tal conteúdo no âmbito da prestação dos Serviços.
              </p>
              <p>
                É proibida a reprodução, distribuição, modificação ou utilização comercial de qualquer parte da Plataforma sem autorização prévia por escrito.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Limitação de Responsabilidade</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">6.1 Natureza da Plataforma</h3>
              <p className="mb-4">
                A Plataforma funciona como intermediário entre compradores, vendedores, agentes e agências imobiliárias. Não somos parte em qualquer transação imobiliária e não garantimos a qualidade, segurança ou legalidade dos imóveis anunciados.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">6.2 Exclusão de Garantias</h3>
              <p className="mb-4">
                Os Serviços são fornecidos "tal como estão" e "conforme disponíveis". Na máxima extensão permitida pela lei portuguesa, excluímos todas as garantias, expressas ou implícitas, incluindo garantias de comercialização, adequação a um fim específico e não violação.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">6.3 Limitação de Danos</h3>
              <p>
                Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados ou outras perdas intangíveis, resultantes da utilização ou impossibilidade de utilização dos Serviços.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Indemnização</h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                O Utilizador concorda em indemnizar e isentar a RealEstate PT, os seus diretores, funcionários, parceiros e agentes de qualquer reclamação, responsabilidade, danos, perdas e despesas (incluindo honorários advocatícios razoáveis) decorrentes de: (a) violação destes Termos; (b) conteúdo publicado pelo Utilizador; (c) violação de direitos de terceiros; ou (d) qualquer atividade relacionada com a conta do Utilizador.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Resolução de Litígios</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">8.1 Lei Aplicável</h3>
              <p className="mb-4">
                Estes Termos são regidos e interpretados de acordo com as leis da República Portuguesa, sem consideração pelos princípios de conflito de leis.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">8.2 Jurisdição</h3>
              <p className="mb-4">
                Para qualquer litígio decorrente destes Termos ou da utilização da Plataforma, as partes submetem-se à jurisdição exclusiva dos tribunais portugueses, com competência territorial do foro de Lisboa.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">8.3 Resolução Alternativa de Litígios</h3>
              <p>
                Em conformidade com a legislação europeia e portuguesa sobre resolução alternativa de litígios de consumo, informamos que os consumidores podem recorrer a entidades de resolução alternativa de litígios. Para mais informações, consulte o Portal do Consumidor em <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.consumidor.gov.pt</a> ou a plataforma europeia de resolução de litígios em linha em <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">ec.europa.eu/consumers/odr</a>.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Cessação</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Podemos suspender ou terminar o acesso do Utilizador à Plataforma, a qualquer momento e por qualquer motivo, incluindo, sem limitação, violação destes Termos. Em caso de cessação, as disposições relativas a propriedade intelectual, limitação de responsabilidade, indemnização e resolução de litígios permanecerão em vigor.
              </p>
              <p>
                O Utilizador pode encerrar a sua conta a qualquer momento através das definições da conta ou contactando o nosso serviço de apoio.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Disposições Gerais</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">10.1 Integralidade do Acordo</h3>
              <p className="mb-4">
                Estes Termos, juntamente com a Política de Privacidade e a Política de Cookies, constituem o acordo integral entre o Utilizador e a RealEstate PT relativamente à utilização da Plataforma.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">10.2 Renúncia</h3>
              <p className="mb-4">
                A não aplicação de qualquer disposição destes Termos não constitui renúncia ao direito de aplicá-la posteriormente.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">10.3 Divisibilidade</h3>
              <p>
                Se qualquer disposição destes Termos for considerada inválida ou inexequível, as restantes disposições continuarão em pleno vigor e efeito.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Contactos</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Para questões relacionadas com estes Termos e Condições, por favor contacte-nos através de:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> legal@realestate-pt.com</li>
                <li><strong>Morada:</strong> Lisboa, Portugal</li>
                <li><strong>Formulário de Contacto:</strong> <Link to="/contact" className="text-primary-600 hover:underline">Página de Contacto</Link></li>
              </ul>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentos Relacionados</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700 hover:underline">
              Política de Privacidade
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

export default Terms;
