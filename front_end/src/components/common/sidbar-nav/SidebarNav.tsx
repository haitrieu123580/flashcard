
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Constants from "@/lib/Constants"
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    // const pathname = usePathname()
    const pathname = useLocation().pathname
    return (
        <nav
            className={cn(
                "flex space-x-2 md:flex-col md:space-x-0 md:space-y-1",
                className
            )}
            {...props}
        >
            {items?.map((item) => (
                <Button
                    key={item.href}
                    variant={'link'}
                    className={cn(
                        // buttonVariants({ variant: "ghost" }),
                        pathname === item.href
                            ? "bg-muted hover:bg-muted"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}
                >
                    <Link
                        to={item.href}
                        className="w-full h-full text-left"
                    // href={item.href}

                    >
                        {item.title}
                    </Link>
                </Button>
            ))}
        </nav>
    )
}