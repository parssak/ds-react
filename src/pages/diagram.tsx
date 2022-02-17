import React, { useMemo, useState } from "react";

const items = [
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

const Diagram = ({ items }: { items: Item[] }) => {
  // range input for scale
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
      {/* range input for scale */}
      <input
        type="range"
        min="25"
        max="50"
        value={scale}
        onChange={(e) => setScale(parseInt(e.target.value))}
      />
      <div className="relative space-y-2">
        {layoutNodes.map((node) => (
          <div
            key={node.id}
            className="p-3 bg-blue-400 rounded-xl relative whitespace-nowrap"
            style={{
              left: `${node.x * scale}%`,
              width: `${node.width * scale}%`,
              
            }}
          >
            {/* {node.name} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DiagramPage() {
  return (
    <div className="container min-h-screen pt-8">
      <h1 className="text-2xl font-bold mb-4">Gantt Diagram</h1>
      <Diagram items={items} />
    </div>
  );
}
