import { faAngleDown, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactHTMLElement, ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Input from '../Input';
import useOutsideClick from './useOutsideClick';

const DropdownCont = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const DropdownAnchor = styled.div`
  border: 1px solid #858585;
  border-radius: 2px;
  height: 25px;
  background-color: #3b3b3b;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  position: relative;
`;

const DropdownIcon = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background-color: #3b3b3b;
  width: 100%;
  margin-top: 5px;
  border-radius: 2px;
  z-index: 100;
  overflow: hidden;
  box-shadow: 0 0 8px #00000059;
`;

const DropdownOption: any = styled.div`
  padding: 5px 10px;
  border-bottom: 1px solid #858585;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  ${(props: any) => props.selected? `background-color: #51455f !important;`:`background-color: transparent;`}
  &:hover {
    background-color: #858585;
  }
  &:last-child {
    border-bottom: unset;
  }
`;

const Dropdown = ({options, value, onSelect}: {options: Array<string>, onSelect?: (value: string, index: number)=>void}&React.SelectHTMLAttributes<HTMLSelectElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);
  useOutsideClick(contRef, isOpen? (() => {
    setIsOpen(false);
  }): undefined );
  return (
    <DropdownCont ref={contRef}>
      <DropdownAnchor onClick={()=>setIsOpen(prev=>!prev)}>
        <Input.Basic value={value} readOnly />
        <DropdownIcon>
          <FontAwesomeIcon icon={faAngleDown} />
        </DropdownIcon>
      </DropdownAnchor>
      {isOpen && <DropdownMenu>
        {options.map( (option, i)=><DropdownOption key={`option-${option}`} selected={value==option} onClick={ ()=>{onSelect?.( option, i);setIsOpen(false);} } >{option}</DropdownOption> )}
      </DropdownMenu>}
    </DropdownCont>
  )
}

const MultiDropdownOption: any = styled.div`
  height: 30px;
  padding: 5px 10px;
  border-bottom: 1px solid #858585;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  ${(props: any) => props.selected? `background-color: #51455f !important;`:`background-color: transparent;`}
  &:hover {
    background-color: #858585;
  }
  &:last-child {
    border-bottom: unset;
  }
`;

const TextBox = styled.div`
  border: 1px solid #858585;
    background-color: #3e2e46;
    display: flex;
    align-items: center;
    padding: 0 5px;
    margin-right: 5px;
    border-radius: 2px;
    font-size: 14px;
    height: 20px;
`;

const MultiDropdownAnchor = styled.div`
  border: 1px solid #858585;
  border-radius: 2px;
  height: 32px;
  background-color: #3b3b3b;
  cursor: pointer;
  line-height: 20px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  position: relative;
`;

const CheckboxIcon = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
`;

const ScrollableDropdownAnchor = styled.div`
  height: 100%;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  overflow: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  > select.basic-select {
    color: #757575;
    font-size: 14px;
    padding-left: 5px !important;
  }
`

type MultiDropdownPropType = {
  options: Array<string>, 
  value: Array<string>, 
  placeholder?: string,
  onSelect?: (value: Array<string>,option: string, index: number)=>void,
  renderAnchor?: (value: string, index: number, array: string[]) => React.JSX.Element
} & React.SelectHTMLAttributes<HTMLSelectElement>;

Dropdown.Multiple = ({options, value=[], onSelect=()=>{}, required, placeholder, renderAnchor=(option: string)=><TextBox key={option}>{option}</TextBox>}: MultiDropdownPropType) => {
  const [isOpen, setIsOpen] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);
  useOutsideClick(contRef, () => {
    setIsOpen(false);
  })
  return (
    <DropdownCont ref={contRef} role='menubar'>
      <MultiDropdownAnchor onClick={()=>setIsOpen(prev=>!prev)}>
        <ScrollableDropdownAnchor>
          {value.length==0 && <Input.BasicSelect required={required}><option value="">{placeholder}</option></Input.BasicSelect>}
          {value.map( renderAnchor )}
        </ScrollableDropdownAnchor>
        <DropdownIcon>
          <FontAwesomeIcon icon={faAngleDown} />
        </DropdownIcon>
      </MultiDropdownAnchor>
      {isOpen && <DropdownMenu>
        {options.map( (option, i)=><MultiDropdownOption key={`option-${option}`} selected={value.includes(option)} onClick={ ()=>{value.includes(option)? onSelect( value.filter((_)=>_!=option), option, i): onSelect( [...value, option], option, i);} } >
          <CheckboxIcon>{value.includes(option) ? <FontAwesomeIcon icon={faCheckSquare} />: <FontAwesomeIcon icon={faSquare} />}</CheckboxIcon>
          {option}
        </MultiDropdownOption> )}
      </DropdownMenu>}
    </DropdownCont>
  )
}

export default Dropdown;