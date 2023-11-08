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

function Crud() {
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
  const storeTask = async (e: FormEvent) => {
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
        theme: "light",
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
        theme: "light",
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
        theme: "light",
      });

      return;
    } else {
      const res = await fetch(`http://localhost:3000/api/crud`, {
        method: "POST",
        body: JSON.stringify({
          taskname: newTask.taskname,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error fetdeletingching data`);
      }
      setTask("");
      await getTask();

      toast.success("Task Added Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // API call for fetching Task
  const getTask = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/crud", {
        method: "GET",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Error fetching data`);
      }
      const allTasks = await res.json();
      const tasks = allTasks.result;

      setFetchedTask(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  // API call for deleting Task
  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/crud/${id}`, {
        method: "DELETE",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Error deleting data`);
      }
      toast.success("Task Deleted Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getTask();
    } catch (error) {
      console.log(error);
    }
  };

  // API call for deleting all Tasks
  const deleteAllTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/crud", {
        method: "DELETE",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Error fetdeletingching data`);
      }
      toast.success("All Tasks Deleted Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getTask();
    } catch (error) {
      console.log(error);
    }
  };

  // API call for updating Task
  const updateTask = async (item: Task) => {
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
        theme: "light",
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
        theme: "light",
      });
      setTask("");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/crud/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          taskname: updatedTask,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error fetdeletingching data`);
      }

      await getTask();
      toast.success("Task Updated Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-5 flex-col">
        <h1 className="text-2xl font-bold mb-5 bg-gray-800 rounded-sm p-1">
          Todo App
        </h1>
        <form className="flex items-center justify-center gap-1">
          <input
            className="border-2 border-gray-700	text-gray-600 rounded-md p-1"
            placeholder="✍️ Add Task"
            type="text"
            name="taskname"
            value={taskname}
            onChange={handleInputChange}
          />
          <Button
            name={"Store Task"}
            handleClick={storeTask}
            styleProp={"bg-blue-500 border-blue-700 "}
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
            theme="colored"
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
              <span className="mr-10 font-semibold text-lg ">
                {item.taskname}
              </span>
              <Button
                name={"Edit"}
                handleClick={() => updateTask(item)}
                styleProp={"bg-blue-500 border-blue-700  w-16"}
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

export default Crud;
