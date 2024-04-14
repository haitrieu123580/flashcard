// import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        // const response = await axios.get('/refresh', {
        //     withCredentials: true
        // });
        setAuth((prev: any) => {
            return {
                ...prev,
                roles: [],
                accessToken: ""
            }
        });
        return "";
    }
    return refresh;
};

export default useRefreshToken;
