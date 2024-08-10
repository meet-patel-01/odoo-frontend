import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css'
import Rooms from './room list/rooms'
import axios from 'axios';
import { URL } from './constants';
import Search from './room list/search';
import { BookingDetail } from './booking/booking.model';

export interface RoomsInterface {
  _id: string,
  name: string,
  facilities: string[],
  seatCapacity: number
}

function App() {
  const [roomList, setRoomList] = useState<RoomsInterface[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomsInterface | undefined>();

  const onSelect = (room: RoomsInterface) => {
    setSelectedRoom(room);
  }

  const onSearch = async (text: string) => {
    axios.get(URL + 'room/' + text).then((data) => {
      setRoomList(data.data);
    }).catch((reason) => {
      console.error('>> Custom Error Log >> ', reason);
    })

  }
  return (
    <>
      <Search onSearch={onSearch} />
      <div className='room-list'>
        {
          roomList.map((room: RoomsInterface) => <Rooms onSelect={onSelect} key={room._id} room={room}></Rooms>)
        }
      </div>
       <BookingDetail show={!!selectedRoom} room={selectedRoom} handleClose={() => setSelectedRoom(undefined)}></BookingDetail>
    </>
  )
}

export default App
