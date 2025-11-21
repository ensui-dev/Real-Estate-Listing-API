import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '../api/admin';
import { toast } from 'react-toastify';

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ['adminDashboard'],
    queryFn: adminAPI.getDashboard,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useAdminUsers = (filters = {}) => {
  return useQuery({
    queryKey: ['adminUsers', filters],
    queryFn: () => adminAPI.getUsers(filters),
  });
};

export const useAdminProperties = (filters = {}) => {
  return useQuery({
    queryKey: ['adminProperties', filters],
    queryFn: () => adminAPI.getAdminProperties(filters),
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }) => adminAPI.updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User role updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update user role');
    },
  });
};

export const useApproveProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminAPI.approveProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProperties'] });
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
      toast.success('Property approved successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to approve property');
    },
  });
};

export const useRejectProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, reason }) => adminAPI.rejectProperty(propertyId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProperties'] });
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
      toast.success('Property rejected');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to reject property');
    },
  });
};

export const useBulkApproveProperties = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminAPI.bulkApproveProperties,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['adminProperties'] });
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
      toast.success(`${response.data.modified} properties approved!`);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to approve properties');
    },
  });
};
