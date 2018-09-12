import {SAVE_ORDER, RESET_ORDER} from '../constants/ActionTypes'

export const saveOrder = (payload) => ({
    type: SAVE_ORDER,
    payload
})

export const resetOrder = () => ({
    type: RESET_ORDER
})