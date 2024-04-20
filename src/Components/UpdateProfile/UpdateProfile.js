import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

export default function UpdateProfile() {
  const navigate = useNavigate();
  // Changing image into base64
  const [imgSrc, setImgSrc] = useState("");
  const [user, setUser] = useState({
    userProfileImg: "",
    phoneNumber: "",
    address: "",
    website: "",
  });

  async function uploadImage(event) {
    const file = event.target.files[0];
    const base64 = await convertIntoBase64(file);
    setImgSrc(base64);
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

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/user-details`, {
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        const data = response.data.foundUser;

        const temp = {
          userProfileImg: data.userProfileImg,
          phoneNumber: data.phoneNumber,
          address: data.address,
          website: data.website,
        };

        setImgSrc(data.userProfileImg);
        setUser(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updateProfile() {
    const currentData = {
      userProfileImg: imgSrc,
      phoneNumber: document.querySelector(".phonenumber").value,
      address: document.querySelector(".address").value,
      website: document.querySelector(".website").value,
    };

    axios
      .patch(`${SERVER_URL}/update-profile`, {
        user: currentData,
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        if (response.status === 200) {
          swal("Done!", "Your profile is updated", "success").then(() => {
            navigate("/my-profile");
          });
        } else {
          swal("Oops!", "Something went wrong, try again", "error");
        }
      })
      .catch((err) => {
        swal("Oops!", "Something went wrong, try again", "error");
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
        <img
          className="user-profile-img"
          src={user.userProfileImg}
          alt="user-profile-img"
        />
        <input
          type="file"
          className="userprofileimg"
          onChange={(event) => {
            uploadImage(event);
          }}
          defaultValue={user.userProfileImg}
        />
      </div>
      <div className="update-profile-item">
        <p>Phone Number</p>
        <input
          type="tel"
          className="phonenumber"
          maxLength={10}
          placeholder="Phone Number"
          defaultValue={user.phoneNumber}
        />
      </div>
      <div className="update-profile-item">
        <p>Address</p>
        <textarea
          rows="4"
          className="address"
          placeholder="Address"
          defaultValue={user.address}
        ></textarea>
      </div>
      <div className="update-profile-item">
        <p>Website link</p>
        <input
          type="text"
          className="website"
          placeholder="Website Link"
          defaultValue={user.website}
        />
      </div>
      <div className="update-profile-item">
        <button onClick={updateProfile}>Save</button>
      </div>
    </form>
  );
}
