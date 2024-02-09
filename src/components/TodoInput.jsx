import { useEffect, useState } from "react";
import ItemList from "./ItemList";

function TodoInput() {
//set states
  const [taskinput, setTaskInput] = useState({
    title: "",
    content: "",
    id: 6,
    completed: false,
  });
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEdittaskId] = useState(null);

//API
  //fetch API data using Get and append to tasks
  async function getTasks() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const data = await response.json();
    setTasks([...tasks, ...data]);
  }
  //load api daia at mounting stage
  useEffect(() => {
    getTasks();
  }, []);

  //POST API call to add tasks
  async function postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // PUT API call to update delated item and edited items
  const putData = async (url, data) => {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return await response.json();
  };
  //Delet api to delete tasks
  const deletData = async (url, id) => {
    const response = await fetch(url + id, {
      method: "DELETE",
    });
    return await response.json();
  };

//event handlers
  //handle add task to list 
  const handleAddtask = async (e) => {
    e.preventDefault();
    const response = await postData(
      "https://jsonplaceholder.typicode.com/todos",
      taskinput
    );
    console.log("postdata", response);
    // set new id for every new element
    setTasks([{ ...response, id: taskinput.id++ }, ...tasks]);

    setTaskInput({ ...taskinput, title: "", content: "" });
  };

  //complete all tasks
  function completeAllTask() {
    setTasks((prevTasks) =>
      prevTasks.map((item) => {
        return { ...item, completed: true };
      })
    );
  }

  //delete all tasks
  const deletAllTask = async () => {
    // const response = await deletData("https://jsonplaceholder.typicode.com/todos/",2);
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.completed === !true)
    );
  };

  //update tasks 
  const handleUpdateTask = async () => {
    const updatedTask = {
      title: taskinput.title,
      content: taskinput.content,
      completed: false,
    };
    const updatedTaskData = await putData(
      `https://jsonplaceholder.typicode.com/todos/${editTaskId}`,
      updatedTask
    );
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editTaskId
          ? {
              ...task,
              title: updatedTaskData.title,
              content: updatedTaskData.content,
            }
          : task
      )
    );
    setTaskInput({ ...taskinput, title: "", content: "" });
    setEdittaskId(null);
  };

//JSX
  return (
    <>
      <div className="todo-app">
        <div className="app-title">
          <h1>TodoApp</h1>
        </div>
        <div className="todo-wrapper">
          <div className="input-area">
            <div className="todo-inpute">
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter Title of new task..."
                value={taskinput.title}
                onChange={(e) => {
                  setTaskInput({
                    ...taskinput,
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="todo-inpute">
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter description of new task..."
                value={taskinput.content}
                onChange={(e) => {
                  setTaskInput({
                    ...taskinput,
                    content: e.target.value,
                  });
                }}
              />
            </div>
            <div className="todo-inpute">
              <button
                type="button"
                className="addtodo-btn"
                onClick={editTaskId ? handleUpdateTask : handleAddtask}
              >
                {editTaskId ? "Edit" : "ADD"}
              </button>
            </div>
          </div>
          <div className="btn-area">
            <button onClick={() => completeAllTask(false)}>Complete All</button>
            <button onClick={deletAllTask}>Delete All Cpmpleted</button>
          </div>
          <ItemList
            tasks={tasks}
            setTasks={setTasks}
            setTaskInput={setTaskInput}
            setEdittaskId={setEdittaskId}
          />
        </div>
      </div>
    </>
  );
}
export default TodoInput;
