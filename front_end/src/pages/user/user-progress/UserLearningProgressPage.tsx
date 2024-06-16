import React from 'react';
import { routerPaths } from '@/routes/path';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import defaultImage from '@/assets/images/flashcard_bg.jpeg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
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
import Constants from '@/lib/Constants';
import {
  convertDateToString,
  replacePathWithId,
  setColorLevel,
} from '@/lib/utils';

const UserLearningProgressPage = () => {
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
      <CardTitle className="my-4 text-primary">
        Your learning progress
      </CardTitle>

      {data?.length === 0 ? null : (
        <>
          {Array.isArray(data) &&
            data.map((item: any, index: number) => {
              return (
                <Card
                  className="my-6 w-full cursor-pointer"
                  onClick={() => {
                    gotoCard(item?.set);
                  }}
                >
                  <CardHeader></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-3">
                        <img
                          src={item?.set?.image || defaultImage}
                          alt="set"
                          className="max-h-full max-w-full object-cover"
                        />
                      </div>
                      <div className="col-span-9 space-y-3">
                        <CardTitle>
                          <div>{item?.set?.name}</div>
                        </CardTitle>
                        <CardDescription className="space-y-3">
                          <div className="space-x-3">
                            <Badge variant="default">{`${item?.set?.cards?.length} cards`}</Badge>
                            {item?.set?.level && (
                              <Badge
                                className={setColorLevel(
                                  Constants.LEVEL[
                                    item?.set?.level as number as 0 | 1 | 2 | 3
                                  ].toString(),
                                )}
                              >
                                {Constants.LEVEL[
                                  item?.set?.level as number as 0 | 1 | 2 | 3
                                ]?.toString()}
                              </Badge>
                            )}
                          </div>
                          <div>{item?.set?.description}</div>
                        </CardDescription>
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
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex w-full flex-col">
                    <div className="flex w-full items-end justify-end">
                      <span className="font-bold text-sky-500">
                        {Math.floor(item?.progressPercentage)}%
                      </span>
                    </div>
                    <Progress
                      value={item?.progressPercentage}
                      className="h-3 w-full"
                    />
                  </CardFooter>
                </Card>
              );
            })}
        </>
      )}
    </div>
  );
};

export default UserLearningProgressPage;
