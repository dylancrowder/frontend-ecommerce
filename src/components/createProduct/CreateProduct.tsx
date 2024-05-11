import React, { useState, FormEvent } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

interface Product {
    title: string;
    size: string;
    color?: string;
    description: string;
    image_url?: string;
    stock?: number;
    price?: number;
}

const CreateProduct: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        title: "",
        size: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // URL de tu servidor
        const apiUrl = 'http://localhost:8080/productCreate';

        try {

            const response = await fetch(apiUrl, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            // Verifica si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }

            // Obtén los datos de la respuesta (si es necesario)
            const responseData = await response.json();
            console.log('Producto creado exitosamente:', responseData);

            // Aquí puedes hacer algo después de crear el producto, como limpiar el formulario
            setProduct({
                title: "",
                size: '',
                description: '',
                color: '',
                image_url: '',
                stock: 0,
                price: 0,
            });

        } catch (error) {
            console.error('Hubo un problema con la creación del producto:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" mb={2}>
                Crear Producto
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Title"
                        id="title"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Talla"
                        id="size"
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                        required
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Color"
                        id="color"
                        name="color"
                        value={product.color || ''}
                        onChange={handleChange}
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Descripción"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        multiline
                        rows={4}
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="URL de la imagen"
                        id="image_url"
                        name="image_url"
                        value={product.image_url || ''}
                        onChange={handleChange}
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Stock"
                        id="stock"
                        name="stock"
                        type="number"
                        value={product.stock?.toString() || ''}
                        onChange={handleChange}
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Precio"
                        id="price"
                        name="price"
                        type="number"
                        value={product.price?.toString() || ''}
                        onChange={handleChange}
                    />
                </Box>

                <Button variant="contained" color="primary" type="submit">
                    Crear Producto
                </Button>
            </form>
        </Box>
    );
};

export default CreateProduct;
