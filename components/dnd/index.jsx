"use client";
import { useState } from 'react'

export function DnDRoot() {
  return <>
    <h1>Drag and Drop</h1>
    <Main />
  </>
}

const
  num_zone = 3,
  num_draggable = 3,
  glob_draggables = Array.from({ length: num_draggable },
    (_, i) => <Draggable key={i} label={i} />);

function Main() {
  let k = 0;
  const
    // [zones] = useState(Array.from({length: num}, (_, i) => <DropZone key={i}/>)),
    [draggables, setDragables] = useState(Array.from({ length: num_zone },
      (_, i) => Array.from({ length: 2 - i },
        (_, j) => glob_draggables[k++]))),
    moveTo = (label, index) => {
      const elem = glob_draggables[+label];
      console.log('moveTo', { label, index, elem });
      setDragables(draggables.map((zone, i) =>
        i === index ? [...zone, elem] : zone.filter(e => e !== elem)));
    };
  return <div

    className="flex gap-2" >
    <DropZone index={0} draggables={draggables[0]} moveTo={moveTo} />
    <DropZone index={1} draggables={draggables[1]} moveTo={moveTo} />
    <DropZone index={2} draggables={draggables[2]} moveTo={moveTo} />
  </div >
}

function DropZone({ index, draggables, moveTo }) {
  return <fieldset
    onDragOver={ev => {
      ev.preventDefault();
    }}
    onDrop={ev => {
      const
        label = ev.dataTransfer.getData("text/plain");
      moveTo(label, index);
    }}
    className="bg-sky-500 m-2 p-2 min-h-40 ">
    <legend className="bg-white">Drop Zone</legend>
    {draggables}
  </fieldset>
}

function Draggable({ label }) {
  return <div
    onDragStart={ev => {
      ev.dataTransfer.setData("text/plain", label);
    }}
    draggable="true"
    className="rounded-[50%] bg-violet-600 flex aspect-square justify-center items-center">
    {label}
  </div>
}

