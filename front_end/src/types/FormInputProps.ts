import React from "react";

export interface FormInputProps {
    control: any;
    type: string;
    label?: string;
    fieldName: string;
    placeholder?: string;
    className?: string;
    classNameInput?: string;
    classNameLabel?: string;
    classNameIcon?: string;
    icon?: any;
    alignIcon?: string;
    onClickIcon?: (e: React.MouseEvent) => void;
    onChange?: (value: boolean | string) => void;
    onKeyUp?: (event: React.KeyboardEvent) => void;
    description?: string;
    errorServer?: string;
    errorServerMap?: any[];
    maxLength?: number;
    options?: any[];
    value?: string;
    labelValidate?: string;
    validate?: any[];
    autoFocus?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    useLabelValidate?: boolean;
    onChangeSelect?: (value: any) => void;
    classNameContent?: string;
    labelCheckbox?: string;
    required?: boolean;
}