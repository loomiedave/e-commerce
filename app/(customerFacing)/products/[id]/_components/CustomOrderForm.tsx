"use client"

import Image from "next/image"
import { CustomOrderFormProps } from "@/types/types"
import { formatCurrency } from "@/lib/formatters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { userOrderExists } from "../../../../actions/orders"
import { useRouter } from "next/navigation"


export default function CustomOrderForm( { product }:  CustomOrderFormProps ) {
    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
            <div className="flex gap-4 items-center">
                <div className="aspect-square flex-shrink-0  w-1/3 relative">
                    <Image className="object-cover" src={product.imagePath} alt={product.name} fill/>
                </div>
                <div>
                    <div className="font-bold text-2xl">
                        {formatCurrency(product.price)}
                    </div> 
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className="line-clamp-4 text-muted-foreground">{product.description}</div>
                </div>
            </div>
                <Form price={product.price} productId={product.id}/>
        </div>
    )
}

function Form({ price, productId }: { price: number, productId: string }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        countryCode: "+228",
        measurements: "",
        message: ""
      })


 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const orderExists = await userOrderExists(formData.email, productId)
        if (orderExists) {
        setErrorMessage("You already ordered this product.")
        setIsLoading(false)
        return
        }

    const fullPhone = `${formData.countryCode}${formData.phone}`

    await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: fullPhone,         // use fullPhone here
            measurements: formData.measurements,
            message: formData.message,
            productId,
          }),
        headers: { "Content-Type": "application/json" }
      })
  
      setIsLoading(false)
      router.push(`order-confirmation?productId=${productId}`)
 }


    return (
        <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
                <CardTitle>CheckOut</CardTitle>
                {errorMessage && <CardDescription className="text-destructive">{errorMessage}</CardDescription>}
            </CardHeader>
            <CardContent>
                    <input
                    className="w-full border p-2 rounded"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    className="w-full border p-2 rounded"
                    placeholder="Your Email"
                    value={formData.email}
                    type="email"
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                  <div className="flex space-x-2">
                    <select
                        value={formData.countryCode}
                        onChange={e => setFormData({ ...formData, countryCode: e.target.value })}
                        className="border p-2 rounded"
                    >
                        <option value="+228">🇹🇬 +228 (Togo)</option>
                        <option value="+233">🇬🇭 +233 (Ghana)</option>
                        <option value="+234">🇳🇬 +234 (Nigeria)</option>
                        {/* add more as needed */}
                    </select>

                    <input
                        type="tel"
                        className="flex-1 border p-2 rounded"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                    </div>
                <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Your Measurements"
                    value={formData.measurements}
                    onChange={e => setFormData({ ...formData, measurements: e.target.value })}
                    required
                />
                <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Message to tailor (optional)"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
            </CardContent>
                <CardFooter>
                <Button 
                    className="w-full" 
                    size="lg" 
                    type="submit" 
                    disabled={isLoading}
                >
                    {isLoading? "Sending..." : `Send Order - ${formatCurrency(price)}`}
                </Button>
                </CardFooter>
        </Card>
        </form>
    )

}