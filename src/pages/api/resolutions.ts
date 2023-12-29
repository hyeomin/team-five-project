import { supabase } from './supabase';
import { resolutionType } from '@/types/ResoultionTypes';

interface editResolutionType {
  id: number;
  content: string;
}

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

export const editResolution = async ({id, content }: editResolutionType) => {
  try {
    console.log(content)
    const { error } = await supabase
    .from('resolution')
    .update({ content: content })
    .eq('id', id)
  } catch (error) {
    console.log('Error', error)
  }
}