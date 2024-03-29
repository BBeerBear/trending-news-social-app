import { useEffect, useState } from 'react';

export default function Activities({
  activities,
  onlineTime,
  visitor,
  friendship,
}) {
  var [date, setDate] = useState(new Date());
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [onlineTime]);
  let realtimeOnlineTime = date - Date.parse(localStorage.getItem('loginTime'));
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };
  let seconds = Math.floor((onlineTime + realtimeOnlineTime) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  const displayOnline = `${padTo2Digits(hours)}:${padTo2Digits(
    minutes
  )}:${padTo2Digits(seconds)}`;
  return (
    <div className='profile_card'>
      <div className='profile_card_header'>My Acitivity</div>
      {!visitor || friendship?.friends ? (
        <>
          <b>Time spent on app</b>
          <br />
          <p>{displayOnline}</p>
          <br />
          <b>Activities</b>
          {activities?.reverse().map((a, i) => (
            <div key={i}>{a}</div>
          ))}
        </>
      ) : (
        <b>!!!Only friends can see activities</b>
      )}
    </div>
  );
}
