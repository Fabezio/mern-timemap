import React, {Component} from 'react'
// import ReactDOM from 'react-dom'
import axios from 'axios'
const path = "http://localhost:4000/users"

export default class Users extends Component {
    
    state = {
        users: []
    }

    componentDidMount() {
        this.fetch()
    }
    fetch = () => {
        
        axios.get(path+"/")
            .then(res => {
                console.log(res.data)
                this.setState({users: res.data})

        }).catch(err => err)
    }
    render() {
        return (
            <div>
                here are the users
                <ul>
                    {this.state.users.map(({ _id, firstname, lastname, email }) => (
                        <li key={ _id } > { firstname } {lastname}, contact: {email }</li>
                        ))}
                </ul>
            </div>
        )
    }
}
