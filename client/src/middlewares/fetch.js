import axios from 'axios'

export const userRoute = 'http://localhost:4000/users'

export function fetch () {
  axios.get(userRoute + '/')
    .then(res =>
      this.setState({ users: res.data }))
}
