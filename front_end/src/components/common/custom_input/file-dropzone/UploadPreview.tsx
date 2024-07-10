import { FC, MouseEvent } from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { PencilIcon, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface UploadPreviewProps {
  show: boolean;
  path?: string;
  onDelete?: () => void;
  onUpdate?: () => void;
  readonly?: boolean;
}

const UploadPreview: FC<UploadPreviewProps> = ({
  show,
  readonly,
  path,
  onDelete = () => {},
  onUpdate = () => {},
}) => {
  console.log("readonly  preview", readonly)
  return (
    <>
      {show && (
        <>
          <div className="flex w-full flex-col bg-transparent px-3 py-[23px] opacity-100">
            <div className="flex h-16 w-full justify-end gap-6">
              {readonly ? null : (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    // className="p-0 h-4 "
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      onUpdate();
                    }}
                  >
                    Change
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    // className="p-0 h-4"
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      onDelete();
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
            <div className="w-full">
              <div className="h-80 w-full bg-transparent">
                <img
                  src={path}
                  alt="set"
                  className="h-full max-h-full w-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UploadPreview;
