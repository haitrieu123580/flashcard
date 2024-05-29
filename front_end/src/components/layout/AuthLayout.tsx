import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { ModeToggle } from '@/components/themes/ModeToggle';
// import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import MainHeader from '../common/header/main-header/MainHeader';
import MainHeaderMobile from '../common/header/main-header/MainHeaderMobile';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import Footer from '../common/footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileAction } from '@/redux/auth/slice';
import { Outlet, useNavigate } from 'react-router-dom';
import { routerPaths } from '@/routes/path';
import Constants from '@/lib/Constants';
// import { SidebarNav } from '../common/sidbar-nav/SidebarNav';
import { Card } from "@/components/ui/card"
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
                onSuccess: (data: any) => {
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
        <div className='bg-background-400'>
            <div className='dark:bg-background min-h-screen flex flex-col w-full'>
                <header className="flex h-fit w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                    <MaxWidthWrapper>
                        <MainHeaderMobile />
                        <MainHeader className="p-0" />
                    </MaxWidthWrapper>
                </header>
                <Separator />
                <div className="flex flex-1">
                    <MaxWidthWrapper className='h-full m-auto'>
                        <div className='mt-10 h-full'>
                            {
                                profile
                                &&
                                <Outlet />
                            }
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

export default AuthLayout;
