import React from 'react'

export default class FrequencyControl extends React.Component {
    setFrequency = event => {
        event.persist()
        if (this.props.value !== event.target.value) {
            this.props.updateFrequency(event.target.value)
        }
    }
    render () {
        return (
            <div className="control">
                <label htmlFor="frequency">Frequency</label>
                <input
                    id="frequency"
                    type="text"
                    value={this.props.value}
                    onChange={this.setFrequency}
                />
            </div>
        )
    }

}

