import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    if (password != repeatPassword) {
      alert("Your repeat password does not match")
      return;
    }
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="mt-8 pb-16">
      <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
        <span className="text-green-t text-2xl">Sign Up</span>
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
            placeholder="example@email.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-light text-green-t dark:text-white"
          >
            Your Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className=" transition-colors bg-gray-50 border border-gray-300 text-green-bg text-sm rounded-lg focus:ring-green-bg focus:border-green-bg block w-full p-2.5"
            placeholder="(+84) 12345678"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-light text-green-t dark:text-white"
          >
            Repeat Password
          </label>
          <input
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="password"
            id="password"
            className=" transition-colors bg-gray-50 border border-gray-300 text-green-bg text-sm rounded-lg focus:ring-green-bg focus:border-green-bg block w-full p-2.5"
            required
          />
        </div>
        {errors}
        <button className="btn btn-primary text-green-t focus:outline-none bg-green-hd border hover:bg-green-bg hover:text-green-t">
          Sign Up
        </button>
      </form>
    </div>
    // <form onSubmit={onSubmit}>
    //   <h1>Sign Up</h1>
    //   <div className="form-group">
    //     <label>Email Address</label>
    //     <input
    //       value={email}
    //       onChange={e => setEmail(e.target.value)}
    //       className="form-control"
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label>Password</label>
    //     <input
    //       value={password}
    //       onChange={e => setPassword(e.target.value)}
    //       type="password"
    //       className="form-control"
    //     />
    //   </div>
    //   {errors}
    //   <button className="btn btn-primary">Sign Up</button>
    // </form>
  );
};
