import NavBar from "@/components/general/NavBar"
import { useState ,useEffect} from "react";
import { getNotes, deleteNote, togglePinNote, createNote, updateNote} from "@/services/notes";
import NoteCard from "@/components/general/NoteCard";
import NoteModal from "@/components/general/NoteModel";
export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data); 
    } catch (err) {
      console.error("Error fetching notes:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes(); 
  };

  const handleTogglePin = async (id) => {
    await togglePinNote(id);
    fetchNotes();
  };

 const handleAdd = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

   const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await updateNote(editingNote._id, noteData);
      } else {
        await createNote(noteData);
      }
      fetchNotes();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving note:", err.response?.data || err.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  if (loading) return (
   
  <div className="flex justify-center items-center h-screen">
    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

  return (
    <>
  

      <NavBar/>
      <div className="mt-20 p-4 ">
        <div className="flex items-center justify-between border-b-2">
        <h1 className="text-2xl font-bold mb-4">My Notes</h1>
        <button className="rounded-md text-white py-2 px-3 bg-purple-600 hover:bg-purple-400 transition-colors"   onClick={handleAdd}>Add</button>
        </div>
        <div className="mt-2">
        {notes.length === 0 ? (
          <div className="text-3xl font-bold text-red-600" >No notes yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} 
                note={note}  
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        )}
</div>
      </div>
       {isModalOpen && (
        <NoteModal
          note={editingNote}
          onSave={handleSaveNote}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
