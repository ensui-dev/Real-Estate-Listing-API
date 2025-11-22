// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// User Roles
export const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  AGENT: 'agent',
  ADMIN: 'admin'
};

// Property Status
export const PROPERTY_STATUS = {
  FOR_SALE: 'for-sale',
  FOR_RENT: 'for-rent',
  SOLD: 'sold',
  RENTED: 'rented',
  PENDING: 'pending',
  DRAFT: 'draft'
};

// Approval Status
export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// Property Types
export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartamento' },
  { value: 'house', label: 'Casa' },
  { value: 'villa', label: 'Moradia' },
  { value: 'townhouse', label: 'Casa Geminada' },
  { value: 'condo', label: 'Condomínio' },
  { value: 'land', label: 'Terreno' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'office', label: 'Escritório' },
  { value: 'warehouse', label: 'Armazém' },
  { value: 'retail', label: 'Loja' },
  { value: 'farm', label: 'Quinta' },
  { value: 'garage', label: 'Garagem' },
  { value: 'building', label: 'Edifício' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'studio', label: 'Estúdio' }
];

// Energy Certificate Ratings
export const ENERGY_RATINGS = [
  'A+', 'A', 'B', 'B-', 'C', 'D', 'E', 'F', 'Isento', 'Pendente'
];

// Property Condition
export const PROPERTY_CONDITIONS = [
  { value: 'new', label: 'Novo' },
  { value: 'excellent', label: 'Excelente' },
  { value: 'good', label: 'Bom' },
  { value: 'fair', label: 'Razoável' },
  { value: 'needs-renovation', label: 'Necessita Renovação' },
  { value: 'under-construction', label: 'Em Construção' }
];

// Property Features (Portuguese)
export const PROPERTY_FEATURES = [
  { value: 'elevator', label: 'Elevador' },
  { value: 'balcony', label: 'Varanda' },
  { value: 'terrace', label: 'Terraço' },
  { value: 'garden', label: 'Jardim' },
  { value: 'pool', label: 'Piscina' },
  { value: 'air-conditioning', label: 'Ar Condicionado' },
  { value: 'central-heating', label: 'Aquecimento Central' },
  { value: 'fireplace', label: 'Lareira' },
  { value: 'equipped-kitchen', label: 'Cozinha Equipada' },
  { value: 'furnished', label: 'Mobilado' },
  { value: 'storage-room', label: 'Arrecadação' },
  { value: 'laundry-room', label: 'Lavandaria' },
  { value: 'security-system', label: 'Sistema de Segurança' },
  { value: 'video-intercom', label: 'Vídeo Porteiro' },
  { value: 'double-glazing', label: 'Vidros Duplos' },
  { value: 'solar-panels', label: 'Painéis Solares' },
  { value: 'sea-view', label: 'Vista Mar' },
  { value: 'mountain-view', label: 'Vista Montanha' },
  { value: 'city-view', label: 'Vista Cidade' },
  { value: 'river-view', label: 'Vista Rio' },
  { value: 'wheelchair-accessible', label: 'Acessível' },
  { value: 'pet-friendly', label: 'Aceita Animais' },
  { value: 'concierge', label: 'Portaria' },
  { value: 'gym', label: 'Ginásio' },
  { value: 'sauna', label: 'Sauna' },
  { value: 'tennis-court', label: 'Court de Ténis' },
  { value: 'playground', label: 'Parque Infantil' }
];

// Inquiry Types
export const INQUIRY_TYPES = [
  { value: 'viewing', label: 'Visita' },
  { value: 'information', label: 'Informação' },
  { value: 'offer', label: 'Proposta' },
  { value: 'general', label: 'Geral' }
];

// Pagination
export const ITEMS_PER_PAGE = 12;

// Date Format
export const DATE_FORMAT = 'dd/MM/yyyy';

// Currency
export const CURRENCY = 'EUR';
export const CURRENCY_SYMBOL = '€';
