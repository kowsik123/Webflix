"use client";

import React, { ReactHTMLElement } from 'react'
import styled, { css } from 'styled-components';

const TextEle: any = styled.span`
  ${({$skeletonWidth}:any)=>$skeletonWidth && css`
    display: inline-block;
    height: 16px;
    min-width: ${$skeletonWidth}px;`}
`

const Text = ({text, skeletonWidth, ...props}: {text: string|undefined, skeletonWidth?: number}) => {
  return (
    <TextEle {...props} $skeletonWidth={!text && skeletonWidth} className={!text && 'skeleton'}>{text||<>&nbsp;</>}</TextEle>
  )
}

export default Text;