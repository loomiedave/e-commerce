import { Body, Container, Head, Heading, Html, Preview, Tailwind, } from "@react-email/components"
  import { OrderInformation } from "./components/OrderInformation"
  import { OrderReceiptEmailProps } from "@/types/types"

  
  export default function OrderReceiptEmail({
    product,
    order,
    downloadVerificationId,
  }: OrderReceiptEmailProps) {
    return (
      <Html>
        <Preview>Download {product.name} and view receipt</Preview>
        <Tailwind>
          <Head />
          <Body className="font-sans bg-white">
            <Container className="max-w-xl">
              <Heading>Order Receipt</Heading>
              <OrderInformation
                order={order}
                product={product}
                downloadVerificationId={downloadVerificationId}
              />
            </Container>
          </Body>
        </Tailwind>
      </Html>
    )
  }