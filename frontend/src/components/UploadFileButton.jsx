import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

function UploadFileButton({ fetchLogs, logs }) {
  const [uploadStatus, setUploadStatus] = useState("idle");

  const uploadFile = async (file) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    setUploadStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:5001/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result.message);
      setUploadStatus("success");
    } catch (error) {
      console.error("File upload failed:", error.message);
      setUploadStatus("error");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) uploadFile(file);
  };

  useEffect(() => {
    fetchLogs();
  }, [uploadStatus]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        variant="contained"
        component="label"
        sx={{
          marginRight: "1rem",
          backgroundColor:
            uploadStatus === "success"
              ? "green"
              : uploadStatus === "error"
              ? "red"
              : undefined,
          fontSize: { xs: "0.75rem", sm: "1rem" },
        }}
      >
        {uploadStatus === "success"
          ? "File Uploaded!"
          : uploadStatus === "uploading"
          ? "Uploading..."
          : "Upload File"}
        <input
          type="file"
          hidden
          onChange={handleFileUpload}
          aria-label="Upload File"
        />
      </Button>
    </Box>
  );
}

export default UploadFileButton;
