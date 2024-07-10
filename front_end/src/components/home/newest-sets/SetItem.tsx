import { Pen, PencilIcon, Trash2Icon } from 'lucide-react';

import defaultImageAvatar from '@/assets/images/flash-card.png';
import defaultImageBg from '@/assets/images/flashcard_bg.jpeg';
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
import { Progress } from '@/components/ui/progress';
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
    learningProgress,
    ratio,
    checkMySet = false,
  } = props;
  const { name, description, totalCards, created_by, created_at, image, id } =
    data || {};
  return (
    <Card className="group relative flex h-full flex-col justify-between overflow-hidden">
      <CardHeader className="max-h-30">
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
              'col-span-1 flex flex-nowrap items-start justify-end gap-1',
              showEditBtn || showDeleteBtn ? '' : 'hidden',
            )}
          >
            {showEditBtn && (
              <Button
                variant={'default'}
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
          {data?.totalCards && (
            <Badge variant="default">{`${totalCards} cards`}</Badge>
          )}
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
          if (checkMySet) {
            onClick(data);
          } else {
            onClick(id);
          }
        }}
      >
        <div className="group relative overflow-hidden rounded-md hover:cursor-pointer">
          <AspectRatio
            ratio={ratio ? ratio : `${1 / 1}`}
            className="aspect-square h-auto w-auto object-cover transition-all hover:scale-105"
          >
            {!image ? (
              <img
                src={defaultImageBg}
                alt="set"
                className="h-full w-full object-cover"
              />
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
      <CardFooter className="flex flex-col items-start gap-2">
        {learningProgress && (
          <div className="w-full">
            <div className="flex w-full items-end justify-end">
              {Math.floor(learningProgress)}%
            </div>
            <Progress value={learningProgress} className="h-2 w-full" />
          </div>
        )}
        <div className="flex">
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
        </div>
      </CardFooter>
      <div className="absolute bottom-0 h-1 w-full group-hover:bg-blue-700 dark:group-hover:bg-blue-500"></div>
    </Card>
  );
};

export default SetItem;
