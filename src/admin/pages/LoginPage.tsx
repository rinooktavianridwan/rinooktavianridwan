import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { ApiError } from "../../api/adminClient";
import { Button, Field, Input } from "../components/ui";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username.trim(), password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Login gagal. Coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A97ED] via-[#3E8DE3] to-[#2E6FBF] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-xl p-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Admin Login
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Masuk untuk mengelola portofolio
        </p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Field label="Username" required>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />
          </Field>
          <Field label="Password" required>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </Field>
        </div>

        <Button type="submit" className="w-full mt-6" loading={loading}>
          Masuk
        </Button>
      </form>
    </div>
  );
}