import { Volume1 } from 'lucide-react';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { cn, isFunction, speak } from '@/lib/utils';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const SentencesExampleBox = (props: any) => {
  const { example } = props;
  return (
    <Card className="h-full w-full p-2">
      <CardTitle className="text-lg font-semibold">
        {' '}
        Example Sentences
      </CardTitle>
      <CardContent className="grid-rows row-auto grid h-full w-full p-0">
        <div className="flex flex-col">
          {Array.isArray(example) &&
            example.map((item: any, index: number) => (
              <div key={index}>
                <Separator />
                <div className="py-4">
                  <div className="flex items-center justify-between">
                    {item?.sentence}
                    <Button
                      variant={'ghost'}
                      className="h-fit w-fit rounded-full p-0"
                      onClick={() => {
                        speak(item?.sentence);
                      }}
                    >
                      <Volume1 />
                    </Button>
                  </div>
                  <i className="">{item?.translation}</i>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentencesExampleBox;
