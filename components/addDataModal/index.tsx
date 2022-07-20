import { Button, Col, Container, FormSelect, Modal, Row, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Base64 } from 'js-base64';
import { useSelector } from 'react-redux';
import axios from '../../axios.config';
import styles from './index.module.scss';
import CounterInput from '../counter';
import { postResults } from '../../utils/contracts/fitmintGuideActivities';
import AddTokenButton from '../addTokenButton';

export default function AddDataModal(props: any): JSX.Element {
    const address = useSelector((state: any) => state.user.address);
    const balance = useSelector((state: any) => state.user.balance);
    const { onHide } = props;
    const defaultActivity = {
        type: 'WALK',
        sneaker_level: '',
        next_level: '',
        health_spent: '',
        repair_cost: '',
        energy_spent: '',
        earnings: '',
        power: '',
        durability: '',
        stamina: '',
        comfort: '',
        version: 1
    };
    const [activity, setActivity] = useState(defaultActivity);
    const [awaitingTransaction, setAwaitingTransaction] = useState(false);

    const setObjectActivity = (value: any) => {
        const newActivity = { ...activity, ...value };
        setActivity(newActivity);
    };

    const pending = (value: boolean, message?: string): void => {
        setAwaitingTransaction(value);
        if (!value && !awaitingTransaction && message) {
            toast(message);
            setActivity(defaultActivity);
            onHide();
        }
    };

    const sendResults = async () => {
        if (address) {
            await axios
                .post('/activities', {
                    ...activity
                })
                .then(async () => {
                    const results = Base64.encode(JSON.stringify(activity));
                    await postResults(address, results, pending);
                })
                .catch(() => {
                    toast('Please fill in all of the fields...');
                });
        }
    };

    return (
        <Modal {...props} size="lg" centered className={styles.addDataModal}>
            <Modal.Body>
                <h2>Share your run results</h2>
                <h4>Fill in your sneaker’s attributes and actual run results</h4>
                <Container>
                    <Row>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Type</Col>
                                <Col className="d-flex justify-end">
                                    <FormSelect
                                        defaultValue="WALK"
                                        onChange={event => setObjectActivity({ type: event.target.value })}
                                        aria-label="Default select example"
                                    >
                                        <option value="WALK">WALK</option>
                                        <option value="JOG">JOG</option>
                                        <option value="RUN">RUN</option>
                                    </FormSelect>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Level</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.sneaker_level}
                                        setActivity={(value: number) => setObjectActivity({ sneaker_level: value })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Next level cost</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.next_level}
                                        setActivity={(value: number) => setObjectActivity({ next_level: value })}
                                        max={50000}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Health spent</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.health_spent}
                                        setActivity={(value: number) => setObjectActivity({ health_spent: value })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Repair cost per health</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.repair_cost}
                                        setActivity={(value: number) => setObjectActivity({ repair_cost: value })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Energy spent</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.energy_spent}
                                        setActivity={(value: number) => setObjectActivity({ energy_spent: value })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Earnings</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.earnings}
                                        setActivity={(value: number) => setObjectActivity({ earnings: value })}
                                        max={10000}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Power</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.power}
                                        setActivity={(value: number) => setObjectActivity({ power: value })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Durability</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.durability}
                                        setActivity={(value: number) => setObjectActivity({ durability: value })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Stamina</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.stamina}
                                        setActivity={(value: number) => setObjectActivity({ stamina: value })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="my-2" xs={12} md={6}>
                            <Row>
                                <Col>Comfort</Col>
                                <Col className="d-flex justify-end">
                                    <CounterInput
                                        value={activity.comfort}
                                        setActivity={(value: number) => setObjectActivity({ comfort: value })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <div className={styles.actionsModal}>
                    {awaitingTransaction ? (
                        <Button className="primary ml-1" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="mr-2"
                            />
                            <span>Awaiting transaction...</span>
                        </Button>
                    ) : (
                        <Button className="primary ml-1" onClick={sendResults}>
                            Submit
                        </Button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}
