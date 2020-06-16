import React from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { connect } from 'dva';

import SampleChart from '../../components/SampleChart';

const namespace = 'cards';

const mapStateToProps = (state) => {
    return {
        cardsList: state[namespace].cardsList,
        cardsLoading: state.loading.effects[`${namespace}/queryList`],
        statistic: state[namespace].statistic,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            const action = {
                type: `${namespace}/queryList`,
            };
            dispatch(action);
        },
        addOne: (card) => {
            const action = {
                type: `${namespace}/addOne`,
                payload: card,
            };
            dispatch(action);
        },
        getStatistic: (id) => {
            const action = {
                type: `${namespace}/getStatistic`,
                payload: id,
            };
            dispatch(action);
        },
    };
};

class List extends React.Component {

    state = {
        visible: false,
        statisticVisible: false,
        id: null,
    };

    formRef = React.createRef();

    componentDidMount() {
        this.props.onDidMount();
    }

    columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '链接',
            dataIndex: 'url',
            render: value => <a href={value}>{value}</a>,
        },
        {
            title: '',
            dataIndex: 'statistic',
            render: (_, { id }) => {
                return (
                    <Button onClick={() => { this.showStatistic(id); }}>图表</Button>
                );
            },
        },
    ];

    showStatistic = (id) => {
        this.props.getStatistic(id);
        // 更新 state，弹出包含图表的对话框
        this.setState({ id, statisticVisible: true });
    };

    handleStatisticCancel = () => {
        this.setState({
            statisticVisible: false,
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.formRef.current.validateFields().then(values => {
            this.props.addOne(values);
            this.setState({ visible: false });
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, statisticVisible, id } = this.state;
        const { cardsLoading, cardsList, statistic } = this.props;

        return (
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
                <Button onClick={this.showModal}>新建</Button>
                <Modal
                    title='新建记录'
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form ref={this.formRef}>
                        <Form.Item label='名称' name='name' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='描述' name='desc'>
                            <Input />
                        </Form.Item>
                        <Form.Item label='链接' name='url' rules={[{ type: 'url' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
                    <SampleChart data={statistic[id]} />
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);