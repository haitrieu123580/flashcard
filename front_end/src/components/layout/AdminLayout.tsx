import { ReactNode, useEffect, useLayoutEffect } from 'react';
import { routerPaths } from '@/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { ModeToggle } from '@/components/themes/ModeToggle';
import { Card } from '@/components/ui/card';
import { getProfileAction } from '@/redux/auth/slice';
import Constants from '@/lib/Constants';

import Footer from '../common/footer/Footer';
// import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import MainHeader from '../common/header/main-header/MainHeader';
import MainHeaderMobile from '../common/header/main-header/MainHeaderMobile';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import { SidebarNav } from '../common/sidbar-nav/SidebarNav';
import { Separator } from '../ui/separator';

type AdminLayoutProps = {
  children?: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { profile } = useSelector((state: any) => state.Auth);
  // // const { setAuth } = useAuth();
  // const getProfile = () => {
  //   dispatch({
  //     type: getProfileAction.type,
  //     payload: {
  //       onSuccess: (data: any) => {
  //         if (data) {
  //           // setAuth(data)
  //         }
  //       },
  //       onError: () => { },
  //     },
  //   });
  // };
  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <div className="">
      <div className="flex min-h-screen w-full flex-col dark:bg-background">
        <header className="fixed top-0 z-50 flex h-fit w-full bg-blue-300/80 backdrop-blur supports-[backdrop-filter]:bg-blue-500/60 dark:bg-background/95">
          <MaxWidthWrapper>
            <MainHeaderMobile isAdmin={true} />
            <MainHeader isAdmin={true} />
          </MaxWidthWrapper>
        </header>
        <Separator />
        <div className="mb-24 mt-28 flex flex-1">
          <MaxWidthWrapper className="h-full">
            <div className="relative mt-2 flex h-full w-full flex-col gap-4 md:flex-row">
              {/* <div className='flex md:fixed'
                            >
                            </div> */}
              <div className="fixed z-[49] w-fit rounded-md bg-background md:h-fit md:w-fit">
                <SidebarNav items={Constants.SidebarNavItems} />
              </div>
              <div className="mt-10 w-full md:ml-24 md:mt-0">
                <Card className="flex-1 border-none bg-transparent shadow-none md:ml-6 md:px-6">
                  {/* {profile && <Outlet />} */}
                  {<Outlet />}
                </Card>
              </div>
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

export default AdminLayout;
