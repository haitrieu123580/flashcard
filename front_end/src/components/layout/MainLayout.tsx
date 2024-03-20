import { ReactNode } from 'react';
import { ModeToggle } from '@/components/themes/ModeToggle';
// import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import MainHeader from '../common/header/main-header/MainHeader';
import MainHeaderMobile from '../common/header/main-header/MainHeaderMobile';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div>
            {/* <div className='fixed right-10 top-5'><LocalesToggle /> </div> */}
            <MainHeaderMobile />
            <MainHeader />
            <MaxWidthWrapper>
                <div className='mt-10'>{children}</div>
            </MaxWidthWrapper>
            <div className='fixed bottom-10 right-10'><ModeToggle /></div>
        </div>
    );
};

export default MainLayout;
