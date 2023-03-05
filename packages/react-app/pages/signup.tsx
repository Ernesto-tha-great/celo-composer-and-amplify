import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

export const Signup: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const router = useRouter();

  const signUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username: userName,
        password: passWord,
        attributes: {
          email: userName,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      console.log(user);
      router.push({ pathname: "/Verification", query: { email: userName } });
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  const handleUsernameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassWord(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Do something with the form data, such as submit it to a server
    signUp();
  };

  return (
    <form className="w-full my-16 max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={userName}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={passWord}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};
