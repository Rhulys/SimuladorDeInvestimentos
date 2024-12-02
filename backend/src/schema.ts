import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        calculate(initial: Float!, rate: Float!, years: Int!): Float!
    }
`;

export const resolvers = {
    Query: {
        calculate: (
            _: any,
            {
                initial,
                rate,
                years,
            }: { initial: number; rate: number; years: number }
        ) => {
            return initial * Math.pow(1 + rate / 100, years);
        },
    },
};
