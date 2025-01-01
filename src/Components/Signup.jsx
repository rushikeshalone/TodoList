import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://todo-production-0c09.up.railway.app/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      navigate("/login"); // Navigate to login after signup
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#172842] text-white">
      <form onSubmit={handleSignup} className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            className="w-full p-2 bg-gray-700 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full p-2 bg-gray-700 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-500 w-full py-2 rounded">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
