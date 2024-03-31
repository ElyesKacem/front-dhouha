import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

// const top100Films = [
//   { label: "The Shawshank Redemption", year: 1994 },
//   { label: "The Godfather", year: 1972 },
//   { label: "The Godfather: Part II", year: 1974 },
//   { label: "The Dark Knight", year: 2008 },
//   { label: "12 Angry Men", year: 1957 },
// ];

const defaultTheme = createTheme();

export default function AuditForm() {
  const [saisons, setSaisons] = React.useState([]);

  React.useEffect(() => {
    // setSaisons(top100Films);

    console.log(saisons);

    return () => {};
  }, []);

  const [date, setDate] = React.useState("");
  const dateInputRef = React.useRef(null);

  const handleChange = (e) => {
    const selectedDate = e.target.value;
    // Convert selectedDate to yyyy-mm-dd format
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
    setDate(formattedDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("emails"),
      password: data.get("password"),
      date: data.get("date"),
    });
  };

  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Formulaire audition
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <div>
                  Choisir une date de début : &nbsp;&nbsp;
                  <input
                    name="date"
                    style={{
                      border: "1px solid black",
                      color: "white",
                      backgroundColor: "#7ec4c8",
                    }}
                    type="date"
                    onChange={handleChange}
                    ref={dateInputRef}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>{`inputValue: '${inputValue}'`}</div>
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  disablePortal
                  id="combo-box-demo"
                  includeInputInList
                  options={saisons}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Choisir saison" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emails"
                  label="Email Address"
                  name="emails"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
