// ContactPage.tsx
import { ContactForm } from './ContactForm'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Gmail',
      details: 'chymeemenike@gmail.com',
      description: 'Send us an email anytime or via the email form below.'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+228 91 09 93 03',
      description: 'Monday-Saturday from 8am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '',
      description: ''
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday',
      description: '8:00 AM - 6:00 PM EST'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services? Need support? We're here to help.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-blue-600 mt-1" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-gray-900 font-medium">{item.details}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* Map Section (Optional) */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gray-200 h-64 md:h-80 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Embed your location map here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-8">
            Can't find what you're looking for? Check out our FAQ section or send us a message.
          </p>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    How quickly do you respond?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What information should I include?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    The more details you provide about your inquiry, the better we can assist you.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Do you offer support in multiple languages?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Currently, we provide support primarily in English and French, but we're expanding our language capabilities.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Can I schedule a call?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes! Mention your preferred time in your message and we'll coordinate a call.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}