import { AspectRatio } from '@radix-ui/react-aspect-ratio';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Banner = (props: any) => {
  const { isReverse, data } = props;
  return (
    <div className="my-8">
      <div className="grid h-auto w-full grid-cols-1 items-start py-6 md:grid-cols-12 md:py-0">
        {!isReverse ? (
          <>
            <div className="col-span-1 flex h-full items-start md:col-span-6">
              <Card className="border-none bg-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-blue-500">{data?.title}</CardTitle>
                </CardHeader>
                <CardContent className="rounded-sm bg-background p-8 dark:bg-inherit">
                  {data?.description}
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
            <div className="col-span-2 hidden md:block"></div>
            <div className="col-span-1 overflow-hidden rounded-md md:col-span-4">
              <AspectRatio
              // ratio={3 / 4}
              // className="object-contain transition-all hover:scale-105 flex items-center justify-center w-full"
              >
                <img
                  src={data?.image}
                  className="object-cover transition-all hover:scale-105"
                />
              </AspectRatio>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-1 overflow-hidden rounded-md md:col-span-4">
              <AspectRatio
              // ratio={3 / 4}
              // className="object-cover transition-all hover:scale-105 flex items-center justify-center w-full h-full"
              >
                <img src={data?.image} className="h-full w-full object-cover" />
              </AspectRatio>
            </div>
            <div className="col-span-2 hidden md:block"></div>
            <div className="col-span-1 flex h-full items-start md:col-span-6">
              <Card className="border-none bg-transparent shadow-none">
                <CardHeader className='!flex-row justify-end' >
                  <CardTitle className="text-blue-500">{data?.title}</CardTitle>
                </CardHeader>
                <CardContent className="rounded-sm bg-background p-8 dark:bg-inherit">
                  {data?.description}
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
