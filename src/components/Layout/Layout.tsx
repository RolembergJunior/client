'use client'

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

interface ChildrenType{
    children:React.ReactNode 
}

export default function Layout({ children }:ChildrenType){

    const cache = new InMemoryCache({
        typePolicies:{
            Query: {
                fields:{
                    clients: {
                        merge( existing, incoming ) {
                            return incoming
                        }
                    }
                }
            }
        }
    })

    const client = new ApolloClient({
        uri: 'http://localhost:5000/graphql',
        cache: cache
      });


    return(
        <ApolloProvider client={client}>
            <div>
                { children }
            </div>
        </ApolloProvider>
    )
}