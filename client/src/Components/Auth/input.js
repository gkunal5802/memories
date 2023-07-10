import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const input = ({
  half,
  name,
  handleChange,
  autoFocus,
  type,
  label,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={6} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        required
        label={label}
        autoFocus={autoFocus}
        variant="outlined"
        fullWidth
        type={type}
        InputProps={
          name === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      ></TextField>
    </Grid>
  );
};

export default input;
