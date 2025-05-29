import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export default function ProductCardSkeleton(){
    return (
        <Card className="overflow-hidden animate-pulse">
            <div className="relative w-full h-auto aspect-square">
                <Skeleton className="absolute inset-0 w-full h-full" />
            </div>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-6 w-3/4" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-1/2 mt-1" />
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-10/12" />
                  <Skeleton className="h-4 w-8/12" />
                </div>
            </CardContent>
            <Button disabled size="lg" className="w-full mt-2">
                <Skeleton className="h-10 w-full" />
            </Button>
    </Card>
    )
}