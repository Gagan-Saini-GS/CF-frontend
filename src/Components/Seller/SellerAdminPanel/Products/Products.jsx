import React, { useEffect, useState } from "react";
import CompleteTable from "../../../../GS-Libs/Table/CompleteTable";
import { apiCaller } from "../../../../GS-Libs/utils/apiCaller";

const columns = [
  {
    id: "id",
    label: "ID",
    className: "w-8 text-center",
  },
  {
    id: "image",
    label: "Image",
    className: "w-10",
  },
  {
    id: "name",
    label: "Name",
    className: "w-64 max-w-64",
  },
  {
    id: "brand",
    label: "Brand",
    className: "w-40",
  },
  {
    id: "material",
    label: "Material",
    className: "w-40",
  },
  {
    id: "price",
    label: "Price",
    className: "w-20 text-center",
  },
  {
    id: "quantity",
    label: "Quantity",
    className: "w-20 text-center",
  },
  {
    id: "status",
    label: "Status",
    className: "w-24 text-center",
  },
  // {
  //   id: "edit",
  //   label: "Edit",
  // },
  // {
  //   id: "delete",
  //   label: "Delete",
  // },
];

const Products = () => {
  const [tableData, setTableData] = useState([]);

  const getProducts = async () => {
    const data = await apiCaller(
      "/get-products-by-seller",
      "get",
      {},
      {},
      true
    );

    setTableData(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="text-2xl font-semibold">All Products</div>
      <CompleteTable columns={columns} data={tableData} />
    </div>
  );
};

export default Products;
