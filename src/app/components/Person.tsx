"use client";

import { Text } from '@/components';
import { usePersonData } from '@/components/hooks';
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components';

const PersonCont = styled.a`
    user-select: none;
    font-size: 14px;
    &:hover {
        text-decoration: underline;
    }
`

const Person = ({ id, start }: { id: string, start?: boolean }) => {
    const personData = usePersonData(id);
    return (
        <>
            {!start && ", "}
            <PersonCont href={personData && `https://en.wikipedia.org/wiki/${personData.name.replaceAll(' ', '_')}`}>
                <Text text={personData?.name} skeletonWidth={40} />
            </PersonCont>
        </>
    )
}

Person.None = ({ children, href, start }: { href: string, start?: boolean } & PropsWithChildren) => {
    return <>
        {!start && ", "}
        <PersonCont href={href}>
            {children}
        </PersonCont>
    </>
}

export default Person