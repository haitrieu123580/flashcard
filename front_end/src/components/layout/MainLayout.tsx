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
    useEffect(() => {
        loginSuccessWithOauth()
    }, [])

    return (
        <div className='bg-gray-50 dark:bg-background min-h-[100vh] flex flex-col justify-between'>
            {/* <div className='fixed right-10 top-5'><LocalesToggle /> </div> */}
            <div className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <MaxWidthWrapper className=''>
                    <MainHeaderMobile />
                    <MainHeader className="p-0" />
                </MaxWidthWrapper>
                <Separator />
            </div>
            <div className='h-full'>
                <MaxWidthWrapper className='h-full m-auto'>
                    <div className='mt-10 h-full'>
                        <Outlet />
                    </div>
                    <div className='fixed bottom-10 right-10'><ModeToggle /></div>
                </MaxWidthWrapper>
            </div>
            <Footer />
            <div className='absolute bottom-0 left-0 w-full'>
            </div>

        </div>
    );
};

export default MainLayout;
