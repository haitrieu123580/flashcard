import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { FormInput } from '@/components/common/custom_input/CustomInput';
import GoogleIcon from '@/components/common/icons/GoogleIcon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { registerAction } from '@/redux/auth/slice';
import Constants from '@/lib/Constants';

const BACKEND_URL = import.meta.env.VITE_API_URL;

export function RegisterForm(props: any) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setOpen } = props;
  const formSchema = z.object({
    username: z.string().min(2, {
      message: t('login.invalidUsername'),
    }),
    email: z.string().email({
      message: t('login.invalidEmail'),
    }),
    password: z.string().min(6, {
      message: t('login.invalidPassword'),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(
      registerAction({
        data: values,
        onSuccess: () => {
          setOpen(false);
          toast({
            title: 'Sign-up success',
            description: 'Welcome!',
            variant: 'default',
          });
          // navigate(routerPaths.PROFILE);
        },
        onError: (message: string | undefined) => {
          setOpen(true);
          toast({
            title: 'Register failed',
            description: message || 'Please register again!',
            variant: 'destructive',
          });
        },
      }),
    );
  }
  const googleAuth = () => {
    window.open(`${BACKEND_URL}/passport/google`, '_self');
  };
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Register to create an account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <FormInput
                control={form.control}
                fieldName="email"
                label="Email"
                placeholder="Email"
                type={Constants.INPUT_TYPE.EMAIL}
                required={true}
              />
            </div>
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
            </div>
            <div className="mt-4 space-y-1">
              <Button type="submit" variant="default" className="m-auto w-full">
                Sign up
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex w-full flex-col">
        {/* <div className="flex justify-between items-center w-full">
                    <Separator className="w-1/3" />
                    <span>or</span>
                    <Separator className="w-1/3" />
                </div> */}
        {/* <div>
                    <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => { googleAuth() }}
                        className="m-auto w-full dark:bg-red-400 bg-white my-2 text-rose-500 dark:text-white">
                        <GoogleIcon /> <span className="ml-2">Sign in with Google</span>
                    </Button>
                </div> */}
      </CardFooter>
    </Card>
  );
}
