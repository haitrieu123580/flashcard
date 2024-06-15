import React from 'react';
import { routerPaths } from '@/routes/path';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import defaultImage from '@/assets/images/flashcard_bg.jpeg';
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

import SetItem from '../home/newest-sets/SetItem';

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
    <div className="">
      {
        // @ts-ignore
        data?.length === 0 ? null : (
          <Card className="border-none !bg-transparent !shadow-none">
            <CardTitle className="my-4 px-4 text-blue-500">Recent</CardTitle>
            <CardContent className="mt-4">
              <Carousel>
                <CarouselContent>
                  {Array.isArray(data) &&
                    data.map((item: any, index: number) => {
                      let set = item?.set;
                      return (
                        <CarouselItem
                          key={index}
                          className="basis-1/1 sm:basis-1/2 md:basis-1/3"
                        >
                          <SetItem
                            data={set}
                            onClick={gotoCard}
                            learningProgress={item?.progressPercentage}
                            ratio={`${16 / 10}`}
                            checkMySet={true}
                          />
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
