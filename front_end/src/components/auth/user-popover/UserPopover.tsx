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
import { useDispatch } from "react-redux";
import {
    logoutAction
} from "@/redux/auth/slice"

const UserPopover = () => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutAction());
    }
    return (
        <Popover>
            <PopoverTrigger className="text-sm p-1">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
                <div className="grid gap-4">
                    <Button
                        className="grid grid-cols-2 items- gap-4"
                        variant={"ghost"}
                    >
                        <CircleUserRound />
                        Profile
                    </Button>
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