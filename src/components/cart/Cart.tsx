import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardActions,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Product {
  product_id: number;
  id: number;
  name: string;
  title: string;
  price: number;
  total_quantity: number;
  image_url: string;
  order_size: string;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:8080/getCart", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data: Product[] = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  const increaseQuantity = (product_id: number, order_size: string) => {
    setCart((prevCart) =>
      prevCart.map((product) => {
        if (
          product.product_id === product_id &&
          product.order_size === order_size
        ) {
          return { ...product, total_quantity: product.total_quantity + 1 };
        }
        return product;
      })
    );
  };

  const decreaseQuantity = (product_id: number, order_size: string) => {
    setCart((prevCart) =>
      prevCart.map((product) => {
        if (
          product.product_id === product_id &&
          product.order_size === order_size
        ) {
          const newTotalQuantity = product.total_quantity - 1;
          return { ...product, total_quantity: Math.max(newTotalQuantity, 0) };
        }
        return product;
      })
    );
  };

  const removeProduct = (product_id: number, order_size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (product) =>
          product.product_id !== product_id || product.order_size !== order_size
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.total_quantity,
      0
    );
  };

  return (
    <Box
      sx={{
        padding: 15,
        width: "80%", // Reduje el ancho para que sea más pequeño
        margin: "0 auto", // Centra el contenedor en la página
        marginTop: 10,
        borderRadius: "8px",
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          marginBottom: 2,
          border: 1,
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        <Grid item xs={4}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Producto
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Size
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Price
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Quantity
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Total
          </Typography>
        </Grid>
      </Grid>

      {cart.map((product) => (
        <Card key={product.id} sx={{ marginBottom: 2, borderRadius: "8px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <CardMedia
                component="img"
                image={product.image_url}
                alt={product.title}
                sx={{ height: 100, width: 100, borderRadius: "8px" }}
              />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ marginTop: 1 }}
              >
                {product.title}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body1" fontWeight="bold">
                {product.order_size}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold">
                ${product.price.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <CardActions>
                <Button
                  sx={{ backgroundColor: "#36802d", fontSize: "0.8rem" }}
                  variant="contained"
                  size="small"
                  onClick={() =>
                    decreaseQuantity(product.product_id, product.order_size)
                  }
                >
                  -
                </Button>
                <Typography variant="body1" sx={{ mx: 1 }}>
                  {product.total_quantity}
                </Typography>
                <Button
                  sx={{ backgroundColor: "#36802d", fontSize: "0.8rem" }}
                  variant="contained"
                  size="small"
                  onClick={() =>
                    increaseQuantity(product.product_id, product.order_size)
                  }
                >
                  +
                </Button>
              </CardActions>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() =>
                  removeProduct(product.product_id, product.order_size)
                }
                sx={{ color: "#f44336" }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold">
                ${product.price * product.total_quantity}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      ))}

      <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ marginRight: 2 }}>
          Total: ${calculateTotal().toFixed(2)}
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#36802d" }}>
          COMPRAR
        </Button>
      </Grid>
    </Box>
  );
};

export default Cart;
