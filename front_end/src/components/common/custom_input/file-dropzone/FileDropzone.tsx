import React, { useEffect, useRef, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import UploadPreview from './UploadPreview';

interface FileInfo {
  //for preview image
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
  readOnly?: boolean;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  type,
  placeholder,
  classNameInput,
  onKeyUp,
  field,
  maxLength,
  multipleFile,
  accept,
  name,
  readOnly = false,
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
    setValue(name, '');
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
            path: URL.createObjectURL(acceptedFiles[0]),
          });
          setShow(true);
          return;
        } else {
          //multiple files
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
          className: `relative overflow-hidden flex flex-col items-center justify-center w-full border-[1px] rounded-lg `,
        })}
      >
        <div
          className={cn(
            'flex w-full flex-col items-center justify-center pb-6 pt-5',
            {
              'absolute z-[-10]': show,
            },
          )}
        >
          <p className="mb-[12px] text-[16px] font-bold">{placeholder}</p>
          <Button
            variant="outline"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
            className="w-[30%] min-w-fit rounded-sm border-[1px] border-input p-[10px] text-primary shadow-none"
          >
            {`Select image`}
          </Button>
          <Input
            {...field}
            {...getInputProps()}
            type={type}
            className={cn('border-none bg-transparent', classNameInput)}
            onKeyUp={onKeyUp}
            maxLength={maxLength}
            ref={fileRef}
            accept="image/*"
          />
        </div>
        <div
          className={`${show ? '' : 'absolute z-[-10] opacity-100'} h-full w-full`}
        >
          <UploadPreview
            show={show}
            path={fileInfo.path}
            onDelete={onDelete}
            onUpdate={onUpdate}
            readonly={readOnly}
          />
        </div>
      </div>
    </>
  );
};
