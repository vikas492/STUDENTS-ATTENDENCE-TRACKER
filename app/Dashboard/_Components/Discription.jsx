"use client";

import React, { useState, useEffect } from "react";

function Description() {
  const [note, setNote] = useState("");

  // Load the note from localStorage when the component mounts
  useEffect(() => {
    const savedNote = localStorage.getItem("userNote");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  // Save the note to localStorage whenever it changes
  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem("userNote", newNote);
  };

  return (
    <div className="p-10">
      {/* Marquee Section */}
      <div className="bg-blue-500 text-white py-2 mb-5">
        <marquee behavior="scroll" direction="left" className="font-bold text-xl">
          Best Attendance Tracker
        </marquee>
      </div>

      {/* Description Box */}
      <div className="p-4 border rounded-md bg-sky-100">
        <h3 className="font-bold text-lg mb-2">Add a Note</h3>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Write your note here..."
          className="w-full p-2 border bg-white rounded-md resize-none"
          rows="4"
        ></textarea>
      </div>
    </div>
  );
}

export default Description;
