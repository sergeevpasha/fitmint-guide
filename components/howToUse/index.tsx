import { ReactElement } from 'react';
import styles from './index.module.scss';
import FitmintGuideTokenSvg from '../svg/fitmintGuideTokenSvg';
import CalculatorSvg from '../svg/calculatorSvg';
import ArrowRightSvg from '../svg/arrowRightSvg';
import MintSvg from '../svg/mintSvg';
import PiggySvg from '../svg/piggyBankSvg';

export default function HowToUse(): ReactElement {
    const svgDimensions = 50;
    return (
        <div className={styles.howToUse}>
            <div>
                <MintSvg width={svgDimensions} height={svgDimensions} />
                <span>
                    Earn <FitmintGuideTokenSvg style={{ margin: '0 6px' }} /> FGT by posting you run results
                </span>
            </div>
            <ArrowRightSvg width={svgDimensions} height={svgDimensions} />
            <div>
                <PiggySvg width={svgDimensions} height={svgDimensions} />
                <span>Spend FGT to get access to the calculator</span>
            </div>
            <ArrowRightSvg width={svgDimensions} height={svgDimensions} />
            <div>
                <CalculatorSvg width={svgDimensions} height={svgDimensions} />
                <span>Calculate results</span>
            </div>
        </div>
    );
}
