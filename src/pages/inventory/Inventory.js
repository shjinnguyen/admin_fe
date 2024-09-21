import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "antd";

import { getInventories } from "../../services/inventory-service";

const columns = [
  {
    key: "product",
    title: "Product",
    dataIndex: "product",
  },
  {
    key: "quantity",
    title: "Quantity",
    dataIndex: "quantity",
    render: (text) => <span>{text.toLocaleString()}</span>,
  },
];

const Inventory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInventories().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card bordered={false} className="criclebox tablespace mb-24">
            <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Inventory;
