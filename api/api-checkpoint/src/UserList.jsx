// src/UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        setListOfUser(res.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="status">Loading users…</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div className="users">
      {listOfUser.map((u) => (
        <article key={u.id} className="card">
          <h2>{u.name}</h2>
          <p className="muted">@{u.username}</p>
          <p>
            <strong>Email:</strong> {u.email}
          </p>
          <p>
            <strong>Phone:</strong> {u.phone}
          </p>
          <p>
            <strong>Company:</strong> {u.company?.name}
          </p>
          <p className="muted">
            {u.address?.suite}, {u.address?.street}, {u.address?.city}
          </p>
          <a
            className="btn"
            href={`http://${u.website}`}
            target="_blank"
            rel="noreferrer"
          >
            Website
          </a>
        </article>
      ))}
    </div>
  );
}
