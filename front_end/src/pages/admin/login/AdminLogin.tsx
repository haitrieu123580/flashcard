import { useEffect } from "react"
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
import Constants from "@/lib/Constants"
// import { Link } from "react-router-dom"
import { Separator } from '@/components/ui/separator';
import GoogleIcon from "@/components/common/icons/GoogleIcon"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { routerPaths } from '@/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "@/components/ui/use-toast";
import { loginAction } from "@/redux/auth/slice";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "@/components/common/loading/loading-spinner/LoadingSpinner"
const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
    const { isLoading, loggedIn } = useSelector((state: any) => state.Auth);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // ! check if user is logged in
        if (loggedIn) {
            navigate(routerPaths.ADMIN_DASHBOARD);
        }
    }, [loggedIn])
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
        dispatch(loginAction({
            data: values,
            onSuccess: () => {
                navigate(routerPaths.ADMIN_DASHBOARD);
                toast({
                    title: 'Login success',
                    description: 'Welcome back!',
                    variant: 'default',
                })
            },
            onError: (message: string) => {
                toast({
                    title: 'Login failed',
                    description: message ? message : 'Please login again!',
                    variant: 'destructive',
                })
            }
        }));
    }
    const gotoForgotPassword = () => {
        navigate(routerPaths.FORGOT_PASSWORD);
    }
    const googleAuth = () => {
        window.open(`${BACKEND_URL}/passport/google`, "_self");
    }
    return (
        <>
            {isLoading
                ? <div className="flex justify-center items-center"> <LoadingSpinner /></div>
                : (
                    <Card className="w-1/2 m-auto">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login to admin site
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
                                        <Button variant={"link"}
                                            type="button"
                                            onClick={gotoForgotPassword}
                                        >
                                            Forgot password?
                                        </Button>
                                    </div>
                                    <div className="space-y-1">
                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="m-auto w-full"
                                        >
                                            Login
                                        </Button>
                                    </div>

                                </form>
                            </Form>
                        </CardContent>

                        {/* <CardFooter className="flex flex-col w-full">
                            <div className="flex justify-between items-center w-full">
                                <Separator className="w-1/3" />
                                <span>or</span>
                                <Separator className="w-1/3" />
                            </div>
                            <div className="w-full">
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    onClick={() => { googleAuth() }}
                                    className="m-auto w-full dark:bg-red-400 bg-white my-2 text-rose-500 dark:text-white">
                                    <GoogleIcon /> <span className="ml-2">Sign in with Google</span>
                                </Button>
                            </div>
                        </CardFooter> */}

                    </Card >
                )}
        </>
    )
}

export default AdminLogin