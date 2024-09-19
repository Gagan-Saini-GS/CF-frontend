import React, { useState } from "react";
import swal from "sweetalert";
import {
  Brands,
  Categories,
  Colors,
  Genders,
  Materials,
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
import { apiCaller } from "../../GS-Libs/utils/apiCaller";
import FullScreenLoader from "../../GS-Libs/MultiUse/FullScreenLoader";
import uploadImage from "../../GS-Libs/utils/uploadImage";

export default function UploadProduct() {
  const [isProductUploading, setIsProductUploading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const uploadProduct = async () => {
    setIsProductUploading(true);
    try {
      await apiCaller("/upload-product", "post", {
        productDetails: productDetails,
      });

      swal("Thanks", "Your Product is uploaded!", "success");
      setProductDetails(initailProductValues);
      setImageIndex(0);
      setIsProductUploading(false);
    } catch (error) {
      swal("Oops", "Something went wrong", "error").then(() => {
        setProductDetails(initailProductValues);
        setImageIndex(0);
        setIsProductUploading(false);
      });
    }
  };

  const {
    formData: productDetails,
    setFormData: setProductDetails,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  } = useForm(initailProductValues, uploadProductValidation, uploadProduct);

  if (isProductUploading) {
    return (
      <div className="pb-4 p-2 h-full relative flex items-center justify-center">
        <FullScreenLoader message="Uploading Product" />
      </div>
    );
  }

  return (
    <>
      <div className="pb-4 p-2 px-0.5">
        <label htmlFor="product-image-upload">
          <div
            className={`bg-Black/40 w-full h-64 xs:h-80 sm:h-96 rounded-xl absolute top-2 left-0 ${
              errors.productImages && "border border-Red"
            }`}
          >
            <input
              type="file"
              className="hidden"
              id="product-image-upload"
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

        <div className="w-full h-[15rem] xs:h-[19rem] sm:h-[23rem]">
          <img
            src={productDetails.productImages[imageIndex]}
            alt=""
            className="w-full h-full rounded-lg block"
          />
        </div>
        <div className="pt-1">
          {errors.productImages && (
            <span className="text-Red text-sm font-normal">
              {errors.productImages}
            </span>
          )}
        </div>
      </div>
      {productDetails.productImages.length > 1 && (
        <div className="flex items-center gap-2 mb-2">
          <Button
            text="Prev"
            onClick={() => {
              if (imageIndex >= 1) {
                setImageIndex(imageIndex - 1);
              } else {
                setImageIndex(productDetails.productImages.length - 1);
              }
            }}
          />
          <Button
            text="Next"
            onClick={() => {
              if (imageIndex < productDetails.productImages.length - 1) {
                setImageIndex(imageIndex + 1);
              } else {
                setImageIndex(0);
              }
            }}
          />
        </div>
      )}
      <>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-2 gap-y-4 items-center">
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
                    value: {
                      label: argument?.label?.toLowerCase(),
                      value: argument?.label?.toLowerCase(),
                    },
                    type: "select",
                  },
                });
              }}
              value={productDetails.brand.name}
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
                    value: {
                      label: argument?.label?.toLowerCase(),
                      value: argument?.label?.toLowerCase(),
                    },
                    type: "select",
                  },
                });
              }}
              value={productDetails.category.name}
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
                const isGenderSelected = productDetails.gender === option.name;
                return (
                  <div
                    key={option.id}
                    onClick={() => {
                      handleChange({
                        target: {
                          name: "gender",
                          value: isGenderSelected ? "" : option.name,
                          type: "checkbox",
                        },
                      });
                    }}
                  >
                    <Checkbox
                      label={option.name}
                      isSelected={isGenderSelected}
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
                const isSizeSelected = productDetails.sizes
                  .map((size) => size.name)
                  .includes(option.name);
                return (
                  <div key={option.id}>
                    <Checkbox
                      label={option.name}
                      isSelected={isSizeSelected}
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "sizes",
                            value: isSizeSelected
                              ? [
                                  ...productDetails.sizes.filter(
                                    (size) => size.name !== option.name
                                  ),
                                ]
                              : [...productDetails.sizes, { ...option }].sort(
                                  (a, b) => a.id - b.id
                                ),
                            type: "checkbox",
                          },
                        });
                      }}
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
                const isMaterialSelected =
                  productDetails.materials === option.name;
                return (
                  <div key={option.id}>
                    <Checkbox
                      label={option.name}
                      isSelected={isMaterialSelected}
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "materials",
                            value: isMaterialSelected ? "" : option.name,
                            type: "checkbox",
                          },
                        });
                      }}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
              {Colors.map((color) => {
                const isColorSelected = productDetails.colors
                  .map((color) => color.name.toLowerCase())
                  .includes(color.name.toLowerCase());
                return (
                  <ColorFilterCard
                    key={color.id}
                    color={color.color}
                    onClick={() => {
                      handleChange({
                        target: {
                          name: "colors",
                          value: isColorSelected
                            ? [
                                ...productDetails.colors.filter(
                                  (productColor) =>
                                    productColor.name.toLowerCase() !==
                                    color.name.toLowerCase()
                                ),
                              ]
                            : [
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
                    isSelected={isColorSelected}
                  />
                );
              })}
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
          <div className="w-full flex flex-col">
            <div className="text-lg font-semibold">Quantity</div>
            <Input
              type="number"
              name="quantity"
              placeholder="Product quantity"
              value={productDetails.quantity}
              onChange={handleChange}
              errorMessage={errors.quantity}
              className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
            />
          </div>
        </div>
        <div className="flex justify-end w-full pt-5">
          <div className="w-full md:w-1/3">
            <Button
              text="Submit Product"
              onClick={handleSubmit}
              type="button"
            />
          </div>
        </div>
      </>
    </>
  );
}
