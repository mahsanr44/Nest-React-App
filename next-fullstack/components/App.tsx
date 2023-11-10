"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";

interface Task {
  id: number;
  taskname: string;
}

function App() {
  const [taskname, setTask] = useState("");
  const [fetchedTask, setFetchedTask] = useState<Task[]>([]);

  useEffect(() => {
    getTask();
  }, []);

  // Setters for Task
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  // API call for storing Task
  const storeTask = (e: FormEvent) => {
    e.preventDefault();
    const newTask = {
      taskname,
    };
    if (newTask.taskname === "") {
      toast.error("Please Enter the Task Name!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return;
    } else if (fetchedTask.some((task) => task.taskname === newTask.taskname)) {
      toast.error(` Task "${newTask.taskname}" already exists!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTask("");
      return;
    } else if (!isNaN(Number(newTask.taskname))) {
      toast.error("Task Name Must be a String!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return;
    } else {
      toast.success("Task Added Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    axios
      .post("http://localhost:3000/api/crud", newTask)
      .then((response) => {
        getTask();
        setTask("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // API call for fetching Task
  const getTask = () => {
    axios
      .get("http://localhost:3000/api/crud")
      .then((response) => {
        const data=response.data.result
        setFetchedTask(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // API call for deleting Task
  const deleteTask = (id: number) => {
    axios
      .delete(`http://localhost:4000/todos/${id}`)
      .then((response) => {
        toast.success("Task Deleted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getTask();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // API call for deleting all Tasks
  const deleteAllTasks = () => {
    axios
      .delete(`http://localhost:3000/api/crud`)
      .then((response) => {
        console.log("All Tasks Deleted Successfully");
        toast.success("All Tasks Deleted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getTask();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API call for updating Task
  const updateTask = (item: Task) => {
    const updatedTask = prompt("Enter Updated Task Name:", item.taskname);
    if (
      updatedTask === null ||
      updatedTask === undefined ||
      updatedTask === ""
    ) {
      toast.error("Task Not Updated!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (fetchedTask.some((task) => task.taskname === updatedTask)) {
      toast.error(` Task "${updatedTask}" already exists!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTask("");
      return;
    }
    const newUpdatedTask = {
      taskname: updatedTask,
    };

    axios
      .put(`http://localhost:4000/todos/${item.id}`, newUpdatedTask)
      .then((response) => {
        getTask();
        toast.success("Task Updated Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-5 flex-col">
        <h1 className="text-2xl font-bold mb-5 bg-gray-200 rounded-sm p-1">
          Todo App
        </h1>
        <form className="flex items-center justify-center gap-1">
          <input
            className="border-2 border-gray-700	rounded-md p-1"
            placeholder="✍️ Add Task"
            type="text"
            name="taskname"
            value={taskname}
            onChange={handleInputChange}
          />
          <Button
            name={"Store Task"}
            handleClick={storeTask}
            styleProp={"bg-green-500 border-green-700"}
          />
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />{" "}
        </form>
        <br />
      </div>
      <div className="flex justify-center items-center"></div>
      <div className="flex justify-center items-center flex-col mt-10">
        <h2 className="text-xl font-bold">Todo List:</h2>
        <ul>
          {fetchedTask?.map((item: Task, index) => (
            <li
              key={index}
              className="flex gap-5 justify-center items-center m-3 "
            >
              <span className="font-semibold text-lg">{++index + ". "}</span>
              <span className="mr-10 font-semibold text-lg text-gray-800">
                {item.taskname}
              </span>
              <Button
                name={"Edit"}
                handleClick={() => updateTask(item)}
                styleProp={"bg-green-500 border-green-700 w-16"}
              />
              <Button
                name={"Delete"}
                handleClick={() => deleteTask(item.id)}
                styleProp={"bg-red-500 border-red-700 w-16"}
              />
            </li>
          ))}
        </ul>
        <div>
          {fetchedTask.length > 0 ? (
            <Button
              name={" Delete All Tasks"}
              handleClick={deleteAllTasks}
              styleProp={"bg-red-500 border-red-700 mt-5"}
            />
          ) : (
            <h1 className="font-semibold mt-5 text-red-500">
              No Record Found!
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
