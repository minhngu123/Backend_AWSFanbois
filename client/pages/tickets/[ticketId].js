import Router from "next/router";
import useRequest from "../../hooks/use-request";

const TicketShow = ({ ticket, currentUser }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });
  const formattedDate = new Date(ticket.date).toLocaleDateString();

  return (
    <div>
      <div className="py-8">
        <div className="grid md:grid-cols-1 mt-3 justify-items-center p-1/2">
          <div className="grid gap-4">
            <div className="w-full p-1 mb-6 mx-2 bg-white border-green-hd rounded-lg shadow">
              <div className="w-full rounded-t-lg ">
                {ticket.image == 0 ? (
                  <img
                    className="rounded-t-lg min-h-96 max-h-96 w-full object-cover"
                    src="https://static.vecteezy.com/system/resources/previews/021/347/837/large_2x/aaa-editor_template.jpeg?last_updated=1691523130"
                    alt=""
                  />
                ) : (
                  <img
                    className="rounded-t-lg min-h-96 max-h-96 w-full object-cover"
                    src={ticket.image}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 bg-green-hd rounded-lg mt-3">
            <div className="md:flex md:justify-between">
              <div className="grid md:grid-cols-4 mb-6 md:mb-0 ml-8 ">
                <span className="text-3xl font-extralight text-gray-400">
                  {ticket.title}
                </span>
                <span></span>
                <button
                  onClick={() => doRequest()}
                  type="button"
                  className="text-xl font-thin transition-colors py-2.5 px-5 me-2 mb-2 text-green-t focus:outline-none bg-green-hd rounded-full border hover:bg-green-t2 hover:text-green-t focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Book The Show
                </button>
                {ticket.userId == currentUser.id ? (
                  <button
                    onClick={() => doRequest()}
                    type="button"
                    className="text-xl font-thin transition-colors py-2.5 px-5 me-2 mb-2 text-green-t focus:outline-none bg-green-hd rounded-full border hover:bg-green-t2 hover:text-green-t focus:z-10 focus:ring-4 focus:ring-gray-100"
                  >
                    Update
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div className="mb-6 md:mb-0 ml-8 mt-6">
              <div className="flex">
                <svg
                  className="w-8 h-8 text-green-t"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z"
                  />
                </svg>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ml-4 text-xl">
                  <span className="mb-3 font-semibold text-green-t">
                    {formattedDate}
                  </span>
                </p>
              </div>
            </div>
            <div className="mb-6 md:mb-0 ml-8 mt-6">
              <div className="flex">
                <svg
                  className="w-8 h-8 text-green-t"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 10"
                >
                  <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                </svg>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ml-4 text-xl">
                  <span className="mb-3 font-semibold text-green-t">
                    {ticket.location}
                  </span>
                </p>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-3">
                <span className="mb-3 font-light text-gray-500 text-xl">
                  {ticket.description}
                </span>
              </p>
            </div>
            <div className="border-t border-gray-300"></div>
            <div className="mb-6 md:mb-0 ml-8 mt-6">
              <div className="flex">
                <p className="mb-3 font-Thin text-gray-700 dark:text-gray-400 ml-4 text-2xl">
                  <span className="mb-3 text-lg font-bold text-green-t">
                    {ticket.price} $
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
