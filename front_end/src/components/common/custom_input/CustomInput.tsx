import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Constants from '@/lib/Constants';
import { FormInputProps } from '@/types/FormInputProps';
import { isFunction, cn } from '@/lib/utils';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FileDropzone } from './file-dropzone/FileDropzone';
import { AvatarInput } from './avatar/AvatarInput';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            control,
            type,
            label,
            fieldName,
            placeholder,
            className,
            classNameInput,
            classNameLabel,
            classNameIcon,
            icon,
            alignIcon,
            onClickIcon,
            onChange,
            onKeyUp,
            description,
            maxLength,
            options,
            value,
            // validate = [],
            autoFocus = false,
            disabled = false,
            readOnly = false,
            onChangeSelect,
            classNameContent,
            labelCheckbox,
            required = false,
        },
        ref,
    ) => {
        const handleClickIcon = (e: React.MouseEvent) => {
            if (onClickIcon && isFunction(onClickIcon)) {
                onClickIcon(e);
            }
        };
        return (
            <FormField
                control={control}
                name={fieldName}
                // rules={{ validate: Validator.genValidate(validate, fieldName) }}
                render={({ field }: any) => {
                    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(event.target.value);
                        if (onChange && isFunction(onChange)) {
                            onChange(event.target.value);
                        }
                    };
                    const handleChangeSelect = (value: any) => {
                        if (onChangeSelect && isFunction(onChangeSelect)) {
                            onChangeSelect(value);
                        }
                    };
                    const handleKeyUp = (event: React.KeyboardEvent) => {
                        if (onKeyUp && isFunction(onKeyUp)) {
                            onKeyUp(event);
                        }
                    };

                    const handleCheckboxChange = (value: boolean | string) => {
                        field.onChange(value);
                        if (onChange && isFunction(onChange)) {
                            onChange(value);
                        }
                    };
                    return (
                        <FormItem
                            className={className}
                        >
                            {label ? (
                                <FormLabel className={classNameLabel}>
                                    {label}
                                    {required ? (
                                        <span className="text-red-600 w-fit">*</span>
                                    ) : null}
                                </FormLabel>
                            ) : null}
                            <FormControl>
                                {renderInput({
                                    type,
                                    placeholder,
                                    classNameInput,
                                    icon,
                                    alignIcon,
                                    onClickIcon: handleClickIcon,
                                    onChange: handleChange,
                                    onChangeSelect: handleChangeSelect,
                                    onKeyUp: handleKeyUp,
                                    onCheckboxChange: handleCheckboxChange,
                                    maxLength,
                                    ref,
                                    field,
                                    value,
                                    options,
                                    disabled,
                                    readOnly,
                                    classNameIcon,
                                    autoFocus,
                                    classNameContent,
                                    labelCheckbox,
                                })}
                            </FormControl>
                            {description ? (
                                <FormDescription>{description}</FormDescription>
                            ) : null}
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />
        );
    },
);

FormInput.displayName = 'FormInput';

const renderInput = ({
    value,
    type,
    placeholder,
    classNameInput,
    icon,
    alignIcon,
    onClickIcon,
    onChange,
    onKeyUp,
    field,
    maxLength,
    options,
    disabled,
    readOnly,
    classNameIcon,
    autoFocus,
    onChangeSelect,
    classNameContent,
    labelCheckbox,
    onCheckboxChange,
    ref,
}: any) => {
    switch (type) {
        case Constants.INPUT_TYPE.TEXT:
        case Constants.INPUT_TYPE.EMAIL:
        case Constants.INPUT_TYPE.PASSWORD:
            return (
                <Input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={classNameInput}
                    icon={icon}
                    alignIcon={alignIcon}
                    onClickIcon={onClickIcon}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    maxLength={maxLength}
                    disabled={disabled}
                    readOnly={readOnly}
                    classNameIcon={classNameIcon}
                    autoFocus={autoFocus}
                    ref={ref}
                />
            );
        case Constants.INPUT_TYPE.CHECKBOX:
            return (
                <Checkbox
                    {...field}
                    checked={field.value}
                    onCheckedChange={onCheckboxChange}
                    className={classNameInput}
                    disabled={disabled}
                    label={labelCheckbox}
                />
            );

        case Constants.INPUT_TYPE.SELECT:
            return (
                <Select
                    {...field}
                    onValueChange={(e: string) => {
                        field.onChange(e);
                        onChangeSelect(e);
                    }}
                    disabled={disabled}
                >
                    <SelectTrigger className={`w-full ${classNameInput}`}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className={classNameContent}>
                        {options?.map((x: any, index: number) => {
                            return (
                                <SelectItem key={index} value={x?.key}>
                                    {x?.label}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            );

        case Constants.INPUT_TYPE.TEXTAREA:
            return (
                <Textarea
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={classNameInput}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    maxLength={maxLength}
                    ref={ref}
                />
            );
        case Constants.INPUT_TYPE.FILE_UPLOAD:
            return (
                <FileDropzone
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={classNameInput}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    maxLength={maxLength}
                    disabled={disabled}
                    readOnly={readOnly}
                    onClickIcon={onClickIcon}
                />
            );
        case Constants.INPUT_TYPE.AVATAR:
            return (
                <AvatarInput
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={classNameInput}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    maxLength={maxLength}
                    disabled={disabled}
                    readOnly={readOnly}
                    onClickIcon={onClickIcon}
                />
            );
        case Constants.INPUT_TYPE.RADIO:
            return (
                <RadioGroup
                    {...field}
                    value={field.value?.toString()}
                    onValueChange={(e) => {
                        field.onChange(e);
                        onChangeSelect(e);
                    }}
                    disabled={disabled}
                    className={cn('grid grid-cols-2 gap-2', classNameInput)}
                >
                    {options?.map((x: any, index: number) => {
                        const id = React.useId();
                        const formItemId = `${id}-form-item`;

                        return (
                            <div key={index}
                                className={cn(`flex items-center w-full border rounded-sm p-4 gap-2 
                                ${field.value?.toString() === x.key ? 'border-blue-300' : ''}
                                `, classNameContent)}

                            >
                                <RadioGroupItem
                                    value={x.key?.toString()}
                                    id={formItemId}
                                />
                                <FormLabel
                                    className={cn("w-full flex items-center justify-start",
                                        classNameContent)}
                                    htmlFor={formItemId}>{x.label}</FormLabel>
                            </div>
                        );
                    })}
                </RadioGroup>
            );

        default:
            return (
                <Input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={classNameInput}
                    icon={icon}
                    alignIcon={alignIcon}
                    onClickIcon={onClickIcon}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    maxLength={maxLength}
                    disabled={disabled}
                    readOnly={readOnly}
                    classNameIcon={classNameIcon}
                    autoFocus={autoFocus}
                    ref={ref}
                    value={value}
                />
            );
    }
};
