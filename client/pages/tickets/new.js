import { useState } from "react";
import { Datepicker } from "flowbite-react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      description,
      image,
      location,
      date,
      price,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(title, description, image, location, date, price);
    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <div className="mt-8 pb-16 py-32">
        <form
          className="max-w-md mx-auto bg-green-hd p-6 rounded-md justify-center"
          onSubmit={onSubmit}
        >
          <div className="text-center">
            <span className="font-thin text-3xl my-12 py-12 text-center text-green-t">
              Create Ticket
            </span>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="text-green-t font-thin text-md font-sans">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-green-t font-thin text-md font-sans">
              Price
            </label>
            <input
              value={price}
              onBlur={onBlur}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-green-t font-thin text-md font-sans">
              Description
            </label>
            <input
              value={description}
              onBlur={onBlur}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-green-t font-thin text-md font-sans">
              Image
            </label>
            <input
              value={image}
              onBlur={onBlur}
              onChange={(e) => setImage(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-green-t font-thin text-md font-sans">
              Location
            </label>
            <input
              value={location}
              onBlur={onBlur}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-green-t font-thin text-md font-sans">
              Date
            </label>
            <Datepicker
              value={date}
              onSelectedDateChanged={handleDateChange}
            />
          </div>
          {errors}
          <button className="btn btn-primary mt-8 bg-green-t text-green-bg border-green-t hover:bg-green-t2 hover:text-green-t hover:border-green-bg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;
