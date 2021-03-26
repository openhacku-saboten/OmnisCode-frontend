import { Avatar } from '@material-ui/core';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

type Props = {
  user_id: string;
  className?: string;
};

const UserIcon: React.FC<Props> = ({ user_id, ...other }) => {
  const { data, error } = useSWR(`/user/${user_id}`, fetcher);
  if (error || !data) {
    return <Avatar {...other} />;
  }
  return <Avatar src={data.icon_url} {...other} />;
};

export default UserIcon;
