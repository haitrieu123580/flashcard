import { useEffect, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { getProfileAction } from "@/redux/auth/slice"
import { FormInput } from "@/components/common/custom_input/CustomInput"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
} from "@/components/ui/form"
import Constants from "@/lib/Constants"
const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { profile } = useSelector((state: any) => state.Auth);

  const getProfile = () => {
    dispatch({
      type: getProfileAction.type,
      payload: {
        onSuccess: () => {

        },
        onError: () => {
        }
      }
    })
  }
  // useEffect(() => {
  //   if (profile?.username) {
  //     form.setValue('username', profile?.username);
  //     form.setValue('email', profile?.email);
  //   }
  // }, [profile])
  useEffect(() => {
    if (!profile?.username) {
      getProfile();
    }
  }, [profile])

  const formSchema = z.object({
    username: z.string().min(2, {
      message: t("login.invalidUsername"),
    }),
    email: z.string().email({
      message: 'invalidEmail',
    }),
    password: z.string().min(6, {
      message: t("login.invalidPassword")
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  useMemo(() => {
    // console.log("profile", profile)
    if (profile) {
      form.reset({
        username: profile?.username,
        email: profile?.email,

      });
    }
  }, [profile])
  return (
    <div>
      <Card>
        <CardHeader>
          <Avatar className="w-36 h-36 aspect-square m-auto mb-3">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback> <User className="w-28 h-28" /></AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 sm:w-full lg:w-2/4  m-auto ">
              <FormInput
                control={form.control}
                fieldName="email"
                label="Email"
                placeholder="Email"
                type={Constants.INPUT_TYPE.EMAIL}
                required={true}
              />
              <FormInput
                control={form.control}
                fieldName="username"
                label="Username"
                placeholder="Username"
                type={Constants.INPUT_TYPE.TEXT}
                required={true}
              />
              <FormInput
                control={form.control}
                fieldName="password"
                label="Password"
                placeholder="Password"
                required={true}
                type={Constants.INPUT_TYPE.PASSWORD}
              />
              <div>

              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}

export default Profile
