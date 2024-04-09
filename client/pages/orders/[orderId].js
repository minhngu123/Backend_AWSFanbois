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
      <div class="max-w-sm p-6 bg-green-t border rounded-lg shadow">
        <div class="flex flex-col items-center pb-2">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://media.discordapp.net/attachments/593774840381571078/1227291450358890496/e8c2ad89-c76f-4026-9073-1c779495f268.png?ex=6627df3b&is=66156a3b&hm=7585fc3564ffd3101f340e752a1ed2f411a1a7a00487f99b86d12d24c2764d78&=&format=webp&quality=lossless"
          />
          <h5 class="mb-1 text-xl font-medium text-green-bg dark:text-white">
            {order.ticket.title}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {order.ticket.price}
          </span>
          <span class="text-lg text-gray-500 dark:text-gray-400">
            ORDER EXPIRED!
          </span>
          <div class="flex mt-4 md:mt-6">
            <a
              href="/"
              class="btn btn-primary text-green-t focus:outline-none bg-green-hd border hover:bg-green-bg hover:text-green-t"
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
      <div class="max-w-sm p-6 bg-green-t border rounded-lg shadow">
        <h5 class="mb-2 text-2xl font-thin tracking-tight text-green-bg text-center">
          {order.ticket.title}
        </h5>
        <p class="mb-3 font-bold text-gray-500 dark:text-gray-400 text-center">
          {order.ticket.price}
        </p>
        <p class="mb-3 font-bold text-gray-500 dark:text-gray-400 text-center">
          Time left to pay: {timeLeft} seconds
        </p>
        <div className="text-center">
          <StripeCheckout
            token={({ id }) => doRequest({ token: id })}
            stripeKey="pk_test_JMdyKVvf8EGTB0Fl28GsN7YY"
            amount={order.ticket.price * 100}
            email={currentUser.email}
          />
        </div>
        {errors}
      </div>
    </div>
    // <div>
    //   Time left to pay: {timeLeft} seconds
    //   <StripeCheckout
    //     token={({ id }) => doRequest({ token: id })}
    //     stripeKey="pk_test_JMdyKVvf8EGTB0Fl28GsN7YY"
    //     amount={order.ticket.price * 100}
    //     email={currentUser.email}
    //   />
    //   {errors}
    // </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
