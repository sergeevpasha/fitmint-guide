import React, { ReactElement } from 'react';
import Image from 'next/image';
import AddressButton from '../addressButton';

export default function Header(): ReactElement {
    return (
        <header>
            <div className="container d-flex justify-content-between">
                <div className="header-logo">
                    <Image src="/images/logo.png" width="32" height="32" />
                    <h1>
                        Fitmint<span>.guide</span>
                    </h1>
                </div>
                <div className="d-flex">
                    <AddressButton />
                </div>
            </div>
        </header>
    );
}
