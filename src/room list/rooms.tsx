import { Badge } from "react-bootstrap"
import { RoomsInterface } from "../App"

function Rooms({ room, onSelect }: { room: RoomsInterface, onSelect: (room: RoomsInterface) => void }) {
  return (
    <div className='room-card' onClick={() => onSelect(room)}>
      <div className='header-detail'>
        <div>{room.name}</div>
        <div className="tag-list">{room.facilities.map((tag: string) => <Badge bg="dark" className="tag">{tag}</Badge>)}</div>
      </div>
      <div> {room.seatCapacity} seat capacity </div>
    </div>
  )
}

export default Rooms