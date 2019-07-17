export const GOTO = {
    LIST: 'GOTO_LIST',
    RESET: 'GOTO_RESET',
}
export const gotoList = () => ({ type: GOTO.LIST });
export const resetGoto = () => ({ type: GOTO.RESET });