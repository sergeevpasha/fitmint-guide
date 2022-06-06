import React, { ChangeEvent, ReactElement, useEffect } from 'react';
import styles from './index.module.scss';

export default function NumberInput({ value, setActivity, min = 0, max = 200 }: any): ReactElement {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newField = Number(event.target.value);
        if (newField !== +newField) newField = 0;
        const number = Math.max(min, Math.min(max, newField));
        const result = number === 0 ? '' : number;
        setActivity(result);
    };

    useEffect(() => {
        let newField = Number(value);
        if (newField !== +newField) newField = 0;
        const number = Math.max(min, Math.min(max, newField));
        const result = number === 0 ? '' : number;
        setActivity(result);
    }, [value]);

    return (
        <div className={styles.numberInput}>
            <div className={styles.numberInner}>
                <input type="number" placeholder="0" value={value} onChange={handleChange} />
            </div>
        </div>
    );
}
