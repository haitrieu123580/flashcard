import React from 'react';
import { routerPaths } from '@/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import SetForm from '@/components/set-form/SetForm';
import { toast } from '@/components/ui/use-toast';
import { createUserSetAction } from '@/redux/user-sets/slice';
import { objectToFormData } from '@/lib/utils';

const CreateMySet = () => {
  const { isLoading } = useSelector((state: any) => state.UserSets);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCreate = (values: any) => {
    const submitValues = {
      set_name: values.set_name,
      set_description: values.set_description,
      set_image: values.set_image.image,
      card: values.cards.map((card: any) => ({
        term: card.term,
        define: card.define,
        image: card.image.image,
        example: JSON.stringify(values.cards[0].example),
      })),
    };
    const formData = objectToFormData(submitValues);
    dispatch({
      type: createUserSetAction.type,
      payload: {
        data: formData,
        onSuccess: () => {
          navigate(routerPaths.USER_SETS);
          toast({
            title: 'Create set success',
            variant: 'default',
          });
        },
        onError: (message: string | undefined) => {
          toast({
            title: 'Create failed',
            description: message ? message : 'Please try again!',
            variant: 'destructive',
          });
        },
      },
    });
  };

  return (
    <div>
      <LoadingPopup open={isLoading} />
      <SetForm onCreate={onCreate} />
    </div>
  );
};

export default CreateMySet;
