import { useState } from 'react';
import { routerPaths } from '@/routes/path';
import { Folder, PlusCircle, Search, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { LoginForm } from '@/components/auth/login/LoginForm';
import { RegisterForm } from '@/components/auth/register/RegisterForm';
import UserPopover from '@/components/auth/user-popover/UserPopover';
import Logo from '@/components/common/logo/Logo';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import Constants from '@/lib/Constants';

import { FormInput } from '../../custom_input/CustomInput';
import MaxWidthWrapper from '../../MaxWidthWrapper';
import { getUserJWTDecode } from '@/lib/utils';
const userProfile = getUserJWTDecode();
const MainHeaderMobile = (props: any) => {
  const { isAdmin } = props;
  const { loggedIn, profile } = useSelector((state: any) => state.Auth);
  const navigate = useNavigate();
  const [openDialogLogin, setOpenDialogLogin] = useState(false);
  const [openDialogRegister, setOpenDialogRegister] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const form = useForm();
  const onTextChanged = (value: any) => {
    setShowSubmit(value.length > 0);
  };

  const onSubmit = (data: any) => {
    const param: Record<string, string> = {
      page_index: '1',
      filter: Constants.SORT_BY[0].key,
      name: data.search,
    };
    const queryParams = new URLSearchParams(param).toString();
    if (isAdmin) {
      navigate(`${routerPaths.ADMIN_SETS}?${queryParams}`);
    } else {
      navigate(`${routerPaths.PUBLIC_SETS}?${queryParams}`);
    }
  };
  return (
    <>
      <div className="mb-2 w-full py-2 md:hidden">
        <div className="mb-2 flex w-full justify-between">
          <div className="col-span-1 flex items-center">
            <Button variant={'ghost'}>
              <Link to={routerPaths.HOME}>
                <Logo />
              </Link>
            </Button>
            <Button variant={'link'} className="text-black">
              <Link to={routerPaths.PUBLIC_SETS}>Topic sets</Link>
            </Button>
            {loggedIn ? (
              userProfile?.role === Constants.ROLE.ADMIN ? (
                <>
                  <Button variant={'link'} className="w-fit text-black">
                    <Link to={routerPaths.ADMIN}>Admin site</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant={'link'} className="w-fit text-black">
                    <Link to={routerPaths.USER_SETS}>My sets</Link>
                  </Button>
                </>
              )
            ) : null}
          </div>
          <div className="col-span-1 flex justify-end gap-2">
            {loggedIn ? (
              <>
                <UserPopover />
                <div></div>
              </>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
                    Sign in
                  </DialogTrigger>
                  <DialogContent>
                    <LoginForm />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
                    Sign up
                  </DialogTrigger>
                  <DialogContent>
                    <RegisterForm />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
        <MaxWidthWrapper className="w-full p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                control={form.control}
                fieldName="search"
                // label="Search"
                placeholder="Search"
                type="text"
                className="w-full"
                onChange={onTextChanged}
                icon={
                  showSubmit ? (
                    <Send className="hover:cursor-pointer" />
                  ) : (
                    <Search />
                  )
                }
                alignIcon="left"
                onClickIcon={() => {
                  onSubmit(form.getValues());
                }}
              />
            </form>
          </Form>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default MainHeaderMobile;
