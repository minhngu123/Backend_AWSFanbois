import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <div className="mt-8 pb-16 py-32">
        <form
          className="max-w-md mx-auto bg-green-hd p-6 rounded-md justify-center"
          onSubmit={onSubmit}
        >
          <div className="text-center">
            <span className="font-medium text-3xl my-12 py-12 text-center text-green-t">
              Create Ticket
            </span>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="text-green-t font-thin text-2xl">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-green-t font-thin text-2xl">Price</label>
            <input
              value={price}
              onBlur={onBlur}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
            />
          </div>
          {errors}
          <button className="btn btn-primary mt-8 bg-green-t text-green-bg border-green-t hover:bg-green-bg hover:text-green-t hover:border-green-bg">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;
