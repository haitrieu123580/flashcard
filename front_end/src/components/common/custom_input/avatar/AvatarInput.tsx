import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Accept } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PencilIcon, Trash2, User } from "lucide-react"

interface FileInfo {
    path: string;
}

interface FileDropzoneProps {
    type: string;
    placeholder: string;
    classNameInput: string;
    onKeyUp: () => void;
    field: any;
    maxLength: number;
    multipleFile: boolean;
    accept: string;
    name: string;
}

export const AvatarInput: React.FC<FileDropzoneProps> = ({
    type,
    placeholder,
    classNameInput,
    onKeyUp,
    field,
    maxLength,
    multipleFile,
    accept,
    name,
}) => {
    const { setValue, watch } = useFormContext();
    const [show, setShow] = useState(false);
    const [fileInfo, setFileInfo] = useState<FileInfo>({
        path: '',
    });
    const fileRef = useRef<HTMLInputElement>(null);

    const onUpdate = () => {
        setShow(true);
        fileRef?.current?.click();
    };

    const onDelete = () => {
        setShow(false);
        setValue(name, "");
    };

    const onClick = () => {
        fileRef?.current?.click();
    };

    const watchValue = watch(name);

    useEffect(() => {
        if (!watchValue) {
            return;
        }
        const { path, image } = watchValue;
        if (path || image) {
            setFileInfo({ path: path || URL.createObjectURL(image) });
            setShow(true);
        } else {
            setShow(false);
        }
    }, [name, watchValue]);

    const { getRootProps, getInputProps } = useDropzone({
        multiple: multipleFile,
        accept: accept as unknown as Accept,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length) {
                if (!multipleFile) {
                    const reader = new FileReader();
                    setValue(`${name}.image`, acceptedFiles[0]);
                    setValue(`${name}.path`, URL.createObjectURL(acceptedFiles[0]));
                    setFileInfo({
                        path: URL.createObjectURL(acceptedFiles[0])
                    });
                    setShow(true);
                    return;
                } else { //multiple files
                    setValue(name, acceptedFiles);
                }
            }
            return;
        },
        noClick: true,
    });

    return (
        <>
            <div
                {...getRootProps({
                    className: `overflow-hidden flex flex-col items-center justify-center w-full `,
                })}
            >
                <div className={cn("relative w-fit m-auto")}>
                    <Avatar className={cn("w-36 h-36 aspect-square m-auto mb-3",)}>
                        {show &&
                            <AvatarImage src={fileInfo.path ? fileInfo.path : ""}
                                className={cn("w-full h-full object-cover", `${fileInfo.path ? "" : "hidden"}`)} />
                        }
                        {!show &&
                            <AvatarImage src={""}
                                className={cn("w-full h-full object-cover", `${fileInfo.path ? "" : "hidden"}`)} />
                        }
                        <AvatarFallback> <User className="w-28 h-28" /></AvatarFallback>
                    </Avatar>
                    <div className='absolute top-0 left-full flex'>
                        <Button
                            type="button"
                            variant={"link"}
                            className=""
                            onClick={(e) => {
                                e.preventDefault();
                                onClick();
                            }}
                        >
                            <PencilIcon />
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            className={cn("", `${!show ? "hidden" : ""}`)}
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete();
                            }}
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>

                </div>
                <Input
                    {...field}
                    {...getInputProps()}
                    type={'file'}
                    className={cn(" border-none z-[-10] absolute ", classNameInput)}
                    onKeyUp={onKeyUp}
                    maxLength={maxLength}
                    ref={fileRef}
                    accept='image/*'
                />

            </div >
        </>
    );
};
