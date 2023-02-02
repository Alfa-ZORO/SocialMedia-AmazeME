import React, { useState, useRef, useEffect } from 'react'
import './comments.css'
import { useSelector } from 'react-redux'
import { uploadComment } from '../../api/UploadRequest'
import { fetchComments } from '../../api/PostRequest'
import { Send } from 'tabler-icons-react';


const Comment = ({ postId, countComment }) => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [comment, setComment] = useState([])
    const [refresh, setRefresh] = useState(false)

    const getComment = async (id) => {
        const response = await fetchComments(id)
        const userscomment = response.data
        setComment(userscomment)
    }
    useEffect(() => {
        getComment(postId)
    }, [refresh])

    const reset = () => {
        desc.current.value = ""
    }
    const handleComment = (e) => {
        if (desc.current.value) {
            e.preventDefault();
            countComment()
            const newComment = {
                postId: postId,
                userId: user._id,
                desc: desc.current.value
            }
            uploadComment(newComment).then((response) => {
                setRefresh(!refresh)
                reset()
            })
        }

    }

    return (
        <div>
            <form action="" onSubmit={handleComment}>
                <div className='PostReact'>
                    <div className="Message">
                        <img className="UserProfile" src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "avatar.png"} alt="" />
                        <input type="text" ref={desc} placeholder='#Say Something' className='commentInput' />
                        <button className='button comm' ><Send /></button>
                    </div>
                </div>
            </form>

            <div className='PostReaction' style={{ alignItems: 'center' }} >
                {comment.map((item,i) => {

                    return (
                        <div key={i}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img className="UserProfile" src={item.userData.profilePicture ? serverPublic + item.userData.profilePicture : serverPublic + "avatar.png"} alt="" />
                                <p style={{ marginLeft: '10px', marginTop: 10 }} ><b>{item.userData.firstname} {item.userData.lastname}</b></p>
                            </div>
                            <p style={{ marginLeft: '58px', textAlign: 'start', marginTop: '-16px' }}>{item.comments.comment}</p>
                        </div>
                    )
                })

                }
            </div>

        </div>
    )
}

export default Comment