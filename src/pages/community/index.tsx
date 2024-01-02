import Commubody from '@/components/community/commubody';
import { resolutionType } from '@/types/ResoultionTypes';

type Props = {
  resolutions: resolutionType[];
};
const CommunityPage = () => {
  return <Commubody />;
};

export default CommunityPage;
