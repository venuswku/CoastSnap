import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, CssBaseline, Typography, Box, IconButton, Menu, MenuItem, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  whiteLink: {
    textDecoration: "none",
    color: "white",
    fontFamily: "Fredoka, sans-serif",
    fontSize: "xx-large",
  },
  link: {
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "Fredoka, sans-serif",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "white",
      borderBottom: "1px solid white",
    },
  },
  active: {
    color: "white",
    textDecoration: "none",
    borderBottom: "1px solid white",
  },
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[500]),
  backgroundColor: yellow[500],
  fontSize: "large",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: yellow[700],
  },
}));

const Navbar = (props) => {
  const { scrollTo } = props;
  const classes = useStyles();
  const location = useLocation();
  const menuPages = ["Upload", "About", "Locations"];
  // Initialize anchor and handlers for opening and closing mobile navigation menu.
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenMobileNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseMobileNavMenu = () => {
    setAnchorElNav(null);
  };

  // Checks if the current URL path matches the given path.
  const atPath = (path) => {
    if (location.pathname === path || (path === "/" && location.pathname === "/CoastSnap") || (path === "/" && location.pathname === "/CoastSnap/")) {
      return true;
    } else {
      return false;
    }
  };
  // Changes the element that the user scrolls to.
  const changeScrollElement = (ele) => {
    scrollTo(ele);
  };

  return (
    <AppBar position={atPath("/") ? "absolute" : "static"} color={atPath("/") ? "transparent": "primary"} elevation={0}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo} onClick={() => changeScrollElement("")}>
          <Link to="/" className={classes.whiteLink}>CoastSnap</Link>
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Link to="/upload" className="button">
            <UploadButton variant="contained">Upload Your Photo</UploadButton>
          </Link>
          <Link to="/" className={classes.link} onClick={() => changeScrollElement("about")}>About</Link>
          <Link to="/" className={classes.link} onClick={() => changeScrollElement("locations")}>Locations</Link>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="mobile-navlinks"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMobileNavMenu}
            style={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseMobileNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {menuPages.map((page) => (
              <Link
                to={"/" + (page === "Upload" ? "upload" : "")}
                onClick={() => changeScrollElement(page.toLowerCase())}
                key={page} style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={handleCloseMobileNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
