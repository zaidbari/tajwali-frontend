import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App'

export default function Login() {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [error, setError] = React.useState('')

	const { setIsAuth } = useContext(AuthContext)
  let navigate = useNavigate();

	function handleLogin(e) {
		e.preventDefault()
		if (email === '' || password === '') {
			setError('Please enter email and password')
			return
		}

		axios
			.post('http://localhost:3001/api/login', {
				email,
				password
			})
			.then(
				({ data }) => {
					localStorage.setItem('user_id', data._id)
					setIsAuth(true)
					navigate('/')
				},
				({ response }) => {
					setError(response.data.error)
				}
			)
			.catch(e => {
				console.log(e)
			})
			.finally(() => {
				setEmail('')
				setPassword('')
			})
	}

	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center h-screen bg-gray-100">
			<div className="max-w-md w-full bg-white rounded p-6 space-y-4">
				<form onSubmit={handleLogin} className="flex gap-5 flex-col">
				<h1 className="mb-5 text-2xl font-bold">Login</h1>
					<input
						className="px-5 py-2 rounded"
						type="email"
						placeholder="Email address"
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						className="px-5 py-2 rounded"
						type="password"
						placeholder="Password"
						onChange={e => setPassword(e.target.value)}
					/>
					<button type="submit" className="bg-indigo-500 text-white font-bold rounded px-5 py-2 w-full">
						Login
					</button>
					{error && <p className="text-rose-500 text-center">{error}</p>}
				</form>
			</div>
		</div>
	)
}
