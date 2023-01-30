import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { Link, useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import axios from 'axios'
import { ArrowUpRightCircle } from 'tabler-icons-react';
import { getUser } from "../../api/UserRequest";
import { userPosts } from "../../api/PostRequest";



function ProfileCard({ location }) {

    const { id } = useParams()
    const { user } = useSelector((state) => state.authReducer.authData)
    const posts = useSelector((state) => state.postReducer.posts)

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const [searchuser, setsearchuser] = useState(null)
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [refresh, setrefresh] = useState(false)



    useEffect(() => {
        const fetchFollowers = async () => {
            if (id) {
                const { data } = await getUser(id)
                setFollowers(data.followers)
                setFollowing(data.following)
                setsearchuser(data)
                setrefresh(true)
            } else {
                const { data } = await getUser(user._id)
                // console.log(data, '----------existing user')
                setFollowers(data.followers)
                setFollowing(data.following)
            }
        }
        fetchFollowers()
    }, [id])

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                {!searchuser ? <img src={user?.coverPicture ? serverPublic + user?.coverPicture : serverPublic + "coverimage.jpg"} alt="" />
                    :
                    <img src={searchuser?.coverPicture ? serverPublic + searchuser?.coverPicture : serverPublic + "coverimage.jpg"} alt="" />
                }

                {!searchuser ? <img src={user?.profilePicture ? serverPublic + user?.profilePicture : serverPublic + "avatar.png"} alt="" />
                    :
                    <img src={searchuser?.profilePicture ? serverPublic + searchuser?.profilePicture : serverPublic + "avatar.png"} alt="" />
                }
            </div>
            <div className="ProfileName">
                {!searchuser ? <span>{user.firstname} {user.lastname} {user.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ''}</span>
                    : <span>{searchuser.firstname} {searchuser.lastname} {searchuser.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ''}</span>
                }
            
            </div>
            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        {!searchuser ? <span>{following?.length}</span>
                            : <span>{searchuser?.following?.length}</span>
                        }
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        {!searchuser ? <span>{followers?.length}</span>
                            : <span>{searchuser?.followers?.length}</span>
                        }
                        <span>Followers</span>
                    </div>
                    {location !== 'homepage' ?
                        <>
                            <div className="vl">
                            </div>
                            <div className="follow">
                                {/* <span>{posts.filter((post) => post.userId === user._id).length}</span> */}
                                {!searchuser ? <span>{posts.filter((post) => post.userId === user._id).length}</span>
                                    : <span>{searchuser?.allPosts?.length}</span>
                                }
                                <span>Posts</span>
                            </div>
                        </>
                        : ""}
                </div>
                <hr />
            </div>
            {location !== 'homepage' ? "" :
                <span>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>
                        My Profile
                    </Link>
                </span>
            }

        </div>
    );
}

export default ProfileCard;
