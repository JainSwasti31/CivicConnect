export default function IssueCard({ issue, actions }) {
  return (
    <div className="glass p-4 rounded-xl">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{issue.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            issue.status === "Resolved"
              ? "bg-green-600"
              : issue.status === "In Progress"
              ? "bg-yellow-600"
              : "bg-red-600"
          }`}
        >
          {issue.status}
        </span>
      </div>

      <p className="text-gray-300 text-sm">{issue.description}</p>

      {issue.imageURL && (
        <img
          src={issue.imageURL}
          alt="issue"
          className="mt-3 w-full h-40 object-cover rounded-lg"
        />
      )}

      {actions && <div className="mt-4">{actions}</div>}
    </div>
  );
}
