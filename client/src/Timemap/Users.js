import React, { Component } from 'react'

import axios from 'axios'
const userRoute = 'http://localhost:4000/users'

const User = () => (<li>username</li>)
export default class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      user: { },
      users: []
    }
  }

  handleFirstname (e) {
    this.setState({ firstname: e.target.value })
  }

  handleLastname (e) {
    this.setState({ lastname: e.target.value })
  }

  handleEmail (e) {
    this.setState({ email: e.target.value })
  }

  trash (_id) {
    // console.log(e.target)
    // axios.delete(`${userRoute}/${_id}`, _id)
    //   .then((res) => {
    //     console.log(res.data)
    //   })
  }

  display (e) {
    console.log(e.target)

    // axios.get(`${userRoute}/${id}`, id)
    //   .then((res) => {
    //     console.log(res.data)
    //   })
  }

  handleNewUser (e) {
    e.preventDefault()

    if (
      this.state.firstname.length > 0 &&
      this.state.lastname.length > 0 &&
      this.state.email.length > 0
    ) {
      this.setState({
        user: {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email
        }
      })
      axios
        .post(userRoute + '/add', this.state.user)
        .then((res) => {
        // console.log(user)
          console.log(res)
          console.log(res.data)
        }
        ).catch(err => console.log(err))
      this.fetch()
    }
  }

  componentDidMount () {
    this.fetch()
  }

  fetch () {
    axios.get(userRoute + '/')
      .then(res => {
        this.setState({ users: res.data })
      }).catch(err => err)
  }

  render () {
    return (
      <div>
        <div className='subtitle'>
          add a user filling the form below
        </div>
        <div>
          <form className='' onSubmit={this.handleNewUser.bind(this)}>

            <input className='' id='firstname' name='firstname' type='text' onChange={this.handleFirstname.bind(this)} value={this.state.firstname} placeholder='Prenom?' />
            <input id='lastname' name='lastname' type='text' onChange={this.handleLastname.bind(this)} value={this.state.lastname} placeholder='Nom?' />
            <input id='email' name='email' type='text' onChange={this.handleEmail.bind(this)} value={this.state.email} placeholder='Email?' />

            <button type='submit'>Valider</button>
          </form>

        </div>

        <h3 className='subtitle'>here are the users</h3>
        <ul>
          <User />
          {this.state.users.map(({ _id, firstname, lastname, email }) => (
            <li key={_id}> {firstname} {lastname}, contact: {email}
              <button onClick={this.trash} className=''>
                rem
                <i className='fas fa-trash' />
              </button>
              <button onClick={this.display} className=''>
                see<i className='far fa-eye' />
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
