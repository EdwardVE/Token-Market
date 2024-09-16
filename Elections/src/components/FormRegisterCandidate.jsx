import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const FormRegisterCandidate = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
//   const [a]

  // Validaciones
  const validateForm = () => {
    let errors = {};

    // Validar Nombres
    if (!formValues.firstName) {
      errors.firstName = 'El nombre es obligatorio';
    } else if (formValues.firstName.length < 2) {
      errors.firstName = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar Apellidos
    if (!formValues.lastName) {
      errors.lastName = 'El apellido es obligatorio';
    } else if (formValues.lastName.length < 2) {
      errors.lastName = 'El apellido debe tener al menos 2 caracteres';
    }

    // Validar Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!emailPattern.test(formValues.email)) {
      errors.email = 'Correo electrónico no válido';
    }

    // Validar Teléfono
    if (!formValues.phone) {
      errors.phone = 'El teléfono es obligatorio';
    } else if (!/^\d{10}$/.test(formValues.phone)) {
      errors.phone = 'El teléfono debe tener 10 dígitos';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Si no hay errores, es válido
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Si el formulario es válido
    if (validateForm()) {
      alert('Formulario enviado con éxito!');
      // Aquí puedes hacer la lógica de enviar los datos a una API
      setIsSubmitted(true);
      setFormValues({ firstName: '', lastName: '', email: '', phone: '' });
      setFormErrors({});
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombres"
            name="firstName"
            variant="outlined"
            fullWidth
            value={formValues.firstName}
            onChange={handleChange}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Apellidos"
            name="lastName"
            variant="outlined"
            fullWidth
            value={formValues.lastName}
            onChange={handleChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Correo Electrónico"
            name="email"
            variant="outlined"
            fullWidth
            value={formValues.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Teléfono"
            name="phone"
            variant="outlined"
            fullWidth
            value={formValues.phone}
            onChange={handleChange}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrar Candidato
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormRegisterCandidate;
