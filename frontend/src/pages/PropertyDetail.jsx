import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProperty } from '../hooks/useProperties';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import {
  FaBed,
  FaBath,
  FaRuler,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
  FaCheckCircle,
  FaCalendar,
  FaUser,
  FaBuilding,
  FaHeart,
  FaShare
} from 'react-icons/fa';
import { formatCurrency, getEnergyRatingColor, calculateIMT } from '../utils/imtCalculator';
import { getPropertyStatusLabel, getPropertyStatusBadge } from '../utils/helpers';
import clsx from 'clsx';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: response, isLoading, error } = useProperty(id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) return <Loading />;

  if (error || !response?.data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Imóvel não encontrado</h2>
        <p className="text-gray-600 mb-6">O imóvel que procura não existe ou foi removido.</p>
        <button onClick={() => navigate('/properties')} className="btn-primary">
          Voltar para Imóveis
        </button>
      </div>
    );
  }

  const property = response.data;
  const images = property.images || [];
  const selectedImage = images[selectedImageIndex] || { url: '/placeholder-property.jpg', caption: '' };

  // Calculate IMT if property type is purchase
  const imtData = property.status === 'for_sale' && property.price
    ? calculateIMT(property.price, property.propertyType)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Voltar
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-6">
            {/* Main Image */}
            <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={selectedImage.url}
                alt={selectedImage.caption || property.title}
                className="w-full h-96 object-cover"
              />
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={clsx('badge', getPropertyStatusBadge(property.status))}>
                  {getPropertyStatusLabel(property.status)}
                </span>
              </div>
              {/* Featured Badge */}
              {property.isFeatured && (
                <div className="absolute top-4 right-4">
                  <span className="badge bg-yellow-500 text-white">Destaque</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={clsx(
                      'rounded-lg overflow-hidden border-2 transition-all',
                      selectedImageIndex === index
                        ? 'border-primary-600 scale-105'
                        : 'border-transparent hover:border-gray-300'
                    )}
                  >
                    <img
                      src={img.url}
                      alt={img.caption || `Image ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="card mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>
                    {property.address?.street}, {property.address?.city}, {property.address?.district} {property.address?.zipCode}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {formatCurrency(property.price)}
                </div>
                {property.pricePerSquareMeter && (
                  <div className="text-sm text-gray-600">
                    {formatCurrency(property.pricePerSquareMeter)}/m²
                  </div>
                )}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-4 gap-4 py-4 border-y">
              {property.bedrooms > 0 && (
                <div className="text-center">
                  <FaBed className="text-2xl text-primary-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Quartos</div>
                  <div className="text-lg font-semibold">{property.bedrooms}</div>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="text-center">
                  <FaBath className="text-2xl text-primary-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Casas de Banho</div>
                  <div className="text-lg font-semibold">{property.bathrooms}</div>
                </div>
              )}
              {property.squareMeters && (
                <div className="text-center">
                  <FaRuler className="text-2xl text-primary-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Área</div>
                  <div className="text-lg font-semibold">{property.squareMeters}m²</div>
                </div>
              )}
              {property.energyCertificate?.rating && (
                <div className="text-center">
                  <div className={clsx(
                    'text-2xl font-bold mx-auto mb-2 w-12 h-12 rounded-full flex items-center justify-center text-white',
                    getEnergyRatingColor(property.energyCertificate.rating)
                  )}>
                    {property.energyCertificate.rating}
                  </div>
                  <div className="text-sm text-gray-600">Certificado</div>
                  <div className="text-xs text-gray-500">Energético</div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Descrição</h2>
              <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
            </div>

            {/* Property Details */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Detalhes do Imóvel</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Tipo:</span>
                  <span className="ml-2 font-semibold capitalize">{property.propertyType?.replace('_', ' ')}</span>
                </div>
                {property.yearBuilt && (
                  <div>
                    <span className="text-gray-600">Ano de Construção:</span>
                    <span className="ml-2 font-semibold">{property.yearBuilt}</span>
                  </div>
                )}
                {property.lotSize && (
                  <div>
                    <span className="text-gray-600">Tamanho do Lote:</span>
                    <span className="ml-2 font-semibold">{property.lotSize}m²</span>
                  </div>
                )}
                {property.parking && (
                  <div>
                    <span className="text-gray-600">Estacionamento:</span>
                    <span className="ml-2 font-semibold">{property.parking} {property.parking === 1 ? 'vaga' : 'vagas'}</span>
                  </div>
                )}
                {property.floors && (
                  <div>
                    <span className="text-gray-600">Pisos:</span>
                    <span className="ml-2 font-semibold">{property.floors}</span>
                  </div>
                )}
                {property.condition && (
                  <div>
                    <span className="text-gray-600">Condição:</span>
                    <span className="ml-2 font-semibold capitalize">{property.condition}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Características</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                      <span className="capitalize">{feature.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IMT Calculator Result */}
            {imtData && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Impostos Estimados (IMT)</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa IMT:</span>
                    <span className="font-semibold">{imtData.rate}%</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-900 font-semibold">IMT Total:</span>
                    <span className="font-bold text-primary-600">{formatCurrency(imtData.imt)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * Valores estimados. Consulte um profissional para cálculos exatos.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="lg:col-span-1">
          {/* Contact Card */}
          <div className="card sticky top-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Informações de Contacto</h3>

            {/* Agent Info */}
            {property.agent && (
              <div className="mb-4 pb-4 border-b">
                <div className="flex items-center mb-3">
                  <FaUser className="text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Agente</div>
                    <div className="font-semibold">{property.agent.user?.name || 'Agente'}</div>
                  </div>
                </div>
                {property.agent.agency && (
                  <div className="flex items-center">
                    <FaBuilding className="text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">Agência</div>
                      <div className="font-semibold">{property.agent.agency.name}</div>
                      {property.agent.agency.licenseNumber && (
                        <div className="text-xs text-gray-500">AMI: {property.agent.agency.licenseNumber}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact Buttons */}
            <div className="space-y-3">
              {property.agent?.user?.phone && (
                <a
                  href={`tel:${property.agent.user.phone}`}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <FaPhone className="mr-2" />
                  Ligar Agora
                </a>
              )}
              {property.agent?.user?.email && (
                <a
                  href={`mailto:${property.agent.user.email}?subject=Interesse no imóvel: ${property.title}`}
                  className="btn-secondary w-full flex items-center justify-center"
                >
                  <FaEnvelope className="mr-2" />
                  Enviar Email
                </a>
              )}
              <button className="btn-secondary w-full flex items-center justify-center">
                <FaHeart className="mr-2" />
                Adicionar aos Favoritos
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: property.title,
                      text: property.description,
                      url: window.location.href
                    });
                  }
                }}
                className="btn-secondary w-full flex items-center justify-center"
              >
                <FaShare className="mr-2" />
                Partilhar
              </button>
            </div>

            {/* Approval Status Info */}
            {property.approvalStatus && property.approvalStatus !== 'approved' && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm text-yellow-800">
                  <span className="font-semibold">Status: </span>
                  <span className="capitalize">{property.approvalStatus}</span>
                </div>
                {property.approvalStatus === 'pending' && (
                  <p className="text-xs text-yellow-700 mt-1">
                    Este imóvel está a aguardar aprovação do administrador.
                  </p>
                )}
              </div>
            )}

            {/* Meta Info */}
            <div className="mt-4 pt-4 border-t text-xs text-gray-500 space-y-2">
              <div className="flex items-center">
                <FaCalendar className="mr-2" />
                Publicado em {new Date(property.createdAt).toLocaleDateString('pt-PT')}
              </div>
              {property.viewCount > 0 && (
                <div>
                  Visualizações: {property.viewCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
