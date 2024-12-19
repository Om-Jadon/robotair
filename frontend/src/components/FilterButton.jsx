import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

function FilterButton({ severity, setSeverity, fetchLogs }) {
  const severityOptions = ["INFO", "WARN", "ERROR", "DEBUG", "FATAL"];
  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
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
          <MenuItem key={option} onClick={() => handleSeverityToggle(option)}>
            <Checkbox checked={severity.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default FilterButton;
