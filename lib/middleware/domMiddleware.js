"use babel";
export default function domMiddleware() {
    return next => action => {
        if (action.type == 'goTo') {
            if (action.entityElement) {
                const el = action.entityElement;
                const loc = {start:{}, end:{}};
                loc.start.line = ~~el.getAttribute('data-line');
                loc.start.column = ~~el.getAttribute('data-column');
                loc.end.line = ~~el.getAttribute('data-line-end');
                loc.end.column = ~~el.getAttribute('data-column-end');

                const path = el.getAttribute('data-path');
                return next({
                    type: 'goTo',
                    loc: loc,
                    path: path
                })
            }
        }
        next(action);
    }
}