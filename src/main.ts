import { preferences } from './preferences';
import { menu } from './menu';

function bindModalClose(els: NodeListOf<HTMLDialogElement>) {
    for (const el of els) {
        el.addEventListener('click', (e) => {
            // XXX: https://bugzilla.mozilla.org/show_bug.cgi?id=1410816
            // if the element is some contained element we can early-return
            if (el !== e.target) {
                return;
            }

            let {x, y} = e;
            const rect = el.getBoundingClientRect();

            if (
                x < rect.x || x > rect.x + rect.width ||
                y < rect.y || y > rect.y + rect.height
            ) {
                console.log({x, y, rect});
                el.close();
            }
        });

        el.querySelector('.ok')?.addEventListener('click', () => el.close());
    }
}

let prefs = preferences();

bindModalClose(document.querySelectorAll('dialog'));

menu(
    document.querySelector('.open-menu')!,
    document.querySelector('.menu')!,
    document.querySelector('.stats')!,
    document.querySelector('.about')!,
);
const cand = document.querySelector('.cand');
const board = document.querySelector('.board');
const timer = document.querySelector('.timer');
const mark = document.querySelector('.mark');

console.log({prefs, cand, board, timer, mark});
