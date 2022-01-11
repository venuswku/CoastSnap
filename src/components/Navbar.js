import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo} onClick={() => navigate('/')}>
          CoastSnap
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            {/* <Link to="/about" className={classes.link}>
              About
            </Link> */}
          </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
