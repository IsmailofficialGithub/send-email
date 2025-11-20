"use client";

import { useState } from "react";
import axios from "axios";

export default function SendEmailPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "750px",
      background: "#fff",
      padding: "35px",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      border: "1px solid #eee",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "6px",
      textAlign: "center",
      color: "#111",
    },
    subtitle: {
      color: "#666",
      fontSize: "14px",
      textAlign: "center",
      marginBottom: "25px",
    },
    label: {
      fontWeight: "600",
      color: "#333",
      marginBottom: "6px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      background: "#f9fafb",
      fontSize: "15px",
      color: "#111",
      transition: "0.2s",
    },
    inputFocus: {
      background: "#fff",
      borderColor: "#3b82f6",
      color: "#111",

      boxShadow: "0 0 0 2px rgba(59,130,246,0.3)",
    },
    textarea: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      background: "#f9fafb",
      color: "#111",

      minHeight: "140px",
      fontSize: "15px",
      transition: "0.2s",
    },
    button: {
      width: "100%",
      padding: "14px",
      background: "#2563eb",
      color: "#fff",
      fontSize: "17px",
      borderRadius: "12px",
      border: "none",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "10px",
      transition: "0.25s",
    },
    buttonHover: {
      background: "#1d4ed8",
      transform: "scale(1.02)",
    },
    buttonDisabled: {
      background: "#93c5fd",
      cursor: "not-allowed",
    },
    statusSuccess: {
      padding: "12px",
      background: "#dcfce7",
      color: "#166534",
      border: "1px solid #86efac",
      borderRadius: "8px",
      marginBottom: "15px",
      fontSize: "14px",
      fontWeight: "600",
    },
    statusError: {
      padding: "12px",
      background: "#fee2e2",
      color: "#991b1b",
      border: "1px solid #fca5a5",
      borderRadius: "8px",
      marginBottom: "15px",
      fontSize: "14px",
      fontWeight: "600",
    },
    previewTitle: {
      marginTop: "30px",
      marginBottom: "10px",
      fontSize: "20px",
      fontWeight: "600",
      color: "#222",
    },
    previewBox: {
      padding: "20px",
      color: "#111",

      borderRadius: "12px",
      background: "#f3f4f6",
      border: "1px solid #ddd",
      minHeight: "160px",
    },
  };

  const sendEmail = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await axios.post("/api/send-email", {
        to,
        subject,
        html,
      });

      setStatus({ type: "success", message: res.data.message });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Something went wrong",
      });
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Send Email</h2>
        <p style={styles.subtitle}>Create & send HTML emails</p>

        {status && (
          <div
            style={
              status.type === "success"
                ? styles.statusSuccess
                : styles.statusError
            }
          >
            {status.message}
          </div>
        )}

        {/* To */}
        <div style={{ marginBottom: "20px" }}>
          <label style={styles.label}>To Email</label>
          <input
            type="email"
            style={styles.input}
            onChange={(e) => setTo(e.target.value)}
            placeholder="example@gmail.com"
          />
        </div>

        {/* Subject */}
        <div style={{ marginBottom: "20px" }}>
          <label style={styles.label}>Subject</label>
          <input
            type="text"
            style={styles.input}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject..."
          />
        </div>

        {/* HTML */}
        <div style={{ marginBottom: "20px" }}>
          <label style={styles.label}>Email HTML Content</label>
          <textarea
            style={styles.textarea}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="<h1>Hello User</h1>"
          ></textarea>
        </div>

        {/* Send Button */}
        <button
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
          disabled={loading}
          onClick={sendEmail}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>

        <h3 style={styles.previewTitle}>Live Preview</h3>
        <div
          style={styles.previewBox}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
