import { Edit, Pin, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import API from "../API/api";

const NoteCard = ({ note, onEdit, onDelete, canModify }) => (
    <div className="relative p-4 border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition bg-white cursor-pointer group">
        <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg sm:text-xl mb-2 flex items-center gap-2">
                {note.isPinned && <Pin size={16} className="text-yellow-500" />}
                {note.title}
            </h3>
        </div>
        <p className="text-gray-700 text-sm line-clamp-3">{note.content}</p>

        {canModify && (
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button onClick={(e) => { e.stopPropagation(); onEdit(note); }} className="text-blue-500 hover:text-blue-700">
                    <Edit size={18} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(note); }} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                </button>
            </div>
        )}
    </div>
);
const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editFields, setEditFields] = useState({ title: "", content: "", tags: "", isPinned: false, isArchived: false });
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("recent");

    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    const user = parsedData?.username;
    const userId = parsedData?._id;
    // console.log(user + " " + userId)
    console.log(userId)
    const token = localStorage.getItem("token");
    const loggedIn = localStorage.getItem("LoggedIn") === "true";

    useEffect(() => {
        if (userId && token && loggedIn) fetchNotes();
        else setLoading(false);
    }, [userId, token]);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const res = await API.get(`/notes/getAllNotes/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 200) setNotes(res.data.notes || []);
            else toast.error("Failed to fetch notes.");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (note) => {
        if (note.userId !== userId) return toast.error("You cannot edit this note!");
        setSelectedNote(note);
        setEditFields({
            title: note.title,
            content: note.content,
            tags: note.tags?.join(", ") || "",
            isPinned: note.isPinned || false,
            isArchived: note.isArchived || false
        });
    };

    const handleUpdateNote = async () => {
        if (!selectedNote || selectedNote.userId !== userId) return toast.error("Unauthorized!");

        const payload = {
            title: editFields.title,
            content: editFields.content,
            tags: editFields.tags.split(",").map((t) => t.trim()).filter(Boolean),
            isPinned: editFields.isPinned,
            isArchived: editFields.isArchived
        };

        try {
            const res = await API.put(`/notes/updateOneNote/${userId}/${selectedNote._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 200) {
                toast.success("Note updated successfully!");
                fetchNotes();
                setSelectedNote(null);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update note.");
        }
    };

    const handleDeleteNote = async (note) => {
        if (note.userId !== userId) return toast.error("You cannot delete this note!");
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            const res = await API.delete(`/notes/deleteOneNote/${userId}/${note._id}`, { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 200) {
                toast.success("Note deleted successfully!");
                fetchNotes();
                if (selectedNote?._id === note._id) setSelectedNote(null);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete note.");
        }
    };

    const filteredNotes = useMemo(() => {
        return notes
            .filter((note) => {
                const matchesSearch = [note.title, note.content, ...(note.tags || [])].some(field =>
                    field?.toLowerCase().includes(searchTerm.toLowerCase())
                );
                const matchesFilter =
                    filter === "all" ||
                    (filter === "pinned" && note.isPinned) ||
                    (filter === "archived" && note.isArchived);
                return matchesSearch && matchesFilter;
            })
            .sort((a, b) => {
                if (sort === "pinned") return b.isPinned - a.isPinned;
                if (sort === "archived") return a.isArchived - b.isArchived;
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });
    }, [notes, searchTerm, filter, sort]);

    if (!loggedIn) return <div className="p-4 text-center">Please log in to view your notes.</div>;
    if (loading) return <div className="p-4 text-center">Loading notes...</div>;

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                    Welcome, {user}!
                </h1>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                    {user?.email?.replace(/^[^@]+/, "xxxxxx")}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search notes..."
                    className="border p-2 rounded w-full sm:w-1/2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-2 w-full sm:w-1/2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded w-1/2"
                    >
                        <option value="all">All Notes</option>
                        <option value="pinned">Pinned</option>
                        <option value="archived">Archived</option>
                        <option value="active">Active</option>
                    </select>
                </div>
            </div>

            {filteredNotes.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    <p className="text-lg font-medium">No notes found</p>
                    <p className="mt-2">Try creating a new note or adjusting your search/filter.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredNotes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteNote}
                            canModify={note.userId === userId}
                        />
                    ))}
                </div>
            )}

            {selectedNote && selectedNote.userId === userId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
                            onClick={() => setSelectedNote(null)}
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

                        <input
                            type="text"
                            className="w-full border p-2 rounded mb-4"
                            value={editFields.title}
                            onChange={(e) => setEditFields({ ...editFields, title: e.target.value })}
                            placeholder="Title"
                        />

                        <textarea
                            className="w-full border p-2 rounded mb-4"
                            rows="4"
                            value={editFields.content}
                            onChange={(e) => setEditFields({ ...editFields, content: e.target.value })}
                            placeholder="Content"
                        />

                        <input
                            type="text"
                            className="w-full border p-2 rounded mb-4"
                            value={editFields.tags}
                            onChange={(e) => setEditFields({ ...editFields, tags: e.target.value })}
                            placeholder="Tags (comma separated)"
                        />

                        <div className="flex gap-4 mb-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={editFields.isPinned}
                                    onChange={(e) => setEditFields({ ...editFields, isPinned: e.target.checked })}
                                    className="w-5 h-5 text-blue-500 rounded"
                                />
                                Pinned
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={editFields.isArchived}
                                    onChange={(e) => setEditFields({ ...editFields, isArchived: e.target.checked })}
                                    className="w-5 h-5 text-blue-500 rounded"
                                />
                                Archived
                            </label>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center gap-2"
                                onClick={() => handleDeleteNote(selectedNote)}
                            >
                                <Trash2 size={18} /> Delete
                            </button>
                            <button
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center gap-2"
                                onClick={handleUpdateNote}
                            >
                                <Edit size={18} /> Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Notes;