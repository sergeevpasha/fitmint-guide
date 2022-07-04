import { Col, Container, Modal, Row } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import TopUpAppAccountButton from '../topUpAppAccountButton';
import AddTokenButton from '../addTokenButton';
import BuyTokens from '../buyTokens';
import FitmintGuideTokenSvg from '../svg/fitmintGuideTokenSvg';

export default function AddTopUpModal(props: any): JSX.Element {
    const { onHide } = props;
    const balance = useSelector((state: any) => state.user.balance);
    return (
        <Modal {...props} size="lg" centered className={styles.topUpModal}>
            <Modal.Body>
                <h2>TopUp Fitmint.guide balance</h2>
                <h4>
                    By adding FGT to your app wallet you will get access to the Fitmint.guide calculator function. Each
                    FGT token will grant you access to calculator for 10 minutes.
                </h4>
                <p>
                    You can earn FGT by posting your run results, or by buying FGT directly. Price is fixed to 0.5 MATIC
                    per FGT.
                </p>
                <Container>
                    <Row>
                        <Col className="my-2" xs={12}>
                            <AddTokenButton />
                        </Col>
                        <Col className="d-flex align-items-center justify-end my-2" xs={12}>
                            <div className="token-balance">
                                <span className="ml-1">Wallet balance: </span>
                                <span className="ml-1">{balance}</span>
                                <FitmintGuideTokenSvg style={{ margin: '0 6px' }} />
                                <span>FGT</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex align-items-center justify-end my-2" xs={12}>
                            <span className="mr-4">Select amount</span>
                            <BuyTokens />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex align-items-center justify-end my-2" xs={12}>
                            <span className="mr-4">Select amount</span>
                            <TopUpAppAccountButton onSuccess={() => onHide()} />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
