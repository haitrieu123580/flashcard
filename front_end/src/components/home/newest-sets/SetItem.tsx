import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"

const SetItem = () => {
    return (
        <Card className="group overflow-hidden">
            <CardHeader>
                <CardTitle>
                    Sets name
                </CardTitle>
                <CardDescription className="flex gap-1 flex-wrap">
                    <Badge variant="default">Topic</Badge>
                    <Badge variant="default">{`${1} cards`}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <div className="overflow-hidden rounded-md relative group hover:cursor-pointer">
                    <AspectRatio
                        ratio={1 / 1}
                        className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square "
                    >
                        <img src="https://github.com/shadcn.png" alt="set" />
                    </AspectRatio>
                    <div className="absolute hidden bottom-0 z-10 bg-gray-700 opacity-50 w-full h-full group-hover:block"></div>
                    <div className="hidden absolute p-2 text-left text-wrap bottom-1/2 translate-y-[50%] z-10 text-white break-words group-hover:block ">
                        created by abaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm  text-ellipsis overflow-hidden whitespace-nowrap block">{"created by abaaaaaaaaaaaaaaaaaaaaaaaaaaaa "}</span>
            </CardFooter>
            <div className="w-ful h-1 group-hover:bg-slate-700 dark:group-hover:bg-sky-700"></div>
        </Card>
    )
}

export default SetItem
