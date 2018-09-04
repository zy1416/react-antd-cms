import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MenuIcon from '@material-ui/icons/Menu'
import Badge from '@material-ui/core/Badge'
import MenuList from '../Home/MenuList'
import HomeRouter from './HomeRouter'

const styles = {
    hidden: {
        display: 'none'
    },
    header: {
        width: '100%'
    },
    active: {
        color: '#2196f3'
    }
}

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            user: null,
            isToggleOn: true,
            HomeMenu: null,
            menus: [
                {icon: 'Dashboard', name: 'Dashboard', route: '/Home/Dashboard'},
                {icon: 'ShoppingCart', name: 'Orders', route: '/Home/Orders'},
                {icon: 'People', name: 'Customers', route: '/Home/Customers'},
                {icon: 'BarChart', name: 'Reports', route: '/Home/Reports'},
                {icon: 'Layers', name: 'Integrations', route: '/Home/Integrations'}
            ]
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }))
    }

    componentDidMount() {
        this.setHomeMenuTitle();
        let user = localStorage.getItem('user');
        this.setState({
            user
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setHomeMenuTitle(nextProps.location.pathname);

    }

    setHomeMenuTitle(pathname) {
        const {location} = this.props;
        const menu = this.state.menus.find((item, index, arr) => {
            return `${item.route}` == (pathname || location.pathname);
        })

        this.setState({
            HomeMenu: menu ? menu.name : null
        })
    }

    render() {
        const {userName} = this.props
        return (
            <React.Fragment>
                <CssBaseline/>
                <div className="react-home">
                    <header className="react-home-header"
                            style={this.state.isToggleOn ? {} : styles.header}>
                        <div className="react-home-header-container">
                            <IconButton color="inherit" className="react-home-header-menu-btn"
                                        style={this.state.isToggleOn ? styles.hidden : {}}>
                                <MenuIcon onClick={this.toggleMenu}/>
                            </IconButton>
                            <h2>{this.state.HomeMenu}</h2>
                            <span>{userName}</span>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                        </div>
                    </header>

                    <div className="react-home-drawer"
                         style={this.state.isToggleOn ? {} : styles.hidden}>
                        <div className="react-home-drawer-topIcon">
                            <IconButton>
                                <ChevronLeftIcon onClick={this.toggleMenu}/>
                            </IconButton>
                        </div>
                        <hr className="react-hr"/>
                        <MenuList lists={this.state.menus}/>
                    </div>

                    <div className="react-home-main">
                        <HomeRouter routers={this.state.menus} userName={userName}></HomeRouter>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}