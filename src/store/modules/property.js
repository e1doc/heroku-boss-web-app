const getDefaultPropertyState = () => {
    return {
        currentPropertyStep: '1'
    }
}

const state = getDefaultPropertyState()

const getters = {
    currentPropertyStep: (state) => state.currentPropertyStep
}

const mutations = {
    setCurrentPropertyStep: (state, currentPropertyStep) => (state.currentPropertyStep = currentPropertyStep),
    resetPropertyState: (state) => Object.assign(state, getDefaultPropertyState())
}

const actions = {}

export default {
    state,
    getters,
    actions,
    mutations,
  };
  