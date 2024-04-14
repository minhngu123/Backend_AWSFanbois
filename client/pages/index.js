import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <div
        key={ticket.id}
        className="max-w-sm p-1 mb-6 mx-2 bg-white border border-green-hd rounded-lg shadow"
      >
        <img
          className="rounded-t-lg"
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt=""
        />
        <div className="p-5">
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
              {ticket.title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Description
          </p>
          <div className="grid md:grid-cols-2">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Date:{" "}
              <span className="mb-3 font-normal text-green-bg dark:text-gray-400">
                11/11/2024
              </span>
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Location:{" "}
              <span className="mb-3 font-normal text-green-bg dark:text-gray-400">
                Da Nang
              </span>
            </p>
            <div className="grid md:grid-cols-1">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Price:{" "}
                <span className="mb-3 font-normal text-green-bg dark:text-gray-400 text-lg">
                  {ticket.price} $
                </span>
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="grid md:grid-cols-4 mt-6 justify-items-center p-1/2">
        {ticketList}
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
