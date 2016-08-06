"use strict";
var router_1 = require('@angular/router');
var event_list_component_ts_1 = require('./event-list.component.ts');
var event_detail_component_ts_1 = require('./event-detail.component.ts');
var event_add_component_ts_1 = require('./event-add.component.ts');
exports.routes = [
    {
        path: '',
        component: event_list_component_ts_1.EventListComponent
    },
    {
        path: 'e/create',
        component: event_add_component_ts_1.EventAddComponent
    },
    {
        path: 'e/:id',
        component: event_detail_component_ts_1.EventDetailComponent
    },
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map