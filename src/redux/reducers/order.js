import {SAVE_ORDER} from "../constants/ActionTypes"

const orderState = {
    payAccount: null,
    receiverName: null,
    accountType: 'bank',
    receiverAccount: null,
    amount: null
}

export default function order(state = orderState, action) {
    switch (action.type) {
        case SAVE_ORDER:
            return {
                ...orderState,
                ...action.payload
            }
        default:
            return state
    }
}