import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <div
        key={ticket.id}
        class="max-w-sm p-1 mb-6 mx-2 bg-white border border-green-hd rounded-lg shadow"
      >
        <img
          class="rounded-t-lg"
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt=""
        />
        <div class="p-5">
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700">
              {ticket.title}
            </h5>
          </Link>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Description
          </p>
          <div class="grid md:grid-cols-2">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Date:{" "}
              <span class="mb-3 font-normal text-green-bg dark:text-gray-400">
                11/11/2024
              </span>
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Location:{" "}
              <span class="mb-3 font-normal text-green-bg dark:text-gray-400">
                Da Nang
              </span>
            </p>
            <div class="grid md:grid-cols-1">
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Price:{" "}
                <span class="mb-3 font-normal text-green-bg dark:text-gray-400 text-lg">
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
      <div class="grid md:grid-cols-4 mt-6 justify-items-center p-1/2">
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
