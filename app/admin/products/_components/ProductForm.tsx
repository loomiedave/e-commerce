"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { formatCurrency } from "@/lib/formatters"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormStatus } from "react-dom"
import { useActionState } from 'react';
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imagePath: string;
    filepath: string
  }

export default function ProductForm({ product }: { product?: Product | null }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const [error, action ] = useActionState(product == null ? addProduct :updateProduct.bind(null, product.id), {})
    const [price, setPrice] = useState<number>(product?.price || 0)
    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                 type="text" 
                 id="name" 
                 name="name" 
                 required 
                 defaultValue={product?.name || ""}
                />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input 
                  type="text" 
                  id="price" 
                  name="price" 
                  required 
                  value={price} 
                  max={2147483647}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                />
                {error.price && <div className="text-destructive">{error.price}</div>}
                <div className="text-muted-foreground">{formatCurrency(price)}</div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" required defaultValue={product?.description || ""}/>
                    {error.description && <div className="text-destructive">{error.description}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <Input 
                    type="file" 
                    id="file" 
                    name="file" 
                    required={product == null}
                  />
                  {error.file && <div className="text-destructive">{error.file}</div>}
                  {product != null && (<div className="text-muted-foreground">{product.filepath}</div>)}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <Input 
                    type="file" 
                    id="image" 
                    name="image" 
                    required={product == null}
                  />
                  {error.image && <div className="text-destructive">{error.image}</div>}
                  {product != null && (
                    <>
                    {!isImageLoaded && (
                      <Skeleton className="w-[400px] h-[600px] rounded-md" />
                    )}
                    <Image
                        src={product.imagePath}
                        alt={product.name}
                        width={400}
                        height={600}
                        onLoad={() => setIsImageLoaded(true)}
                        className={!isImageLoaded ? "hidden" : "rounded-md"}
                    />
                    </>
                )}
                </div>
                <SubmitButton />
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}