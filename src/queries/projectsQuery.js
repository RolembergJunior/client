import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
    query getProjects{
        projects{
            name,
            description,
            status,
            clientId
        }
    }
`;

export { GET_PROJECTS }