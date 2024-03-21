import Logo from "@/components/common/logo/Logo"
import { Separator } from "@/components/ui/separator"
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
import { Link } from "react-router-dom"
import { routerPaths } from "@/routes/path"
import { Search } from 'lucide-react';
import { PlusCircle } from 'lucide-react';
import { Folder } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import UserPopover from "@/components/auth/user-popover/UserPopover"
const MainHeader = () => {
    const { loggedIn } = useSelector((state: any) => state.Auth)
    const [openDialogLogin, setOpenDialogLogin] = useState(false)
    const [openDialogRegister, setOpenDialogRegister] = useState(false)
    const form = useForm()
    const onSubmit = (data: any) => {

    }
    return (
        <div className='hidden md:block md:w-full h-20'>
            <div className='w-full p-6 grid grid-flow-row md:grid-cols-12 items-center'>
                <div className="flex items-center row-span-1 md:col-span-1">
                    <Logo />
                    <Button variant={"ghost"}>
                        <Link to={routerPaths.HOME}>Home</Link>
                    </Button>
                    <Button variant={"ghost"}>Your library</Button>
                </div>
                <MaxWidthWrapper className="row-span-12 md:col-span-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormInput
                                control={form.control}
                                fieldName="search"
                                // label="Search"
                                placeholder="Search"
                                type="text"
                                className="w-full"
                                icon={<Search />}
                                alignIcon="left"
                            />
                        </form>
                    </Form>
                </MaxWidthWrapper>
                <div className="col-span-1 flex justify-between gap-1">
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