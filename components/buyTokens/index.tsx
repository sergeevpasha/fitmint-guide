import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { buyTokens } from '../../utils/contracts/fitmintGuideActivities';
import styles from './index.module.scss';

export default function BuyTokens(): ReactElement {
    const address = useSelector((state: any) => state.user.address);
    const [awaitingTransaction, setAwaitingTransaction] = useState(false);
    const [topUpBalance, setTopUpBalance] = useState(0);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTopUpBalance(Number(event.target.value));
    };

    const pending = (value: boolean, message?: string): void => {
        if (!value && awaitingTransaction && message) {
            toast(message);
        }
        setAwaitingTransaction(value);
    };
    const buyTokensHandler = async () => {
        await buyTokens(address, ((topUpBalance / 2) * 10 ** 18).toString(), pending);
    };

    return (
        <div className={styles.buyTokenInput}>
            <div className={styles.numberInner}>
                {awaitingTransaction ? (
                    <>
                        <input type="number" placeholder="0" value={topUpBalance} onChange={handleChange} disabled />
                        <Button className="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="mr-2"
                            />
                        </Button>
                    </>
                ) : (
                    <>
                        <input type="number" placeholder="0" value={topUpBalance} onChange={handleChange} />
                        <Button className="primary inner-button" onClick={buyTokensHandler}>
                            Buy FGT
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
