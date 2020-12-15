import React, { Fragment } from 'react';
import Link from 'next/link';
import Header from '../style/BaseHeader';
import Title from '../style/AppName';
import Button from '../style/Button';
import Row from '../style/Row';
import styled from 'styled-components';
import WorldsMenu from './WorldsMenu';
import { baseColor } from '../style/constants';
import { useSession } from 'next-auth/client';

const A = Button.withComponent(styled('a')`
    color: white !important;
    //background-color: inherit;
    border: none !important;

    &:hover {
        background: ${baseColor} !important;
        transition: background 0.1s linear;
    }
    &.active {
        background-color: ${baseColor} !important;
    }
`);

function BaseHeader() {
    const [session, loading] = useSession();
    // todo add loading
    const isAuthenticated = !!session;
    const name = session?.user.name;
    return (
        <Header>
            <Title>
                <Link href="/">
                    <a>CNC-ECO</a>
                </Link>
            </Title>
            <Row wrap="true">
                {isAuthenticated && name && (
                    <>
                        <WorldsMenu />
                        <Link href="/bases">
                            <A>Basen</A>
                        </Link>
                        <Link href={'/layouts'}>
                            <A>Layouts</A>
                        </Link>
                        <Link href="/alliance">
                            <A>Alliance</A>
                        </Link>
                    </>
                )}
                <Link href="/scripts">
                    <A>Scripte</A>
                </Link>
                {/*<Link href="/demo">
                        Demo
                    </Link>*/}
                {isAuthenticated ? (
                    <>
                        <Link href="/feedback">Feedback</Link>
                        <Link href="/user">{name || 'Add a player name first'}</Link>
                    </>
                ) : (
                    <Fragment>
                        <Link href="/login">
                            <A>Login</A>
                        </Link>
                        <Link href="/register">
                            <A>Sign up</A>
                        </Link>
                    </Fragment>
                )}
            </Row>
        </Header>
    );
}

export default BaseHeader;