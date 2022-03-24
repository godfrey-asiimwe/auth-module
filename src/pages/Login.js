import { useEffect, useState } from 'react'
import { useAuthActions, useAuthState } from 'use-eazy-auth'
import '../App.css'

export default function Login() {
  const { loginLoading, loginError } = useAuthState()
  const { login, clearLoginError } = useAuthActions()

  // Clear login error when Login component unmount
  useEffect(() => () => clearLoginError(), [clearLoginError])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (

    <form
      className="row mt-5 p-2"
      onSubmit={(e) => {
        e.preventDefault()
        if (username !== '' && password !== '') {
          login({ username, password })
        }
      }}
    >

    <div class="login-wrap">
      <a class="" href=""></a>

       <div class="semaphore-classic">
        <div className='mb-3 ' >
          <h4 class="login-header">Welcome !</h4>
        </div>
        <div className="form-group">
          <input
            placeholder="@username"
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => {
              clearLoginError()
              setUsername(e.target.value)
            }}
          />

        </div>
        <div className="form-group">
          <input
            placeholder="password"
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => {
              clearLoginError()
              setPassword(e.target.value)
            }}
          />
        </div>
        <button className="btn btn-light" disabled={loginLoading}>
          {!loginLoading ? 'Login!' : 'Logged in...'}
        </button>
        {loginError && (
          <div className="alert alert-danger mt-3">
            Bad combination of username and password.
          </div>
        )}

      </div>
    </div>



    </form>

    
  )
}
