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
  glob_elems = [11, 22, 33]

function Main() {
  let k = 0;
  const
    // [zones] = useState(Array.from({length: num}, (_, i) => <DropZone key={i}/>)),
    [boxes, setBoxes] = useState([[...glob_elems], [], []]);

  moveTo = (label, index) => {
    const elem = +label;
    console.log('moveTo', { label, index });
    setBoxes(b => b.map((zone, i) =>
      i === index ? [...zone, elem] : zone.filter(e => e !== elem)));
  };

  return <div
    className="flex gap-2" >
    <DropZone index={0} draggables={boxes[0]} moveTo={moveTo} />
    <DropZone index={1} draggables={boxes[1]} moveTo={moveTo} />
    <DropZone index={2} draggables={boxes[2]} moveTo={moveTo} />
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
    {draggables.map(id => <Draggable key={id} label={id} />)}
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

