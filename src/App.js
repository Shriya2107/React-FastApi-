import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Simple Form</h2>

      <form onSubmit={submitForm}>
        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <h3>{msg}</h3>
    </div>
  );
}

export default App;