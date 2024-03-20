import { useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FormInput } from "@/components/common/custom_input/CustomInput"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import Constants from "@/utils/Constants"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ResetPasswordOtp } from "@/components/auth/reset-password-otp/ResetPasswordOtp"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
const ForgotPasswordPage = () => {
    const [showOtpDialog, setShowOtpDialog] = useState(false)
    const formSchema = z.object({
        email: z.string().min(2, {
            message: "",
        }),

    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        setShowOtpDialog(true)
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
    return (
        <Card className="!px-0" >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Forgot Password</CardTitle>
                        <CardDescription>
                            Enter your email address and we will send you an otp to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <FormInput
                                control={form.control}
                                fieldName="email"
                                label="Email"
                                placeholder="Enter your email address"
                                type={Constants.INPUT_TYPE.EMAIL}
                                required={true}
                            />
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button
                            type="submit"
                            variant="default"
                            className="m-auto w-full"
                        >Submit</Button>
                    </CardFooter>
                </form>
            </Form>
            {showOtpDialog && (
                <>
                    <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog} >
                        {/* <DialogTrigger className="rounded-sm text-sm p-1 w-fit font-semibold hover:bg-slate-100 ">
                            <span>Open OTP Dialog</span>
                        </DialogTrigger> */}
                        <DialogContent>
                            <div className="w-full">
                                <ResetPasswordOtp />
                            </div>
                        </DialogContent>
                    </Dialog>
                </>
            )
            }
        </Card >
    )
}

export default ForgotPasswordPage