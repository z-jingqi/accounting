import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Transaction {
    id: ID!
    amount: Float!
    type: String!
    description: String
    date: String!
    tags: [Tag!]!
    createdAt: String!
    updatedAt: String!
  }

  type Tag {
    id: ID!
    name: String!
    transactions: [Transaction!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTransactionInput {
    amount: Float!
    type: String!
    description: String
    date: String!
    tagIds: [ID!]!
  }

  input UpdateTransactionInput {
    id: ID!
    amount: Float
    type: String
    description: String
    date: String
    tagIds: [ID!]
  }

  input CreateTagInput {
    name: String!
  }

  type Query {
    transactions: [Transaction!]!
    transaction(id: ID!): Transaction
    tags: [Tag!]!
    tag(id: ID!): Tag
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(input: UpdateTransactionInput!): Transaction!
    deleteTransaction(id: ID!): Boolean!
    createTag(input: CreateTagInput!): Tag!
    deleteTag(id: ID!): Boolean!
  }
`; 
