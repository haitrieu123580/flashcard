import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { ModeToggle } from '@/components/themes/ModeToggle';
// import { SidebarNav } from '../common/sidbar-nav/SidebarNav';
import { Card } from '@/components/ui/card';
import { getProfileAction } from '@/redux/auth/slice';
import Constants from '@/lib/Constants';

import Footer from '../common/footer/Footer';
// import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import MainHeader from '../common/header/main-header/MainHeader';
import MainHeaderMobile from '../common/header/main-header/MainHeaderMobile';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import { Separator } from '../ui/separator';

type AuthLayoutProps = {
  children?: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state: any) => state.Auth);
  const getProfile = () => {
    dispatch({
      type: getProfileAction.type,
      payload: {
        onSuccess: (data: any) => { },
        onError: () => { },
      },
    });
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="bg-background-400">
      <div className="flex min-h-screen w-full flex-col dark:bg-background">
        <header className="fixed top-0 z-50 flex h-fit w-full bg-blue-300/80 backdrop-blur supports-[backdrop-filter]:bg-blue-500/60 dark:bg-background/95">
          <MaxWidthWrapper>
            <MainHeaderMobile />
            <MainHeader className="p-0" />
          </MaxWidthWrapper>
        </header>
        <Separator />
        <div className="!md:my-10 my-24 flex flex-1">
          <MaxWidthWrapper className="m-auto h-full">
            <div className="mt-10 h-full">{profile && <Outlet />}</div>
            <div className="fixed bottom-10 right-10">
              <ModeToggle />
            </div>
          </MaxWidthWrapper>
        </div>
        <Separator />
        <footer className="flex h-fit w-full">
          <MaxWidthWrapper>
            <Footer />
          </MaxWidthWrapper>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
