import React, { ReactElement, useState } from 'react';
import { withTranslation } from 'next-i18next';
import Image from 'next/image';
import { Button, FormSelect } from 'react-bootstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ScriptProps } from 'next/script';
import axios from '../axios.config';
import CounterInput from '../components/counter';
import NumberInput from '../components/numberInput';
import HowToUse from '../components/howToUse';
import FitmintGuideTokenSvg from '../components/svg/fitmintGuideTokenSvg';
import AddTopUpModal from '../components/topUpModal';
import { UserModel } from '../app/models/User';
import AddDataModal from '../components/addDataModal';
import { ActivityType } from '../app/models/Activity';
import AddTokenButton from '../components/addTokenButton';

export async function getServerSideProps() {
    const { data } = await axios.get('calculator');
    return {
        props: {
            calculator: data.data,
            ...(await serverSideTranslations('en'))
        }
    };
}

interface HomeProps extends ScriptProps {
    calculator: any;
}

function Home({ calculator }: HomeProps): ReactElement {
    const dispatch = useDispatch();
    const defaultActivity = {
        daily_profit: 0,
        daily_earnings: 0,
        daily_expending: 0,
        daily_health: 0,
        type: ActivityType.WALK,
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

    const address = useSelector((state: any) => state.user.address);
    const attempts = useSelector((state: any) => state.user.attempts);
    const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
    const [modalShow, setModalShow] = useState(false);
    const [activity, setActivity] = useState(defaultActivity);
    const [unlocked, setUnlocked] = useState(false);
    const [addActivityModalShow, setAddActivityModalShow] = useState(false);
    const [availablePointsToSpend, setAvailablePointsToSpend] = useState(+activity.sneaker_level * 4);

    const unlockCalculator = async () => {
        if (attempts > 0) {
            await axios.patch(`users/${address}`).then(({ data: { data } }: { data: { data: UserModel } }) => {
                dispatch({ type: 'user/setAttempts', payload: data ? data.attempts : 0 });
            });
            setUnlocked(true);
            setTimeout(() => {
                setUnlocked(false);
            }, 600000);
        } else {
            toast('Insufficient app balance');
        }
    };
    const setObjectActivity = (value: any) => {
        const assignedPoints: number =
            +activity.durability -
            +activity.basic_durability +
            +activity.stamina -
            +activity.basic_stamina +
            +activity.comfort -
            +activity.basic_comfort +
            +activity.power -
            +activity.basic_power;
        const pointsToSpend: number = +activity.sneaker_level * 4 - assignedPoints;
        setAvailablePointsToSpend(pointsToSpend);
        const avgProfit =
            +calculator.avg_profit_per_power_type_modifier[value.type?.toLowerCase() || activity.type.toLowerCase()];
        const newActivity = { ...activity, ...value };
        const repairCost: number =
            calculator.repair_list.find((item: any) => item.sneaker_level === +activity.sneaker_level)?.repair_cost ||
            0;
        const durability: number = +activity.durability || 0;
        const power: number = +activity.power || 0;
        const earnings: number = avgProfit * power * +activity.energy_available;
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
    const optimizePoints = async () => {
        if (unlocked) {
            const avgProfit = +calculator.avg_profit_per_power_type_modifier[activity.type.toLowerCase()];
            const pointsToSpend: number = +activity.sneaker_level * 4;
            let possiblePower: number = +activity.basic_power || 0;
            let possibleDurability: number = +activity.basic_durability || 0;
            const repairCost: number =
                calculator.repair_list.find((item: any) => item.sneaker_level === +activity.sneaker_level)
                    ?.repair_cost || 0;

            for (let i = 0; i < pointsToSpend; i += 1) {
                const cf = 1 + possibleDurability / 10;
                const possibleCf = 1 + (possibleDurability + 1) / 10;

                const drb =
                    (possiblePower + 1) * avgProfit * +activity.energy_available -
                    repairCost * (+activity.energy_available / cf);
                const pwr =
                    possiblePower * avgProfit * +activity.energy_available -
                    repairCost * (+activity.energy_available / possibleCf);
                if (drb > pwr) {
                    possiblePower += 1;
                } else {
                    possibleDurability += 1;
                }
            }

            setObjectActivity({
                power: possiblePower,
                durability: possibleDurability,
                stamina: activity.basic_stamina,
                comfort: activity.basic_comfort
            });
        }
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
            <HowToUse />
            <div className="access-block">
                <div className="token-balance">
                    <div>
                        <span>App balance: </span>
                        <span>{attempts}</span>
                        <FitmintGuideTokenSvg />
                        <span className="mr-2">FGT</span>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => setModalShow(true)}>
                        Top Up
                    </Button>
                    <Button
                        variant={`${isLoggedIn ? 'warning' : 'secondary'}`}
                        size="sm"
                        onClick={() => setAddActivityModalShow(true)}
                        disabled={!isLoggedIn}
                    >
                        Post run results
                    </Button>
                    <AddTokenButton />
                </div>
            </div>
            {/* <CalculatorHeader /> */}
            <div className="row-main">
                <div className="col-main">
                    <h3>Sneaker</h3>
                    <div className="attribute-row">
                        <div className="attribute-col">
                            <span>Activity Type</span>
                        </div>
                        <div className="attribute-col">
                            <FormSelect
                                defaultValue="WALK"
                                onChange={event => setObjectActivity({ type: event.target.value })}
                                aria-label="Default select example"
                            >
                                <option value="WALK">WALK</option>
                                <option value="JOG">JOG</option>
                                <option value="RUN">RUN</option>
                            </FormSelect>
                        </div>
                    </div>
                    <div className="attribute-row">
                        <div className="attribute-col">
                            <span>Level</span>
                        </div>
                        <div className="attribute-col">
                            <CounterInput
                                value={activity.sneaker_level}
                                max={50}
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
                                max={15}
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
                                max={10}
                                setActivity={(value: number) => setObjectActivity({ basic_power: value })}
                            />
                        </div>
                        <div className="attribute-col-3">
                            <CounterInput
                                value={activity.power}
                                max={activity.power + availablePointsToSpend}
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
                                max={10}
                                setActivity={(value: number) => setObjectActivity({ basic_durability: value })}
                            />
                        </div>
                        <div className="attribute-col-3">
                            <CounterInput
                                value={activity.durability}
                                max={activity.durability + availablePointsToSpend}
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
                                max={10}
                                setActivity={(value: number) => setObjectActivity({ basic_stamina: value })}
                            />
                        </div>
                        <div className="attribute-col-3">
                            <CounterInput
                                value={activity.stamina}
                                max={activity.stamina + availablePointsToSpend}
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
                                max={10}
                                setActivity={(value: number) => setObjectActivity({ basic_comfort: value })}
                            />
                        </div>
                        <div className="attribute-col-3">
                            <CounterInput
                                value={activity.comfort}
                                max={activity.comfort + availablePointsToSpend}
                                setActivity={(value: number) => setObjectActivity({ comfort: value })}
                            />
                        </div>
                    </div>
                    <div className="attribute-row mt-2">
                        <div className="attribute-col-3">Points: {availablePointsToSpend}</div>
                        <div className="attribute-col-3">
                            <Button className="primary reset-btn" onClick={resetPoints}>
                                Reset
                            </Button>
                        </div>
                        <div className="attribute-col-3">
                            {!unlocked ? (
                                <Button className="primary optimize-btn" onClick={() => unlockCalculator()}>
                                    Unlock (1 FGT)
                                </Button>
                            ) : (
                                <Button className="primary optimize-btn" onClick={optimizePoints}>
                                    Optimize
                                </Button>
                            )}
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
            <AddTopUpModal show={modalShow} onHide={() => setModalShow(false)} />
            <AddDataModal show={addActivityModalShow} onHide={() => setAddActivityModalShow(false)} />
        </div>
    );
}

export default withTranslation(['common'])(Home);
