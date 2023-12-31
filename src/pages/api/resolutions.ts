import {
  editProgressType,
  editResolutionType,
  resolutionType,
} from '@/types/ResoultionTypes';
import { supabase } from './supabase';

export const fetchData = async () => {
  try {
    const { data, error } = await supabase.from('resolution').select('*');
    return data;
  } catch (error) {
    console.log('Error', error);
  }
};

export const addResoultion = async (
  newResolution: Omit<resolutionType, 'id' | 'created_at'>,
) => {
  try {
    const { error } = await supabase.from('resolution').insert(newResolution);
  } catch (error) {
    console.log('Error', error);
  }
};

export const editResolution = async ({ id, content }: editResolutionType) => {
  try {
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

// Habit Tracker
export const fetchCheckListData = async (id: any) => {
  try {
    const { data, error } = await supabase
      .from('resolution')
      .select(`checkedList`)
      .eq('id', id.queryKey[1]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProgressData = async (id: any) => {
  try {
    const { data, error } = await supabase
      .from('resolution')
      .select(`progress`)
      .eq('id', id.queryKey[1]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editProgress = async ({
  id,
  progress,
  checkedList,
}: editProgressType) => {
  try {
    const { error } = await supabase
      .from('resolution')
      .update({ progress: progress, checkedList: checkedList })
      .eq('id', id);
  } catch (error) {
    console.log('Error', error);
  }
};
