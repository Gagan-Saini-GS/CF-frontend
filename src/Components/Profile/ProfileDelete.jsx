import React from "react";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { apiCaller } from "../../GS-Libs/utils/apiCaller";
import { useNavigate } from "react-router-dom";

const ProfileDelete = ({ user }) => {
  const navigate = useNavigate();

  const deleteAccount = () => {
    swal(
      "Delete Account!",
      "Your account will be peramantly deleted",
      "warning",
      {
        buttons: {
          cancel: true,
          confirm: {
            text: "Delete",
            value: true,
            className: "bg-Red/70 text-White !hover:bg-Red/80",
          },
        },
      }
    ).then(async (confirm) => {
      if (confirm) {
        if (
          user?.email !== "guestuser@closetfashion.com" &&
          user?.email !== "cfadmin@gmail.com"
        ) {
          const data = await apiCaller(
            "/delete-account",
            "post",
            {},
            {},
            true
          ).then(() => {
            localStorage.removeItem("CF_authToken");
          });
          navigate("/home");
        } else {
          swal("Sorry!", "Guest User can't be deleted", "error");
        }
      }
    });
  };

  return (
    <div
      className="border-dashed border border-Gray !p-2 rounded-md flex justify-between items-center w-full hover:bg-Red/70 hover:text-White hover:border-solid hover:border-Red/70 transition-all duration-75 ease-in-out cursor-pointer"
      onClick={deleteAccount}
    >
      <div>Delete Account</div>
      <div>
        <MdDelete className="w-5 h-5" />
      </div>
    </div>
  );
};

export default ProfileDelete;
