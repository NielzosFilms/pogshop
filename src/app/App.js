import React from "react";
import { useMediaQuery, Typography, Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { Test } from "./../components/layout/Test";
import { Appbar } from "./../components/layout/";

import { AuthenticationProvider } from "../services/AuthenticationProvider";
import { DataProvider } from "../services/DataProvider";

import { gql } from "@apollo/client";

const QUERY_PRODUCTS = gql`
    query Products {
        products {
            name
            description
            price
            inStock
        }
    }
`;

export function App() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        main: "#F7B2B7",
                    },
                    secondary: {
                        main: "#F7717D",
                    },
                    type: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Appbar />

            <div className="App">
                <Typography variant="h1">APP</Typography>
            </div>
            <DataProvider query={QUERY_PRODUCTS}>
                <Test />
            </DataProvider>
        </ThemeProvider>
    );
}

function Test({ data }) {
    console.log(data);
    if (!data.products) return <>NULL</>;
    return (
        <>
            {data.products.map((product) => (
                <>
                    <Typography variant="h3">{product.name}</Typography>
                    <Typography variant="body2">{product.price}</Typography>
                    <Typography variant="body2">{product.inStock}</Typography>
                    <Typography variant="body">
                        {product.description}
                    </Typography>
                </>
            ))}
        </>
    );
}
