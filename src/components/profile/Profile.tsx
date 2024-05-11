import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

type ProfileProps = {
  // Define cualquier tipo de prop adicional que necesites
};

type ProfileData = {
  imageUrl: string;
  address: string;
  phone: string;
  postalCode: string;
  city: string;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Color principal del tema (puedes personalizarlo)
    },
    secondary: {
      main: "#dc004e", // Color secundario del tema (puedes personalizarlo)
    },
    background: {
      default: "#ffffff", // Fondo blanco para los campos TextField
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "#ffffff", // Fondo blanco
          },
        },
      },
    },
  },
});

const Profile: React.FC<ProfileProps> = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    imageUrl: "", // URL de la imagen de perfil
    address: "", // Dirección de vivienda
    phone: "", // Teléfono
    postalCode: "", // Código postal
    city: "", // Ciudad
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 900, mx: "auto", p: 10 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Profile
        </Typography>

        <TextField
          label="Email"
          name="address"
          value={profileData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Dirección de vivienda"
          name="address"
          value={profileData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Teléfono"
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Código postal"
          name="postalCode"
          value={profileData.postalCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Ciudad"
          name="city"
          value={profileData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="info"
          fullWidth
          sx={{ height: 50, backgroundColor: "#36802d", mt: 4 }}
        >
          Save Changes
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
