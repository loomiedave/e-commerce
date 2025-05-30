import  prisma  from "@/lib/prisma";
import  { formatNumber } from "@/lib/formatters";
import DashboardCard from "./_components/DashBoardCard";


function wait(duration: number) {
    return new Promise((resolve) => setTimeout(resolve, duration))
}
async function getSalesData () {
   const data = await prisma.order.aggregate({
     _count: true
   })

   await wait(2000)

   return{
    numberOfSales: data._count
   }
}

async function getUserData () {
    const [ userCount, orderData ] = await Promise.all([
        prisma.user.count(),
        prisma.order.aggregate({
        _count: true
        }),
    ])
    
    return {
        userCount,
        averageOrdersPerUser: userCount === 0? 0 : orderData._count / userCount 
    }
        
}

async function getProductData () {
        const [ activeCount, inActiveCount ] = await Promise.all([
            prisma.product.count( { where: { isAvailableForPurchase: true } }),
            prisma.product.count( { where: { isAvailableForPurchase: false } }),
        ])
        
        return { activeCount, inActiveCount }
            
}


export default async function AdminDashboard() {
    const [ salesData, userData, productData ] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
    ])

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         <DashboardCard title="Orders" 
           subtitle="Total Orders" 
           body={formatNumber(salesData.numberOfSales)} 
           />
           <DashboardCard title="Customers" 
             subtitle={`${formatNumber(userData.averageOrdersPerUser)} Average Orders`} 
             body={formatNumber(userData.userCount)} 
            />
            <DashboardCard title="Active products" 
             subtitle={`${formatNumber(productData.inActiveCount)} Inactive`} 
             body={formatNumber(productData.activeCount)} 
            />
        
        </div>   
    )
}
