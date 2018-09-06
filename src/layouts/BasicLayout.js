import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Layout, Menu, Icon, Button} from 'antd'
import {logOut} from "../redux/actions/user"
import BasicRouter from '../routes'
import request from '../utils/request'
import BasicHeader from '../component/BasicHeader'

const SubMenu = Menu.SubMenu
const {Header, Footer, Sider, Content} = Layout


class BasicLayout extends React.Component {
    state = {
        user: null,
        isToggleOn: true,
        HomeMenu: null,
        menus: []
    }

    fetchMenus = () => {
        request('/menu', null).then((response) => {
            this.setState({
                menus: this.formatterMenu([...response.data])
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

    toggleMenu() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }))
    }

    componentWillMount() {
        this.fetchMenus()
    }

    render() {
        return (
            <Layout className="basic-layout">
                <Sider width={256} className="basic-layout-sider">
                    <div className="basic-layout-sider-logo">
                        Ant Design Demo
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {
                            this.state.menus.map((submenu) => {
                                return (
                                    <SubMenu key={submenu.path}
                                             title={<span><Icon type={submenu.icon}/>{submenu.name}</span>}>
                                        {
                                            submenu.children.map((menu) => {
                                                return (
                                                    <Menu.Item key={menu.path}>
                                                        <Link to={menu.path}>{menu.name}</Link>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{padding: '0'}}>
                        <BasicHeader></BasicHeader>
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <BasicRouter routers={this.state.menus}></BasicRouter>
                    </Content>
                    <Footer style={{textAlign: 'center',margin: '24px 0 12px'}}>
                        Ant Design Demo ©2018 Created by XXX
                    </Footer>
                </Layout>
            </Layout>
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
