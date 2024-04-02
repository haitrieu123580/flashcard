import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { getProfileAction } from "@/redux/auth/slice"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useEffect } from "react"
// import { ProfileResponse } from "@/types/ProfileTypes"
const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { profile } = useSelector((state: any) => state.Auth);
  const getProfile = () => {
    dispatch(getProfileAction({
      type: "getProfile",
      onSuccess: () => {
      },
      onError: (message: any) => {
        // navigate(routerPaths.LOGIN);
      }
    }));
  }
  useEffect(() => {
    console.log("profile.jsx: ", profile)

    if (profile?.username) {
      form.setValue('username', profile?.username);
      form.setValue('email', profile?.email);
    }
  }, [profile])
  const formSchema = z.object({
    username: z.string().min(2, {
      message: t("login.invalidUsername"),
    }),
    email: z.string().min(6, {
      message: t("login.invalidPassword")
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
  }
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
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="float-start mb-6">{t("login.username")}</FormLabel>
                    <FormControl>
                      <Input placeholder={""} {...field} className="dark:border-rose-200" />
                    </FormControl>
                    <FormMessage className="text-start text-xs dark:text-rose-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="float-start mb-6">{t("login.email")}</FormLabel>
                    <FormControl >
                      <Input placeholder={""} {...field} className="dark:border-rose-200" />
                    </FormControl>
                    <FormMessage className="text-start text-xs dark:text-rose-600" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>

    </div>
  )
}

export default Profile
