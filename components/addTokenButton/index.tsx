import React, { ReactElement } from 'react';
import { Button } from 'react-bootstrap';
import { addToken } from '../../utils/contracts/fitmintGuideToken';

export default function AddTokenButton(): ReactElement {
    return (
        <Button className="primary" size="sm" onClick={addToken}>
            Add token address to wallet
        </Button>
    );
}
