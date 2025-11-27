import { useEffect, useState } from "react";
import api from "../api";
import IssueCard from "../components/IssueCard";

export default function Admin() {
  const [issues, setIssues] = useState([]);

  const load = async () => {
    const res = await api.get("/issues");
    setIssues(res.data.issues);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/issues/${id}/status`, { status });
    load();
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-[--neon] text-2xl mb-6">Municipal Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {issues.map((i) => (
          <IssueCard
            key={i._id}
            issue={i}
            actions={
              <div className="flex gap-3">
                <button
                  className="px-3 py-1 bg-yellow-500 rounded"
                  onClick={() => updateStatus(i._id, "In Progress")}
                >
                  In Progress
                </button>
                <button
                  className="px-3 py-1 bg-green-600 rounded"
                  onClick={() => updateStatus(i._id, "Resolved")}
                >
                  Resolve
                </button>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
}
