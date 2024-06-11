import { routerPaths } from '@/routes/path';
import { JwtPayload } from 'jwt-decode';
import {
  CircleUserRound,
  History,
  LogOut,
  Percent,
  SettingsIcon,
  User,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { logoutAction } from '@/redux/auth/slice';
import { getUserJWTDecode } from '@/lib/utils';

const userProfile: JwtPayload | any = getUserJWTDecode() || {};
const BACKEND_URL = import.meta.env.VITE_API_URL;

const UserPopover = () => {
  const { profile } = useSelector((state: any) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({
      type: logoutAction.type,
      payload: {
        onSuccess: () => {
          navigate(routerPaths.HOME);
          window.location.reload();
        },
      },
    });
    window.open(`${BACKEND_URL}/passport/logout`, '_self');
  };
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 p-1 text-sm">
        <Avatar>
          <AvatarImage src={profile?.avatar || ''} className="object-cover" />
          <AvatarFallback>
            {' '}
            <User className="h-28 w-28" />
          </AvatarFallback>
        </Avatar>
        {profile?.username || userProfile?.username || ''}
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="grid gap-4">
          <Link to={routerPaths.PROFILE} className="h-full w-full">
            <Button
              className="items- grid w-full grid-cols-2 gap-4"
              variant={'ghost'}
            >
              <CircleUserRound />
              Profile
            </Button>
          </Link>
          <Link to={routerPaths.USER_PROGRESS} className="h-full w-full">
            <Button
              className="items- grid w-full grid-cols-2 gap-4"
              variant={'ghost'}
            >
              <Percent />
              Progress
            </Button>
          </Link>
          <Button
            className="items- grid grid-cols-2 gap-4"
            variant={'ghost'}
            onClick={logout}
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
