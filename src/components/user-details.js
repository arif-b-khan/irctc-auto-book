import React, { Component, Fragment } from 'react';
import UserDetail from '../models/userDetail';

class UserDetails extends Component {
    state = {
        User: this.props.userDetail
    }

    render() {
        let {username } = this.state.User;
        return (
            <Fragment>
                <label>username</label>
            </Fragment>
        );
    }
}

export default UserDetails;