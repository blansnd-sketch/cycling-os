// US-BIKE-01, US-BIKE-04
// Garage root page. Authenticated Empty Garage baseline with Profile and Logout actions.

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { authCookieName, readSessionToken } from "@/lib/auth";

export default async function GaragePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(authCookieName)?.value ?? null;
  const session = readSessionToken(token);

  if (!session) {
    redirect("/");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f7f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          minHeight: "100vh",
          margin: "0 auto",
          background: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: 'url("/images/garage/empty-garage.jpg")',
            backgroundSize: "auto 80%",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
            opacity: 0.08,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "100vh",
            padding: "24px 20px 32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              marginBottom: "40px",
            }}
          >
            <button
              type="button"
              style={{
                border: "none",
                background: "#f1f5ff",
                color: "#3A8DFF",
                borderRadius: "999px",
                padding: "10px 14px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Profile
            </button>

            <form action="/api/logout" method="POST">
              <button
                type="submit"
                style={{
                  border: "none",
                  background: "#ffecec",
                  color: "#ff4d4f",
                  borderRadius: "999px",
                  padding: "10px 14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </form>
          </div>

          <div style={{ marginTop: "24px", marginBottom: "28px" }}>
            <h1
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "12px",
              }}
            >
              Your garage is empty
            </h1>

            <p
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                color: "#555555",
              }}
            >
              Add equipment via search or upload a photo
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              <input type="text" placeholder="Brand" style={inputStyle} />
              <div style={helperStyle}>If unknown, leave empty</div>
            </div>

            <div>
              <input type="text" placeholder="Model" style={inputStyle} />
              <div style={helperStyle}>If unknown, leave empty</div>
            </div>

            <div>
              <input type="text" placeholder="Year" style={inputStyle} />
              <div style={helperStyle}>If unknown, leave empty</div>
            </div>

            <button
              type="button"
              disabled
              style={{
                ...buttonStyle,
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              Add
            </button>
          </div>

          <div
            style={{
              marginTop: "24px",
              border: "1px dashed #cfd7e6",
              borderRadius: "16px",
              padding: "20px",
              background: "#fafcff",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                lineHeight: "22px",
                color: "#444444",
                marginBottom: "16px",
              }}
            >
              Upload photo (JPEG)
            </div>

            <button
              type="button"
              style={{
                ...buttonStyle,
                background: "#ffffff",
                color: "#3A8DFF",
                border: "1px solid #3A8DFF",
              }}
            >
              Upload photo (JPEG)
            </button>
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: "32px",
              fontSize: "13px",
              lineHeight: "20px",
              color: "#777777",
            }}
          >
            Logged in as: {session.email}
          </div>
        </div>
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

const helperStyle: React.CSSProperties = {
  marginTop: "6px",
  fontSize: "13px",
  lineHeight: "18px",
  color: "#777777",
};

const buttonStyle: React.CSSProperties = {
  height: "52px",
  borderRadius: "12px",
  border: "none",
  background: "#3A8DFF",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 600,
  width: "100%",
};