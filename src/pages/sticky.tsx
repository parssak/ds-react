import React, { useState, useEffect } from "react";

const Note = ({
  id,
  title,
  content,
  onDelete,
  onEdit,
}: {
  id: string;
  title: string;
  content: string;
  onDelete: () => void;
  onEdit: () => void;
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1>{title}</h1>
        <button onClick={onDelete}>Delete</button>
        <textarea onChange={onEdit} value={content} />
      </div>
    </div>
  );
};

export default function StickyPage() {
  return (
    <div className="container min-h-screen pt-8">
      <h1 className="text-2xl font-bold mb-4">Sticky Notes</h1>
      <div className="h-48 rounded-xl grid place-items-center bg-yellow-100 text-yellow-800 font-bold">Still need to do this one</div>
    </div>
  );
}
