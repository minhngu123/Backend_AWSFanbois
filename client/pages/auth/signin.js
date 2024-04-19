import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="mt-8 pb-12">
      <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
        <span className="text-green-t text-2xl">Sign In</span>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-light text-green-t dark:text-white"
          >
            Your email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className=" transition-colors bg-gray-50 border border-gray-300 text-green-bg text-sm rounded-lg focus:ring-green-bg focus:border-green-bg block w-full p-2.5"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-light text-green-t dark:text-white"
          >
            Your password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="shadow-sm transition-colors bg-gray-50 border border-gray-300 text-green-bg text-sm rounded-lg focus:ring-green-bg focus:border-green-bg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-bg dark:focus:border-green-bg dark:shadow-sm-light"
            required
          />
        </div>
        {errors}
        <button className="btn btn-primary text-green-t focus:outline-none bg-green-hd border hover:bg-green-bg hover:text-green-t">
          Sign In
        </button>
      </form>
    </div>
  );
};
