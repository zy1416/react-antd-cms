import React from 'react'
import {Icon,Tooltip} from 'antd'

import './index.css'

export default class Header extends React.Component {
    render() {
        return (
            <div className="basic-header">
                <Icon className="basic-header-trigger" type="menu-fold" onClick={this.toggle}/>
                <div className="basic-header-right">
                    <Tooltip title="使用文档" placement="bottom">
                        <a
                            target="_blank"
                            href="http://pro.ant.design/docs/getting-started"
                            rel="noopener noreferrer"
                            className="basic-header-right-action">
                            <Icon type="question-circle-o" />
                        </a>
                    </Tooltip>
                </div>
            </div>
        )
    }
}