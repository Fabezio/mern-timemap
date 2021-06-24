import React, {Component} from 'react'
import axios from 'axios'

const userRoute = "http://localhost:4000/users"

class Form extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        user: {}
    }
    handleFirstname(e) {this.setState({ firstname: e.target.value}) }
    handleLastname(e) {this.setState({ lastname: e.target.value}) }
    handleEmail(e) { this.setState({ email: e.target.value }) }
    handleSubmit() {
        this.setState({
            user: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
            }
        })
        axios.post(userRoute + '/add', this.state.user)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                this.fetch()
            })
    }
    handleKeyDown(e) {
        if(e.key==='Enter') this.handleSubmit()
    }
    render() {
        return (<form onKeyDown={e=> this.handleKeyDown(e)} onSubmit={this.handleSubmit.bind(this)} >
            <input type="text" placeholder="Prénom?" value={this.state.firstname} onChange={this.handleFirstname.bind(this)} />
            <input type="text" placeholder="Nom?" value={this.state.lastname} onChange={this.handleLastname.bind(this)} />
            <input type="text" placeholder="Email?" value={this.state.email} onChange={this.handleEmail.bind(this)} />
            <button type="submit" >Soumettre</button>
        </form>)
    }
}
export default class List extends Component {
    state = {
        users: [],
        firstname: "",
        lastname: "",
        email: "",
        user: {}
    }
    handleFirstname(e) {this.setState({ firstname: e.target.value}) }
    handleLastname(e) {this.setState({ lastname: e.target.value}) }
    handleEmail(e) { this.setState({ email: e.target.value }) }
    handleSubmit() {
        this.setState({
            user: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
            }
        })
        axios.post(userRoute + '/add', this.state.user)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                this.fetch()
            })
    }
    handleKeyDown(e) {
        if(e.key==='Enter') this.handleSubmit()
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
        return (
            <div>

            <form onKeyDown={e=> this.handleKeyDown(e)} onSubmit={this.handleSubmit.bind(this)} >
            <input type="text" placeholder="Prénom?" value={this.state.firstname} onChange={this.handleFirstname.bind(this)} />
            <input type="text" placeholder="Nom?" value={this.state.lastname} onChange={this.handleLastname.bind(this)} />
            <input type="text" placeholder="Email?" value={this.state.email} onChange={this.handleEmail.bind(this)} />
            <button type="submit" >Soumettre</button>
        </form>
            <ul>
            {this.state.users.map((user, i) => <li key={i} title={`contact: ${user.email}`}>{user.firstname} {user.lastname}<button onClick={()=>this.trash(user)}> effacer</button></li>)
            }
                </ul>
            </div>
                )

    }
}
