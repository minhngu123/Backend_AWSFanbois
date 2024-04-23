import Router from "next/router";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import useRequest from "../../hooks/use-request";
import { useState } from "react";

const TicketShow = ({ ticket, currentUser }) => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  function onCloseModal() {
    setOpenModal(false);
  }
  const { doRequest, errors } = useRequest({
    url: "https://orders.awsfanbois.me/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  const {doUpdateRequest} = useRequest({
    url: `https://tickets.awsfanbois.me/api/tickets/${ticket.id}`,
    method: "post",
    body: {
      title: title,
      description: description,
      price:price,
      location:location
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doUpdateRequest();
  };
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
                {ticket.userId == currentUser.id ? (
                  <>
                    <Button
                      className="text-xl font-thin transition-colors py-2.5 px-5 me-2 mb-2 text-green-t focus:outline-none bg-green-hd rounded-full border hover:bg-green-t2 hover:text-green-t focus:z-10 focus:ring-4 focus:ring-gray-100"
                      onClick={() => setOpenModal(true)}
                    >
                      &nbsp; Update Ticket
                    </Button>
                    <Modal
                      show={openModal}
                      size="md"
                      onClose={onCloseModal}
                      popup
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
                          <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                              Update Ticket Informations
                            </h3>
                            <div>
                              <div className="mb-2 block">
                                <Label htmlFor="email" value="Ticket Title" />
                              </div>
                              <TextInput
                                value={ticket.title}
                                onChange={(event) =>
                                  setTitle(event.target.value)
                                }
                                required
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label htmlFor="price" value="Ticket Price $" />
                              </div>
                              <TextInput
                                id="title"
                                value={ticket.price}
                                onChange={(event) =>
                                  setPrice(event.target.value)
                                }
                                required
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label
                                  htmlFor="description"
                                  value="Ticket Description"
                                />
                              </div>
                              <Textarea
                                id="title"
                                value={ticket.description}
                                onChange={(event) =>
                                  setDescription(event.target.value)
                                }
                                required
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label htmlFor="location" value="Location" />
                              </div>
                              <TextInput
                                id="title"
                                value={ticket.location}
                                onChange={(event) =>
                                  setLocation(event.target.value)
                                }
                                required
                              />
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                              &nbsp;
                              <Link
                                href="#"
                                className="text-cyan-700 hover:underline dark:text-cyan-500"
                              >
                                Update Ticket
                              </Link>
                            </div>
                          </div>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </>
                ) : (
                  <button
                    onClick={() => doRequest()}
                    type="button"
                    className="text-xl font-thin transition-colors py-2.5 px-5 me-2 mb-2 text-green-t focus:outline-none bg-green-hd rounded-full border hover:bg-green-t2 hover:text-green-t focus:z-10 focus:ring-4 focus:ring-gray-100"
                  >
                    &nbsp; Book The Show
                  </button>
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
  const { data } = await client.get(
    `https://tickets.awsfanbois.me/api/tickets/${ticketId}`
  );

  return { ticket: data };
};

export default TicketShow;
