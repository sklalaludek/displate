import React, { Component } from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";

import "react-table/react-table.css";

const Table = ({ data, selectedDisplateId, onSelectChange, onDelete }) => {
  const columns = [
    {
      Header: "Id",
      accessor: "id"
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "ArtStyle",
      accessor: "artStyle"
    },
    {
      Header: "Orientation",
      accessor: "orientation"
    },
    {
      id: "price",
      Header: "Price",
      accessor: d => {
        if (/\$/g.test(d.price.formatted)) {
          return d.price.formatted;
        } else {
          return Number(d.price.formatted)
            .toLocaleString("en-US", { style: "currency", currency: "USD" })
            .replace(/.00$/g, "")
        }
      }
    },
    {
      Header: "Delete/Edit",
      accessor: "id",
      Cell: ({ value: id }) => {
        return (
          <button onClick={() => {
            onDelete(id);
          }}>
            Delete
          </button>
        )
      },
    }
  ];

  return (
    <ReactTable
      columns={columns}
      data={data}
      defaultPageSize={10}
      getTrProps={(state, rowInfo) => {
        if (rowInfo && rowInfo.row) {
          return {
            onClick: () => {
              onSelectChange(rowInfo.row.id)
            },
            style: {
              background: rowInfo.row.id === selectedDisplateId
                ? "#1185ed"
                : "white",
              color: rowInfo.row.id === selectedDisplateId
                ? "white"
                : "black"
            }
          }
        } else {
          return {};
        }
      }}
      style={{ flexGrow: 0, flexShrink: 0, flexBasis: "50%" }}
    />
  )
};

Table.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onSelectChange: PropTypes.func,
  selectedDisplateId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

export default Table;