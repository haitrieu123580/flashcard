import React, { useEffect, useRef, useState } from 'react';
import { PencilIcon, Trash2, User } from 'lucide-react';
import { Accept, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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
          className: `overflow-hidden flex flex-col items-center justify-center w-full `,
        })}
      >
        <div className={cn('relative m-auto w-fit')}>
          <Avatar className={cn('m-auto mb-3 aspect-square h-36 w-36')}>
            {show && (
              <AvatarImage
                src={fileInfo.path ? fileInfo.path : ''}
                className={cn(
                  'h-full w-full object-cover',
                  `${fileInfo.path ? '' : 'hidden'}`,
                )}
              />
            )}
            {!show && (
              <AvatarImage
                src={''}
                className={cn(
                  'h-full w-full object-cover',
                  `${fileInfo.path ? '' : 'hidden'}`,
                )}
              />
            )}
            <AvatarFallback>
              {' '}
              <User className="h-28 w-28" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute left-full top-0 flex">
            <Button
              type="button"
              variant={'link'}
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
              className={cn('', `${!show ? 'hidden' : ''}`)}
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
          className={cn('absolute z-[-10] border-none', classNameInput)}
          onKeyUp={onKeyUp}
          maxLength={maxLength}
          ref={fileRef}
          accept="image/*"
        />
      </div>
    </>
  );
};
