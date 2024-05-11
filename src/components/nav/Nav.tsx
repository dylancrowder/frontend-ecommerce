import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import { PaginationContext } from "../hooks/provaider";

const settings = ["PROFILE", "LOGIN", "LOGOUT"];
const ctg = ["HAT", "SHOES", "PANTS"];

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const [anchorElGenre, setAnchorElGenre] = useState<HTMLElement | null>(null);

  const paginationContext = useContext(PaginationContext);

  if (!paginationContext) {
    throw new Error("El componente debe estar envuelto en PaginationProvider.");
  }

  const { setCategory } = paginationContext;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenGenreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElGenre(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElGenre(null);
  };

  //setear la categoria
  const handleCategory = async (categ: any) => {
    setCategory(categ);
    setAnchorElGenre(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#234d20" }}>
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ margin: 3, textDecoration: "none", color: "red" }}
        >
          E-COMMERCE
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
            onClick={handleOpenGenreMenu}
            sx={{
              my: 2,
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            PRODUCTS
            <ArrowDropDownIcon sx={{ color: "white" }} />
          </Button>

          <Menu
            anchorEl={anchorElGenre}
            open={Boolean(anchorElGenre)}
            onClose={handleClose}
          >
            {ctg.map((categ) => (
              <MenuItem key={categ} onClick={() => handleCategory(categ)}>
                {categ}
              </MenuItem>
            ))}
          </Menu>

          <Button
            component={Link}
            to="/contact"
            sx={{ my: 2, color: "white", display: "block" }}
          >
            CONTACT
          </Button>
        </Box>

        <Box sx={{ p: 2, flexGrow: 0 }}>
          <IconButton component={Link} to="/cart" sx={{ p: 1 }}>
            <ShoppingCartIcon sx={{ color: "white" }} />
          </IconButton>

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
              <PersonIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    to={`/${setting.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {setting}
                  </Link>
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
