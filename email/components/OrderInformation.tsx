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
  {/* Order Info Block */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div>
      <Text className="mb-0 text-gray-500">Order ID</Text>
      <Text>{order.id}</Text>
    </div>
    <div>
      <Text className="mb-0 text-gray-500">Ordered On</Text>
      <Text>{dateFormatter.format(order.createdAt)}</Text>
    </div>
    <div>
      <Text className="mb-0 text-gray-500">Customer</Text>
      <Text>{order.name}</Text>
    </div>
    <div>
      <Text className="mb-0 text-gray-500">Phone</Text>
      <Text>{order.phone}</Text>
    </div>
    <div>
      <Text className="mb-0 text-gray-500">Measurements</Text>
      <Text>{order.measurements}</Text>
    </div>
    {order.message && (
      <div>
        <Text className="mb-0 text-gray-500">Message</Text>
        <Text>{order.message}</Text>
      </div>
    )}
  </div>

  {/* Product Display */}
  <div className="border border-gray-300 rounded-lg p-4 md:p-6 my-4 space-y-6">
    <Img
      width="100%"
      alt={product.name}
      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
    />

    <div className="flex flex-col md:flex-row md:items-end justify-between">
      <Text className="text-lg font-bold m-0">{product.name}</Text>
      <Button
        href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
        className="bg-black text-white px-6 py-3 rounded text-lg mt-4 md:mt-0"
      >
        Download
      </Button>
    </div>

    <Text className="text-gray-500">{product.description}</Text>
  </div>
</Section>

    </>
  )
}