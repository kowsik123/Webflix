"use client"

import React from 'react'
import styled from 'styled-components';

const InputCont:any = styled.div`
  background-color: #3b3b3b;
  border: 1px solid #858585;
  border-radius: 2px;
  color: #ffffff;
  height: 26px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-bottom: 10px;
  > input {
    width: 100%;
  }
  &:focus-within {
    /* box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25); */
    outline: -webkit-focus-ring-color auto 3px;
  }
`;
const BasicInput = styled.input`
  all: unset;
  margin: 0 !important;
  padding: 0 !important;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
`;

const Input = ({ label, ...props }: {label?: string}&React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <label>
            {label}
            <InputCont className='input'>
                <BasicInput {...props} />
            </InputCont>
        </label>
    );
}

const BasicSelect = styled.select`
  all: unset;
  margin: 0 !important;
  padding: 0 !important;
`;

const HiddenInput = styled.input`
  all: unset;
  margin: 0 !important;
  padding: 0 !important;
  width: 1px !important;
  height: 100% !important;
  opacity: 0;
`;

Input.Basic = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return <BasicInput {...props} />;
};

Input.BasicSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => {
    return <BasicSelect className='basic-select' {...props} />;
};

Input.Hidden = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return <HiddenInput {...props} />;
};

export default Input;