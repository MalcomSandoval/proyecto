import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Category } from '../lib/database.types';
import { useAuth } from './useAuth';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', user.id)
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  const createCategory = async (name: string, color: string) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, color, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error creating category:', error);
      return { error };
    }

    setCategories(prev => [...prev, data]);
    return { data, error: null };
  };

  return {
    categories,
    loading,
    createCategory,
    refetch: fetchCategories,
  };
}