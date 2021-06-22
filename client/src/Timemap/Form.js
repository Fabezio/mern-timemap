import React, { Component } from 'react'
import axios from 'axios'

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      user: {
        // firstname: '',
        // lastname: '',
        // email: ''

      }
    }
    this.lastnameChange = this.lastnameChange.bind(this)
    this.firstnameChange = this.firstnameChange.bind(this)
    this.emailChange = this.emailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // entree champs
  firstnameChange (e) {
    const firstname = this.state.firstname
    console.log(firstname)
    this.setState({ firstname: e.target.value })
  }

  lastnameChange (e) {
    this.setState({ lastname: e.target.value })
    console.log(this.state.lastname)
    // this.state.lastname=e.target.value
  }

  emailChange (e) {
    this.setState({ email: e.target.value })
    console.log(this.state.email)
    // this.state.email=e.target.value
  }

  // validation formulaire
  handleSubmit (e) {
    e.preventDefault()
    // user =
    const { email, lastname, firstname } = this.state
    console.log(email, lastname, firstname)
    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email
    }
    console.log(newUser)
    this.setState({
      user: newUser
    })

    //   this.state.user
  }
  fetch = () => {
        
        axios.get(path+"/")
            .then(res => {
                console.log(res.data)
                this.setState({users: res.data})

        }).catch(err => err)
    }
  add(e) {
    if (e.key === 'Enter') {
      let newUser = {
        firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email
      }
      axios.post("http://localhost:4000/users/add", newUser)
        .then((res) => res.data)
      this.fetch()  
      }
      
  }

  render () {
    const { user, input } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input id='firstname' name='firstname' type='text' onChange={this.firstnameChange} value={input} placeholder='Prenom?' /><br />
          <input id='lastname' name='lastname' type='text' onChange={this.lastnameChange} value={input} placeholder='Nom?' /><br />
          <input id='email' name='email' type='text' onChange={this.emailChange} value={input} placeholder='Email?' /><br />

          <button type='submit'>Valider</button>
        </form>

        <div>{user.firstname}</div>
        <div>{user.lastname}</div>
        <div>{user.email}</div>

      </div>
    )
  }
}
