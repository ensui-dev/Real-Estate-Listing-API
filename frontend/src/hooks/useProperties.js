import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesAPI } from '../api/properties';
import { toast } from 'react-toastify';

export const useProperties = (filters = {}) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertiesAPI.getProperties(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProperty = (id) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesAPI.getProperty(id),
    enabled: !!id,
  });
};

export const useMyProperties = () => {
  return useQuery({
    queryKey: ['myProperties'],
    queryFn: () => propertiesAPI.getMyProperties(),
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertiesAPI.createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['myProperties'] });
      toast.success('Property created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create property');
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => propertiesAPI.updateProperty(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['myProperties'] });
      toast.success('Property updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update property');
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertiesAPI.deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['myProperties'] });
      toast.success('Property deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete property');
    },
  });
};
