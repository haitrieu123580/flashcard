import { ReactNode, useEffect } from 'react';
import { ModeToggle } from '@/components/themes/ModeToggle';
// import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import MainHeader from '../common/header/main-header/MainHeader';
import MainHeaderMobile from '../common/header/main-header/MainHeaderMobile';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import Footer from '../common/footer/Footer';
import { Separator } from '../ui/separator';
import { Outlet } from 'react-router-dom';
import { loginSuccessWithOauthAction } from "@/redux/auth/slice"
import { useDispatch } from 'react-redux';

type MainLayoutProps = {
    children?: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    const dispatch = useDispatch();
    const loginSuccessWithOauth = () => {
        dispatch({
            type: loginSuccessWithOauthAction.type,
            payload: {

            }
        })
    }
    // useEffect(() => {
    //     loginSuccessWithOauth()
    // }, [])

    return (
        <div className=''>
            <div className=' dark:bg-background min-h-screen flex flex-col w-full'>
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
                            <Outlet />
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

export default MainLayout;
