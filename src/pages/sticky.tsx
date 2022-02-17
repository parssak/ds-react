import React, { useState, useEffect, useMemo, useRef } from "react";

interface INote {
  id: string;
  title: string;
  content: string;
}

const Note = ({
  note,
  onDelete,
  onEdit,
  index,
}: {
  note: INote;
  onDelete: () => void;
  onEdit: (attribute: string, content: string) => void;
  index: number;
}) => {
  const ref = useRef<any>(null);
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit("title", e.target.value);
  };
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onEdit("content", e.target.value);
  };
  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="bg-yellow-50 p-2 flex flex-col rounded-md border border-yellow-100">
      <div className="flex space-x-2 mb-4">
        <input
          className="w-full bg-transparent p-1"
          type="text"
          value={note.title}
          onChange={onTitleChange}
          ref={ref}
          tabIndex={3 * index + 1}
        />
        <button onClick={onDelete} className="text-sm" tabIndex={3 * index + 3}>
          Delete
        </button>
      </div>
      <textarea
        className="w-full bg-yellow-100 bg-opacity-50 h-full p-1"
        placeholder="Add content here..."
        value={note.content}
        onChange={onContentChange}
        tabIndex={3 * index + 2}
      />
    </div>
  );
};

export default function StickyPage() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [search, setSearch] = useState("");

  const addNote = () => {
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "New Note",
        content: "",
      },
    ]);
    setSearch("");
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
    setSearch("");
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // use Memo
  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [notes, search]);

  return (
    <div className="container min-h-screen pt-8">
      <h1 className="text-2xl font-bold mb-4">Sticky Notes</h1>
      <div className="flex space-x-3">
        <input
          type="text"
          className="input-text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" onClick={addNote}>
          New Note +
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {filteredNotes.map((note, index) => (
          <Note
            key={note.id}
            note={note}
            onDelete={() => deleteNote(note.id)}
            onEdit={(attribute, value) => editNote(note.id, attribute, value)}
            index={index}
          />
        ))}
      </div>
      <div className="question my-12">
        Implement a <b>sticky notes app</b> with the following features:
        <ul className="list-disc list-inside mt-1">
          <li>Adding/removing notes</li>
          <li>Notes must contain a title and content</li>
          <li>Notes must be searchable by title or content</li>
          <li>Notes must be editable</li>
          <li>When creating a new note, focus on the title element for that note</li>
          <li>
            When "tabbing" through a note, it should go in order of Title &rarr; Content &rarr;
            Delete
          </li>
          <li>Should be mobile-responsive</li>
        </ul>
      </div>
    </div>
  );
}
