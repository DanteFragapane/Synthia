import React from 'react'

export const ValuesContext = React.createContext({
  state: {
    sideDrawerOpen: false,
    filterFrequency: 375,
    filterGain: 50,
    attackTime: 0.2,
    decayTime: 0.5,
    sustainLevel: 0.5,
    releaseTime: 0.3,
    delayTime: 0.5
  },
  setFilterFrequency: (e) => {},
  setFilterGain: (e) => {},
  setAttackTime: (a) => {},
  setDecayTime: (d) => {},
  setSustainLevel: (s) => {},
  setReleaseTime: (r) => {}
})
