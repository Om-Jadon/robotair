import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const TopBar = ({ logs, setLogs }) => {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState([
    "INFO",
    "WARN",
    "ERROR",
    "DEBUG",
    "FATAL",
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");

  const severityOptions = ["INFO", "WARN", "ERROR", "DEBUG", "FATAL"];

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

  const fetchLogs = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (severity.length > 0)
        queryParams.append("severity", severity.join(","));

      const response = await fetch(
        `http://127.0.0.1:5001/logs?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const logs = await response.json();
      setLogs(logs);
      console.log("Logs fetched successfully");
    } catch (error) {
      console.error("Failed to fetch logs:", error.message);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) uploadFile(file);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSeverityToggle = (option) => {
    if (severity.includes(option)) {
      setSeverity(severity.filter((item) => item !== option));
    } else {
      setSeverity([...severity, option]);
    }
    fetchLogs();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchLogs();
  }, [severity]);

  useEffect(() => {
    fetchLogs();
  }, [uploadStatus]);

  const handleSearchClick = () => {
    fetchLogs();
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1976d2", padding: "0.5rem" }}
    >
      <Toolbar>
        {/* Upload File Button */}
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

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, marginRight: "1rem" }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearchChange}
            aria-label="Search"
            fullWidth
            InputProps={{
              style: {
                color: "white",
              },
            }}
          />
        </Box>

        {/* Search Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSearchClick}
          sx={{ marginRight: "1rem" }}
        >
          Search
        </Button>

        {/* Severity Filter Dropdown */}
        <Box>
          <IconButton
            onClick={handleMenuOpen}
            aria-controls="severity-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <FilterListIcon />
          </IconButton>
          <Menu
            id="severity-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {severityOptions.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleSeverityToggle(option)}
              >
                <Checkbox checked={severity.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
