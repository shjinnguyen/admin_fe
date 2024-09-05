import React, { useEffect, useState } from "react";
import { Select } from "antd";

const SelectInput = (props) => {
  const { apiSearch, value } = props;
  console.log("🚀 ~ SelectInput ~ props:", props);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    apiSearch().then((response) => {
      let { data } = response;
      data = data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setOptions(data);
    });
  }, []);

  return <Select options={options} defaultValue={value} {...props} />;
};

export default SelectInput;
