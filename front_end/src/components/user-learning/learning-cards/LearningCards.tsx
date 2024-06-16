import { useEffect, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { ChevronLeft, ChevronRight, NotebookPen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import FlipCard from '@/components/flash-card/FlipCard';
import SentencesExampleBox from '@/components/flash-card/SentencesExampleBox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import Constants from '@/lib/Constants';
import {
  convertDateToString,
  isFunction,
  replacePathWithId,
  setColorLevel,
} from '@/lib/utils';

const LearningCards = (props: any) => {
  const { data, progress, id, onFlip, reset = false, setReset } = props;
  const [currentCard, setCurrentCard] = useState(0);
  const showCard = (index: number) => {
    if (index >= data?.cards?.length || index < 0) {
      return;
    }
    setCurrentCard(index);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (reset) {
      setCurrentCard(0);
      setReset(false);
    }
  }, [reset, setReset]);

  return (
    <div>
      <Card className="flex min-h-[500px] w-full flex-col justify-between border-none !bg-transparent !shadow-none">
        <CardTitle className="my-4 flex flex-col items-start justify-between gap-2 md:flex-row">
          <div className="flex gap-2">
            {data.image && (
              <img
                src={data.image}
                className="h-40 w-40 rounded-md object-cover"
              />
            )}
            <div className="flex flex-col justify-start gap-2">
              <div>
                <div className="flex items-end gap-4 font-bold">
                  <span>{data?.name}</span>
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
                </div>
                <div className="text-base">{data?.description}</div>
              </div>
              <div className="flex gap-2">
                {data?.user?.avatar && (
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.avatar}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {data?.user?.username?.toString()?.[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col">
                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                    <span>Created by: </span>
                    {data?.created_by}
                  </span>
                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                    <span>Created at: </span>
                    {convertDateToString(data?.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            {data?.levelCount?.length > 0 && (
              <Popover>
                <PopoverTrigger>
                  <Button variant="default">Advanced Test</Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2">
                  {data?.levelCount.map((level: any, index: number) => {
                    return (
                      <Button
                        key={index}
                        onClick={() => {
                          const queryParams = new URLSearchParams(
                            level,
                          ).toString();
                          navigate(
                            `${replacePathWithId(routerPaths.TEST_MULTIPLE_CHOICE, String(id))}?${queryParams}`,
                          );
                        }}
                        className={`${setColorLevel(Constants.LEVEL[level?.level as 1 | 2 | 3].toString())} hover:${setColorLevel(Constants.LEVEL[level?.level as 1 | 2 | 3].toString())}`}
                      >
                        {Constants.LEVEL[level?.level as 1 | 2 | 3]?.toString()}
                      </Button>
                    );
                  })}
                </PopoverContent>
              </Popover>
            )}
            {progress?.studiedCards?.length > 0 && (
              <Button
                variant={'outline'}
                className={'bg-green-500 text-white hover:bg-green-500'}
              >
                <Link
                  to={replacePathWithId(
                    routerPaths.TEST_MULTIPLE_CHOICE,
                    String(id),
                  )}
                  className="flex items-center gap-2 hover:cursor-pointer"
                >
                  Try your memory
                </Link>
              </Button>
            )}
          </div>
        </CardTitle>
        {Array.isArray(data?.cards) && data?.cards?.length ? (
          data?.cards.map((card: any, index: number) => {
            return (
              <div key={index}>
                {currentCard === index && (
                  <>
                    <CardContent className="grid h-full w-full grid-cols-1 gap-1 p-0 md:h-1/2 md:grid-cols-6">
                      <div className="col-span-1 flex h-fit flex-col gap-2 md:col-span-3">
                        <div className="relative">
                          <div>
                            <FlipCard key={index} card={card} onFlip={onFlip} />
                            <div className="mt-2 text-center">{`${currentCard + 1}/${data?.cards?.length}`}</div>
                          </div>
                          <div className="absolute top-1/2 translate-y-[-50%] md:right-full">
                            <Button
                              variant={'ghost'}
                              onClick={(e) => {
                                e.preventDefault();
                                isFunction(showCard) && showCard(index - 1);
                              }}
                            >
                              <ChevronLeft />
                            </Button>
                          </div>
                          <div className="absolute right-0 top-1/2 translate-y-[-50%] md:left-full">
                            <Button
                              variant={'ghost'}
                              onClick={(e) => {
                                e.preventDefault();
                                isFunction(showCard) && showCard(index + 1);
                              }}
                            >
                              <ChevronRight />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1"></div>
                      <div className="col-span-1 md:col-span-2">
                        <SentencesExampleBox example={card?.example} />
                      </div>
                    </CardContent>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <>
            <CardContent className="grid h-full w-full grid-cols-1 gap-1 p-0 md:h-1/2 md:grid-cols-6">
              <div className="col-span-1 flex h-fit flex-col gap-2 md:col-span-3">
                <div className="flex justify-end hover:cursor-pointer"></div>
              </div>
              <div className="col-span-1">Set is empty !!!</div>
            </CardContent>
          </>
        )}
        <div className="mx-6">
          <div className="w-full">
            <div className="flex w-full justify-between">
              <span className="font-bold text-blue-700">
                {' '}
                Learning progress
              </span>
              <span className="font-bold text-blue-700">
                {' '}
                {progress?.progressPercentage}%
              </span>
            </div>
            <Progress
              value={progress?.progressPercentage || 0}
              className="h-2 w-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LearningCards;
