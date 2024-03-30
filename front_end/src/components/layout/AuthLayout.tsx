import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { ModeToggle } from '@/components/themes/ModeToggle';
import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileAction } from '@/redux/auth/slice';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '@/routes/path';


type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state: any) => state.Auth);
    const { profile } = useSelector((state: any) => state.Auth);

    const getProfile = () => {
        dispatch(getProfileAction({
            onSuccess: () => { return; },
            onError: (message: any) => {
                console.log("onError is calling: ", message)
                navigate(routerPaths.LOGIN);
            }
        }));

    }
    useLayoutEffect(() => {
        getProfile();
    }, []);

    return (
        <div>
            <div className='fixed right-10 top-5'><LocalesToggle /> </div>
            <div className='mt-10'>{children}</div>
            <div className='fixed bottom-10 right-10'><ModeToggle /></div>
        </div>
    );
};

export default AuthLayout;
