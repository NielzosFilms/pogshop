import React from "react";
import { useMediaQuery, Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { Test } from "./../components/layout/Test";
import { Appbar } from "./../components/layout/";

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
        </ThemeProvider>
    );
}
