function rootReducer(state = [], action) {
    switch (action.type) {
        case 'SEND_MESSAGE':
            return {
                data: {
                    ...state.data,
                    messages: [
                        ...state.data.messages,
                        action.message
                    ]
                }
            };
        default:
            return state;
    }
}

export default rootReducer;


