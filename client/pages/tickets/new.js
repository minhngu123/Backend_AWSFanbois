import { useState } from "react";
import { Datepicker } from "flowbite-react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import axios from "axios";
import { instance } from "../../components/instance";

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

  // const instance = axios.create();
  // const uploadImage = async (files) => {
  //   const formData = new FormData();
  //   formData.append("file", files[0]);
  //   formData.append("upload_preset", "wfpsgkjn");
  //   formData.append("cloud_name", "dcbt4j7z2");
  //   formData.append("api_secret", "c1kVbAo1XZxXVjX0Z3sLlLmS4Sc");
  //   const res = await instance
  //     .post("https://api.cloudinary.com/v1_1/dcbt4j7z2/image/upload", formData)
  //     .then((response) => {
  //       setImage(response.data.url);
  //       console.log(response);
  //     })
  //     .catch((errors) => {
  //       alert("Wrong type of file, Image file only");
  //     });
  // };

  
  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "wfpsgkjn");
    instance
      .post("https://api.cloudinary.com/v1_1/dcbt4j7z2/image/upload", formData, {
        transformRequest: [
          (data, headers) => {
            delete headers.common["jwt-token"];
            return data;
          },
        ]
      })
      .then((response) => {
        setImage(response.data.url);
      })
      .catch((errors) => {
        alert("Wrong type of file, Image file only");
      });
  };

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
    const formattedDate = date.toLocaleDateString();
    setDate(formattedDate);
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
          <label
            className="block font-thin font-sans text-green-t dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-green-t border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files);
            }}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG (MAX. 800x400px).
          </p>
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
            <Datepicker value={date} onSelectedDateChanged={handleDateChange} />
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
