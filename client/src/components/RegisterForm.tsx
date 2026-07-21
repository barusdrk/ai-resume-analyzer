import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({
  onSwitchToLogin,
}: RegisterFormProps) {
  const { register } = useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      await register({
        name,
        email,
        password,
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Create Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            className="w-full rounded border p-3"
          />
        </div>

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
            minLength={8}
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            required
            minLength={8}
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
          className="w-full rounded bg-green-600 px-4 py-3 text-white transition hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading
            ? "Creating account..."
            : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center">
        Already have an account?
      </p>

      <button
        onClick={onSwitchToLogin}
        className="mt-2 w-full rounded border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
      >
        Login
      </button>
    </div>
  );
}
