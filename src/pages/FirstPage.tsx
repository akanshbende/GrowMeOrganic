import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useNavigate } from "react-router";

function FirstPage() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  console.log(name, phone, email);
  const isFormValid = name && phone && email;

  const handleSubmit = () => {
    if (isFormValid) {
      const user = {
        name: name,
        phone: phone,
        email: email,
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } else {
      alert("Please fill in all fields before submitting.");
    }
  };
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            // bgcolor: "#cfe8fc",
            height: "90vh",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              boxShadow: 3,
              height: "350px",
              width: "300px",
              borderRadius: "10px",
              zIndex: 100,
              padding: "10px",
              paddingTop: "50px",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              p: 1,
              m: 1,

              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "700",
            }}
          >
            <Stack spacing={2}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Phone Number"
                placeholder="+91 123..."
                variant="outlined"
                type="number"
                size="small"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                placeholder="abc@gmail.com"
                variant="outlined"
                size="small"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default FirstPage;
