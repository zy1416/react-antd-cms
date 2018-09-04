import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import './style.css'

const styles = {
    active: {
        color: '#2196f3'
    }
}

class MenuList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: []
        }
    }

    componentDidMount() {
    }

    render() {
        const {lists , location} = this.props;
        return (
            <ul className="react-menu-ul">
                {
                    lists.map((item, index) => {
                        let toLink = `${item.route}`;
                        return (
                            <Link to={toLink} key={index} exact="true">
                                <ListItem button key={index} style={toLink == location.pathname ? styles.active : null}>
                                    {item.name}
                                </ListItem>
                            </Link>
                        )
                    })
                }
            </ul>
        );
    }
}
export default withRouter(MenuList)