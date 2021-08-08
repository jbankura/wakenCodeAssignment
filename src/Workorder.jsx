const Workorder = (props) => {
  const handleDrag = (e) => {
    e.dataTransfer.setData("workOrder", JSON.stringify(props));
    e.dataTransfer.setData("jobIndex", props.jobIndex);
    if (props.isDateTable) {
      e.dataTransfer.setData("isDragFromTable", true);
      e.dataTransfer.setData("columnIndex", props.columnIndex);
      e.dataTransfer.setData("rowIndex", props.rowIndex);
    }
  };
  return (
    <div className="workOrder" onDragStart={handleDrag} draggable>
      <div className="workOrderName">{props.name}</div>
      <div className="workOrderJob">{props.job}</div>
    </div>
  );
};

export default Workorder;
