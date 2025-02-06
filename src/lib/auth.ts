import { supabase } from './supabase';

export async function isAdmin(userId: string) {
  const { data: userRoles, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (error || !userRoles) return false;
  return userRoles.role === 'admin';
} 