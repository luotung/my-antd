const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};

export default {
    namespace: 'cards',
    state: {
        cardsList: [],
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
            yield put({ type: 'reShowCardsList', payload: cardsList });
        }
    },
    reducers: {
        //第一个参数是旧的state，第二个参数是传进来的action
        reShowCardsList(state, { payload: cardsList }) {
            const nextcardList = [...cardsList];
            return {
                cardsList: nextcardList,
            };
        },
        addOne(state, { payload: card }) {
            const nextcardList = state.cardsList.concat(card);
            return {
                cardsList: nextcardList,
            };
        },
    },
}