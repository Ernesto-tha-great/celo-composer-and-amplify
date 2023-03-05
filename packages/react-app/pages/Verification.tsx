import { useRouter } from "next/router";
import React, { useState } from "react";
import { Auth } from "aws-amplify";

function Verification(props: any) {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerificationCodeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setVerificationCode(event.target.value);
  };

  const handleVerificationSubmit = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    // Here you would normally check the verification code against the one sent to the user's email
    // For the sake of simplicity, we'll just assume the code is valid
    try {
      console.log("newhhh", router.query.email?.toString());
      console.log("newhhh", verificationCode);
      await Auth.confirmSignUp(
        router.query.email!.toString(),
        verificationCode
      );
      console.log("newhhh", "success");
      router.push("/Login");
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verification
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleVerificationSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="verificationCode" className="sr-only">
                Verification Code
              </label>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                autoComplete="off"
                required
                maxLength={6}
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Verification Code"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verification;
