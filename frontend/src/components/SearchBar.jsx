import { Box, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ search, setSearch, fetchLogs }) {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    fetchLogs();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          flexGrow: 1,
          marginRight: "1rem",
          minWidth: { sx: "10rem", sm: "30rem" },
        }}
      >
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

      <Button
        variant="contained"
        color="secondary"
        onClick={handleSearchClick}
        sx={{ marginRight: { sx: "0.5rem", sm: "1rem" } }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
}

export default SearchBar;
