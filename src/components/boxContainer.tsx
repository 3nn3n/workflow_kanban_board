import { useSortable } from '@dnd-kit/sortable';
import Delete from '../icons/delete';
import {type Box, type Id} from '../types';
import {CSS} from '@dnd-kit/utilities';
import { useState } from 'react';
import Plus from '../icons/plus';
import { type Task } from '../types';
import TaskContainer from './taskContainer';

interface BoxContainerProps {
  box: Box;
  deleteBox: (id: Id) => void;
  updateBox: (id: Id, title: string) => void;
  createTask: (boxId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[]
}

function boxContainer(props: BoxContainerProps) {
  const { box, deleteBox, updateBox, createTask, deleteTask, tasks, updateTask } = props;
  const [editing, setEditing] = useState(false);

  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id: box.id,
    data: { 
      type: 'box',
      box
     },
     disabled: editing,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <div ref={setNodeRef}
  style={style}  
  className="
  bg-red-200
  w-[250px]
  h-[300px]
  max-h-[300px]
  rounded-md
  flex
  flex-col
  opacity-50
  border-2
  border-white-200">
  </div>;
  }
  return ( 
  <div 
  ref={setNodeRef}
  style={style}  
  className="
  bg-red-500
  w-[250px]
  h-[300px]
  max-h-[300px]
  rounded-md
  flex
  flex-col">
    {/*column title bar*/}
    <div 
    {...attributes}
    {...listeners}
    onClick={() => {
      setEditing(true);
    }}
    className="
    bg-red-700
    text-md
    h-[60px]
    cursor-grab
    rounded-md
    rounded-b-none
    p-3
    font-bold
    border-green-300
    border-4
    flex
    items-center
    justify-between
    ">
      <div className="flex gap-2 items-center">
      <div className="
      flex
      justify-center
      items-center
      bg-white
      px-2
      py-1
      text-sm
      rounded-full
      ">0</div>
    {!editing && box.title}
    {editing && <input 
    value={box.title}
    onChange={(e) => {
      updateBox(box.id, e.target.value)
    }}
      className="
      bg-black
      text-white
      focus:border-red-500
      border
      rounded
      outline-none
      px-2
      w-full
      "
      autoFocus 
      onBlur={() => {
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if(e.key !== 'Enter') return;
        setEditing(false);
      }}
    />}
    </div>
    <button
      onClick={() => {
        deleteBox(box.id);
      }}
     className="
    stroke-green-500
    hover:stroke-black
    rounded
    px-1
    py-2
    ">
      <Delete />
      </button>
    </div>
    <div className="
    flex
    flex-grow
    flex-col
    gap-4
    p-2
    overflow-x-hidden
    overflow-y-auto
    ">
    {tasks.map((task) => (
      <TaskContainer task={task} key={task.id} deleteTask={deleteTask} updateTask={updateTask}/>
    ))}
    
    
    </div>
    {/*tasks go here*/}
        <button className="
        bg-green-500
        hover:bg-green-700
        flex
        gap-2
        m-2
        px-2
        py-1
        rounded-md
        text-white
        font-bold
        "
        onClick={() => {
          createTask(box.id)
        }}
        >
        <Plus />
        Add task</button>

      
    </div>
  );
}

export default boxContainer