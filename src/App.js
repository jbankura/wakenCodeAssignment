import { useEffect, useState } from "react";
import DateTable from "./DateTable";
import "./styles.css";
import WorkorderContainer from "./WorkorderContainer";
const dates = [
  "2020-04-20",
  "2020-04-21",
  "2020-04-22",
  "2020-04-23",
  "2020-04-24",
  "2020-04-25"
];
export default function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [workorderList, setWorkorderList] = useState([]);
  const [workorderResp, setWorkorderResp] = useState(null);
  const fetchEmpData = async () => {
    const res = await fetch(
      "https://api.jsonbin.io/b/610f7dafd5667e403a3b61d2"
    ).then((res) => res.json());
    const temp = res.Employess.map((emp) => {
      return dates.map(() => "");
    });
    setTableData(temp);
    setEmployeeList(res.Employess);
  };
  const fetchWorkorderData = async () => {
    const res = await fetch(
      "https://api.jsonbin.io/b/610f9606e1b0604017a8bdbd"
    ).then((res) => res.json());
    setWorkorderList(res.job);
    setWorkorderResp(JSON.parse(JSON.stringify(res.job)));
  };
  useEffect(() => {
    fetchEmpData();
    fetchWorkorderData();
  }, []);
  const saveData = () => {
    const data = [...workorderResp];
    data.forEach((obj) => {
      obj.workorders.forEach((item) => {
        let found = false;
        for (let i = 0; i < employeeList.length; i++) {
          for (let j = 0; j < dates.length; j++) {
            if (tableData[i][j].name === item.name) {
              item.Employee = employeeList[i].Name;
              item.Date = new Date(dates[j]).toISOString();
              found = true;
              break;
            }
          }
          if (found) break;
        }
      });
    });
    const payload = { job: data };
    console.log(payload);
  };
  return (
    <div className="App">
      <div className="header">
        <div />
        <h3>
          <u>WorkOrder Assignment Tool</u>
        </h3>
        <div className="saveBtn" onClick={saveData}>
          Save
        </div>
      </div>
      <DateTable
        employeeList={employeeList}
        dates={dates}
        tableData={tableData}
        setTableData={setTableData}
        workorderList={workorderList}
        setWorkorderList={setWorkorderList}
      />
      <WorkorderContainer
        dates={dates}
        tableData={tableData}
        setTableData={setTableData}
        workorderList={workorderList}
        setWorkorderList={setWorkorderList}
      />
    </div>
  );
}
