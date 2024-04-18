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
import { SidebarNavItems } from "@/lib/utils"
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
        <div>
            <div className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <MainHeaderMobile isAdmin={true} />
                <MainHeader isAdmin={true} />
                <Separator />
            </div>
            <MaxWidthWrapper>
                <div className='mt-2 md:mt-10 grid grid-rows-1 md:grid-cols-12 gap-10 min-h-[70vh]'>
                    <div className='row-span-1 md:col-span-2'>
                        <SidebarNav items={SidebarNavItems} className='md:fixed ' />
                    </div>
                    <Card className='row-span-1 px-3 md:col-span-10 md:ml-6 md:px-6'>
                        {/* {children} */}
                        {
                            profile
                            &&
                            <Outlet />
                        }

                    </Card>
                </div>
                <div className='fixed bottom-10 right-10'><ModeToggle /></div>
            </MaxWidthWrapper>
            <Footer />
        </div>
    );
};

export default AdminLayout;
