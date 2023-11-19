import Chat from "../../components/chat";
import Header from "../../components/header";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-700 min-h-screen">
      <Header />
      <main className="rounded gap-4 p-4">
        {/* Left column */}

        {/* Middle column - main content */}
        <section className="col-span-7 bg-gray-600 p-4 rounded-lg">
          <Chat />
        </section>

        {/* Right column */}
      </main>
    </div>
  );
}
