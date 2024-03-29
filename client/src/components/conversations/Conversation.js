import './conversation.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        // const res = await axios('/users?:userId' + friendId);
        const { data } = await axios.get(`/api/getProfile/${friendId}`);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className='conversation'>
      <img className='conversationImg' src={user?.picture} alt='' />
      <span className='conversationName'>{user?.name}</span>
    </div>
  );
}
