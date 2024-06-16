import { useEffect, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { Folder, PlusCircle, Search, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
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
import { logoutAction } from '@/redux/auth/slice';
import Constants from '@/lib/Constants';

import { FormInput } from '../../custom_input/CustomInput';
import MaxWidthWrapper from '../../MaxWidthWrapper';

const MainHeader = (props: any) => {
  const { isAdmin, className } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn, profile } = useSelector((state: any) => state.Auth);
  const [openDialogLogin, setOpenDialogLogin] = useState(false);
  const [openDialogRegister, setOpenDialogRegister] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const form = useForm();
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
  const onTextChanged = (value: any) => {
    setShowSubmit(value.length > 0);
  };

  return (
    <div className="hidden h-20 md:block md:w-full">
      <div className="flex h-full w-full items-center justify-between">
        <div className="row-span-1 flex w-fit items-center md:col-span-1">
          <Logo />
          <Button variant={'link'} className="text-black">
            <Link to={routerPaths.PUBLIC_SETS}>Sets</Link>
          </Button>
          {loggedIn ? (
            profile?.role === Constants.ROLE.ADMIN ? (
              <>
                <Button variant={'link'}>
                  <Link to={routerPaths.ADMIN}>Admin site</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant={'link'}>
                  <Link to={routerPaths.USER_SETS}>My sets</Link>
                </Button>
              </>
            )
          ) : null}
        </div>
        {/* <MaxWidthWrapper >
                   
                </MaxWidthWrapper> */}
        <div className="w-3/6">
          <Form {...form}>
            <form className="" onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                control={form.control}
                fieldName="search"
                // label="Search"
                placeholder="Search"
                type="text"
                className="w-full"
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
                onChange={onTextChanged}
              />
            </form>
          </Form>
        </div>
        <div className="flex w-1/6 justify-end gap-1">
          {loggedIn ? (
            <>
              <UserPopover />
              <div></div>
            </>
          ) : (
            <>
              <Dialog open={openDialogLogin} onOpenChange={setOpenDialogLogin}>
                <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
                  Sign in
                </DialogTrigger>
                <DialogContent>
                  <LoginForm setOpen={setOpenDialogLogin} />
                </DialogContent>
              </Dialog>
              <Dialog
                open={openDialogRegister}
                onOpenChange={setOpenDialogRegister}
              >
                <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
                  Sign up
                </DialogTrigger>
                <DialogContent>
                  <RegisterForm setOpen={setOpenDialogRegister} />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
