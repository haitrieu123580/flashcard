import { FC, MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2 } from 'lucide-react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

interface UploadPreviewProps {
    show: boolean;
    path?: string;
    onDelete?: () => void;
    onUpdate?: () => void;
}

const UploadPreview: FC<UploadPreviewProps> = ({
    show,

    path,
    onDelete = () => { },
    onUpdate = () => { },
}) => {
    return (
        <>
            {show && (
                <>
                    <div
                        className="w-full flex flex-col py-[23px] px-3 opacity-100 bg-transparent"
                    >
                        <div className='w-full h-16 flex justify-end gap-6'>
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
                        </div>
                        <div className='w-full '>
                            <div className='w-full h-80 bg-transparent'>
                                <img src={path} alt="set" className='max-w-full max-h-full w-full h-full object-contain' />
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
};

export default UploadPreview;
