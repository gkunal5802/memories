import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Typography, Toolbar } from "@material-ui/core";

import { Link, useHistory, useLocation } from "react-router-dom";

import memories from "../../images/memories.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // console.log(user?.result[0].data);
  console.log(user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    setUser(null);
  };
  useEffect(() => {
    // const token = user?.token;

    // JWT

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            Memories{" "}
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="60"
          />
        </div>

        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result[0].data.name}
                src={user.result[0].data.picture}
              >
                {user.result[0].data.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result[0].data.name}
              </Typography>
              <Button
                className={classes.logout}
                variant="contained"
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NavBar;
