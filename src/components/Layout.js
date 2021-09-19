import * as React from "react"
import Navigation from "./Navigation";
import styled from "styled-components";
import "../assets/reset.css";

// styles
const PageStyles = styled.div`
    color: #232129;
    font-family: -apple-system, Roboto, sans-serif, serif;
`
const BodyStyles = styled.div`
    margin: 2em;
`

const Layout = ({ children }) => {
    return (
        <PageStyles>
            <Navigation />
            <BodyStyles>
                {children}
            </BodyStyles>
        </PageStyles>
    )
}

export default Layout