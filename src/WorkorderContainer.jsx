import Workorder from "./Workorder";

const WorkorderContainer = (props) => {
  const allowDrop = (ev) => {
    ev.preventDefault();
  };
  const handleDropOnCell = (e) => {
    const tempData = [...props.tableData];
    const selectedWorkOrder = JSON.parse(e.dataTransfer.getData("workOrder"));
    const isDragFromTable = e.dataTransfer.getData("isDragFromTable");
    if (isDragFromTable) {
      const dragRowIndex = e.dataTransfer.getData("rowIndex");
      const dragColumnIndex = e.dataTransfer.getData("columnIndex");
      tempData[dragRowIndex][dragColumnIndex] = "";
      const tempWorkorderList = [...props.workorderList];
      const jobIndex = tempWorkorderList.findIndex(
        (item) => item.jobname === selectedWorkOrder.job
      );
      tempWorkorderList[jobIndex].workorders.push({
        name: selectedWorkOrder.name,
        Date: selectedWorkOrder.Date
      });
      props.setWorkorderList(tempWorkorderList);
      props.setTableData(tempData);
    }
  };
  return (
    <div>
      {props.workorderList.map((job, jobIndex) => {
        const jobWorkOrders = {};
        job.workorders.forEach((item) => {
          jobWorkOrders[new Date(item.Date).toDateString()] = item;
        });
        return (
          <div
            className="flex"
            key={jobIndex}
            onDragOver={allowDrop}
            onDrop={handleDropOnCell}
          >
            <div className="workOrderCell" />
            <div className="flex">
              {props.dates.map((item, dateIndex) => (
                <div className="workOrderCell" key={dateIndex}>
                  {jobWorkOrders[new Date(item).toDateString()] && (
                    <Workorder
                      {...jobWorkOrders[new Date(item).toDateString()]}
                      job={job.jobname}
                      jobIndex={jobIndex}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkorderContainer;
