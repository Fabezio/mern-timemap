import React, {Component} from 'react'
import axios from 'axios'

const userRoute = "http://localhost:4000/users"

export default class List extends Component {
    state = {
        users: []
    }

    fetch() {
        axios
            .get(userRoute + "/")
            .then(res =>
                this.setState({users: res.data}))
    }   

    componentDidMount() {
        this.fetch()
    }
    trash(user) {
        let list = this.state.users.filter(u => u !== user)
        console.log(list)
        this.setState({users: list})
    }
    render() {
        return (<ul>
            {this.state.users.map((user, i) => <li key={i} title={`contact: ${user.email}`}>{user.firstname} {user.lastname}<button onClick={()=>this.trash(user)}> effacer</button></li>)
            }
        </ul>)

    }
}
