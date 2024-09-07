import create from "zustand"
import produce from "immer";

const store = create(set => ({
    socket: null,
    walletAddress: "",
    isWalletConnected: false,

    setWalletAddress: (address) => set(produce(state => {
        state.walletAddress = address;
    })),
    
    setIsWalletConnected: (status) => set(produce(state => {
        state.isWalletConnected = status;
    })),

    updateSocket: ( val ) => set(produce(state => {
        state.socket = val;
    }))
}))

export default store;