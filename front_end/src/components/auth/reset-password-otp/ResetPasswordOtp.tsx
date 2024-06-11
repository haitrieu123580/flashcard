import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { toast } from '@/components/ui/use-toast';
import { resetPasswordAction } from '@/redux/forgot-password/slice';

export function ResetPasswordOtp(props: any) {
  const { email } = useSelector((state: any) => state.PasswordReset);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { setOpen } = props;
  const FormSchema = z.object({
    otp: z.string().min(4, {
      message: 'Your one-time password must be 4 characters.',
    }),
    password: z.string().min(6, {
      message: t('login.invalidPassword'),
    }),
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
      email: email,
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    dispatch(
      resetPasswordAction({
        data: values,
        onSuccess: (message: any) => {
          toast({
            title: message,
            description: 'You can now login with your new password.',
            variant: 'default',
          });
          setOpen(false);
        },
        onError: (message: any) => {
          toast({
            title: message,
            // description: message,
            variant: 'destructive',
          });
        },
      }),
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time OTP sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type={'password'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
