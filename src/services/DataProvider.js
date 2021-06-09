import { useState, useEffect, cloneElement } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Box, CircularProgress } from "@material-ui/core";

export function DataProvider({ query, variables = null, children }) {
    const queryResult = useQuery(query, variables);

    if (queryResult.loading) {
        return (
            <Box position="absolute" style={{ bottom: 20, left: 20 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (Array.isArray(children)) {
        return <>{children.map((child) => cloneElement(child, queryResult))}</>;
    }
    return <>{cloneElement(children, queryResult)}</>;
}
