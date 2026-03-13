import { useState } from "react";
import data from "../scraper/data.json";
import "./App.css";

function App() {

  const [filter, setFilter] = useState("All");

  const filtered = data.filter((post) => {

    if (filter === "All") return true;

    const text = post.content?.toLowerCase() || "";

    if (filter === "Shayak Only")
      return text.includes("shayak");

    if (filter === "Adya Only")
      return text.includes("adya");

    if (filter === "Both")
      return text.includes("shayak") && text.includes("adya");

    return true;
  });


  // ✅ CSV EXPORT FUNCTION
  const exportCSV = () => {

    if (filtered.length === 0) return;

    const rows = filtered.map((post) => ({
      text: post.content,
      author: post.author?.name,
      date: post.postedAt?.postedAgoText,
      link: post.linkedinUrl,
    }));

    const header = Object.keys(rows[0]).join(",");

    const csv =
      header +
      "\n" +
      rows
        .map((row) =>
          Object.values(row)
            .map((v) => `"${v}"`)
            .join(",")
        )
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "linkedin_mentions.csv";

    a.click();
  };


  return (
    <div className="container">

      <h1>LinkedIn Monitor</h1>


      <div className="buttons">

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Both")}>
          Both
        </button>

        <button onClick={() => setFilter("Shayak Only")}>
          Shayak
        </button>

        <button onClick={() => setFilter("Adya Only")}>
          Adya
        </button>

        <button onClick={exportCSV}>
          Export CSV
        </button>

      </div>


      <div className="cards">

        {filtered.map((post, i) => {

          const text = post.content;
          const author = post.author?.name;
          const date = post.postedAt?.postedAgoText;
          const link = post.linkedinUrl;

          return (
            <div className="card" key={i}>

              <p>{text}</p>

              <p>
                <b>{author}</b>
              </p>

              <p>{date}</p>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Post
              </a>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default App;