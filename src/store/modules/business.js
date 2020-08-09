const getDefaultBusinessState = () => {
    return {
        currentBusinessStep: '1'
    }
}

const state = getDefaultBusinessState()

const getters = {
    currentBusinessStep: (state) => state.currentBusinessStep
}

const mutations = {
    setCurrentBusinessStep: (state, currentBusinessStep) => (state.currentBusinessStep = currentBusinessStep),
    resetBusinessState: (state) => Object.assign(state, getDefaultBusinessState())
}

const actions = {}

export default {
    state,
    getters,
    actions,
    mutations,
  };
  