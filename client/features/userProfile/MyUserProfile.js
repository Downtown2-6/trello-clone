import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfileImage } from "../singleBoard/singleBoardSlice";

// If page is self-contained it doesn't need to be sent to the store.

function UserProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();

  const handleImageUpdate = (event) => {
    event.preventDefault();
    console.log(
      `***
    ***
    ***
    Logging:this is handleimageUpdate
    ***
    ***
    ***
    `,
      profilePicture
    );
    const userId = user.id
    dispatch(updateMyProfileImage({ userId, url:profilePicture }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    if ("" || !password || !passwordVerify || password != passwordVerify) {
      alert("You need a password and it needs to match!");
      return null;
    }
    if (!email || !emailVerify || email != emailVerify) {
      alert("Your emails need to match!");
      return null;
    }

    axios.put(`/api/users/changeUser/${user.id}`, data);
  };

  useEffect(() => {
    // window.addEventListener("paste", function (e) {
    //   e.preventDefault();
    //   alert("Please don't just copy paste. \n What if you made a mistake?");
    // });
    setProfilePicture(user.profilePicture);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  }, [user]);

  return (
    <>
      <br />
      <br />
      <div
        style={{
          width: "100px",
          height: "100px",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <img style={{ width: "100%" }} src={user.imageUrl} alt="User Image" />
      </div>{" "}
      <br />
      <form onSubmit={handleImageUpdate}>
        <input
          type="text"
          placeholder="profile image url"
          value={profilePicture}
          onChange={(event) => setProfilePicture(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <br></br>
      <br></br>
      <br></br>{" "}
      {user.firstName ? (
        <h1>Welcome to your profile, {user.firstName}</h1>
      ) : (
        <h1>So, what's your name?</h1>
      )}
      <p>First Name</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <p>Last Name</p>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <p>Email</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Verify Email"
          value={undefined}
          onChange={(event) => setEmailVerify(event.target.value)}
        />
        <br />

        <p>Password</p>

        <input
          type="password"
          placeholder="Password"
          value={undefined}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="verify password"
          value={undefined}
          onChange={(event) => setPasswordVerify(event.target.value)}
        />
        <br />

        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default UserProfile;
