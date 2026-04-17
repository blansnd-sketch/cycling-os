"use client";

// US-LOG-01, US-REG-01
// Auth screen with login/register flows and redirect to Garage.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "register";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/me");

        if (response.ok) {
          router.replace("/garage");
          return;
        }
      } catch {
        // Ignore initial session check failure.
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [router]);

  const isLoginValid = email.trim() !== "" && password.trim() !== "";
  const isRegisterValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    password.length >= 4 &&
    confirmPassword.length >= 4 &&
    password === confirmPassword;

  const canSubmit = mode === "login" ? isLoginValid : isRegisterValid;

  const handleSubmit = async () => {
    if (!canSubmit || loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload =
        mode === "login"
          ? {
              email,
              password,
            }
          : {
              email,
              password,
              confirmPassword,
            };

      const endpoint = mode === "login" ? "/api/login" : "/api/register";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        return;
      }

      router.replace("/garage");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          background: "#f7f7f8",
        }}
      >
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f7f7f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        {mode === "login" ? (
          <>
            <h1
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 700,
                marginBottom: "24px",
                color: "#111111",
              }}
            >
              Welcome back
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: "70px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={toggleStyle}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {error ? (
                <div
                  style={{
                    color: "#c62828",
                    fontSize: "14px",
                    lineHeight: "20px",
                  }}
                >
                  {error}
                </div>
              ) : null}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || loading}
                style={{
                  ...buttonStyle,
                  opacity: !canSubmit || loading ? 0.5 : 1,
                  cursor: !canSubmit || loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Loading..." : "Log in"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                  setPassword("");
                  setConfirmPassword("");
                }}
                style={linkButtonStyle}
              >
                Create account
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setPassword("");
                setConfirmPassword("");
              }}
              style={{
                ...linkButtonStyle,
                marginBottom: "16px",
                textAlign: "left",
                justifyContent: "flex-start",
              }}
            >
              ← Back
            </button>

            <h1
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 700,
                marginBottom: "24px",
                color: "#111111",
              }}
            >
              Create account
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
                {email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? (
                  <div style={errorTextStyle}>Invalid email</div>
                ) : null}
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: "70px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={toggleStyle}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {password !== "" && password.length < 4 ? (
                  <div style={errorTextStyle}>Password must be at least 4 characters</div>
                ) : null}
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: "70px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  style={toggleStyle}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
                {confirmPassword !== "" && password !== confirmPassword ? (
                  <div style={errorTextStyle}>Passwords do not match</div>
                ) : null}
              </div>

              {error ? (
                <div
                  style={{
                    color: "#c62828",
                    fontSize: "14px",
                    lineHeight: "20px",
                  }}
                >
                  {error}
                </div>
              ) : null}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || loading}
                style={{
                  ...buttonStyle,
                  opacity: !canSubmit || loading ? 0.5 : 1,
                  cursor: !canSubmit || loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Loading..." : "Create account"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "52px",
  borderRadius: "12px",
  border: "1px solid #d9d9de",
  padding: "0 16px",
  fontSize: "16px",
  outline: "none",
  background: "#ffffff",
  color: "#111111",
};

const buttonStyle: React.CSSProperties = {
  height: "52px",
  borderRadius: "12px",
  border: "none",
  background: "#3A8DFF",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 600,
};

const linkButtonStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#3A8DFF",
  fontSize: "15px",
  fontWeight: 500,
  padding: 0,
};

const toggleStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  right: "12px",
  transform: "translateY(-50%)",
  border: "none",
  background: "transparent",
  color: "#3A8DFF",
  fontSize: "14px",
  fontWeight: 600,
};

const errorTextStyle: React.CSSProperties = {
  marginTop: "6px",
  color: "#c62828",
  fontSize: "13px",
  lineHeight: "18px",
};