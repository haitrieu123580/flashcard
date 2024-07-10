import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ModeToggle } from '@/components/themes/ModeToggle';
import { loginSuccessWithOauthAction } from '@/redux/auth/slice';

import Footer from '../common/footer/Footer';
// import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import MainHeader from '../common/header/main-header/MainHeader';
import MainHeaderMobile from '../common/header/main-header/MainHeaderMobile';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import { Separator } from '../ui/separator';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useDispatch();
  const loginSuccessWithOauth = () => {
    dispatch({
      type: loginSuccessWithOauthAction.type,
      payload: {},
    });
  };
  // useEffect(() => {
  //     loginSuccessWithOauth()
  // }, [])

  return (
    <div className="">
      <div className="flex min-h-screen w-full flex-col dark:bg-background">
        <header className="fixed top-0 z-50 flex h-fit w-full bg-blue-300/80 backdrop-blur supports-[backdrop-filter]:bg-blue-500/60 dark:bg-background/95">
          <MaxWidthWrapper>
            <MainHeaderMobile />
            <MainHeader className="p-0" />
          </MaxWidthWrapper>
        </header>
        <Separator />
        <div className="my-24 flex flex-1 md:my-12">
          <MaxWidthWrapper className="m-auto h-full">
            <div className="mt-10 h-full">
              <Outlet />
            </div>
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

export default MainLayout;
