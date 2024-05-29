import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { convertDateToString, replacePathWithId } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { routerPaths } from '@/routes/path';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import Constants from '@/lib/Constants';
const UserTestHistory = (props: any) => {
    const history = props?.history;
    const navigate = useNavigate();
    const [showAllItems, setShowAllItems] = useState(false);

    return (
        <div>
            {
                (history?.tests?.length > 0) &&
                <div className="m-6">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='text-left !no-underline'>
                                <CardTitle className="text-blue-400">
                                    Test History
                                    <CardDescription className="text-lg">
                                        <span>
                                            You have done <span className="text-green-400">{history?.tests?.length}</span> tests,Your total correct percentage:
                                        </span>
                                        <span className="text-green-500">

                                            {` ${history?.totalCorrectPercent}% `}
                                        </span>
                                    </CardDescription>
                                </CardTitle>
                            </AccordionTrigger>
                            <AccordionContent>
                                {showAllItems ? (
                                    history?.tests?.map((item: any, index: number) => {
                                        return (
                                            <Card className="p-6 my-4"
                                                onClick={() => {
                                                    navigate(replacePathWithId(routerPaths.USER_TEST_MULTIPLE_CHOICE_RESULT, item?.id)); //data is the test
                                                }}
                                            >

                                                <CardHeader>
                                                    <CardTitle>
                                                        {`Correct questions: ${item?.score}/${item?.questions} (${((item?.score / item?.questions) * 100).toFixed(2)}%)`}
                                                    </CardTitle>
                                                    <CardDescription className='space-x-2'>
                                                        <span>
                                                            Completed at: {convertDateToString(item?.completedAt)}
                                                        </span>
                                                        {item?.level
                                                            &&
                                                            <>
                                                                <Badge>
                                                                    {Constants.LEVEL[item?.level as number as 1 | 2 | 3].toString()}
                                                                </Badge>
                                                            </>}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Progress color="yellow"
                                                        key={index}
                                                        value={(item?.score / item?.questions) * 100}
                                                        className="w-full h-2 my-6 "
                                                        classNameIndicator="bg-primary"
                                                    />
                                                </CardContent>
                                            </Card>

                                        )
                                    })
                                ) : (
                                    history?.tests?.slice(0, 5).map((item: any, index: number) => {
                                        return (
                                            <Card className="p-6 my-4"
                                                onClick={() => {
                                                    navigate(replacePathWithId(routerPaths.USER_TEST_MULTIPLE_CHOICE_RESULT, item?.id)); //data is the test
                                                }}
                                            >

                                                <CardHeader>
                                                    <CardTitle>
                                                        {`Correct questions: ${item?.score}/${item?.questions} (${((item?.score / item?.questions) * 100).toFixed(2)}%)`}
                                                    </CardTitle>
                                                    <CardDescription className='space-x-2'>
                                                        <span>
                                                            Completed at: {convertDateToString(item?.completedAt)}
                                                        </span>
                                                        {item?.level
                                                            &&
                                                            <>
                                                                <Badge>
                                                                    {Constants.LEVEL[item?.level as number as 1 | 2 | 3].toString()}
                                                                </Badge>
                                                            </>}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Progress color="yellow"
                                                        key={index}
                                                        value={(item?.score / item?.questions) * 100}
                                                        className="w-full h-2 my-6 "
                                                        classNameIndicator="bg-primary"
                                                    />
                                                </CardContent>
                                            </Card>

                                        )
                                    })
                                )}
                                <button
                                    className="text-blue-500 underline"
                                    onClick={() => setShowAllItems(!showAllItems)}
                                >
                                    {showAllItems ? "See Less" : "See More"}
                                </button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            }
        </div>
    )
}

export default UserTestHistory