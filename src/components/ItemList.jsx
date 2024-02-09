import { data } from "../data/appdata";
import { useState } from "react";

function ItemList(props) {
//set required states
  const { tasks, setTasks, setTaskInput, setEdittaskId } = props;
  const [isCompleted, setIsCompleted] = useState(false);

//handle events
  //handle checkbox
  function handleTaskCheckboxChange(itemid) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === itemid ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Delete individual task task 
  function deleteTask(itemId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== itemId));
  }

  //edit task
  const handleEditTask = (taskId) => {
    setEdittaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskInput((prevtask) => ({
      ...prevtask,
      title: taskToEdit.title,
      content: taskToEdit.content,
    }));
  };
  
  
  //handle filter of tasks
  const filteredTasks = tasks.filter((item) => {
    if (isCompleted) return item.completed === true;
    else return tasks;
  });
  function showTasks() {
    setIsCompleted(!isCompleted);
  }
  //count of completed task
  function completedtaskCount() {
    const completedTasks = tasks.filter((item) => item.completed === true);
    return completedTasks.length;
  }

//JSX
  return (
    <>
      <div className="todolist-area">
        {filteredTasks.map((item, i) => (
          <div className="todo-item" key={i}>
            <div className="content">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
            <div className="icons">
              <label>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onClick={() => handleTaskCheckboxChange(item.id)}
                />
                <span></span>
              </label>
              <img
                className="delet-icon"
                src={data.deletimg}
                alt="delet-icon"
                onClick={() => deleteTask(item.id)}
              />
              <img
                className="edit-icon"
                src={data.editimg}
                alt="edit-icon"
                onClick={() => handleEditTask(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="footer-item">
        <span>
          <button
            style={
              !isCompleted
                ? { backgroundColor: "rgb(244, 247, 97)" }
                : undefined
            }
            onClick={showTasks}
          >
            All
          </button>
          <button
            style={
              isCompleted ? { backgroundColor: "rgb(244, 247, 97)" } : null
            }
            onClick={showTasks}
          >
            Completed
          </button>
        </span>
        <h3>Completed Task: {completedtaskCount()}</h3>
        <h3>Total Task: {tasks.length}</h3>
      </div>
    </>
  );
}
export default ItemList;
