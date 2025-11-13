import { useState } from "react";
import Plus from "../icons/plus"
import {type Box, type Id} from "../types";
import BoxContainer from "./boxContainer";

function kanbanBoard() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  console.log(boxes);
    return (
    <div className="
      m-auto
      flex
      min-h-screen
      w-full
      items-center
      overflow-x-auto
      overflow-y-hidden
      px-[40px]
       ">
      <div className="m-auto flex gap-2 ">
        <div className="flex gap-5">
          {boxes.map((box) => <BoxContainer key={box.id} box={box} deleteBox={deleteBox} />)}
          </div>
      <button onClick={() => {
        createBox()
      }} 
      className="
      h-20px
      w-[200px]
      min-w-[300px]
      cursor-pointer
      rounded-lg
      bg-red-500
      border-3
      border-red-700
      p-1
      ring-red-300
      hover:ring-2
      text-white
      font-bold
      flex
      gap-2
      "
      >
        <Plus />
        Add Column
      </button>
      </div>
    </div>
  );

  function createBox() {
    const newBox: Box = {
      id: generateId(),
      title: `New Box ${boxes.length + 1}`,
    };
    setBoxes([...boxes, newBox]);
  }

  function deleteBox(id: Id) {
    const updatedBoxes = boxes.filter((box) => box.id !== id);
    setBoxes(updatedBoxes);
  }

}

function generateId(): number {
  return Math.floor(Math.random() * 1000);
}

export default kanbanBoard