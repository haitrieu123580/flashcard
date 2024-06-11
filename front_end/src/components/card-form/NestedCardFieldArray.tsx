import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import { FormInput } from '@/components/common/custom_input/CustomInput';
import { Button } from '@/components/ui/button';
import Constants from '@/lib/Constants';

const NestedCardFieldArray = ({
  nestIndex,
  control,
  fieldName,
  nestedFieldName,
}: {
  nestIndex: number;
  control: any;
  // register: any,
  fieldName: string;
  nestedFieldName: string;
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `${fieldName}.${nestIndex}.${nestedFieldName}`,
  });

  return (
    <div>
      <div className="mt-4 flex items-end gap-4">
        <b>Examples</b>
        <Button
          type="button"
          variant={'ghost'}
          className="h-fit w-fit p-0"
          onClick={() =>
            append({
              sentence: '',
              translation: '',
            })
          }
        >
          <PlusCircleIcon width={20} height={15} />
        </Button>
      </div>
      {fields.map((item, k) => {
        return (
          <div
            key={item.id}
            className="my-2 flex items-end justify-between gap-2"
          >
            <FormInput
              control={control}
              fieldName={`cards.${nestIndex}.example.${k}.sentence`}
              label="Sentence"
              placeholder="Sentence"
              type={Constants.INPUT_TYPE.TEXT}
              className="w-1/2"
            />
            <FormInput
              control={control}
              fieldName={`cards.${nestIndex}.example.${k}.translation`}
              label="Translation"
              placeholder="Translation"
              type={Constants.INPUT_TYPE.TEXT}
              className="w-1/2"
            />
            <Button type="button" variant={'ghost'} onClick={() => remove(k)}>
              <Trash2Icon />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
export default NestedCardFieldArray;
