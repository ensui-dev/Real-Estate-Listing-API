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
  FaShare,
  FaHome,
  FaCalculator,
  FaInfoCircle
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
      <div className="min-h-screen bg-sand-50 pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="card rounded-2xl py-16">
            <FaHome className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Imóvel nao encontrado</h2>
            <p className="text-gray-600 mb-6">O imóvel que procura nao existe ou foi removido.</p>
            <button onClick={() => navigate('/properties')} className="btn-primary">
              Voltar para Imoveis
            </button>
          </div>
        </div>
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
    <div className="min-h-screen bg-sand-50 pt-28 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery Card */}
            <div className="card rounded-2xl overflow-hidden">
              {/* Main Image */}
              <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-100">
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
                    <span className="badge bg-gradient-to-r from-amber-500 to-yellow-500 text-white">Destaque</span>
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
                        'rounded-xl overflow-hidden border-2 transition-all hover:shadow-float',
                        selectedImageIndex === index
                          ? 'border-primary-600 scale-105 shadow-float'
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

            {/* Property Info Card */}
            <div className="card rounded-2xl">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{property.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-primary-600" />
                    <span>
                      {property.address?.street}, {property.address?.city}, {property.address?.district} {property.address?.zipCode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {formatCurrency(property.price)}
                  </div>
                  {property.pricePerSquareMeter && (
                    <div className="text-sm text-gray-500 bg-sand-100 px-3 py-1 rounded-full inline-block">
                      {formatCurrency(property.pricePerSquareMeter)}/m2
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100">
                {property.bedrooms > 0 && (
                  <div className="text-center p-4 bg-sand-50 rounded-xl">
                    <FaBed className="text-2xl text-primary-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Quartos</div>
                    <div className="text-xl font-bold text-gray-900">{property.bedrooms}</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="text-center p-4 bg-sand-50 rounded-xl">
                    <FaBath className="text-2xl text-primary-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Casas de Banho</div>
                    <div className="text-xl font-bold text-gray-900">{property.bathrooms}</div>
                  </div>
                )}
                {property.squareMeters && (
                  <div className="text-center p-4 bg-sand-50 rounded-xl">
                    <FaRuler className="text-2xl text-primary-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Area</div>
                    <div className="text-xl font-bold text-gray-900">{property.squareMeters}m2</div>
                  </div>
                )}
                {property.energyCertificate?.rating && (
                  <div className="text-center p-4 bg-sand-50 rounded-xl">
                    <div className={clsx(
                      'text-xl font-bold mx-auto mb-2 w-10 h-10 rounded-full flex items-center justify-center text-white',
                      getEnergyRatingColor(property.energyCertificate.rating)
                    )}>
                      {property.energyCertificate.rating}
                    </div>
                    <div className="text-sm text-gray-500">Certificado</div>
                    <div className="text-xs text-gray-400">Energetico</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaInfoCircle className="text-primary-600" />
                  Descrição
                </h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{property.description}</p>
              </div>

              {/* Property Details */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Detalhes do Imóvel</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between p-3 bg-sand-50 rounded-xl">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-semibold capitalize text-gray-900">{property.propertyType?.replace('_', ' ')}</span>
                  </div>
                  {property.yearBuilt && (
                    <div className="flex justify-between p-3 bg-sand-50 rounded-xl">
                      <span className="text-gray-600">Ano de Construção:</span>
                      <span className="font-semibold text-gray-900">{property.yearBuilt}</span>
                    </div>
                  )}
                  {property.lotSize && (
                    <div className="flex justify-between p-3 bg-sand-50 rounded-xl">
                      <span className="text-gray-600">Tamanho do Lote:</span>
                      <span className="font-semibold text-gray-900">{property.lotSize}m2</span>
                    </div>
                  )}
                  {property.parking && (
                    <div className="flex justify-between p-3 bg-sand-50 rounded-xl">
                      <span className="text-gray-600">Estacionamento:</span>
                      <span className="font-semibold text-gray-900">{property.parking} {property.parking === 1 ? 'vaga' : 'vagas'}</span>
                    </div>
                  )}
                  {property.floors && (
                    <div className="flex justify-between p-3 bg-sand-50 rounded-xl">
                      <span className="text-gray-600">Pisos:</span>
                      <span className="font-semibold text-gray-900">{property.floors}</span>
                    </div>
                  )}
                  {property.condition && (
                    <div className="flex justify-between p-3 bg-sand-50 rounded-xl">
                      <span className="text-gray-600">Condição:</span>
                      <span className="font-semibold capitalize text-gray-900">{property.condition}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Características</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700 p-3 bg-sand-50 rounded-xl">
                        <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                        <span className="capitalize">{feature.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* IMT Calculator Result Card */}
            {imtData && (
              <div className="card rounded-2xl bg-gradient-to-br from-primary-50 to-sand-50 border border-primary-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                    <FaCalculator className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Impostos Estimados (IMT)</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                    <span className="text-gray-600">Taxa IMT:</span>
                    <span className="font-semibold text-gray-900">{imtData.rate}%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary-600 text-white rounded-xl">
                    <span className="font-semibold">IMT Total:</span>
                    <span className="text-2xl font-bold">{formatCurrency(imtData.imt)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                    <FaInfoCircle />
                    Valores estimados. Consulte um profissional para calculos exatos.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="card rounded-2xl sticky top-28">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaPhone className="text-primary-600" />
                Contacto
              </h3>

              {/* Agent Info */}
              {property.agent && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-4 mb-4 p-4 bg-sand-50 rounded-xl">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                      <FaUser className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Agente</div>
                      <div className="font-semibold text-gray-900">{property.agent.user?.name || 'Agente'}</div>
                    </div>
                  </div>
                  {property.agent.agency && (
                    <div className="flex items-center gap-4 p-4 bg-sand-50 rounded-xl">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaBuilding className="text-gray-600 text-lg" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Agencia</div>
                        <div className="font-semibold text-gray-900">{property.agent.agency.name}</div>
                        {property.agent.agency.licenseNumber && (
                          <div className="text-xs text-gray-400">AMI: {property.agent.agency.licenseNumber}</div>
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
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <FaPhone />
                    Ligar Agora
                  </a>
                )}
                {property.agent?.user?.email && (
                  <a
                    href={`mailto:${property.agent.user.email}?subject=Interesse no imóvel: ${property.title}`}
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                  >
                    <FaEnvelope />
                    Enviar Email
                  </a>
                )}
                <button className="btn-secondary w-full flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200">
                  <FaHeart />
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
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <FaShare />
                  Partilhar
                </button>
              </div>

              {/* Approval Status Info */}
              {property.approvalStatus && property.approvalStatus !== 'approved' && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="text-sm text-amber-800">
                    <span className="font-semibold">Status: </span>
                    <span className="capitalize">{property.approvalStatus}</span>
                  </div>
                  {property.approvalStatus === 'pending' && (
                    <p className="text-xs text-amber-700 mt-1">
                      Este imóvel esta a aguardar aprovacao do administrador.
                    </p>
                  )}
                </div>
              )}

              {/* Meta Info */}
              <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-500 space-y-2">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-gray-400" />
                  Publicado em {new Date(property.createdAt).toLocaleDateString('pt-PT')}
                </div>
                {property.viewCount > 0 && (
                  <div className="text-gray-400">
                    {property.viewCount} visualizações
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
