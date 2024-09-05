import { useRef } from "react";
import { Button, Card, Col, Row } from "antd";
import InlineEditableTable from "../../components/table/inline-editable-table";

import {
  deleteSupplier,
  getSuppliers,
  saveSupplier,
  updateSupplier,
} from "../../services/supplier-service";

const columns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    editable: true,
  },
  {
    key: "address",
    title: "Address",
    dataIndex: "address",
    editable: true,
  },
  {
    key: "description",
    title: "Description",
    dataIndex: "description",
    editable: true,
  },
  {
    key: "city",
    title: "City",
    dataIndex: "city",
    editable: true,
  },
  {
    key: "phone",
    title: "Phone",
    dataIndex: "phone",
    editable: true,
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    editable: true,
  },
];

const Supplier = () => {
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
              getData={getSuppliers}
              saveItem={(supplier) => saveSupplier(supplier)}
              updateItem={(supplier) => updateSupplier(supplier)}
              deleteItem={(id) => deleteSupplier(id)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Supplier;
