import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Paginate = () => {
  const classes = useStyles();

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      color="primary"
      variant="outlined"
      count={5}
      page={1}
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to="/" />
      )}
    />
  );
};

export default Paginate;
