import { useEffect, useState } from "react";
import api from "../api";

export default function MyIssues() {
  const [issues, setIssues] = useState([]);

  const loadMyIssues = async () => {
    try {
      const res = await api.get("/issues/my");
      setIssues(res.data.issues || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMyIssues();
  }, []);

  return (
    <section className="max-w-6xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold text-white mb-6">
        📋 My Reported Issues
      </h1>

      {issues.length === 0 ? (
        <p className="text-gray-400">No issues reported yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {issues.map((issue) => (
            <div key={issue._id} className="glass p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-white">
                {issue.title}
              </h3>

              <p className="text-gray-300 text-sm mt-1">
                {issue.description}
              </p>

              {/* STATUS BADGE */}
              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    issue.status === "Resolved"
                      ? "bg-green-600"
                      : issue.status === "In Progress"
                      ? "bg-yellow-500 text-black"
                      : "bg-red-600"
                  }`}
                >
                  {issue.status}
                </span>
              </div>

              {/* IMAGE */}
              {issue.imageURL && (
                <img
                  src={issue.imageURL}
                  alt="issue"
                  className="mt-3 w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}