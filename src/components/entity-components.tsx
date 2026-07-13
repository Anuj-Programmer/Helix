import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
 | {onNew: () => void; newButtonHref?: never}
 | {newButtonHref: string; onNew?: never}
 | {onNew?: never; newButtonHref?: never}
);


export const EntityHeader = ({title, description, onNew, newButtonHref, newButtonLabel, disabled, isCreating,}: EntityHeaderProps) => {
return(
    <div className="flex flex-row items-center justify-between gap-x-4">
        <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
            {description && 
            <p className="text-xs md:text-sm text-muted-foreground">{description}</p>}
        </div>
        {onNew && !newButtonHref && (
            <Button disabled={isCreating || disabled} onClick={onNew} size="sm" className="flex items-center gap-1.5 leading-none px-3">
                <PlusIcon className="size-3.5 shrink-0"/>
                {newButtonLabel}
            </Button>
        )}
        {newButtonHref && !onNew && (
            <Button size="sm" className="flex items-center gap-1.5 leading-none px-3" asChild>
                <Link href={newButtonHref}  prefetch>
                <PlusIcon className="size-3.5 shrink-0"/>
                {newButtonLabel}
                </Link>
            </Button>
        )}
    </div>
)
}

type EntityContainerProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
} 

export const EntityContainer = ({header, search, pagination, children}: EntityContainerProps) => {
    return (
        <div className="p-4 md:px-10 md:py-6 h-full">
            <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-8 h-full">
                    {header}
                
                <div className="flex flex-col gap-y-4 h-full">
                    {search}
                    {children}
                </div>
                {pagination}
            </div>
        </div>
    )
}