import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Constants from '@/utils/Constants';
import { FormInputProps } from '@/types/FormInputProps';
import { isFunction } from '@/utils/Utils';
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
// import Validator from '@/utils/Validator';
// import { Editor } from '../Editor';
import { FileDropzone } from './file-dropzone/FileDropzone';
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
                // accept={accept || {}}
                // multipleFile={multipleFile}
                // size={size}
                />
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
                />
            );
    }
};
