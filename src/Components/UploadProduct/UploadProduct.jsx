import React, { useState } from "react";
import uploadImage from "../../Assets/imgChange";
import axios from "axios";
import swal from "sweetalert";
import {
  Brands,
  Categories,
  Colors,
  Genders,
  Materials,
  SERVER_URL,
  Sizes,
} from "../../config";
import Checkbox from "../../GS-Libs/Input/Checkbox";
import Button from "../../GS-Libs/Buttons/Button";
import ColorFilterCard from "../Filters/ColorFilterCard";
import useForm from "../../hooks/useForm";
import {
  initailProductValues,
  uploadProductValidation,
} from "../../validations/upload-product-validation";
import { Input } from "../../GS-Libs/Input/input";
import Select from "../../GS-Libs/Input/Select";
import { Textarea } from "../../GS-Libs/Input/Textarea";

export default function UploadProduct() {
  const [imageIndex, setImageIndex] = useState(0);

  const uploadProduct = () => {
    axios
      .post(`${SERVER_URL}/upload-product`, {
        authToken: localStorage.getItem("authToken"),
        productDetails: productDetails,
      })
      .then(() => {
        swal("Thanks", "Your Product is submitted!", "success").then(() => {
          setProductDetails(initailProductValues);
          setImageIndex(0);
        });
      })
      .catch((err) => {
        console.log(err);
        swal("Oops", "Something went wrong", "error").then(() => {
          setProductDetails(initailProductValues);
          setImageIndex(0);
        });
      });
  };

  const {
    formData: productDetails,
    setFormData: setProductDetails,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  } = useForm(initailProductValues, uploadProductValidation, uploadProduct);

  return (
    <div className="">
      <div>
        <div className="">
          <div className="pb-4">
            <label htmlFor="profile-image-upload">
              <div
                className={`bg-Black/40 w-full h-96 rounded-xl absolute top-0 left-0`}
              >
                <input
                  type="file"
                  className="hidden"
                  id="profile-image-upload"
                  multiple={true}
                  onChange={(event) => {
                    uploadImage(event).then((res) => {
                      setProductDetails((prev) => ({
                        ...prev,
                        productImages: res,
                      }));
                    });
                    if (errors.productImages) {
                      setErrors((prev) => ({
                        ...prev,
                        productImages: "",
                      }));
                    }
                  }}
                />
              </div>
            </label>

            <div className="w-full h-[23rem]">
              <img
                src={productDetails.productImages[imageIndex]}
                alt=""
                className="w-full h-full rounded-lg block"
              />

              {productDetails.productImages.length > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    text="Prev"
                    onClick={() => {
                      if (imageIndex >= 1) {
                        setImageIndex(imageIndex - 1);
                      }
                    }}
                  />
                  <Button
                    text="Next"
                    onClick={() => {
                      if (
                        imageIndex <
                        productDetails.productImages.length - 1
                      ) {
                        setImageIndex(imageIndex + 1);
                      }
                    }}
                  />
                </div>
              )}
            </div>
            <div className="pt-1">
              {errors.productImages && (
                <span className="text-Red text-sm font-normal">
                  {errors.productImages}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 items-center">
              <div>
                <div className="text-lg font-semibold">Name</div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Product name"
                  value={productDetails.name}
                  onChange={handleChange}
                  errorMessage={errors.name}
                  className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                />
              </div>
              <div>
                <div className="text-lg font-semibold">Price</div>
                <Input
                  type="number"
                  name="price"
                  placeholder="Product price"
                  value={productDetails.price}
                  onChange={handleChange}
                  errorMessage={errors.price}
                  className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                />
              </div>
              <div>
                <div className="text-lg font-semibold">Brand</div>
                <Select
                  name="brand"
                  onChange={(argument) => {
                    handleChange({
                      target: {
                        name: "brand",
                        value: argument?.label?.toLowerCase(),
                        type: "select",
                      },
                    });
                  }}
                  value={productDetails.brand.label}
                  options={Brands.map((brand) => ({
                    label: brand.name,
                    value: brand.id,
                  }))}
                  placeholder="Select a brand"
                  errorMessage={errors.brand}
                />
              </div>
              <div>
                <div className="text-lg font-semibold">Category</div>
                <Select
                  name="category"
                  onChange={(argument) => {
                    handleChange({
                      target: {
                        name: "category",
                        value: argument?.label?.toLowerCase(),
                        type: "select",
                      },
                    });
                  }}
                  value={productDetails.category.value}
                  options={Categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  placeholder="Select a Category"
                  errorMessage={errors.category}
                />
              </div>
              <div className="">
                <div className="text-lg font-semibold">
                  Genders{" "}
                  {errors.gender && (
                    <span className="text-Red text-sm font-normal">
                      ({errors.gender})
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {Genders.map((option) => {
                    return (
                      <div
                        key={option.id}
                        onClick={() => {
                          handleChange({
                            target: {
                              name: "gender",
                              value: option.name,
                              type: "checkbox",
                            },
                          });
                        }}
                      >
                        <Checkbox
                          label={option.name}
                          isSelected={productDetails.gender === option.name}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="">
                <div className="text-lg font-semibold">
                  Sizes{" "}
                  {errors.sizes && (
                    <span className="text-Red text-sm font-normal">
                      ({errors.sizes})
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {Sizes.map((option) => {
                    return (
                      <div
                        key={option.id}
                        onClick={() => {
                          handleChange({
                            target: {
                              name: "sizes",
                              value: [
                                ...productDetails.sizes,
                                { ...option },
                              ].sort((a, b) => a.id - b.id),
                              type: "checkbox",
                            },
                          });
                        }}
                      >
                        <Checkbox
                          label={option.name}
                          isSelected={productDetails.sizes
                            .map((size) => size.name)
                            .includes(option.name)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col mt-4">
                <div className="text-lg font-semibold">
                  Materials{" "}
                  {errors.materials && (
                    <span className="text-Red text-sm font-normal">
                      ({errors.materials})
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 w-full">
                  {Materials.map((option) => {
                    return (
                      <div
                        key={option.id}
                        onClick={() => {
                          handleChange({
                            target: {
                              name: "materials",
                              value: option.name,
                              type: "checkbox",
                            },
                          });
                        }}
                      >
                        <Checkbox
                          label={option.name}
                          isSelected={productDetails.materials === option.name}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-semibold">
                  Colors{" "}
                  {errors.colors && (
                    <span className="text-Red text-sm font-normal">
                      ({errors.colors})
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 w-full">
                  {Colors.map((color) => (
                    <ColorFilterCard
                      key={color.id}
                      color={color.color}
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "colors",
                            value: [
                              ...productDetails.colors,
                              {
                                name: color.name.toLowerCase(),
                                color: color.color,
                                id: color.id,
                              },
                            ],
                            type: "checkbox",
                          },
                        });
                      }}
                      isSelected={productDetails.colors
                        .map((color) => color.name.toLowerCase())
                        .includes(color.name.toLowerCase())}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col">
                <div className="text-lg font-semibold">Description</div>
                <Textarea
                  rows="5"
                  placeholder="As always great desgin and quality..."
                  name="description"
                  onChange={handleChange}
                  value={productDetails.description}
                  errorMessage={errors.description}
                  className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                />
              </div>
            </div>
            <div className="flex justify-end w-full pt-5">
              <div className="w-1/3">
                <Button
                  text="Submit Product"
                  onClick={handleSubmit}
                  type="button"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
