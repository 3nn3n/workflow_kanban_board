import { type Id, type Task } from "../types";
import Delete from "../icons/delete";
import { useState } from "react";

interface TaskContainerProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}


function taskContainer({ task, deleteTask, updateTask }: TaskContainerProps) {
  const [mouseDown, setMouseDown] = useState(false);
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
    setMouseDown(false);
  };

  if (editing) {
    return (
      <div
    className="
    bg-yellow-300
    p-2.5
    h-[60px]
    min-h-[60px]
    items-center
    flex
    text-left
    rounded-xl
    hover:ring-2
    hover:ring-inset
    hover:ring-green-500
    cursor-grab
    relative
    ">
    <textarea className="
    w-[60%]
    h-[90%]
    resize-none border-none rounded bg-transparent text-black
    focus:outline-none
    "
    value={task.content}
    autoFocus
    placeholder="enter your task"
    onBlur={toggleEditing}
    onKeyDown={(e) => {
      if(e.key === "Enter" && e.shiftKey) toggleEditing();
    }}
    onChange={(e) => {
      updateTask(task.id, e.target.value);
    }}
    ></textarea>
    </div>
    )}

  return (
    <div
    onClick={toggleEditing}
    onMouseEnter={() => setMouseDown(true)}
    onMouseLeave={() => setMouseDown(false)}
    className="
    bg-yellow-300
    p-2.5
    h-[60px]
    min-h-[60px]
    items-center
    flex
    text-left
    rounded-xl
    hover:ring-2
    hover:ring-inset
    hover:ring-green-500
    cursor-grab
    relative 
    task
    "
    >
      <p className="
      my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap
      ">{task.content}</p>
    {mouseDown && <button 
    onClick={() => 
      deleteTask(task.id)
    }
    className="
    stroke-black
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    bg-yellow-300
    rounded
    px-1
    py-2
    hover:stroke-white
    opacity-70
    hover:opacity-100
    "><Delete /></button>}

    
    </div>
  )
}

export default taskContainer