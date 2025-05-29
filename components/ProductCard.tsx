import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { formatCurrency } from "@/lib/formatters";
import Link from 'next/link'
import Image from 'next/image'
import { ProductCardProps } from "@/types/types";

export default function ProductCard({ id, name, price, description, imagePath }: ProductCardProps) {
    return (
        <Card className="overflow-hidden mb-4 p-2">
            <div className="relative w-full h-auto aspect-square">
               <Image src={imagePath} alt={name} fill />
            </div>
        
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{formatCurrency(price)}</CardDescription>
            </CardHeader>
        
            <CardContent className="flex-grow">
                <p className="line-clamp-4">{description}</p>
            </CardContent>

            <Button asChild size="lg" className="w-full">
              <Link href={`/products/${id}`}>View Outfit</Link>
            </Button>
      </Card>
      
    )
}
    
