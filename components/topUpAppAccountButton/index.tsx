import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { BigNumber } from '@ethersproject/bignumber';
import { topUp } from '../../utils/contracts/fitmintGuideActivities';
import { checkAllowance, setAllowance } from '../../utils/contracts/fitmintGuideToken';
import styles from './index.module.scss';

interface TopUpAppAccountButtonProps {
    onSuccess(): void;
}

export default function TopUpAppAccountButton({ onSuccess }: TopUpAppAccountButtonProps): ReactElement {
    const address = useSelector((state: any) => state.user.address);
    const balance = useSelector((state: any) => state.user.balance);
    const [awaitingTransaction, setAwaitingTransaction] = useState(false);
    const [topUpBalance, setTopUpBalance] = useState(balance);

    const pending = (value: boolean, message?: string): void => {
        if (!value && awaitingTransaction && message) {
            toast(message);
            onSuccess();
        }
        setAwaitingTransaction(value);
    };
    const addToken = async () => {
        let allowed = await checkAllowance(address);
        if (BigNumber.from(balance).gte(BigNumber.from(allowed))) {
            await setAllowance(address);
            allowed = await checkAllowance(address);
        }

        if (BigNumber.from(balance).lt(BigNumber.from(allowed))) {
            if (topUpBalance > balance) {
                toast('Insufficient Funds');
            } else {
                await topUp((topUpBalance * 10 ** 18).toString(), pending);
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTopUpBalance(Number(event.target.value));
    };

    return awaitingTransaction ? (
        <div className={styles.topUpNumberInput}>
            <div className={styles.numberInner}>
                <input type="number" placeholder="0" value={topUpBalance} onChange={handleChange} disabled />
                <Button className="primary" disabled>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-2" />
                </Button>
            </div>
        </div>
    ) : (
        <div className={styles.topUpNumberInput}>
            <div className={styles.numberInner}>
                <input type="number" placeholder="0" value={topUpBalance} onChange={handleChange} />
                <Button className="primary inner-button" onClick={addToken}>
                    Top Up
                </Button>
            </div>
        </div>
    );
}
