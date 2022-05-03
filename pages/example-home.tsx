import type { NextPage } from 'next'
import  Router from 'next/router'

const Home: NextPage = () => {
  

  const handleClick = () => {
    Router.push('example-room');
    // fetch('api/socket', {
    //   method: 'POST',
    //   body: JSON.stringify({room: 'room'})
    // }).then((res) => {
    // })
  }

  return (
    <div>
      <button onClick={handleClick}>Create Room!</button>
    </div>
  )
}

export default Home
