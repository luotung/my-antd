const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};

export default {
    namespace: 'cards',
    state: {
        cardsList: [],
        statistic: {},
    },
    effects: {
        //入参有两个对象，第一个对象就是匹配这个 effect 的 action 对象，因此可以取到约定的 payload 这个字段，第二个对象是 effect 原语集，其中 call, put 最为常用。
        *queryList(action, sagaEffects) {
            const { put, call } = sagaEffects;

            const cardsList = [
                {
                    name: 'umi',
                    desc: '极快的类 Next.js 的 React 应用框架',
                    url: 'https://umijs.org'
                },
                {
                    name: 'antd',
                    desc: '一个服务于企业级产品的设计体系',
                    url: 'https://ant.design/index-cn'
                },
                {
                    name: 'antd-pro',
                    desc: '一个服务于企业级产品的设计体系',
                    url: 'https://ant.design/index-cn'
                },
            ];
            yield call(delay, 1000);
            yield put({ type: 'reShowCardsList', payload: { cardsList, statistic: {} } });
        },
        *getStatistic({ payload }, { call, put }) {
            const rsp = {
                result: [
                    { genre: 'Sports', sold: 275 },
                    { genre: 'Strategy', sold: 1150 },
                    { genre: 'Action', sold: 120 },
                    { genre: 'Shooter', sold: 350 },
                    { genre: 'Other', sold: 150 },
                ]
            };


            yield put({
                type: 'saveStatistic',
                payload: {
                    id: payload,
                    data: rsp.result,
                },
            });
            return rsp;
        },
    },
    reducers: {
        //第一个参数是旧的state，第二个参数是传进来的action
        reShowCardsList(state, { payload }) {
            /*            const nextcardList = [...cardsList];
                       return {
                           cardsList: nextcardList,
                       }; */

            return payload;

        },
        addOne(state, { payload: card }) {
            const nextcardList = state.cardsList.concat(card);
            return {
                cardsList: nextcardList,
            };
        },
        saveStatistic(state, { payload: { id, data } }) {
            return {
                ...state,
                statistic: {
                    ...state.statistic,
                    [id]: data,
                },
            }
        },
    },
}