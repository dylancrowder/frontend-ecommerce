import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../App.css";
// Define la estructura para los datos del producto
interface ProductData {
  name: string;
  title: string;
  price: number;
  description: string;
  specifications: Record<string, string>;
  image_url: string;
  sizeProducts: string[];
  id: string; // Asegúrate de agregar esta propiedad a `ProductData`
}

const availableSizes = ["S", "M", "L", "XL"];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Estado para la cantidad seleccionada

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/productsID/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error fetching data from server");
        }
        const data: ProductData = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const addToCart = async () => {
    if (!productData || !selectedSize || quantity <= 0) {
      console.error("Producto o talla no seleccionados, o cantidad inválida");
      return;
    }

    const data = {
      product_id: productData.id,
      quantity: quantity, // Utiliza la cantidad seleccionada por el usuario
      size: selectedSize,
      price: productData.price,
    };

    console.log(data);

    try {
      const response = await fetch("http://localhost:8080/addNewOrder", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Producto agregado al carrito con éxito");
      } else {
        console.error("Error al agregar el producto al carrito");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <Card
      sx={{
        height: "70vh",
        margin: 5,
        borderRadius: "8px",
        backgroundColor: "#f7f7f7",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={3000}
              showIndicators
              showArrows
              showStatus={false}
            >
              {[
                <div key={0}>
                  <img
                    src={productData?.image_url}
                    alt="Producto"
                    style={{
                      height: "62vh",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>,
              ]}
            </Carousel>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ marginBottom: 2 }}>
              {productData?.title || "Título no disponible"}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {productData?.description || "Descripción no disponible"}
            </Typography>

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Available sizes:
            </Typography>
            <Grid container spacing={1}>
              {availableSizes.map((size) => (
                <Grid item key={size}>
                  <Button
                  className="btnSize"
                    variant={selectedSize === size ? "contained" : "outlined" }
                    onClick={() => handleSizeSelection(size)}
                    sx={{ textTransform: "none" }}
                  >
                    {size}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Grid>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Quantity:
              </Typography>
              <TextField
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                sx={{ width: 60, marginRight: 12 }}
                inputProps={{ min: 1 }}
                className="inputG"
              />
              <Grid
                container
                direction="column"
                justifyContent="flex-end" // Alinea los elementos verticalmente al final
              >
                <Button
                  variant="contained"
                  onClick={addToCart}
                  sx={{
                    marginTop: 17,
                    textTransform: "none",
                    backgroundColor: "#36802d",
                    width: "38%", // Ocupa todo el ancho del contenedor
                    padding: "12px 24px", // Ajusta el relleno según lo que prefieras
                  }}
                  className="buttomBuy"
                >
                  ADD TO CART
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
