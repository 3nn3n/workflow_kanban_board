import Delete from '../icons/delete';
import {type Box, type Id} from '../types';

interface BoxContainerProps {
  box: Box;
  deleteBox: (id: Id) => void;
}

function boxContainer(props: BoxContainerProps) {
  const { box, deleteBox } = props;
  return ( <div className="
  bg-red-500
  w-[250px]
  h-[300px]
  max-h-[300px]
  rounded-md
  flex
  flex-col">
    <div className="
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
    {box.title}
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
    ">Content</div>
    <div>Footer</div>
    </div>
  );
}

export default boxContainer