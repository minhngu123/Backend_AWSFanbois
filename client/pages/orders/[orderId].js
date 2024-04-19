import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return (
      <div className="max-w-sm p-6 bg-green-t border rounded-lg shadow">
        <div className="flex flex-col items-center pb-2">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://cdn-icons-png.flaticon.com/512/785/785581.png"
          />
          <h5 className="mb-1 text-xl font-medium text-green-bg dark:text-white">
            {order.ticket.title}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {order.ticket.price}
          </span>
          <span className="text-lg text-gray-500 dark:text-gray-400">
            ORDER EXPIRED!
          </span>
          <div className="flex mt-4 md:mt-6">
            <a
              href="/"
              className="btn btn-primary text-green-t focus:outline-none bg-green-hd border hover:bg-green-bg hover:text-green-t"
            >
              Back to Main Page
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-sm p-6 bg-green-t border rounded-lg shadow">
        <h5 className="mb-2 text-2xl font-thin tracking-tight text-green-bg text-center">
          {order.ticket.title}
        </h5>
        <p className="mb-3 font-bold text-gray-500 dark:text-gray-400 text-center">
          {order.ticket.price}
        </p>
        <p className="mb-3 font-bold text-gray-500 dark:text-gray-400 text-center">
          Time left to pay: {timeLeft} seconds
        </p>
        <div className="text-center">
          <StripeCheckout
            token={({ id }) => doRequest({ token: id })}
            stripeKey="pk_test_51OxtLHP7HVfEOnrnh7MkY9TIGTbRREXSN6j3UVE3CdBAjkzsW9v4JUsKl4Kvcw6O59TdKRx8P6bOw3wh4pqfvPPa00WIPqy3pe"
            amount={order.ticket.price * 100}
            email={currentUser.email}
          />
        </div>
        {errors}
      </div>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
