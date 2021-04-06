import { gql } from '@apollo/client';

export const USER = gql`
    query user($id: String) {
        user(id: $id) {
            id,
            username,
            email,
            description,
            packages(first: 1000, last: 0) {
                name
                author {
                    username
                }
                versions(first: 1000, last: 0) {
                    version
                    publishedAt
                }
                latest {
                    description
                    publishedAt
                    version
                },
            }
        }
    }
`;

export const LOGOUT = gql`
    mutation logout {
        logout {
            id
            username
            email
        }
    }
`;

export const REGISTER = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            id,
            email,
            username,
        }
    }
`;

export const LOGIN = gql`
    mutation login($login: String!, $password: String!) {
        login(login: $login, password: $password) {
            id,
            email,
            username,
        }
    }
`;
