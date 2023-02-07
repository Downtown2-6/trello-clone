import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function UserProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  console.log(
    `***
      ***
      ***
      Logging:This is the event in UserProfile
      ***
      ***
      ***
      `,
    user
  );

  const handleSubmit = (event) => {
    if (password != passwordVerify) {
      Alert("Your passwords need to match!");
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="passwordVerify"
          placeholder="PasswordVerify"
          value={passwordVerify}
          onChange={(event) => setPasswordVerify(event.target.value)}
        />
        <button type="submit">Update User</button>
      </form>
    </>
  );
}

export default UserProfile;
