import { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import SearchBar from "./SearchBar";
import UploadFileButton from "./UploadFileButton";
import FilterButton from "./FilterButton";

const TopBar = ({ logs, setLogs }) => {
  const [severity, setSeverity] = useState([
    "INFO",
    "WARN",
    "ERROR",
    "DEBUG",
    "FATAL",
  ]);
  const [search, setSearch] = useState("");

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

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1976d2", paddingY: "0.5rem" }}
    >
      <Toolbar>
        <UploadFileButton fetchLogs={fetchLogs} logs={logs} />

        <SearchBar
          fetchLogs={fetchLogs}
          search={search}
          setSearch={setSearch}
        />

        <FilterButton
          severity={severity}
          setSeverity={setSeverity}
          fetchLogs={fetchLogs}
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
