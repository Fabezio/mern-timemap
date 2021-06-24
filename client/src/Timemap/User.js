import { Component } from "react"
import axios from 'axios'
const userRoute = "http://localhost:4000/users"
export default class User extends Component{
    state = {
        users: [],
        user: {}
    }
    fetch() {
        axios.get(userRoute + "/")
            .then(res =>
                this.setState({users: res.data}))
    }
    
    

    componentDidMount() {
        this.fetch()
    }
    render() {
        const user=this.state
            return (<li title={`contact: ${user.email}`}>{user.firstname} {user.lastname}<button onClick={() => console.log("name", user.lastname)}> effacer</button></li>)
        }

} 

// export default User
