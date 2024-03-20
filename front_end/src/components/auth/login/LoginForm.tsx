import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FormInput } from "@/components/common/custom_input/CustomInput"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import Constants from "@/utils/Constants"
import { Link } from "react-router-dom"
import { Separator } from '@/components/ui/separator';
import GoogleIcon from "@/components/common/icons/GoogleIcon"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { routerPaths } from '@/routes/path';

const BACKEND_URL = import.meta.env.VITE_API_URL;

export function LoginForm() {
    const { t } = useTranslation();

    const formSchema = z.object({
        username: z.string().min(2, {
            message: t("login.invalidUsername"),
        }),
        password: z.string().min(6, {
            message: t("login.invalidPassword")
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // dispatch(loginAction({
        //     data: values,
        //     onSuccess: () => {
        //         ShowToastify.showSuccessToast(t("login.success"))
        //         navigate(routerPaths.PROFILE);
        //     },
        //     onError: () => {
        //         ShowToastify.showErrorToast(t("login.error"))
        //     }
        // }));
    }
    const googleAuth = () => {
        window.open(`${BACKEND_URL}/passport/google`, "_self");
    }
    return (
        <Card className="">

            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Login to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-1">
                            <FormInput
                                control={form.control}
                                fieldName="username"
                                label="Username"
                                placeholder="Username"
                                type={Constants.INPUT_TYPE.TEXT}
                                required={true}
                            />
                        </div>
                        <div className="space-y-1">
                            <FormInput
                                control={form.control}
                                fieldName="password"
                                label="Password"
                                placeholder="Password"
                                required={true}
                                type={Constants.INPUT_TYPE.PASSWORD}
                            />
                            <Link to={routerPaths.FORGOT_PASSWORD} className="text-[12px] text-slate-800 font-bold space-y-1">Forgot password?</Link>
                        </div>
                        <div className="space-y-1">
                            <Button
                                type="submit"
                                variant="outline"
                                className="m-auto w-full"
                            >
                                Login
                            </Button>
                        </div>

                    </form>
                </Form>
            </CardContent>

            <CardFooter className="flex flex-col w-full">
                <div className="flex justify-between items-center w-full">
                    <Separator className="w-1/3" />
                    <span>or</span>
                    <Separator className="w-1/3" />
                </div>
                <div>
                    <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => { googleAuth() }}
                        className="m-auto w-full dark:bg-red-400 bg-white my-2 text-rose-500 dark:text-white">
                        <GoogleIcon /> <span className="ml-2">Sign in with Google</span>
                    </Button>
                </div>
            </CardFooter>

        </Card >
    )
}
