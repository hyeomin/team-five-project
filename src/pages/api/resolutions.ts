import { supabase } from './supabase';
import { resolutionType } from '@/recoil/atom';

export const fetchData = async () => {
  try {
    const { data, error } = await supabase.from('resolution').select('*');
    return data;
  } catch (error) {
    console.log('Error', error);
  }
};

export const addResoultion = async (newResolution: resolutionType) => {
  try {
    const { error } = await supabase.from('resolution').insert(newResolution);
  } catch (error) {
    console.log('Error', error);
  }
};
