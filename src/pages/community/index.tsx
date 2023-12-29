import Commubody from '@/components/community/commubody';
import React from 'react';
import { supabase } from '../api/supabase';
import { useSetRecoilState } from 'recoil';
import { fetchDataState, resolutionType } from '@/recoil/atom';

type Props = {
  resolutions: resolutionType[];
};
// { resolutions }: Props
const CommunityPage = () => {
  // const setfetchDataState = useSetRecoilState(fetchDataState);
  // setfetchDataState(resolutions);
  return <Commubody />;
};

export default CommunityPage;

// export async function getStaticProps() {
//   const { data, error } = await supabase.from('resolution').select('*');

//   return {
//     props: {
//       resolutions: data,
//     },
//   };
// }
