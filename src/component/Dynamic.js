import React from 'react'
import NotFound from '../page/NotFound'

export default class Dynamic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {module: null};
    }

    componentDidMount() {
        const {path} = this.props;
        import(`../page/${path}`)
            .then(module => {
                this.setState({module: module.default})
            }).catch(() => {
            this.setState({module: NotFound})
        })
    }

    render() {
        const {module: Component} = this.state; // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        return (
            Component && <Component />
        )
    }
}