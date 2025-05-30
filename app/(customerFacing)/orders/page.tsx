"use client"

import { emailOrderHistory } from "@/actions/orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  useFormStatus } from "react-dom"
import { useActionState } from "react"

export default function MyOrdersPage() {
  const [data, action] = useActionState(emailOrderHistory, {})
  return (
    <form action={action} className="max-w-2xl w-full mx-auto px-4 py-6">
    <Card className="shadow-xl border border-border">
      <CardHeader>
        <CardTitle className="text-xl">My Orders</CardTitle>
        <CardDescription>
          Enter your email to receive your order history and download links.
        </CardDescription>
      </CardHeader>
  
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
            />
            {data.error && (
              <p className="text-sm text-red-500 mt-1">{data.error}</p>
            )}
          </div>
        </div>
      </CardContent>
  
      <CardFooter className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
        {data.message ? (
          <p className="text-green-600">{data.message}</p>
        ) : (
          <SubmitButton />
        )}
        <p className="text-xs text-muted-foreground">
          We&apos;ll never share your email with anyone else.
        </p>
      </CardFooter>
    </Card>
  </form>
  
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" size="lg" disabled={pending} type="submit">
      {pending ? "Sending..." : "Send"}
    </Button>
  )
}