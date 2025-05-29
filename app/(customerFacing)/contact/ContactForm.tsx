'use client'

import { useForm, ValidationError } from '@formspree/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const [state, handleSubmit] = useForm('manjwwpz')

  if (state.succeeded) {
    return (
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>Thank you! Your message has been sent.</AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">Let’s Talk</h2>
        <p className="text-sm text-muted-foreground">
          Got a question or proposal? Fill out the form and we will get back to you soon.
        </p>
      </div>


      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" name="email" required disabled={state.submitting} />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" name="message" rows={5} required disabled={state.submitting} />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      {Object.keys(state.errors ?? {}).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>There were errors with your submission.</AlertDescription>
          </Alert>
        )}


      <Button type="submit" disabled={state.submitting}>
        {state.submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
