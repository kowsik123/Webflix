"use client"

import React, { PropsWithChildren } from 'react'
import styled from 'styled-components';

const MenuCont: any = styled.div`
    position: fixed;
    z-index: 800;
    border-radius: 2px;
    overflow: hidden;
    padding: 2px;
    width: 200px;
    height: fit-content;
    ${ ({$top}:any)=>$top && `top: ${$top}px;` }
    ${ ({$left}:any)=>$left && `left: ${$left}px;` }
    ${ ({$right}:any)=>$right && `right: ${$right}px;` }
    ${ ({$bottom}:any)=>$bottom && `bottom: ${$bottom}px;` }
    background: linear-gradient(126deg, #1b94ee, #6415b0);
    box-shadow: 0 0 30px #4d5bd140;
`;

const BlackOverlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    padding: 5px 0;
    box-shadow: inset 0 0 10px 5px #4d5ad154;
`

type MenuPropType = {
    open: boolean,
    top?: number,
    right?: number,
    bottom?: number,
    left?: number,
} & PropsWithChildren;

const Menu = ({ open, children, top, left, right, bottom}: MenuPropType) => {
    return open && (
        <MenuCont $top={top} $left={left} $right={right} $bottom={bottom}>
            <BlackOverlay>
                {children}
            </BlackOverlay>
        </MenuCont>
    )
}

export default Menu