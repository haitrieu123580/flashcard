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
import { LoginForm } from "@/components/auth/login/LoginForm"
import { RegisterForm } from "@/components/auth/register/RegisterForm"

const MainHeaderMobile = () => {
    const form = useForm()
    const onSubmit = (data: any) => {

    }
    return (
        <>
            <div className='w-full md:hidden p-2 mb-2'>
                <div className='w-full grid grid-cols-2 mb-2'>
                    <div className="flex items-center col-span-1">
                        <Logo />
                    </div>
                    <div className="col-span-1 flex justify-end">
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
                                icon={<Search />}
                            />
                        </form>
                    </Form>
                </MaxWidthWrapper>
            </div>
            <Separator />
        </>
    )
}

export default MainHeaderMobile