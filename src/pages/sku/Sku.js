import { useRef } from "react";
import { Button, Card, Col, Row } from "antd";
import InlineEditableTable from "../../components/table/inline-editable-table";

import {
  deleteSku,
  getSkus,
  saveSku,
  updateSku,
} from "../../services/sku-service";
import { getProducts } from "../../services/product-service";

const columns = [
  {
    key: "code",
    title: "Sku Code",
    dataIndex: "code",
    editable: true,
  },
  {
    key: "productId",
    title: "Product",
    dataIndex: "productId",
    editable: true,
    inputType: "select",
    apiSearch: getProducts,
    render: (text, record) => <span>{record.product}</span>,
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
