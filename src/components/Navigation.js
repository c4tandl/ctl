import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NavBar = styled.ul`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: grey;
    padding: 10px;
`
const LinkyDink = styled.li`
    margin-left: 5px;
    margin-right: 5px;
`

const Navigation = () => {
    return (
        <NavBar>
            <LinkyDink>
                <Link to="/blog/cool">Cool</Link>
            </LinkyDink>
            <LinkyDink>
                <Link to="/blog/wild">Wild</Link>
            </LinkyDink>
        </NavBar>
    )
}

export default Navigation;