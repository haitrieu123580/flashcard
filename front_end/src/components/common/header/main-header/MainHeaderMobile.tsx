import Logo from "@/components/common/logo/Logo"
import { Separator } from "@/components/ui/separator"
import MaxWidthWrapper from "../../MaxWidthWrapper"
import { FormInput } from "../../custom_input/CustomInput"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Search } from 'lucide-react';
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
import { LoginForm } from "@/components/auth/login/LoginForm"
import { RegisterForm } from "@/components/auth/register/RegisterForm"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { routerPaths } from "@/routes/path"
import { PlusCircle } from 'lucide-react';
import { Folder } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import UserPopover from "@/components/auth/user-popover/UserPopover"
import Constants from "@/utils/Constants"
import { useNavigate } from "react-router-dom"
import { Send } from 'lucide-react';

const MainHeaderMobile = (props: any) => {
    const { isAdmin } = props
    const { loggedIn } = useSelector((state: any) => state.Auth)
    const navigate = useNavigate();
    const [openDialogLogin, setOpenDialogLogin] = useState(false)
    const [openDialogRegister, setOpenDialogRegister] = useState(false)
    const [showSubmit, setShowSubmit] = useState(false)
    const form = useForm()
    const onTextChanged = (value: any) => {
        setShowSubmit(value.length > 0)
    }

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
    return (
        <>
            <div className='w-full md:hidden p-2 mb-2'>
                <div className='w-full flex justify-between mb-2'>
                    <div className="flex items-center col-span-1">
                        <Button variant={"ghost"}>
                            <Link to={routerPaths.HOME}><Logo /></Link>
                        </Button>
                        {/* <Button variant={"ghost"}>Your library</Button> */}
                    </div>
                    <div className="col-span-1 flex justify-end">
                        {isAdmin && (
                            <>
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
                        )}
                        {loggedIn
                            ? (
                                <>
                                    <UserPopover />
                                    <div></div>
                                </>
                            )
                            : (
                                <>
                                    <Dialog>
                                        <DialogTrigger className="rounded-sm border-[1px] p-2 hover:bg-slate-400 hover:text-white">
                                            Sign in
                                        </DialogTrigger>
                                        <DialogContent>
                                            <LoginForm />
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger className="rounded-sm border-[1px] p-2 ml-2 hover:bg-slate-400 hover:text-white">
                                            Sign up
                                        </DialogTrigger>
                                        <DialogContent>
                                            <RegisterForm />
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )
                        }
                    </div>
                </div>
                <MaxWidthWrapper className="w-full p-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormInput
                                control={form.control}
                                fieldName="search"
                                // label="Search"
                                placeholder="Search"
                                type="text"
                                className="w-full"
                                onChange={onTextChanged}
                                icon={
                                    showSubmit ? <Send className="hover:cursor-pointer" /> : <Search />
                                }
                                alignIcon="left"
                                onClickIcon={() => {
                                    onSubmit(form.getValues())
                                }} />
                        </form>
                    </Form>
                </MaxWidthWrapper>
            </div>
        </>
    )
}

export default MainHeaderMobile