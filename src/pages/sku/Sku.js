import { useRef } from "react";
import { Button, Card, Col, Row } from "antd";
import InlineEditableTable from "../../components/table/inline-editable-table";

import {
  deleteSku,
  getSkus,
  saveSku,
  updateSku,
} from "../../services/sku-service";

const columns = [
  {
    key: "code",
    title: "Sku Code",
    dataIndex: "code",
    editable: true,
  },
  {
    key: "product",
    title: "Product",
    dataIndex: "product",
    editable: true,
  },
];

const Sku = () => {
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
              getData={getSkus}
              saveItem={(sku) => saveSku(sku)}
              updateItem={(sku) => updateSku(sku)}
              deleteItem={(id) => deleteSku(id)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Sku;
