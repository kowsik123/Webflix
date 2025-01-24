"use client";

import { Menu, SearchBar, Profile } from '@/components';
import useOutsideClick from '@/components/hooks/useOutsideClick';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBellSlash, faEdit, faQuestionCircle, faRotate, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import netflix from '@/public/netflix.png';

const NavBarCont: any = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 60px;
    overflow: hidden;
    transition: background-color .5s;
    background: linear-gradient(#000000b0, transparent);
    ${({ $transparent }: any) => !$transparent && 'background-color: #000000db;'}
    display: flex;
    align-items: center;
    z-index: 800;
    a.nav-logo {
        margin: 0 40px;
        padding-top: 5px;
    }
    img.netflix-logo {
        height: 25px;
    }
    a.nav-link {
        margin: 0 10px;
    }
`;

const NavRightCont = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 30px;
    font-size: 14px;
    line-height: 20px;
`;

const NavLinkCont: any = styled(Link)`
    ${({ active }: any) => active ? css`
    opacity: 1;
    background: linear-gradient(126deg, #9ed6ff, #d09eff);
    background-clip: text;
    color: transparent;`: css`
    opacity: 0.8;`}
`;

const NavLink = ({ children, href }: React.PropsWithChildren & { href: string }) => {
    const pathname = usePathname();
    return <NavLinkCont href={href} className='nav-link' active={(pathname == href) ? "true" : ""}>{children}</NavLinkCont>;
}

const NavIcon = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    > img {
        border-radius: 4px;
    }
    > .bell-svg {
        width: 22px;
        height: 22px;
    }
`;

const ProfileList = styled.ul``;

const ProfileOptionList = styled.ul``;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ffffff30;
    margin: 5px 0;
`;

const NavIconOption = styled.li`
    width: 100%;
    height: fit-content;
    padding: 5px;
    &:hover {
        background: linear-gradient(126deg, rgb(21 116 255 / 50%), rgb(168 77 255 / 50%));
    }
    a {
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    .profile-name-icon {
        padding-left: 8px;
    }
`

const SignOutButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    &:hover {
        background: linear-gradient(126deg, rgb(21 116 255 / 50%), rgb(168 77 255 / 50%));
    }
`;

const NoNotification = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        margin-left: 8px;
    }
`;

const NavRightComponents = () => {
    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    useOutsideClick(notificationRef, notificationOpen && (() => {
        setNotificationOpen(false);
    }));
    useOutsideClick(profileRef, profileOpen && (() => {
        setProfileOpen(false);
    }));
    return <NavRightCont>
        <SearchBar onSearch={() => { }} placeholder='Title, People, Genre' />
        <NavIcon ref={notificationRef}>
            <NavIcon onClick={() => { setNotificationOpen(prev => !prev) }}><FontAwesomeIcon className='bell-svg' icon={faBell} width={16} height={16} /></NavIcon>
            <Menu open={notificationOpen} top={70} right={70}>
                <NoNotification>
                    <FontAwesomeIcon icon={faBellSlash} width={16} height={16} />
                    <span>No Notification</span>
                </NoNotification>
            </Menu>
        </NavIcon>
        <NavIcon ref={profileRef} onClick={() => { setProfileOpen(prev => !prev) }}>
            <NavIcon onClick={() => { setNotificationOpen(prev => !prev) }}>
                <Profile.Icon src='https://occ-0-6499-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVMHS8-zIB6xU0fuAJ-8aArIOvDzPfYtp1n3Z_YjkaVHK-aMX2n1lrHZWxm6Gz6hbcVPKJFN4mEWmCeyXgueDDrCL26PZ9rj3bcI.png?r=85b' name='Kowsik' />
            </NavIcon>
            <Menu open={profileOpen} top={70} right={30}>
                <ProfileList>
                    <NavIconOption>
                        <Profile.NameAndIcon href={'/'} src='https://occ-0-6499-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXh10ggeTTdhZO1JIH_SNQ4gp0vsNnWfE8Mg2ckwzGvUzJMRpPFCujRK3Ex5K9VbkIyvUHQ92LBVdsemkj6zlpquL-qWMCNKeg.png?r=229' name='Kid Profile' />
                    </NavIconOption>
                </ProfileList>
                <Divider />
                <ProfileOptionList>
                    <NavIconOption><Link href={"/"}>
                        <FontAwesomeIcon icon={faEdit} width={25} height={25}></FontAwesomeIcon>
                        <span>Manage Profile</span>
                    </Link></NavIconOption>
                    <NavIconOption><Link href={"/"}>
                        <FontAwesomeIcon icon={faRotate} width={25} height={25}></FontAwesomeIcon>
                        <span>Transfer Profile</span>
                    </Link></NavIconOption>
                    <NavIconOption><Link href={"/"}>
                        <FontAwesomeIcon icon={faUser} width={25} height={25}></FontAwesomeIcon>
                        <span>Account</span>
                    </Link></NavIconOption>
                    <NavIconOption><Link href={"/"}>
                        <FontAwesomeIcon icon={faQuestionCircle} width={25} height={25}></FontAwesomeIcon>
                        <span>Help Center</span>
                    </Link></NavIconOption>
                </ProfileOptionList>
                <Divider />
                <SignOutButton role='button'>
                    <Link href={'/signout'}>Sign out</Link>
                </SignOutButton>
            </Menu>
        </NavIcon>
    </NavRightCont>
}

const TopPixel = styled.div`
    width: 100%;
`

const NavBar = () => {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [transparent, setTransparent] = useState(true);
    useEffect(() => {
        if (ref.current) {
            const observer = new IntersectionObserver(([entry]) => {
                setTransparent(entry.isIntersecting)
            });
            observer.observe(ref.current);
            () => observer.disconnect();
        }
    }, [ref]);
    return pathname.startsWith('/watch') ? <></> : (
        <>
            <NavBarCont $transparent={transparent}>
                <Link href={'/'} className='nav-logo'><img height={25} className='netflix-logo' src={netflix.src} /></Link>
                <NavLink href={'/'}>Home</NavLink>
                <NavLink href={'/tvshows'}>Tv Shows</NavLink>
                <NavLink href={'/movies'}>Movies</NavLink>
                <NavLink href={'/latest'}>New & Popular</NavLink>
                <NavLink href={'/mylist'}>My List</NavLink>
                <NavRightComponents />
            </NavBarCont>
            <TopPixel ref={ref} />
        </>
    )
}

export default NavBar;