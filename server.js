const app = require("./app");
const constants = require("./utils/constants")

const port = constants.PORT;

app.listen(port, () => {
  console.log(`location-finder listening on port ${port}`)
})