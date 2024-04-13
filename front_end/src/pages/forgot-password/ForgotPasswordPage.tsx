import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Constants from "@/lib/Constants"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { toast } from "@/components/ui/use-toast";
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
import { ResetPasswordOtp } from "@/components/auth/reset-password-otp/ResetPasswordOtp"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import {
    forgotPasswordAction,
} from "@/redux/forgot-password/slice"

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [showOtpDialog, setShowOtpDialog] = useState(false)
    const { email } = useSelector((state: any) => state.PasswordReset)

    const { t } = useTranslation();
    const formSchema = z.object({
        email: z.string().email({
            message: t("login.invalidEmail"),
        }),

    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email || "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(forgotPasswordAction({
            data: values,
            onSuccess: () => {
                setShowOtpDialog(true);
            },
            onError: (message: any) => {
                setShowOtpDialog(false);
                toast({
                    title: message,
                    // description: message,
                    variant: 'destructive',
                })
            }
        }));
    }
    return (
        <>
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
                            >{!email ? "Submit" : "Re-send"}</Button>
                        </CardFooter>
                    </form>
                </Form>

            </Card >
            {showOtpDialog && (
                <>

                    <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog} >
                        <DialogContent onInteractOutside={() => {
                            setShowOtpDialog(true);
                        }}>
                            <div className="w-full">
                                <ResetPasswordOtp setOpen={setShowOtpDialog} />
                            </div>
                            {/* <Card className="!px-0 mt-20" >
                                <CardContent className="space-y-2">
                                    <ResetPasswordOtp setOpen={setShowOtpDialog} />
                                </CardContent>
                            </Card> */}
                        </DialogContent>
                    </Dialog>
                </>
            )
            }
        </>
    )
}

export default ForgotPasswordPage