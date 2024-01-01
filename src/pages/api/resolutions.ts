import { resolutionType } from '@/types/ResoultionTypes';
import { supabase } from './supabase';

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

export const addResoultion = async (
  newResolution: Omit<resolutionType, 'id'>,
) => {
  try {
    const { data, error } = await supabase
      .from('resolution')
      .insert(newResolution);
    console.log('애드레솔루션', data);
  } catch (error) {
    console.log('Error', error);
  }
};

export const editResolution = async ({ id, content }: editResolutionType) => {
  try {
    console.log(content);
    const { error } = await supabase
      .from('resolution')
      .update({ content: content })
      .eq('id', id);
  } catch (error) {
    console.log('Error', error);
  }
};

export const deleteResolution = async (id: number) => {
  try {
    await supabase.from('resolution').delete().eq('id', id);
  } catch (error) {
    console.log('Error', error);
  }
};

type updateProgressType = {
  id: number;
  progress: number;
};

export const updateProgress = async ({ id, progress }: updateProgressType) => {
  try {
    await supabase
      .from('resolution')
      .update({ progress: progress })
      .eq('id', id);
  } catch (error) {
    console.log('Error', error);
  }
};
