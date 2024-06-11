import { useEffect } from 'react';
import { routerPaths } from '@/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getAllSetsAction } from '@/redux/public-sets/slice';
import Constants from '@/lib/Constants';
import { cn, replacePathWithId } from '@/lib/utils';

import SetItem from './SetItem';

const NewsetSets = (props: any) => {
  const { className } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: any) => state.Sets);
  const getSets = () => {
    dispatch({
      type: getAllSetsAction.type,
      payload: {
        page_size: 6,
        page_index: 1,
        filter: Constants.SORT_BY[0].key,
      },
    });
  };
  useEffect(() => {
    getSets();
  }, []);
  const gotoCard = (id: string = '') => {
    navigate(replacePathWithId(routerPaths.LEARN_FLASHCARD, id));
  };
  return (
    <>
      <Card
        className={cn(
          'h-full w-full border-none !bg-transparent !shadow-none',
          className,
        )}
      >
        <CardHeader>
          <CardTitle className="flex items-end justify-between">
            <span className="text-blue-500">Lastest Sets</span>
            <Button
              variant={'link'}
              className="h-fit p-0 text-blue-400 dark:text-blue-400"
            >
              <Link to={routerPaths.PUBLIC_SETS}>See more</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {Array.isArray(data) &&
                data.map((set, index) => {
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
    </>
  );
};

export default NewsetSets;
