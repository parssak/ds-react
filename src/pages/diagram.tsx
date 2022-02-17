import React, { useMemo, useState } from "react";

interface Item {
  start: string;
  end: string;
  name: string;
}

interface ILayoutNode {
  id: string;
  x: number;
  width: number;
  name: string;
}

const items: Item[] = [
  {
    start: "2018-01-01",
    end: "2018-01-05",
    name: "First item",
  },
  {
    start: "2018-01-02",
    end: "2018-01-08",
    name: "Second item",
  },
  {
    start: "2018-01-06",
    end: "2018-01-13",
    name: "Another item",
  },
  {
    start: "2018-01-14",
    end: "2018-01-14",
    name: "Another item",
  },
  {
    start: "2018-02-01",
    end: "2018-02-15",
    name: "Third item",
  },
  {
    start: "2018-01-12",
    end: "2018-02-16",
    name: "Fourth item with a super long name",
  },
  {
    start: "2018-02-01",
    end: "2018-02-02",
    name: "Fifth item with a super long name",
  },
  {
    start: "2018-01-03",
    end: "2018-01-05",
    name: "First item",
  },
  {
    start: "2018-01-04",
    end: "2018-01-08",
    name: "Second item",
  },
  {
    start: "2018-01-06",
    end: "2018-01-13",
    name: "Another item",
  },
  {
    start: "2018-01-09",
    end: "2018-01-11",
    name: "Another item",
  },
  {
    start: "2018-02-01",
    end: "2018-02-15",

    name: "Third item",
  },
  {
    start: "2018-02-01",
    end: "2018-02-02",
    name: "Fifth item with a super long name",
  },
];

const Diagram = ({ items }: { items: Item[] }) => {
  const [scale, setScale] = useState(40);

  const computeLayoutNodes = (items: Item[]): ILayoutNode[] => {
    const sortedItems = items.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    const start = new Date(sortedItems[0].start);
    const end = new Date(sortedItems[sortedItems.length - 1].end);

    // at least 1 week long
    const layoutRangeMs = Math.max(end.getTime() - start.getTime(), 604800000);

    const layoutNodes: ILayoutNode[] = sortedItems.map((item, index) => {
      const startDate = new Date(item.start);
      const endDate = new Date(item.end);
      const width = (endDate.getTime() - startDate.getTime()) / layoutRangeMs;
      return {
        id: `${index}`,
        x: (startDate.getTime() - start.getTime()) / layoutRangeMs,
        width,
        name: item.name,
      };
    });
    return layoutNodes;
  };

  const layoutNodes = useMemo(() => computeLayoutNodes(items), [items]);

  return (
    <div>
      <input
        type="range"
        min="25"
        max="50"
        value={scale}
        onChange={(e) => setScale(parseInt(e.target.value))}
      />
      <div className="space-y-2 overflow-auto">
        {layoutNodes.map((node) => (
          <div
            key={node.id}
            className="p-3 h-6 bg-blue-400 group hover:bg-blue-500 transition rounded-xl relative whitespace-nowrap cursor-pointer"
            style={{
              left: `${node.x * scale}%`,
              width: `${node.width * scale}%`,
            }}
          >
            <span className="absolute top-0 bottom-0 grid place-items-center left-full text-left pl-2 text-sm text-gray-500 group-hover:text-black">
              {node.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DiagramPage() {
  return (
    <div className="page">
      <h1>Gantt Diagram</h1>
      <Diagram items={items} />
      <div className="question my-12">
        Given an input array of <code>items</code>, display a Gantt Diagram that is:
        <ul className="list-inside list-disc mt-1 space-y-1">
          <li>Responsive to the container</li>
          <li>Displays labels to the right of each bar</li>
          <li>Able to resize with a scale slider input</li>
        </ul>
        <details className="mt-1">
          <summary>Example input:</summary>
          <pre className="mt-2 bg-white text-green-600 p-1 rounded-md">
            <code>{JSON.stringify(items, null, 2)}</code>
          </pre>
        </details>
      </div>
    </div>
  );
}
