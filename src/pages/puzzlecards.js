import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';

const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
    const cardList = state[namespace].data;
    return {
        cardList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: () => {
            const action = {
                type: `${namespace}/addNewCard`,
                payload: {
                    setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    punchline: 'here we use dva',
                },
            };
            dispatch(action);
        },
        onClickDelete: () => {
            const action = {
                type: `${namespace}/deleteCard`,
            };
            dispatch(action);
        },
        onDidMount: () => {
            const action = {
                type: `${namespace}/queryInitCards`,
            };
            dispatch(action);
        },
    };
};

class PuzzleCardsPage extends Component {
    componentDidMount() {
        this.props.onDidMount();
    }
    render() {
        return (
            <div>
                {
                    this.props.cardList.map(card => {
                        return (
                            <Card key={card.id}>
                                <div>Q: {card.setup}</div>
                                <div>
                                    <strong>A: {card.punchline}</strong>
                                </div>
                            </Card>
                        );
                    })
                }

                <Button onClick={this.props.onClickAdd}> 添加卡片 </Button>

                <Button onClick={this.props.onClickDelete}> 删除卡片 </Button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleCardsPage);