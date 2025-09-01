const Home = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser)?.user?.username : null;

    console.log("Logged-in user:", user);

    return (
        <div className="min-h-screen bg-[#E6E0D9] flex flex-col items-center">
            <section className="w-full bg-[#E6E0D9] text-[#6B6B6B] py-24 flex flex-col items-center text-center px-4">
                <h1 className="text-[#7A7A7A] text-2xl font-extrabold tracking-wide">
                    {loggedIn && user ? user : "NoteCraft"}
                </h1>

                <p className="text-lg md:text-xl mb-8 max-w-2xl">
                    Your ultimate note-taking companion. Organize your thoughts, ideas, and tasks efficiently and beautifully.
                </p>

                <div className="flex gap-4">
                    <a
                        href="#"
                        className="bg-[#6B6B6B] text-[#F7F4EF] px-6 py-3 rounded-2xl font-semibold hover:bg-[#555555] transition"
                    >
                        Create a Note
                    </a>
                    <a
                        href="#"
                        className="bg-[#F7F4EF] text-[#6B6B6B] px-6 py-3 rounded-2xl font-semibold hover:bg-[#E0DBD2] transition border border-[#6B6B6B]"
                    >
                        View Notes
                    </a>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Features
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-[#F7F4EF] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
                        <h3 className="text-xl font-semibold mb-2 text-[#6B6B6B]">Organize Notes</h3>
                        <p className="text-[#6B6B6B]">
                            Keep all your notes structured and easy to access whenever you need them.
                        </p>
                    </div>
                    <div className="bg-[#F7F4EF] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
                        <h3 className="text-xl font-semibold mb-2 text-[#6B6B6B]">Easy Editing</h3>
                        <p className="text-[#6B6B6B]">
                            Quickly create, edit, and manage notes with a simple and intuitive interface.
                        </p>
                    </div>
                    <div className="bg-[#F7F4EF] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
                        <h3 className="text-xl font-semibold mb-2 text-[#6B6B6B]">Secure Storage</h3>
                        <p className="text-[#6B6B6B]">
                            Your notes are safe and can be synced across devices (future-ready for expansion).
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#6B6B6B] text-[#F7F4EF] py-12 flex flex-col items-center text-center px-4">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to start organizing your thoughts?
                </h3>
                <a href="#"
                    className="bg-[#F7F4EF] text-[#6B6B6B] px-6 py-3 rounded-2xl font-semibold hover:bg-[#E0DBD2] transition"
                >
                    Create a Note Now
                </a>
            </section>
        </div>
    );

};


export default Home;