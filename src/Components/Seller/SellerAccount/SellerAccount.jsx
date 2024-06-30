import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { SERVER_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../GS-Libs/Input/input";
import useForm from "../../../hooks/useForm";
import {
  sellerInitailValues,
  sellerValidation,
} from "../../../validations/seller-form";
import Button from "../../../GS-Libs/Buttons/Button";

export default function SellerAccount() {
  const navigate = useNavigate();
  const becomeSeller = () => {
    axios
      .post(`${SERVER_URL}/become-seller`, {
        sellerEmail: sellerDetails.email,
        sellerPhoneNumber: sellerDetails.phoneNumber,
        sellerPANCardNumber: sellerDetails.panCardNumber,
        sellerGSTNumber: sellerDetails.gstNumber,
        authToken: localStorage.getItem("authToken"),
        "Content-type": "application/json; charset=UTF-8",
      })
      .then(() => {
        setSellerDetails({
          email: "",
          phoneNumber: "",
          panCardNumber: "",
          gstNumber: "",
          terms: false,
        });
        swal("Thanks!", "You become a seller now", "success").then(() => {
          navigate("/home");
        });
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Something is wrong", "error").then(() => {
          navigate("/home");
        });
      });
  };

  const {
    formData: sellerDetails,
    setFormData: setSellerDetails,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  } = useForm(sellerInitailValues, sellerValidation, becomeSeller);

  return (
    <div className="h-full">
      <div className="text-2xl font-semibold pb-4">Become Seller</div>
      <div className="flex flex-col justify-between">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div>
              <div className="text-Gray font-semibold">Contact Details</div>
              <div className="flex flex-col gap-2 w-full">
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  value={sellerDetails.email}
                  onChange={handleChange}
                  errorMessage={errors.email}
                  className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                />
                <Input
                  type="number"
                  name="phoneNumber"
                  placeholder="Enter Mobile Number"
                  value={sellerDetails.phoneNumber}
                  onChange={handleChange}
                  errorMessage={errors.phoneNumber}
                  className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                />
              </div>
            </div>
            <div>
              <div className="text-Gray font-semibold">Account Details</div>
              <div className="flex flex-col gap-2 w-full">
                <Input
                  type="text"
                  name="panCardNumber"
                  placeholder="Enter PAN Card Number"
                  value={sellerDetails.panCardNumber}
                  onChange={handleChange}
                  errorMessage={errors.panCardNumber}
                  className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                />
                <Input
                  type="text"
                  name="gstNumber"
                  placeholder="Enter GST Number"
                  value={sellerDetails.gstNumber}
                  onChange={handleChange}
                  errorMessage={errors.gstNumber}
                  className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="terms"
                value={sellerDetails.terms}
                checked={sellerDetails.terms}
                onChange={(e) => {
                  setSellerDetails((prev) => ({
                    ...prev,
                    terms: e.target.checked,
                  }));

                  if (e.target.checked) {
                    setErrors((prev) => ({
                      ...prev,
                      terms: "",
                    }));
                  }
                }}
              />
              {errors.terms !== "" && (
                <div className="text-Red text-sm">{errors.terms}</div>
              )}
              <div>Accept T&C to continue</div>
            </div>
          </div>
          <div className="w-1/3">
            <Button text="Become Seller" type="submit" />
          </div>
          {/* <button
            type="submit"
            className="w-1/3 absolute bottom-0 right-0 bg-Purple p-2 text-White font-semibold text-center cursor-pointer rounded"
          >
            Become Seller
          </button> */}
        </form>
      </div>
    </div>
  );
}
