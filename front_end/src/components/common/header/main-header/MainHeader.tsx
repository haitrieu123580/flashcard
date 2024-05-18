import Logo from "@/components/common/logo/Logo"
import MaxWidthWrapper from "../../MaxWidthWrapper"
import { FormInput } from "../../custom_input/CustomInput"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/auth/login/LoginForm"
import { RegisterForm } from "@/components/auth/register/RegisterForm"
import { Link, useNavigate } from 'react-router-dom';
import { routerPaths } from "@/routes/path"
import { Search } from 'lucide-react';
import { PlusCircle } from 'lucide-react';
import { Folder } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import UserPopover from "@/components/auth/user-popover/UserPopover"
import { Send } from 'lucide-react';
import Constants from "@/lib/Constants"
import { logoutAction } from "@/redux/auth/slice"
const MainHeader = (props: any) => {
    const { isAdmin, className } = props
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loggedIn, profile } = useSelector((state: any) => state.Auth)
    const [openDialogLogin, setOpenDialogLogin] = useState(false)
    const [openDialogRegister, setOpenDialogRegister] = useState(false)
    const [showSubmit, setShowSubmit] = useState(false)

    const form = useForm()
    const onSubmit = (data: any) => {
        const param: Record<string, string> = {
            page_index: "1",
            filter: Constants.SORT_BY[0].key,
            name: data.search,
        }
        const queryParams = new URLSearchParams(param).toString();
        if (isAdmin) {
            navigate(`${routerPaths.ADMIN_SETS}?${queryParams}`);
        }
        else {
            navigate(`${routerPaths.PUBLIC_SETS}?${queryParams}`);
        }
    }
    const onTextChanged = (value: any) => {
        setShowSubmit(value.length > 0)
    }

    return (
        <div className='hidden md:block md:w-full h-20'>
            <div className='w-full py-6 flex justify-between items-center'>
                <div className="w-1/6 flex items-center row-span-1 md:col-span-1">
                    <Logo />
                    <Button variant={"link"}>
                        <Link to={routerPaths.HOME}>Home</Link>
                    </Button>
                    {
                        loggedIn ?
                            (profile?.role === Constants.ROLE.ADMIN) ? <>
                                <Button variant={"link"} className="w-fit">
                                    <Link to={routerPaths.ADMIN}>Admin site</Link>
                                </Button>
                            </>
                                : <>
                                    <Button variant={"link"} className="w-fit">
                                        <Link to={routerPaths.USER_SETS}>My sets</Link>
                                    </Button>

                                </>
                            : null
                    }
                </div>
                {/* <MaxWidthWrapper >
                   
                </MaxWidthWrapper> */}
                <div className="w-3/6">

                    <Form {...form}>
                        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormInput
                                control={form.control}
                                fieldName="search"
                                // label="Search"
                                placeholder="Search"
                                type="text"
                                className="w-full"
                                icon={
                                    showSubmit ? <Send className="hover:cursor-pointer" /> : <Search />
                                }
                                alignIcon="left"
                                onClickIcon={() => {
                                    onSubmit(form.getValues())
                                }}
                                onChange={onTextChanged}
                            />
                        </form>
                    </Form>
                </div>
                <div className="w-1/6 flex justify-end gap-1">
                    {isAdmin
                        ? <>
                            <Popover>
                                <PopoverTrigger className="text-sm p-1">
                                    <PlusCircle />
                                </PopoverTrigger>
                                <PopoverContent className="w-fit">
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <span ><Folder /></span>
                                                <Button
                                                    className="col-span-2 h-8 text-sm"
                                                    variant={"ghost"}
                                                >
                                                    Vocabulary Sets
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <span ><Folder /></span>
                                                <Button
                                                    variant={"ghost"}
                                                    className="col-span-2 h-8 text-sm"
                                                >
                                                    Grammar Sets
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </>
                        : null}
                    {loggedIn
                        ? (
                            <>
                                <UserPopover />
                                <div></div>
                            </>
                        )
                        : (
                            <>
                                <Dialog open={openDialogLogin} onOpenChange={setOpenDialogLogin}>
                                    <DialogTrigger className="rounded-sm text-sm p-1 w-fit font-semibold  bg-background hover:dark:text-inherit">
                                        Sign in
                                    </DialogTrigger>
                                    <DialogContent>
                                        <LoginForm setOpen={setOpenDialogLogin} />
                                    </DialogContent>
                                </Dialog>
                                <Dialog open={openDialogRegister} onOpenChange={setOpenDialogRegister}>
                                    <DialogTrigger className="rounded-sm text-sm p-1 w-fit font-semibold  bg-background hover:dark:text-inherit">
                                        Sign up
                                    </DialogTrigger>
                                    <DialogContent>
                                        <RegisterForm setOpen={setOpenDialogRegister} />
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default MainHeader