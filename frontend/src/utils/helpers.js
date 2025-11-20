import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

/**
 * Format date to Portuguese format
 */
export const formatDate = (date, dateFormat = 'dd/MM/yyyy') => {
  if (!date) return '';
  return format(new Date(date), dateFormat, { locale: pt });
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: pt });
};

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);

  const intervals = {
    ano: 31536000,
    mês: 2592000,
    semana: 604800,
    dia: 86400,
    hora: 3600,
    minuto: 60
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return interval === 1 ? `há 1 ${unit}` : `há ${interval} ${unit}s`;
    }
  }

  return 'agora mesmo';
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate URL slug from text
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim();
};

/**
 * Get property status label in Portuguese
 */
export const getPropertyStatusLabel = (status) => {
  const labels = {
    'for-sale': 'Para Venda',
    'for-rent': 'Para Arrendar',
    'sold': 'Vendido',
    'rented': 'Arrendado',
    'pending': 'Pendente',
    'draft': 'Rascunho'
  };
  return labels[status] || status;
};

/**
 * Get approval status label in Portuguese
 */
export const getApprovalStatusLabel = (status) => {
  const labels = {
    'pending': 'Pendente',
    'approved': 'Aprovado',
    'rejected': 'Rejeitado'
  };
  return labels[status] || status;
};

/**
 * Get property status badge class
 */
export const getPropertyStatusBadge = (status) => {
  const badges = {
    'for-sale': 'badge-info',
    'for-rent': 'badge-info',
    'sold': 'badge-success',
    'rented': 'badge-success',
    'pending': 'badge-warning',
    'draft': 'badge badge-gray'
  };
  return badges[status] || 'badge';
};

/**
 * Get approval status badge class
 */
export const getApprovalStatusBadge = (status) => {
  const badges = {
    'pending': 'badge-warning',
    'approved': 'badge-success',
    'rejected': 'badge-danger'
  };
  return badges[status] || 'badge';
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

/**
 * Build query string from object
 */
export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      query.append(key, params[key]);
    }
  });
  return query.toString();
};

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if user has role
 */
export const hasRole = (user, roles) => {
  if (!user) return false;
  if (typeof roles === 'string') return user.role === roles;
  return roles.includes(user.role);
};

/**
 * Get file size in human readable format
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
