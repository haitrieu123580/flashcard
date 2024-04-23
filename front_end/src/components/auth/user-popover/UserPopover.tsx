import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import {
    logoutAction
} from "@/redux/auth/slice"
import { Link, useNavigate } from "react-router-dom";
import { routerPaths } from "@/routes/path";
const BACKEND_URL = import.meta.env.VITE_API_URL;

const UserPopover = () => {
    const { profile } = useSelector((state: any) => state.Auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch({
            type: logoutAction.type,
            payload: {
                onSuccess: () => {
                    navigate(routerPaths.HOME)
                    window.location.reload()
                }
            }
        });
        window.open(`${BACKEND_URL}/passport/logout`, "_self");
    }
    return (
        <Popover>
            <PopoverTrigger className="text-sm p-1 flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {profile?.username}
            </PopoverTrigger>
            <PopoverContent className="w-fit">
                <div className="grid gap-4">
                    <Link to={routerPaths.PROFILE} className="w-full h-full">
                        <Button
                            className="w-full grid grid-cols-2 items- gap-4"
                            variant={"ghost"}
                        >
                            <CircleUserRound />
                            Profile
                        </Button>
                    </Link>
                    <Button
                        className="grid grid-cols-2 items- gap-4"
                        variant={"ghost"}
                        onClick={logout}
                    >
                        <LogOut />
                        Logout
                    </Button>
                </div>
            </PopoverContent>
        </Popover>

    )
}

export default UserPopover