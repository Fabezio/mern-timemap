import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

import axios from 'axios'
const userRoute = 'http://localhost:4000/users'

export default class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      user: {
        firstname: '',
        lastname: '',
        email: ''
        
      },
      /*
        */
      users: []
    }
    }

  handleFirstname (e) {
    // const firstname = this.state.firstname
    // console.log(firstname)
    this.setState({ firstname: e.target.value })
  }

  handleLastname (e) {
    // console.log(this.state.lastname)
    this.setState({ lastname: e.target.value })
    // this.state.lastname=e.target.value
  }

  handleEmail (e) {
    this.setState({ email: e.target.value })
    // console.log(this.state.email)
    // this.state.email=e.target.value
  }

  componentDidMount () {
    this.fetch()
  }

  fetch () {
    axios.get(userRoute + '/')
      .then(res => {
        //console.log(res)
        //console.log(res.data)
        this.setState({ users: res.data })
      }).catch(err => err)
  }

  handleNewUser (e) {
    if (e.key === 'Enter') {
      const user= {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
      }
      e.preventDefault()
      axios
      .post(userRoute + '/add', user)
        .then((res) => {
          console.log(res)
          console.log(res.data)
          //this.setState({ newUser: res.data })
          //return res.data
        }
        ).catch(err=>console.log(err))
      this.fetch()
    }
  }

  render () {
    
    return (
      <div>
        form
        <div>
          <form onSubmit={this.handleNewUser}>
            <input id='firstname' name='firstname' type='text' onChange={this.handleFirstname.bind(this)} value={this.state.firstname} placeholder='Prenom?' /><br />
            <input id='lastname' name='lastname' type='text' onChange={this.handleLastname.bind(this)} value={this.state.lastname} placeholder='Nom?' /><br />
            <input id='email' name='email' type='text' onChange={this.handleEmail.bind(this)} value={this.state.email} placeholder='Email?' /><br />

            <button type='submit'>Valider</button>
          </form>

        </div>
        {/*

                */}
        here are the users
        <ul>
          {this.state.users.map(({ _id, firstname, lastname, email }) => (
            <li key={_id}> {firstname} {lastname}, contact: {email}</li>
          ))}
        </ul>
      </div>
    )
  }
}
