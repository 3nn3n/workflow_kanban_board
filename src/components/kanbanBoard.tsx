import { useMemo, useState } from "react";
import Plus from "../icons/plus"
import {type Box, type Id, type Task} from "../types";
import BoxContainer from "./boxContainer";
import { DndContext, DragOverlay, useSensor, PointerSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function kanbanBoard() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const boxesId = useMemo(() => boxes.map((box) => box.id), [boxes]);
  const [activeBox, setActiveBox] = useState<Box | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { 
        distance: 50,
      },
    })
  );

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
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="m-auto flex gap-2 ">
        <div className="flex gap-2">
          <SortableContext items={boxesId}>
          {boxes.map((box) =>  <BoxContainer 
          key={box.id} box={box} 
          deleteBox={deleteBox} updateBox={updateBox} 
          createTask={createTask} 
          deleteTask={deleteTask}
          updateTask={updateTask}
          tasks={tasks.filter((task) => task.boxId === box.id)} />)}
          </SortableContext>
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
      {createPortal(
        <DragOverlay>
        {activeBox && (<BoxContainer box={activeBox} 
        deleteBox={deleteBox} updateBox={updateBox} 
        createTask={createTask}
        deleteTask={deleteTask}
        updateTask={updateTask}
        tasks={tasks.filter((task) => task.boxId === activeBox.id)}
        />)}
      </DragOverlay>, document.body
      )}
      
      </DndContext>
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

  function updateBox(id: Id, title: string) {
    const newBox = boxes.map((box) =>{
      if(box.id !== id) return box;
      return {
        ...box,
        title,
      }
    })
    setBoxes(newBox);
  }

  function createTask(boxId: Id) {
    const newTask: Task = {
      id: generateId(),
      boxId,
      content: `New Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }    

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if(task.id !== id) return task;
      return {
        ...task,
        content,
      };
    });
    setTasks(newTasks);
  } 

  function onDragStart(event: DragStartEvent) {
    console.log("Drag started:", event);
    if(event.active.data.current?.type === "box") {
      setActiveBox(event.active.data.current.box);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if(!over) return;

    const activeBoxId = active.id;
    const overBoxId = over.id;

    if(activeBoxId === overBoxId) return;

    setBoxes((boxes) => { 
      const oldIndex = boxes.findIndex((box) => box.id === activeBoxId);
      const newIndex = boxes.findIndex((box) => box.id === overBoxId);

      //you can either return........return arraymove(boxes, oldIndex, newIndex); or implement manually

      const newBoxes = [...boxes];
      const [movedBox] = newBoxes.splice(oldIndex, 1);
      newBoxes.splice(newIndex, 0, movedBox);
      return newBoxes;
    });
    setActiveBox(null);
  }

}

function generateId(): number {
  return Math.floor(Math.random() * 1000);
}

export default kanbanBoard