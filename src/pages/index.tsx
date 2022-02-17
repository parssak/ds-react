import Link from "next/link";

export default function Home() {
  const examples = [
    {
      title: "Todo List Example",
      path: "/todo",
    },
    {
      title: "Sticky Example",
      path: "/sticky",
    },
    {
      title: "Diagram Example",
      path: "/diagram",
    }
  ];

  return (
    <>
      <main className="container min-h-screen pt-16">
        <h1 className="text-5xl font-semibold mb-6">React Questions</h1>
        {examples.map(({ title, path }) => (
          <Link href={path} key={path}>
            <a className="mt-4 text-indigo-600 hover:text-indigo-700 block">
              <span className="font-semibold">{title}</span>
            </a>
          </Link>
        ))}
      </main>
    </>
  );
}
