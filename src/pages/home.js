import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'
import PostCard from '../components/postCard'

export default function Home() {
	const { isAuth, setIsAuth, userId, setUserId } = useContext(AuthContext)

	const [posts, setPosts] = React.useState([])
	const [loading, setLoading] = React.useState(true)

	const [title, setTitle] = React.useState('')

	function handleSignout() {
		localStorage.removeItem('user_id')
		setIsAuth(false)
		setUserId(null)
	}

	function handlePostCreate() {
		if (!title) return

		axios
			.post('http://localhost:3002/api/posts/create', {
				title,
				user_id: userId
			})
			.then(
				({ data }) => {
					setPosts([...posts, data])
					setTitle('')
				},
				({ response }) => {
					console.log(response.data.error)
				}
			)
			.catch(e => console.log(e))
	}

	useEffect(() => {
		axios
			.get('http://localhost:3002/api/posts')
			.then(
				({ data }) => {
					setPosts(data)
				},
				({ response }) => {
					console.log(response)
				}
			)
			.catch(e => console.log(e))
			.finally(() => setLoading(false))
	}, [])

	return (
		<div>
			<header className="bg-indigo-500 flex justify-between p-20">
				<div>
					<h1 className="text-white text-2xl mb-3">Welcome</h1>
					{isAuth ? (
						<button
							className="bg-indigo-700 whitespace-nowrap text-white rounded inline-block  px-5 py-2"
							onClick={handleSignout}
						>
							Signout
						</button>
					) : (
						<>
							<Link
								className="bg-indigo-700 rounded mr-4 text-white whitespace-nowrap inline-block px-5 py-2"
								to="/login"
							>
								Login
							</Link>
							<Link
								className="bg-indigo-500 border text-white whitespace-nowrap inline-block  boder-white rounded px-5 py-2"
								to="/signup"
							>
								Signup
							</Link>
						</>
					)}
				</div>
			</header>
			<div className="px-20 py-10">
				<h1 className="text-2xl font-bold text0indigo-500">
					Posts {posts.length} {loading && 'loading ....'}
				</h1>
				{isAuth && (
					<>
						<input
							onChange={e => setTitle(e.target.value)}
							value={title}
							className="shadow-sm p-3 mb-4 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
							placeholder="Create Post"
						/>
						<button
							onClick={handlePostCreate}
							className="bg-indigo-700 rounded mr-4 text-white whitespace-nowrap inline-block px-5 py-2"
						>
							Create Posts
						</button>
					</>
				)}
				<div className="flex my-5 gap-5 flex-wrap">
					{posts.map((post, index) => (
						<PostCard key={index} post={post} />
					))}
				</div>
			</div>
		</div>
	)
}
