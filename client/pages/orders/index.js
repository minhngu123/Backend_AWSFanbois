const OrderIndex = ({ orders }) => {
  return (
    <div className="">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 font-thin">
        <thead className="text-md font-thin text-green-t uppercase bg-green-hd">
          <tr>
            <th scope="col" className="px-6 py-3 font-normal">
              Title
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Price
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="bg-green-t2 hover:bg-green-hd transition-colors"
            >
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://cdn-icons-png.flaticon.com/512/785/785581.png"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold text-green-t">
                    {order.ticket.title}
                  </div>
                  <div className="font-normal text-gray-500">{order.ticket.description}</div>
                </div>
              </th>
              <td className="px-6 py-4">{order.ticket.price}$</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {order.status == "cancelled" ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-red-600 me-2"></div>
                  ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                  )}
                  {order.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
