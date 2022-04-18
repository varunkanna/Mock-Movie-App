import { Table } from "antd";
import { SortableHandle } from "react-sortable-hoc";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { MenuOutlined } from "@mui/icons-material";
import { arrayMoveImmutable } from "array-move";
import React, { useEffect, useState } from "react";
import "../App.css";
import "antd/dist/antd.css";
// import { tab } from "@testing-library/user-event/dist/tab";
function MovieTable({ movies }) {
  const [data, setData] = useState([]);
  const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
  ));

  const tableData = movies.map((movie, index) => {
    return {
      index: index,
      id: movie.id,
      Title: movie.title,
      Rating: movie.vote_average,
      Language: movie.original_language,
      Release: movie.release_date,
    };
  });

  console.log(tableData);

  useEffect(() => {
    setData(tableData);
  }, []);
  console.log(data);
  const columns = [
    {
      title: "Sort",
      dataIndex: "sort",
      width: 30,
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    // {
    //   title: "index",
    //   dataIndex: "index",
    // },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Rating",
      dataIndex: "Rating",
      key: "Rating",
    },
    {
      title: "Language",
      dataIndex: "Language",
      key: "Language",
    },
    {
      title: "Release",
      dataIndex: "Release",
      key: "Release",
    },
  ];
  const SortableItem = SortableElement((props) => <tr {...props} />);
  const SortableBody = SortableContainer((props) => <tbody {...props} />);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        [].concat(data),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      // console.log("Sorted items: ", newData);
      setData(newData);
    }
  };
  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow = ({ ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex((x) => x.index === restProps["data-row-key"]);
    return <SortableItem index={index} {...restProps} />;
  };
  // console.log(tableData);
  return (
    <div>
      <Table
        rowSelection={{ type: "checkbox" }}
        pagination={true}
        dataSource={data}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      ></Table>
    </div>
  );
}

export default MovieTable;
