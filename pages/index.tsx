import React, { useState } from 'react';
import { withTranslation } from 'next-i18next';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from '../axios.config';
import CalculatorHeader from '../components/calculatorHeader';
import CounterInput from '../components/counter';
import NumberInput from '../components/numberInput';

export async function getServerSideProps() {
    const { data } = await axios.get('calculator');
    return {
        props: {
            calculator: data.data,
            ...(await serverSideTranslations('en'))
        }
    };
}

function Home(props: any) {
    const { calculator } = props;
    const defaultActivity = {
        daily_profit: 0,
        daily_earnings: 0,
        daily_expending: 0,
        daily_health: 0,
        sneaker_level: 2,
        energy_available: 15,
        basic_power: '',
        basic_durability: '',
        basic_stamina: '',
        basic_comfort: '',
        power: '',
        durability: '',
        stamina: '',
        comfort: ''
    };

    const [activity, setActivity] = useState(defaultActivity);

    const setObjectActivity = (value: any) => {
        const newActivity = { ...activity, ...value };
        const repairCost: number =
            calculator.repair_list.find((item: any) => item.sneaker_level === +activity.sneaker_level)?.repair_cost ||
            0;

        const durability: number = +activity.basic_durability + +activity.durability || 0;
        const power: number = +activity.basic_power + +activity.power || 0;
        const earnings: number = +calculator.avg_profit_per_power * power * +activity.energy_available;
        const dailyHealth: number = +activity.energy_available / (1 + durability / 10);
        const expending: number = repairCost * dailyHealth;
        const profit: number = earnings > expending ? earnings - expending : 0;
        setActivity({
            ...newActivity,
            ...{
                daily_profit: profit.toFixed(2),
                daily_earnings: earnings.toFixed(2),
                daily_expending: expending.toFixed(2),
                daily_health: dailyHealth.toFixed(2)
            }
        });
    };
    const optimizePoints = () => {
        const pointsToSpend: number = +activity.sneaker_level * 4;
        let possiblePower: number = +activity.basic_power || 0;
        let possibleDurability: number = +activity.basic_durability || 0;
        const repairCost: number =
            calculator.repair_list.find((item: any) => item.sneaker_level === +activity.sneaker_level)?.repair_cost ||
            0;

        for (let i = 0; i < pointsToSpend; i += 1) {
            const cf = 1 + possibleDurability / 10;
            const possibleCf = 1 + (possibleDurability + 1) / 10;

            const drb =
                (possiblePower + 1) * +calculator.avg_profit_per_power * +activity.energy_available -
                repairCost * (+activity.energy_available / cf);
            const pwr =
                possiblePower * +calculator.avg_profit_per_power * +activity.energy_available -
                repairCost * (+activity.energy_available / possibleCf);
            if (drb > pwr) {
                possiblePower += 1;
            } else {
                possibleDurability += 1;
            }
        }

        const earnings = calculator.avg_profit_per_power * possiblePower * +activity.energy_available;
        const dailyHealth = +activity.energy_available / (possibleDurability + possibleDurability / 10);
        const expending = repairCost * dailyHealth;
        const profit: number = earnings > expending ? earnings - expending : 0;

        setObjectActivity({
            daily_profit: profit.toFixed(2),
            daily_earnings: earnings.toFixed(2),
            daily_expending: expending.toFixed(2),
            daily_health: dailyHealth.toFixed(2),
            power: possiblePower,
            durability: possibleDurability,
            stamina: 0,
            comfort: 0
        });
    };

    const resetPoints = () => {
        setObjectActivity({
            sneaker_level: 2,
            energy_available: 15,
            basic_power: 0,
            basic_durability: 0,
            basic_stamina: 0,
            basic_comfort: 0,
            power: 0,
            durability: 0,
            stamina: 0,
            comfort: 0
        });
    };

    return (
        <div className="container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="rotate" src="/images/sphere.png" alt="" />
            <CalculatorHeader />
            <div className="row-main">
                <div className="col-main">
                    <h3>Sneaker</h3>
                    <div className="attribute-row">
                        <div className="attribute-col">
                            <span>Level</span>
                        </div>
                        <div className="attribute-col">
                            <CounterInput
                                value={activity.sneaker_level}
                                setActivity={(value: number) => setObjectActivity({ sneaker_level: value })}
                            />
                        </div>
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col">
                            <span>Energy</span>
                        </div>
                        <div className="attribute-col">
                            <CounterInput
                                value={activity.energy_available}
                                setActivity={(value: number) => setObjectActivity({ energy_available: value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-main image-height">
                    <div className="image-container">
                        <div className="pt-2" style={{ position: 'relative', width: '100%', height: '80%' }}>
                            <Image src="/images/sneakers.png" layout="fill" objectFit="contain" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-main">
                <div className="col-main">
                    <h3>Attributes</h3>
                    <div className="attribute-row">
                        <div className="attribute-col-3" />
                        <div className="attribute-col-3">Base</div>
                        <div className="attribute-col-3">Total</div>
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col-3">
                            <span>Power</span>
                        </div>
                        <div className="attribute-col-3">
                            <NumberInput
                                value={activity.basic_power}
                                setActivity={(value: number) => setObjectActivity({ basic_power: value })}
                            />
                        </div>
                        <div className="attribute-col-3">
                            <CounterInput
                                value={activity.power}
                                setActivity={(value: number) => setObjectActivity({ power: value })}
                            />
                        </div>
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col-3">
                            <span>Durability</span>
                        </div>
                        <div className="attribute-col-3">
                            <NumberInput
                                value={activity.basic_durability}
                                setActivity={(value: number) => setObjectActivity({ basic_durability: value })}
                            />
                        </div>
                        <div className="attribute-col-3">
                            <CounterInput
                                value={activity.durability}
                                setActivity={(value: number) => setObjectActivity({ durability: value })}
                            />
                        </div>
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col-3">
                            <span>Stamina</span>
                        </div>
                        <div className="attribute-col-3">
                            <NumberInput
                                value={activity.basic_stamina}
                                setActivity={(value: number) => setObjectActivity({ basic_stamina: value })}
                            />
                        </div>
                        <div className="attribute-col-3">
                            <CounterInput
                                value={activity.stamina}
                                setActivity={(value: number) => setObjectActivity({ stamina: value })}
                            />
                        </div>
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col-3">
                            <span>Comfort</span>
                        </div>
                        <div className="attribute-col-3">
                            <NumberInput
                                value={activity.basic_comfort}
                                setActivity={(value: number) => setObjectActivity({ basic_comfort: value })}
                            />
                        </div>
                        <div className="attribute-col-3">
                            <CounterInput
                                value={activity.comfort}
                                setActivity={(value: number) => setObjectActivity({ comfort: value })}
                            />
                        </div>
                    </div>
                    <div className="attribute-row mt-2">
                        <div className="attribute-col-3">Points: 36</div>
                        <div className="attribute-col-3">
                            <Button className="primary reset-btn" onClick={resetPoints}>
                                Reset
                            </Button>
                        </div>
                        <div className="attribute-col-3">
                            <Button className="primary optimize-btn" onClick={optimizePoints}>
                                Optimize
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-main">
                    <h3>Results</h3>
                    <div className="attribute-row">
                        <div className="attribute-col" />
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col">
                            <span>Daily profit</span>
                        </div>
                        <div className="attribute-col justify-end">
                            <span className="mr-1">{activity.daily_profit}</span>
                            <span>
                                <Image src="/images/token.png" width="14" height="14" />
                                <span className="ml-1">FITT</span>
                            </span>
                        </div>
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col">
                            <span>Daily earnings</span>
                        </div>
                        <div className="attribute-col justify-end">
                            <span className="mr-1">{activity.daily_earnings}</span>
                            <span>
                                <Image src="/images/token.png" width="14" height="14" />
                                <span className="ml-1">FITT</span>
                            </span>
                        </div>
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col">
                            <span>Health per day</span>
                        </div>
                        <div className="attribute-col justify-end">{activity.daily_health}</div>
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col">
                            <span>Repair cost</span>
                        </div>
                        <div className="attribute-col justify-end">
                            <span className="mr-1">{activity.daily_expending}</span>
                            <span>
                                <Image src="/images/token.png" width="14" height="14" />
                                <span className="ml-1">FITT</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation(['common'])(Home);
