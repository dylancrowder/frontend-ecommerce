import React, { useState, FormEvent } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando datos a una API.
    console.log('Datos del formulario enviados:', formData);
    // Restablecer los campos después del envío
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: 'auto', // Centra el contenedor horizontalmente
        p: 5,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: '#f0f7da',
        display: 'flex', // Añadimos flexbox
        flexDirection: 'column', // Coloca los elementos en columna
        justifyContent: 'center', // Centra verticalmente los elementos internos
        alignItems: 'center', // Centra horizontalmente los elementos internos
        marginBlock: "6%",

      }}
    >
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Contacto
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mensaje"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ backgroundColor: "#36802d", mt: 2, height: 50, }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ContactForm;
