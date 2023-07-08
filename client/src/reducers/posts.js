const posts = (posts = [], actions) => {
  switch (actions.type) {
    case "FETCH_ALL":
      return actions.payload;
    case "CREATE":
      return [...posts, actions.payload];
    default:
      return posts;
  }
};

export default posts;
