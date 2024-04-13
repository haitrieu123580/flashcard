import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"
import { convertDateToString } from "@/lib/utils"

const SetItem = (props: any) => {
    const { onClick, data } = props;
    const { name, description, totalCards, created_by, created_at, image, id } = data || {};
    return (
        <Card className="group overflow-hidden" onClick={(e) => {
            e.preventDefault();
            onClick(id)
        }}>
            <CardHeader>
                <CardTitle>
                    {name || ""}
                </CardTitle>
                <CardDescription className="flex gap-1 flex-wrap">
                    <Badge variant="default">{`${totalCards} cards`}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <div className="overflow-hidden rounded-md relative group hover:cursor-pointer">
                    <AspectRatio
                        ratio={1 / 1}
                        className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square "
                    >
                        {
                            !image
                                ? <div className="absolute w-full h-full bg-gray-800 flex justify-center items-center text-white text-2xl"></div>
                                : <img src={image} alt="set" className="w-full h-full object-cover" />
                        }

                    </AspectRatio>
                    <div className="absolute hidden bottom-0 z-10 bg-gray-700 opacity-50 w-full h-full group-hover:block"></div>
                    <div className="hidden absolute p-2 text-left text-wrap bottom-1/2 translate-y-[50%] z-10 text-white break-words group-hover:block text-sm md:text-base">
                        {description}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap block">{created_by}</span>
                    <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap block">{convertDateToString(created_at)}</span>
                </div>
            </CardFooter>
            <div className="w-ful h-1 group-hover:bg-slate-700 dark:group-hover:bg-sky-700"></div>
        </Card>
    )
}

export default SetItem
