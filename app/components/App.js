import React, { PropTypes } from 'react';
import main from '../styles/main.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

export default App;
