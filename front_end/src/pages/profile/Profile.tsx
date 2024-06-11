import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import { FormInput } from '@/components/common/custom_input/CustomInput';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import EditPopup from '@/components/common/popup/EditPopup';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { getProfileAction } from '@/redux/auth/slice';
import { editUserAction } from '@/redux/user-profile/slice';
import Constants from '@/lib/Constants';
import { objectToFormData } from '@/lib/utils';

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { profile } = useSelector((state: any) => state.Auth);
  const { isLoading } = useSelector((state: any) => state.UserProfile);
  const getProfile = () => {
    dispatch({
      type: getProfileAction.type,
      payload: {
        onSuccess: () => {},
        onError: () => {},
      },
    });
  };
  useEffect(() => {
    if (!profile?.username) {
      getProfile();
    }
  }, [profile]);

  const formSchema = z.object({
    username: z.string().min(2, {
      message: t('login.invalidUsername'),
    }),
    email: z.string().email({
      message: 'invalidEmail',
    }),
    image: z
      .union([
        z.object({
          image: z.any().optional(),
          path: z.string().optional(),
        }),
        z.string().optional(),
      ])
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      image: {
        image: null,
        path: profile?.avatar || '',
      },
    },
  });

  function onSubmit(values: any) {
    const submitValues = {
      ...values,
      image: values?.image?.image ? values?.image?.image : null,
      // is_delete_image: (!values.set_image.image && !values.set_image.path) ? "true" : "false"
    };
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
          });
          getProfile();
        },
        onError: (message: string | undefined) => {
          toast({
            title: 'Edit profile failed',
            description: message ? message : 'Please try again!',
            variant: 'destructive',
          });
        },
      },
    });
  }
  useMemo(() => {
    if (profile) {
      form.reset({
        username: profile?.username,
        email: profile?.email,
        image: {
          image: null,
          path: profile?.avatar || '',
        },
      });
    }
  }, [profile]);
  return (
    <div>
      <LoadingPopup open={isLoading} />
      <Card className="py-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-auto space-y-8 sm:w-full lg:w-2/4"
          >
            <FormInput
              control={form.control}
              fieldName={`image`}
              label="Avatar"
              type={Constants.INPUT_TYPE.AVATAR}
              classNameInput="h-fit"
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
            <div className="flex w-full justify-end">
              <EditPopup
                TriggerComponent={<Button type="button">Save</Button>}
                onConfirmEdit={form.handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </Form>
        {/* </CardContent> */}
      </Card>
    </div>
  );
};

export default Profile;
