import { useRef } from "react";
import { Button, Card, Col, Row } from "antd";

import InlineEditableTable from "../../components/table/inline-editable-table";

import {
  deleteProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from "../../services/product-service";
import { getSuppliers } from "../../services/supplier-service";
import { getUnits } from "../../services/unit-service";
import { getCategories } from "../../services/category-service";

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
  {
    key: "weight",
    title: "Weight",
    dataIndex: "weight",
    editable: true,
  },
  {
    key: "length",
    title: "Length",
    dataIndex: "length",
    editable: true,
  },
  {
    key: "width",
    title: "Width",
    dataIndex: "width",
    editable: true,
  },
  {
    key: "height",
    title: "Height",
    dataIndex: "height",
    editable: true,
  },
  {
    key: "categoryId",
    title: "Category",
    dataIndex: "categoryId",
    editable: true,
    inputType: "select",
    apiSearch: getCategories,
    render: (text, record) => <span>{record.category}</span>,
  },
  {
    key: "unitId",
    title: "Unit",
    dataIndex: "unitId",
    editable: true,
    inputType: "select",
    apiSearch: getUnits,
    render: (text, record) => <span>{record.unit}</span>,
  },
  {
    key: "supplierId",
    title: "Supplier",
    dataIndex: "supplierId",
    editable: true,
    inputType: "select",
    apiSearch: getSuppliers,
    render: (text, record) => <span>{record.supplier}</span>,
  },
];

const Product = () => {
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
              getData={getProducts}
              saveItem={(unit) => saveProduct(unit)}
              updateItem={(unit) => updateProduct(unit)}
              deleteItem={(id) => deleteProduct(id)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Product;
