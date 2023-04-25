import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import swal from "sweetalert";

export default function UpdateProfile() {
  // Changing image into base64
  const [imgSrc, setImgSrc] = useState("");
  // const [user, setUser] = useState({
  //   imgSrc: "",
  //   phonenumber: "",
  //   address: "",
  //   website: "",
  // });

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

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:5000/user-details", {
  //       authToken: localStorage.getItem("authToken"),
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setUser(response.data.foundUser);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
          swal("Done!", "Your profile is updated", "success");
          console.log(response);

          // Redirect to my-profile page
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
        <textarea rows="4" className="address" placeholder="Address"></textarea>
      </div>
      <div className="update-profile-item">
        <p>Website link</p>
        <input type="text" className="website" placeholder="Website Link" />
      </div>
      <div className="update-profile-item">
        <button onClick={updateProfile}>Save</button>
      </div>
    </form>
  );
}
