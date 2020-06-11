import React from 'react'
import { HeaderWrapper } from '../../style'
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router';
class Header extends React.PureComponent {

    render() {
        const { navClicked, isLoginPage } = this.props
        return (
            <HeaderWrapper>
                <div className="nav">
                {!isLoginPage && <FontAwesomeIcon onClick={navClicked} size = 'lg' icon={faBars} />}
                <span>Exam App @ReactJS</span>
                </div>
                <div className="log-out">
                {!isLoginPage && <FontAwesomeIcon onClick={()=> this.props.history.push('/')} size = 'lg' icon={faSignOutAlt} />}
                </div>
            </HeaderWrapper>
        )
    }
}




export default withRouter(Header)