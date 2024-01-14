const express = require("express");
// compatibility layer
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");

// for any request /graphql -> we want the graphql library to handle it
const app = express();
const port = 5000;

// registering middleware
app.use(
    "/graphql",
    expressGraphQL({
        schema,
        graphiql: true,
    })
);

app.listen(port, () => {
    console.log(`app listening on ${port}`);
});
