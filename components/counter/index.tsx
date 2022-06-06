import { ChangeEvent, ReactElement, useEffect } from 'react';
import styles from './index.module.scss';
import useLongPress from '../../utils/useLongPress';

export default function CounterInput({ value, setActivity, min = 0, max = 500 }: any): ReactElement {
    useEffect(() => {
        let newField = Number(value);
        if (newField !== +newField) newField = 0;
        const number = Math.max(min, Math.min(max, newField));
        const result = number === 0 ? '' : number;
        setActivity(result);
    }, [value]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newField = Number(event.target.value);
        if (newField !== +newField) newField = 0;
        const number = Math.max(min, Math.min(max, newField));
        const result = number === 0 ? '' : number;
        setActivity(result);
    };

    const decreaseNumber = (): void => {
        let result;
        if (value !== undefined) result = value > min ? value - 1 : min;
        else result = 0;
        setActivity(result);
    };

    const increaseNumber = (): void => {
        let result;
        if (value !== undefined) result = value < max ? value + 1 : max;
        else result = 1;
        setActivity(result);
    };

    const longPressDown = useLongPress(decreaseNumber);
    const longPressUp = useLongPress(increaseNumber);

    return (
        <div className={styles.numberInput}>
            <div className={styles.numberInner}>
                <button type="button" {...longPressDown} onClick={decreaseNumber}>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 11C3.72386 11 3.5 11.2239 3.5 11.5C3.5 11.7761 3.72386 12 4 12V11ZM20 12C20.2761 12 20.5 11.7761 20.5 11.5C20.5 11.2239 20.2761 11 20 11V12ZM4 12H20V11H4V12Z" />
                    </svg>
                </button>
                <input type="number" placeholder="0" value={value} onChange={handleChange} />
                <button type="button" {...longPressUp} onClick={increaseNumber}>
                    <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7.5C0.723858 7.5 0.5 7.72386 0.5 8C0.5 8.27614 0.723858 8.5 1 8.5V7.5ZM17 8.5C17.2761 8.5 17.5 8.27614 17.5 8C17.5 7.72386 17.2761 7.5 17 7.5V8.5ZM9.5 1C9.5 0.723858 9.27614 0.5 9 0.5C8.72386 0.5 8.5 0.723858 8.5 1H9.5ZM8.5 15C8.5 15.2761 8.72386 15.5 9 15.5C9.27614 15.5 9.5 15.2761 9.5 15H8.5ZM1 8.5H9V7.5H1V8.5ZM9 8.5H17V7.5H9V8.5ZM9.5 8V1H8.5V8H9.5ZM8.5 1V15H9.5V1H8.5Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
