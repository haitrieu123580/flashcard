import { ReactNode, useEffect, useLayoutEffect } from 'react';
import { ModeToggle } from '@/components/themes/ModeToggle';
// import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import MainHeader from '../common/header/main-header/MainHeader';
import MainHeaderMobile from '../common/header/main-header/MainHeaderMobile';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import Footer from '../common/footer/Footer';
import { Separator } from '../ui/separator';
import { getProfileAction } from '@/redux/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '@/routes/path';
import Constants from '@/lib/Constants';
import { SidebarNav } from '../common/sidbar-nav/SidebarNav';
import { Card } from "@/components/ui/card"
import { Outlet } from 'react-router-dom';
type AdminLayoutProps = {
    children?: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useSelector((state: any) => state.Auth);
    // const { setAuth } = useAuth();
    const getProfile = () => {
        dispatch({
            type: getProfileAction.type,
            payload: {
                onSuccess: (data: any) => {
                    if (data) {
                        // setAuth(data)
                    }
                },
                onError: () => {
                }
            }
        })
    }
    useEffect(() => {

        getProfile();
    }, [])

    return (
        <div className=''>
            <div className='dark:bg-background min-h-screen flex flex-col w-full'>
                <header className="flex h-fit w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                    <MaxWidthWrapper>
                        <MainHeaderMobile isAdmin={true} />
                        <MainHeader isAdmin={true} />
                    </MaxWidthWrapper>
                </header>
                <Separator />
                <div className="flex flex-1">
                    <MaxWidthWrapper className='h-full'>
                        <div className='mt-2 flex flex-col md:flex-row gap-4 w-full h-full relative'>
                            {/* <div className='flex md:fixed'
                            >
                            </div> */}
                            <SidebarNav
                                items={Constants.SidebarNavItems}
                            />
                            <Card className='flex-1 md:ml-6 md:px-6 bg-transparent border-none shadow-none'>
                                {
                                    profile
                                    &&
                                    <Outlet />
                                }

                            </Card>
                        </div>
                        <div className='fixed bottom-10 right-10'><ModeToggle /></div>
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
