import { useState, useEffect, cloneElement } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Box, CircularProgress } from "@material-ui/core";

const QUERY_USER = gql`
    query GetUser {
        getAuthenticatedUser {
            name
            admin
        }
    }
`;

const MUT_LOGIN = gql`
    mutation Login($name: String!, $password: String!) {
        login(name: $name, password: $password) {
            success
            token
        }
    }
`;

const MUT_LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

export function AuthenticationProvider({ children }) {
    const queryUserResult = useQuery(QUERY_USER);
    const [login, loginResult] = useMutation(MUT_LOGIN);
    const [logout, logoutResult] = useMutation(MUT_LOGOUT);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (queryUserResult?.data?.getAuthenticatedUser) {
            setUser(queryUserResult.data.getAuthenticatedUser);
        }
    }, [queryUserResult.data]);

    useEffect(() => {
        if (loginResult?.data?.login) {
            if (loginResult.data.login.success) {
                localStorage.setItem("token", loginResult.data.login.token);
                queryUserResult.refetch();
            }
        }
    }, [loginResult.loading]);

    useEffect(() => {
        if (logoutResult?.data?.logout) {
            localStorage.removeItem("token");
            setUser(null);
            queryUserResult.refetch();
        }
    }, [logoutResult.loading]);

    const handleLogin = (name, password) => {
        login({
            variables: {
                name,
                password,
            },
        });
    };

    if (queryUserResult.loading)
        return (
            <Box position="absolute" style={{ bottom: 20, left: 20 }}>
                <CircularProgress />
            </Box>
        );

    const returnData = {
        loggedIn: Boolean(user),
        authenticatedUser: user,
        login: handleLogin,
        logout: logout,
    };

    if (Array.isArray(children)) {
        return <>{children.map((child) => cloneElement(child, returnData))}</>;
    }
    return <>{cloneElement(children, returnData)}</>;
}
