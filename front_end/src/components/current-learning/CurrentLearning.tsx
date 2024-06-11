import React from 'react';
import { routerPaths } from '@/routes/path';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';
import { getUserProgressAction } from '@/redux/user-progress/slice';
import { convertDateToString, replacePathWithId } from '@/lib/utils';

const CurrentLearning = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state: any) => state.UserProgress);
  React.useEffect(() => {
    dispatch({
      type: getUserProgressAction.type,
      payload: {},
    });
  }, []);
  const gotoCard = (set: any) => {
    if (set?.mySet) {
      navigate(replacePathWithId(routerPaths.LEARN_MY_SET, set?.id));
      return;
    } else {
      navigate(replacePathWithId(routerPaths.LEARN_FLASHCARD, set?.id));
    }
  };
  return (
    <div>
      {
        // @ts-ignore
        data?.length === 0 ? null : (
          <Card className="my-4 border-none !bg-transparent !shadow-none">
            <CardTitle className="my-4 px-4 text-blue-500">Recent</CardTitle>
            <CardContent className="mt-4">
              <Carousel>
                <CarouselContent>
                  {Array.isArray(data) &&
                    data.map((item: any, index: number) => {
                      return (
                        <CarouselItem
                          key={index}
                          className="basis-1/1 sm:basis-1/1 md:basis-1/3"
                          onClick={() => {
                            gotoCard(item?.set);
                          }}
                        >
                          <Card className="cursor-pointer">
                            <CardHeader>
                              <CardTitle className="">
                                {item?.set?.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="overflow-hidden rounded-md">
                                <AspectRatio
                                  ratio={2 / 2}
                                  className="aspect-square h-auto w-auto object-cover transition-all hover:scale-105"
                                >
                                  {!item?.set?.image ? (
                                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-2xl text-white"></div>
                                  ) : (
                                    <img
                                      src={item?.set?.image}
                                      alt="set"
                                      className="h-full max-h-full w-full max-w-full object-cover"
                                    />
                                  )}
                                </AspectRatio>
                              </div>
                            </CardContent>
                            <CardFooter className="flex w-full flex-col">
                              <div className="w-full">
                                <div className="flex w-full items-end justify-end">
                                  {Math.floor(item?.progressPercentage)}%
                                </div>
                                <Progress
                                  value={item?.progressPercentage}
                                  className="h-2 w-full"
                                />
                              </div>
                              <div className="my-4 flex w-full gap-2">
                                <Avatar>
                                  <AvatarImage
                                    src={item?.set?.user?.avatar}
                                    className="object-cover"
                                  />
                                  <AvatarFallback>
                                    {item?.set?.username?.toString()?.[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                                    {item?.set?.created_by}
                                  </span>
                                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                                    {convertDateToString(item?.set?.created_at)}
                                  </span>
                                </div>
                              </div>
                            </CardFooter>
                          </Card>
                        </CarouselItem>
                      );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        )
      }
    </div>
  );
};

export default CurrentLearning;
