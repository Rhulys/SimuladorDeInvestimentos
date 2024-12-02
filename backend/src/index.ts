import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";

const startServer = async () => {
    const app = express();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app: app as any });

    app.listen(4000, () => {
        console.log("Servidor rodando em http://localhost:4000/graphql");
    });
};

startServer().catch((err) => console.error(err));
