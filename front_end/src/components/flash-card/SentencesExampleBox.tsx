import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { cn, isFunction, speak } from '@/lib/utils';
import { Button } from '../ui/button';
import { Volume1 } from 'lucide-react';
const SentencesExampleBox = (props: any) => {
    const { example } = props;
    return (
        <Card className="w-full h-full p-2 ">
            <CardTitle className='font-semibold text-lg'> Example Sentences</CardTitle>
            <CardContent className='grid grid-rows row-auto w-full h-full p-0'>
                <div className='flex flex-col'>
                    {Array.isArray(example) && example.map((item: any, index: number) => (
                        <div key={index}>
                            <Separator />
                            <div className='py-4' >
                                <div className='flex justify-between items-center'>
                                    {item?.sentence}
                                    <Button
                                        variant={'ghost'}
                                        className='w-fit h-fit rounded-full p-0'
                                        onClick={() => {
                                            speak(item?.sentence)
                                        }}>
                                        <Volume1 />
                                    </Button>
                                </div>
                                <i className=''>
                                    {item?.translation}
                                </i>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default SentencesExampleBox
