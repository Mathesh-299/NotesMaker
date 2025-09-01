import { useState } from "react";
import API from "../API/api";

const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [isPinned, setIsPinned] = useState(false);
    const [isArchived, setIsArchived] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const token = localStorage.getItem("token");
    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    const userId = parsedData?.user?._id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const payload = {
                title,
                content,
                tags: tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                isPinned,
                isArchived,
            };

            // Send userId as route param
            const response = await API.post(`/notes/addNotes/${userId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setSuccess("Note created successfully!");
                setTitle("");
                setContent("");
                setTags("");
                setIsPinned(false);
                setIsArchived(false);
            }
        } catch (err) {
            console.error(err.response || err);
            setError(err.response?.data?.message || "Internal server error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Note</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter note title"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            minLength={5}
                            maxLength={400}
                            placeholder="Write your note here..."
                            rows={5}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. work, personal"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={isPinned}
                                onChange={(e) => setIsPinned(e.target.checked)}
                                className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-400"
                            />
                            <span className="text-gray-700 font-medium">Pinned</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={isArchived}
                                onChange={(e) => setIsArchived(e.target.checked)}
                                className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-400"
                            />
                            <span className="text-gray-700 font-medium">Archived</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        {loading ? "Creating..." : "Create Note"}
                    </button>

                    {error && <p className="text-red-600 text-center">{error}</p>}
                    {success && <p className="text-green-600 text-center">{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default Create;