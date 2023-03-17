import axios from "axios";
import React, { useState } from "react";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  // Changing image into base64
  const [imgSrc, setImgSrc] = useState("");

  async function uploadImage(event) {
    const file = event.target.files[0];
    const base64 = await convertIntoBase64(file);
    setImgSrc(base64);
    // setIsIMG(true);
  }

  function convertIntoBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  }

  function updateProfile() {
    const user = {
      userProfileImg: imgSrc,
      phonenumber: document.querySelector(".phonenumber").value,
      address: document.querySelector(".address").value,
      website: document.querySelector(".website").value,
    };

    // console.log(user);
    axios
      .post("http://localhost:5000/update-profile", {
        user: user,
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Profile Update");
          console.log(response.ans);
        } else {
          alert("Error Try Again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <form
      className="update-profile-container"
      onSubmit={(event) => {
        event.preventDefault();
        updateProfile();
      }}
    >
      <div className="update-profile-item">
        <p>Profile Image</p>
        <input
          type="file"
          className="userprofileimg"
          onChange={(event) => {
            uploadImage(event);
          }}
        />
      </div>
      {/* <div className="update-profile-item">
        <p>Name</p>
        <input type="text" className="username" placeholder="Username" />
      </div>
      <div className="update-profile-item">
        <p>Email</p>
        <input type="email" className="useremail" placeholder="Useremail" />
      </div> */}
      <div className="update-profile-item">
        <p>Phone Number</p>
        <input
          type="tel"
          className="phonenumber"
          maxLength={10}
          placeholder="Phone Number"
        />
      </div>
      <div className="update-profile-item">
        <p>Address</p>
        <input type="text" className="address" placeholder="Address" />
      </div>
      <div className="update-profile-item">
        <p>Website link</p>
        <input type="text" className="website" placeholder="Website Link" />
      </div>
      <div>
        <button onClick={updateProfile}>Save</button>
      </div>
    </form>
  );
}
