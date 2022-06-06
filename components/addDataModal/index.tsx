import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import styles from './index.module.scss';
import CounterInput from '../counter';

export default function AddDataModal(props: any): JSX.Element {
    const { onHide } = props;
    const defaultActivity = {
        sneaker_level: '',
        next_level: '',
        health_spent: '',
        repair_cost: '',
        energy_spent: '',
        earnings: '',
        power: '',
        durability: '',
        stamina: '',
        comfort: ''
    };
    const [activity, setActivity] = useState(defaultActivity);

    const setObjectActivity = (value: any) => {
        const newActivity = { ...activity, ...value };
        setActivity(newActivity);
    };

    const sendResults = async () => {
        await axios
            .post('/api/activities', {
                ...activity
            })
            .then(() => {
                toast('Results uploaded successfully.');
                setActivity(defaultActivity);
                onHide();
            })
            .catch(() => {
                toast('Please fill in all of the fields...');
            });
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
                    <Button className="primary" onClick={sendResults}>
                        Submit
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
