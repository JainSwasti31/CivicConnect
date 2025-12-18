import MapComponent from "./MapComponent.jsx";

export default function IssueCard({ issue, actions }) {
  return (
    <div className="glass p-4 rounded-xl space-y-3">

      {/* Title + Status */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          {issue.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${issue.status === "Resolved"
              ? "bg-green-600"
              : issue.status === "In Progress"
                ? "bg-yellow-600"
                : "bg-red-600"
            }`}
        >
          {issue.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm">
        {issue.description}
      </p>

      {/* Image */}
      {issue.imageURL && (
        <img
          src={issue.imageURL}
          alt="issue"
          className="w-full h-40 object-cover rounded-lg border border-white/10"
        />
      )}

      {/* 🗺 MINI MAP (LIVE LOCATION) */}
      {issue.location?.lat && issue.location?.lng && (
        <div className="h-40 rounded-lg overflow-hidden border border-white/20">
          <MapComponent issues={[issue]} />
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div className="pt-2">
          {actions}
        </div>
      )}
    </div>
  );
}