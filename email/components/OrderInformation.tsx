import { Button, Column, Img, Row, Section, Text, } from "@react-email/components"
import { OrderInformationProps } from "@/types/types"

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" })

export function OrderInformation({
  order,
  product,
  downloadVerificationId,
}: OrderInformationProps) {
  return (
    <>
      <Section>
        <Row>
            <Column>
            <Text className="mb-0 text-gray-500">Order ID</Text>
            <Text>{order.id}</Text>
            </Column>
            <Column>
            <Text className="mb-0 text-gray-500">Ordered On</Text>
            <Text>{dateFormatter.format(order.createdAt)}</Text>
            </Column>
            <Column>
            <Text className="mb-0 text-gray-500">Customer</Text>
            <Text>{order.name}</Text>
            </Column>
        </Row>
        <Row>
            <Column>
            <Text className="mb-0 text-gray-500">Phone</Text>
            <Text>{order.phone}</Text>
            </Column>
            <Column>
            <Text className="mb-0 text-gray-500">Measurements</Text>
            <Text>{order.measurements}</Text>
            </Column>
            {order.message && (
            <Column>
                <Text className="mb-0 text-gray-500">Message</Text>
                <Text>{order.message}</Text>
            </Column>
            )}
        </Row>
     </Section>

      <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
        <Img
          width="100%"
          alt={product.name}
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
        />
        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
          </Column>
          <Column align="right">
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
              className="bg-black text-white px-6 py-4 rounded text-lg"
            >
              Download
            </Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className="text-gray-500 mb-0">{product.description}</Text>
          </Column>
        </Row>
      </Section>
    </>
  )
}