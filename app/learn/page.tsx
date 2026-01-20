"use client";
import { useRef } from "react";
export default function Learn() {
  const userRefrence = useRef<HTMLInputElement>(null);
  return (
    <div className="text-white pt-20">
      <h1>Learning</h1>
      <input type="text" className="border" ref={userRefrence} />
      <button
        onClick={() => {
          const text = userRefrence.current?.value;
          alert(text);
        }}
      >
        click me
      </button>
    </div>
  );
}
