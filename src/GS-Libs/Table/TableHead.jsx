import React from "react";

/** Product Table Data Columns
 * ```````````````````````````
 * 1. ID (Number 1 to...)
 * 2. Name/title
 * 3. Primary Image
 * 4. Product Price
 * 5. Quantity (Stock)
 * 6. Status (Like Out of stock (red), Available (green), ordered from Manufacturer (yellow))
 * 7. Created at date & last updated date (any one)
 * 8. Edit & Delete option on row hover
 */

const TableHead = ({ columns }) => {
  return (
    <div className="pb-2 sticky top-0 z-20">
      <div className="bg-White">
        <div className="flex gap-4 items-center px-1 py-2 bg-Purple/50 rounded-md font-medium">
          {columns.map((column) => (
            <div className={column.className} key={column.id}>
              {column.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableHead;
