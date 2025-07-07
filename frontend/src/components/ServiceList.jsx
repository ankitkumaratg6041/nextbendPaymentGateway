export default function ServiceList({ title, items}) {
    return (
      <div>
        <p className="font-semibold mb-2">{title}:</p>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b border-white/30 pb-1"
            >
              <p>{item}</p>
              <button
                className="text-lg font-bold hover:text-green-300"
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  