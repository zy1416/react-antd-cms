import React from 'react'
import DocumentTitle from 'react-document-title'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import pathToRegexp from 'path-to-regexp'
import {Layout, Menu, Icon} from 'antd'

import {logOut} from "../redux/actions/user"
import BasicRouter from '../routes'
import request from '../utils/request'
import BasicHeader from '../component/BasicHeader'
import {BreadcrumbContext} from '../context'
import {urlToList} from '../utils/utils'

const SubMenu = Menu.SubMenu
const {Header, Footer, Sider, Content} = Layout

const getFlatMenuKeys = (menu) => (
    menu.reduce((keys, item) => {
        keys.push(item.path)
        if (item.children) {
            return keys.concat(getFlatMenuKeys(item.children))
        }
        return keys
    }, [])
)


const getFlatMenu = (menu) => (
    menu.reduce((keys, item) => {
        keys.push(item)
        if (item.children) {
            return keys.concat(getFlatMenu(item.children))
        }
        return keys
    }, [])
)


const getMenuMatchKeys = (flatMenuKeys = [], paths) => (
    paths.reduce((matchKeys, path) => {
        return matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path)))
    }, [])
)


const getBreadcrumbNameMap = (menus) => {
    const result = {};
    const childResult = {};
    for (const i of menus) {
        result[i.path] = i;

        if (i.children) {
            Object.assign(childResult, getBreadcrumbNameMap(i.children));
        }
    }
    return Object.assign({}, result, childResult);

}

class BasicLayout extends React.Component {

    state = {
        user: null,
        isToggleOn: true,
        HomeMenu: null,
        menus: [],
        openKeys: []
    }


    fetchMenus = () => {
        request('/menu', null).then((response) => {
            let menuData = this.formatterMenu([...response.data]);
            this.flatMenuKeys = getFlatMenuKeys(menuData);
            console.log(JSON.stringify(menuData))
            this.setState({
                menus: menuData,
                openKeys: this.getSelectedMenuKeys()
            })
        }).catch(response => {

        })
    }

    formatterMenu = (data, parentPath = '/', parentAuthority) => {
        return data.map((item) => {
            let path = parentPath + item.path;
            const result = {
                ...item,
                path,
                authority: item.authority || parentAuthority
            }
            if (item.children) {
                result.children = this.formatterMenu(item.children, `${parentPath}${item.path}/`, item.authority);
            }
            return result;
        })
    }

    getPageTitle = () => {
        const {location: {pathname}} = this.props;
        const {menus} = this.state;
        let title = 'React antd cms';
        let routerData = getFlatMenu(menus);
        let currRouterData = null;

        for (const key of routerData) {
            if (pathToRegexp(key.path).test(pathname)) {
                currRouterData = key;
                break;
            }
        }

        if (currRouterData && currRouterData.name) {
            title = currRouterData.name;
        }

        return title;
    }

    componentWillMount() {
        this.fetchMenus()
    }

    componentWillReceiveProps(nextProps) {
        const {location} = this.props;
        if (nextProps.location.pathname != location.pathname) {
            this.setState({
                openKeys: this.getSelectedMenuKeys(nextProps)
            })
        }
    }

    getSelectedMenuKeys = (props) => {
        const {
            location: {pathname},
        } = props || this.props;
        return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
    }

    rootSubmenuKeys = (key) => {
        const {menus} = this.state;
        return menus.some(item => key && item.path === key)
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys(latestOpenKey)) {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        } else {
            this.setState({openKeys});
        }
    }

    renderMenu = (menu) => {
        if (menu.children && menu.children.length) {
            return (
                <SubMenu key={menu.path}
                         title={
                             menu.icon ?
                                 <span><Icon type={menu.icon}/>{menu.name}</span> :
                                 <span>{menu.name}</span>
                         }>

                    {
                        menu.children.map((m) => {
                            return this.renderMenu(m)
                        })
                    }

                </SubMenu>
            )
        } else {
            return (
                <Menu.Item key={menu.path}>
                    <Link to={menu.path}>{menu.name}</Link>
                </Menu.Item>
            )
        }
    }

    render() {
        const {openKeys, menus} = this.state;
        const {location} = this.props;

        let selectedKeys = this.getSelectedMenuKeys();
        if (!selectedKeys.length) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <BreadcrumbContext.Provider value={{
                    location,
                    breadcrumbNameMap: getBreadcrumbNameMap(menus)
                }}>
                    <Layout className="basic-layout">
                        <Sider width={256} className="basic-layout-sider">
                            <div className="basic-layout-sider-logo">
                                Ant Design Demo
                            </div>
                            <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} openKeys={openKeys}
                                  onOpenChange={this.onOpenChange}>
                                {
                                    this.state.menus.map((menu) => {
                                        return this.renderMenu(menu)
                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{padding: '0'}}>
                                <BasicHeader></BasicHeader>
                            </Header>
                            <Content style={{margin: '24px 24px 0', height: '100%'}}>
                                <BasicRouter routers={this.state.menus}></BasicRouter>
                            </Content>
                            <Footer style={{textAlign: 'center', margin: '24px 0 12px'}}>
                                Ant Design Demo ©2018 Created by XXX
                            </Footer>
                        </Layout>
                    </Layout>
                </BreadcrumbContext.Provider>
            </DocumentTitle>
        )
    }
}

const mapStateToProps = (state) => ({
    userName: state.loginUser.userName
})

const mapDispathToProps = (dispatch) => ({
    logOut: () => {
        dispatch(logOut)
    }
})


export default connect(mapStateToProps, mapDispathToProps)(BasicLayout)
