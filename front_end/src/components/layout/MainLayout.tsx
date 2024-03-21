import { ReactNode } from 'react';
import { ModeToggle } from '@/components/themes/ModeToggle';
// import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import MainHeader from '../common/header/main-header/MainHeader';
import MainHeaderMobile from '../common/header/main-header/MainHeaderMobile';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import Footer from '../common/footer/Footer';
import { Separator } from '../ui/separator';
type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div>
            {/* <div className='fixed right-10 top-5'><LocalesToggle /> </div> */}
            <div className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <MainHeaderMobile />
                <MainHeader />
                <Separator />
            </div>
            <MaxWidthWrapper>
                <div className='mt-10'>{children}</div>
                <div className='fixed bottom-10 right-10'><ModeToggle /></div>
            </MaxWidthWrapper>
            <Footer />
        </div>
    );
};

export default MainLayout;
