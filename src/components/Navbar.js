import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, CssBaseline, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  whiteLink: {
    textDecoration: "none",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.8)",
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

const Navbar = (props) => {
  const { scrollElement, scrollTo } = props;
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
    if (location.pathname === path || (path === "/" && location.pathname === "/CoastSnap")) {
      return true;
    } else {
      return false;
    }
  };
  // Changes the element that the user scrolls to.
  const changeScrollElement = (ele) => {
    const currentScrollEle = scrollElement.toLowerCase();
    if (ele === currentScrollEle) {
      switch (scrollElement) {
        case "about":
          scrollTo("ABOUT");
          break;
        case "ABOUT":
          scrollTo("about");
          break;
        case "locations":
          scrollTo("LOCATIONS");
          break;
        case "LOCATIONS":
          scrollTo("locations");
          break;
        default:
          break;
      }
    } else {
      scrollTo(ele);
    }
  };

  return (
    <AppBar position={atPath("/") ? "absolute" : "static"} color={atPath("/") ? "transparent": "primary"} elevation={0}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo} onClick={() => changeScrollElement("")}>
          <Link to="/" className={classes.whiteLink}>CoastSnap</Link>
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Link to="/upload" className={classes.link + " " + (atPath("/upload") ? classes.active : "")}>Upload</Link>
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
