import React from "react";
import { useFieldArray } from "react-hook-form";
import { FormInput } from "@/components/common/custom_input/CustomInput"
import Constants from "@/lib/Constants";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
const NestedCardFieldArray = (
    { nestIndex, control, fieldName, nestedFieldName }: {
        nestIndex: number,
        control: any,
        // register: any,
        fieldName: string,
        nestedFieldName: string,
    }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `${fieldName}.${nestIndex}.${nestedFieldName}`
    });

    return (
        <div>
            {fields.map((item, k) => {
                return (
                    <div key={item.id} className="flex justify-between items-end gap-2 my-2">
                        <FormInput
                            control={control}
                            fieldName={`cards.${nestIndex}.example.${k}.sentence`}
                            label="Sentence"
                            placeholder="Sentence"
                            type={Constants.INPUT_TYPE.TEXT}
                            className='w-1/2'
                        />
                        <FormInput
                            control={control}
                            fieldName={`cards.${nestIndex}.example.${k}.translation`}
                            label="Translation"
                            placeholder="Translation"
                            type={Constants.INPUT_TYPE.TEXT}
                            className='w-1/2'
                        />
                        <Button type="button"
                            variant={'ghost'}
                            onClick={() => remove(k)}>
                            <Trash2Icon />
                        </Button>
                    </div>
                );
            })}

            <Button
                type="button"
                onClick={() =>
                    append({
                        sentence: "",
                        translation: ""
                    })
                }
            >
                Append Nested
            </Button>

            <hr />
        </div>
    );
};
export default NestedCardFieldArray;