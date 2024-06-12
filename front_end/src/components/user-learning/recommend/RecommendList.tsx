import React, { useEffect } from 'react';
import { routerPaths } from '@/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SetItem from '@/components/home/newest-sets/SetItem';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getRecommendSetsBySetIdAction } from '@/redux/recommend/slice';
import { replacePathWithId } from '@/lib/utils';

const RecommendList = (props: any) => {
  const { id } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useSelector((state: any) => state.RecommendSets);
  const gotoCard = (id: string = '') => {
    navigate(replacePathWithId(routerPaths.LEARN_FLASHCARD, id));
  };
  useEffect(() => {
    if (id) {
      dispatch({
        type: getRecommendSetsBySetIdAction.type,
        payload: {
          id: id,
        },
      });
    }
  }, [id]);
  return (
    <div>
      <Card className="w-full border-none !bg-transparent !shadow-none">
        <CardTitle className="m-6 text-blue-400">Recommend Sets</CardTitle>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {Array.isArray(data) &&
                data.map((set, index) => {
                  // const mappedData =
                  return (
                    <CarouselItem
                      key={index}
                      className="basis-1/1 sm:basis-1/2 md:basis-1/5"
                    >
                      <SetItem data={set} onClick={gotoCard} />
                    </CarouselItem>
                  );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendList;
