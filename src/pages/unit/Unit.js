import {
  deleteUnit,
  getUnits,
  saveUnit,
  updateUnit,
} from "../../services/unit-service";
import InlineEditableTable from "../../components/table/inline-editable-table";
import { Button, Card, Col, Row } from "antd";
import { useRef } from "react";

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

const Unit = () => {
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
              getData={getUnits}
              saveItem={(unit) => saveUnit(unit)}
              updateItem={(unit) => updateUnit(unit)}
              deleteItem={(id) => deleteUnit(id)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Unit;
