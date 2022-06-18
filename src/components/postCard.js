import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../App'

export default function PostCard({ post }) {
	const [content, setContent] = useState('')
	const { isAuth, userId } = useContext(AuthContext)
	const [comments, setComments] = useState([])

	useEffect(() => {
		axios.get('http://localhost:3003/api/comment/' + post._id).then(({ data }) => {
			setComments(data)
			console.log(data)
		})
	}, [])

	function handleDeleteComment(id) {
		axios.get('http://localhost:3003/api/comment/delete/' + id).then(({ data }) => {
			if (data.status) setComments(comments.filter(comment => comment._id !== id))
		})
	}

	function handleCommentCreate() {
		if (!content) return

		axios
			.post('http://localhost:3003/api/comment/create', {
				content,
				post_id: post._id,
				user_id: userId
			})
			.then(
				({ data }) => {
					setContent('')
					setComments([...comments, data])
				},
				({ response }) => {
					console.log(response.data.error)
				}
			)
	}

	return (
		<div className="bg-slate-100 md:w-1/4 w-full rounded shadow p-5">
			<h1 className="text-2xl font-bold text-indigo-500">{post.title}</h1>
			{isAuth && (
				<>
					<input
						onChange={e => setContent(e.target.value)}
						value={content}
						className="shadow-sm p-3 mb-4 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
						placeholder="Comment"
					/>
					<button
						onClick={handleCommentCreate}
						className="bg-indigo-700 rounded mr-4 text-white whitespace-nowrap inline-block px-5 py-2"
					>
						Comment
					</button>
				</>
			)}

			<div className="mt-10">
				{comments.map(comment => (
					<div key={comment._id} className="mb-3">
						{comment.status === 'accepted' && <p>{comment.content}</p>}
						{comment.status === 'pending' && <p className="text-indigo-500 italic">Pending Moderation</p>}
						{comment.status === 'rejected' && <p className="text-rose-500 italic">Rejected</p>}
						<button
							onClick={() => handleDeleteComment(comment._id)}
							className="bg-rose-500 text-white text-xs rounded px-5 py-1"
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
