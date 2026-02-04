"use client";
import { useRef } from "react";
import { toast } from "sonner";
export default function Learn() {
  const userRefrence = useRef<HTMLInputElement>(null);
  return (
    <div className="text-foreground pt-20">
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
      <div className="pt-20">
        <button onClick={() => toast.success("This is a toast message!")}>
          Check Toast
        </button>
      </div>
    </div>
  );
}
