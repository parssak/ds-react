import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="container min-h-screen pt-16">
        <h1 className="text-5xl font-semibold mb-6">React Questions</h1>
        <Link href="/todo">
          <a className="mt-4 text-indigo-600 hover:text-indigo-700">
            <span className="font-semibold">Todo List Example</span>
          </a>
        </Link>
      </main>
    </>
  );
}
