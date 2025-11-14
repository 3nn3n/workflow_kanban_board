import { type Id, type Task } from "../types";
import Delete from "../icons/delete";
import { useState } from "react";

interface TaskContainerProps {
  task: Task;
  deleteTask: (id: Id) => void;
}


function taskContainer({ task, deleteTask }: TaskContainerProps) {

  const [mouseDown, setMouseDown] = useState(false);

  return (
    <div className="
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
    "
    onMouseEnter={() => {
      setMouseDown(true);
    }}

    onMouseLeave={() => {
      setMouseDown(false);
    }}
    >{task.content}

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