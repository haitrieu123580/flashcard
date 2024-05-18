import { useEffect, useMemo } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { getProfileAction, } from "@/redux/auth/slice"
import { editUserAction } from "@/redux/user-profile/slice"
import { FormInput } from "@/components/common/custom_input/CustomInput"
import { toast } from "@/components/ui/use-toast";
import {
  Card,
} from "@/components/ui/card"
import {
  Form,
} from "@/components/ui/form"
import Constants from "@/lib/Constants"
import { Button } from "@/components/ui/button"
import EditPopup from "@/components/common/popup/EditPopup"
import { objectToFormData } from "@/lib/utils"
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
    image: z.union([
      z.object({
        image: z.any().optional(),
        path: z.string().optional()
      }),
      z.string().optional()
    ]).optional()

  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      image: {
        image: null,
        path: profile?.avatar || "",
      },
    },
  })

  function onSubmit(values: any) {
    const submitValues = {
      ...values,
      image: values?.image?.image ? values?.image?.image : null,
      // is_delete_image: (!values.set_image.image && !values.set_image.path) ? "true" : "false"
    }
    const formData = objectToFormData(submitValues);
    dispatch({
      type: editUserAction.type,

      payload: {
        data: formData,
        onSuccess: (message: string | undefined) => {
          toast({
            title: 'Edit profile success',
            description: message ? message : '',
            variant: 'default',
          })
          getProfile();
        },
        onError: (message: string | undefined) => {
          toast({
            title: 'Edit profile failed',
            description: message ? message : 'Please try again!',
            variant: 'destructive',
          })
        }
      }

    })
  }
  useMemo(() => {
    if (profile) {
      form.reset({
        username: profile?.username,
        email: profile?.email,
        image: {
          image: null,
          path: profile?.avatar || "",
        }
      });
    }
  }, [profile])
  return (
    <div>
      <Card className="py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 sm:w-full lg:w-2/4  m-auto ">
            <FormInput
              control={form.control}
              fieldName={`image`}
              label="Avatar"
              type={Constants.INPUT_TYPE.AVATAR}
              classNameInput='h-fit'
            />
            <FormInput
              control={form.control}
              fieldName="email"
              label="Email"
              placeholder="Email"
              type={Constants.INPUT_TYPE.EMAIL}
              readOnly={true}
            />
            <FormInput
              control={form.control}
              fieldName="username"
              label="Username"
              placeholder="Username"
              type={Constants.INPUT_TYPE.TEXT}
            />
            <div className="w-full flex justify-end">
              <EditPopup
                TriggerComponent={
                  <Button type="button" >
                    Save
                  </Button>
                }
                onConfirmEdit={form.handleSubmit(onSubmit)}
              />
            </div>


          </form>
        </Form>
        {/* </CardContent> */}
      </Card>

    </div >
  )
}

export default Profile
