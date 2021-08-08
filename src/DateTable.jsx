import Workorder from "./Workorder";

const DateTable = (props) => {
  const allowDrop = (ev) => {
    ev.preventDefault();
  };
  const handleDropOnCell = (e, rowIndex, columnIndex) => {
    const tempData = [...props.tableData];
    const selectedWorkOrder = JSON.parse(e.dataTransfer.getData("workOrder"));
    if (tempData[rowIndex][columnIndex]) return;
    tempData[rowIndex][columnIndex] = selectedWorkOrder;
    const isDragFromTable = e.dataTransfer.getData("isDragFromTable");
    if (isDragFromTable) {
      const dragRowIndex = e.dataTransfer.getData("rowIndex");
      const dragColumnIndex = e.dataTransfer.getData("columnIndex");
      tempData[dragRowIndex][dragColumnIndex] = "";
    } else {
      const jobIndex = e.dataTransfer.getData("jobIndex");
      const tempWorkorderList = [...props.workorderList];
      const workOrderIndex = tempWorkorderList[jobIndex].workorders.findIndex(
        (item) => item.name === selectedWorkOrder.name
      );
      tempWorkorderList[jobIndex].workorders.splice(workOrderIndex, 1);
      props.setWorkorderList(tempWorkorderList);
    }
    props.setTableData(tempData);
  };
  return (
    <div>
      <div className="flex">
        <div className="tableContainer">
          <div className="flex">
            <div className="dateTableCell noBorder" />
            <div className="tableHeader">
              {props.dates.map((item, dateIndex) => (
                <div className="dateTableCell" key={dateIndex}>
                  {new Date(item).toDateString()}
                </div>
              ))}
            </div>
          </div>
          {props.tableData.map((arr, index) => (
            <div className="flex" key={index}>
              <div className="dateTableCell dateTableRowName">
                {props.employeeList[index]?.Name}
              </div>
              <div
                className={`dateTableRow ${
                  index === props.employeeList.length - 1 ? "last" : ""
                }`}
              >
                {arr.map((item, dateIndex) => (
                  <div
                    className="dateTableCell"
                    key={dateIndex}
                    onDragOver={allowDrop}
                    onDrop={(e) => handleDropOnCell(e, index, dateIndex)}
                  >
                    {item && (
                      <Workorder
                        {...item}
                        rowIndex={index}
                        columnIndex={dateIndex}
                        isDateTable
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateTable;
