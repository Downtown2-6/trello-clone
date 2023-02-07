import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function UserProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `***
    ***
    ***
    Logging:We are SUBMITTING
    ***
    ***
    ***
    `,
      password,
      passwordVerify
    );
    if (!password || !passwordVerify || password != passwordVerify) {
      alert("Your passwords need to match!");
      return null;
    }

  };

  useEffect(() => {
    setFirstName(user.firstName || "No Value Detected");
    setLastName(user.lastName || "No Value Detected");
    setEmail(user.email);
  }, [user]);

  return (
    <>
      <br></br>
      <br></br>
      <br></br>{" "}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={emailVerify}
          onChange={(event) => setEmailVerify(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={null}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={null}
          onChange={(event) => setPasswordVerify(event.target.value)}
        />
        <button type="submit">Update User</button>
      </form>
    </>
  );
}

export default UserProfile;
