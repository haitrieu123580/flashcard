import { Pen, PencilIcon, Trash2Icon } from 'lucide-react';

import defaultImageAvatar from '@/assets/images/flash-card.png';
import DeletePopup from '@/components/common/popup/DeletePopup';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Constants from '@/lib/Constants';
import {
  cn,
  convertDateToString,
  isFunction,
  setColorLevel,
} from '@/lib/utils';

const SetItem = (props: any) => {
  const {
    onClick,
    data,
    showEditBtn = false,
    showDeleteBtn = false,
    onEditBtn,
    onDeleteBtn,
  } = props;
  const { name, description, totalCards, created_by, created_at, image, id } =
    data || {};
  return (
    <Card className="group relative h-full overflow-hidden">
      <CardHeader>
        <div className="grid grid-cols-3 gap-2">
          <div
            className={cn(
              'col-span-2',
              showEditBtn || showDeleteBtn ? '' : 'col-span-3',
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="max-w-full text-left">
                  <CardTitle className="">{name || ''}</CardTitle>
                </TooltipTrigger>
                <TooltipContent>{name || ''}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div
            className={cn(
              'col-span-1 flex flex-nowrap items-end justify-end gap-1',
              showEditBtn || showDeleteBtn ? '' : 'hidden',
            )}
          >
            {showEditBtn && (
              <Button
                variant={'ghost'}
                className={'h-fit w-fit'}
                onClick={(e) => {
                  e.stopPropagation();
                  onEditBtn(id);
                }}
              >
                <PencilIcon width={18} height={18} />
              </Button>
            )}
            {showDeleteBtn && (
              <DeletePopup
                onConfirmDelete={() => {
                  isFunction(onDeleteBtn) && onDeleteBtn(id);
                }}
                TriggerComponent={
                  <Button
                    variant={'destructive'}
                    className={'h-fit w-fit'}
                    type="button"
                  >
                    <Trash2Icon width={19} height={19} />
                  </Button>
                }
              />
            )}
          </div>
        </div>
        <CardDescription className="flex flex-wrap gap-1">
          <Badge variant="default">{`${totalCards} cards`}</Badge>
          {data?.level && (
            <Badge
              className={setColorLevel(
                Constants.LEVEL[
                  data?.level as number as 0 | 1 | 2 | 3
                ].toString(),
              )}
            >
              {Constants.LEVEL[
                data?.level as number as 0 | 1 | 2 | 3
              ]?.toString()}
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent
        className=""
        onClick={(e) => {
          e.preventDefault();
          onClick(id);
        }}
      >
        <div className="group relative overflow-hidden rounded-md hover:cursor-pointer">
          <AspectRatio
            ratio={1 / 1}
            className="aspect-square h-auto w-auto object-cover transition-all hover:scale-105"
          >
            {!image ? (
              <div className="absolute flex h-full w-full items-center justify-center bg-slate-300 text-2xl text-white"></div>
            ) : (
              <img
                src={image}
                alt="set"
                className="h-full w-full object-cover"
              />
            )}
          </AspectRatio>
          <div className="absolute bottom-0 z-10 hidden h-full w-full bg-gray-700 opacity-50 group-hover:block"></div>
          <div className="absolute bottom-1/2 z-10 hidden translate-y-[50%] text-wrap break-words p-2 text-left text-sm text-white group-hover:block md:text-base">
            {description}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={data?.user?.avatar || defaultImageAvatar}
            className="object-cover"
          />
          <AvatarFallback>
            {data?.user?.username?.toString()?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {created_by}
          </span>
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {convertDateToString(created_at)}
          </span>
        </div>
      </CardFooter>
      <div className="absolute bottom-0 h-1 w-full group-hover:bg-slate-700 dark:group-hover:bg-sky-700"></div>
    </Card>
  );
};

export default SetItem;
