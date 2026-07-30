import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({
  onSwitchToRegister,
}: LoginFormProps) {
  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login({
        email,
        password,
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Login
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full rounded border p-3"
          />
        </div>

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center">
        Don't have an account?
      </p>

      <button
        onClick={onSwitchToRegister}
        className="mt-2 w-full rounded border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
      >
        Create Account
      </button>
    </div>
  );
}
