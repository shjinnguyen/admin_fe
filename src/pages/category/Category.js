import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row } from "antd";

import InlineEditableTable from "../../components/table/inline-editable-table";

import {
  deleteCategory,
  getCategories,
  saveCategory,
  updateCategory,
} from "../../services/category-service";

const columns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    editable: true,
  },
  {
    key: "description",
    title: "Description",
    dataIndex: "description",
    editable: true,
  },
];

const Category = () => {
  const tableRef = useRef();

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            extra={
              <>
                <Button onClick={() => tableRef.current.addNewRef()}>
                  Add New +
                </Button>
              </>
            }
          >
            <InlineEditableTable
              ref={tableRef}
              columns={columns}
              getData={getCategories}
              saveItem={(category) => saveCategory(category)}
              updateItem={(category) => updateCategory(category)}
              deleteItem={(id) => deleteCategory(id)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Category;
