export default {
    routes: [
        {
            path: '/',
            component: '../layout/BasicLayout',
            routes: [
                {
                    path: 'helloworld',
                    component: './HelloWorld'
                },
                {
                    path: 'dashboard',
                    routes: [
                        { path: 'analysis', component: 'Dashboard/Analysis' },
                        { path: 'monitor', component: 'Dashboard/Monitor' },
                        { path: 'workplace', component: 'Dashboard/Workplace' }
                    ]
                },
                {
                    path: 'puzzlecards',
                    component: './puzzlecards'
                },
                {
                    path: 'list',
                    component: './list',
                },
            ]
        }
    ],
}