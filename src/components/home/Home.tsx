import { useState, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import { PaginationContext } from "../hooks/provaider";
interface CardInterface {
  id: number;
  title: string;
  size: string;
  description: string;
  image_url: string;
  price: number;
  stock: number;
}

export default function App() {
  const navigate = useNavigate();

  const paginationContext: any = useContext(PaginationContext);

  if (!paginationContext) {
    throw new Error(
      "PaginatedComponent debe estar envuelto en PaginationProvider"
    );
  }

  const { currentPage, cards, setCurrentPage, setSort, sort } =
    paginationContext;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleChange = (event: SelectChangeEvent) => {

    setSort(event.target.value);
  };

  const handleMoreInfoClick = (id: number) => {
    navigate(`/moreDetails/${id}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <Box display="flex" justifyContent="start" marginBlock={3}>
        <FormControl
          sx={{ minWidth: 120, color: "white", borderBlockColor: "white" }}
          size="small"
        >
          <InputLabel id="demo-select-small-label">Sort</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Sort"
            value={sort}
            onChange={handleChange}
          >
            <MenuItem value="DESC">mayor precio</MenuItem>
            <MenuItem value="ASC">menor precio</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {cards.map((product: CardInterface, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ width: "100%", height: "100%" }}>
              <CardMedia
                component="img"
                height="240"
                image={product.image_url}
                alt={product.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ height: "100px", backgroundColor: "BDBDBD" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2">${product.price}</Typography>
              </CardContent>
              <CardActionArea>
                <CardActions sx={{ backgroundColor: "BDBDBD" }}>
                  <Button
                    className="buttomBuy"
                    size="medium"
                    color="info"
                    sx={{ backgroundColor: "#36802d" }}
                    onClick={() => handleMoreInfoClick(product.id)}
                  >
                    More info
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={5}>
        <Pagination
          count={5}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </div>
  );
}
