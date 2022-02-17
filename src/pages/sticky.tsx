import React, { useState, useEffect } from "react";

interface INote {
  id: string;
  title: string;
  content: string;
}

const Note = ({
  note,
  onDelete,
  onEdit,
}: {
  note: INote;
  onDelete: () => void;
  onEdit: (attribute: string, content: string) => void;
}) => {
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit("title", e.target.value);
  };
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onEdit("content", e.target.value);
  };

  return (
    <div className="bg-yellow-50 p-2">
      <div className="flex space-x-2 mb-4">
        <input
          className="w-full bg-transparent"
          type="text"
          value={note.title}
          onChange={onTitleChange}
        />
        <button onClick={onDelete} className="text-sm">
          Delete
        </button>
      </div>
      <textarea
        className="w-full bg-yellow-100 bg-opacity-50"
        placeholder="Add content here..."
        value={note.content}
        onChange={onContentChange}
      />
    </div>
  );
};

export default function StickyPage() {
  const [notes, setNotes] = useState<INote[]>([]);

  const addNote = () => {
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "New Note",
        content: "",
      },
    ]);
  };

  const editNote = (id: string, attribute: string, value: string) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          return { ...note, [attribute]: value };
        }
        return note;
      })
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="container min-h-screen pt-8">
      <h1 className="text-2xl font-bold mb-4">Sticky Notes</h1>
      <button className="btn" onClick={addNote}>
        New Note +{" "}
      </button>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={() => deleteNote(note.id)}
            onEdit={(attribute, value) => editNote(note.id, attribute, value)}
          />
        ))}
      </div>
    </div>
  );
}
