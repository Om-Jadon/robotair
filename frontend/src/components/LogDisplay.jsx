import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const getSeverityStyle = (severity) => {
  const styles = {
    INFO: { color: "#1976d2", fontWeight: "bold" }, // Blue
    WARN: { color: "#ff9800", fontWeight: "bold" }, // Orange
    ERROR: { color: "#d32f2f", fontWeight: "bold" }, // Red
    FATAL: { color: "#d32f2f", fontWeight: "bold" }, // Red
    DEBUG: { color: "#388e3c", fontWeight: "bold" }, // Green
  };
  return styles[severity] || { color: "inherit" };
};

function LogDisplay({ logs }) {
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {logs && logs.length > 0
          ? `${logs.length} logs found`
          : "No logs found"}
      </Typography>

      {logs && logs.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            flexGrow: 1,
            maxHeight: "75vh",
            overflowY: "auto",
            boxShadow: 3,
            borderRadius: "8px",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Timestamp
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Severity
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Node
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Message
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index} hover>
                  <TableCell>{formatDate(log.timestamp)}</TableCell>
                  <TableCell style={getSeverityStyle(log.severity)}>
                    {log.severity}
                  </TableCell>
                  <TableCell>{log.node}</TableCell>
                  <TableCell>{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          No logs to display.
        </Typography>
      )}
    </Box>
  );
}

export default LogDisplay;
