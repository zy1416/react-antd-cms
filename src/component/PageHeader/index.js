import React from 'react'
import {Breadcrumb} from 'antd'
import './index.css'

export default class PageHeader extends React.Component {

    render() {
        const {title, content} = this.props;
        return (
            <div className="page-header-container">
                <Breadcrumb className="page-header-breadcrumd">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>表单页</Breadcrumb.Item>
                    <Breadcrumb.Item>基础表单</Breadcrumb.Item>
                </Breadcrumb>

                <div className="page-header-detail">
                    <div className="page-header-row">
                        {title && <h1 className="page-header-title">{title}</h1>}
                    </div>
                    <div className="page-header-row">
                        {content && <div className="page-header-content">{content}</div>}
                    </div>
                </div>
            </div>
        )
    }
}