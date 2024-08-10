import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { URL } from "../constants"
import { RoomsInterface } from "../App"
import DatePicker from "react-datepicker"

export interface BookingDetailsInterface {
    booking_date: Date,
    booking_time: string
}

export const BookingDetail = ({ show, handleClose, room }: { show: boolean, handleClose: () => void, room: RoomsInterface | undefined }) => {
    const [bookingInfo, setBookingInfo] = useState<BookingDetailsInterface[]>()
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [availableTime, setAvailableTime] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>();

    const fetchData = () => {
        axios.get(URL + 'booking/' + room?._id).then((data) => {
            setBookingInfo(data.data);
        })
    }

    const getAvailableTime = () => {
        const bookedTime: string[] = bookingInfo?.map((value) => value.booking_time) || [];
        const availableTime = [];
        
        const currentDate = selectedDate.getDay() == new Date().getDay() ? selectedDate : new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDay(), 0, 0, 0, 0);
        for (let i = currentDate.getHours(); i < 24; i++) {
            if (currentDate.getHours() == i && currentDate.getMinutes() > 30) {
                continue;
            } else {
                availableTime.push(`${i}:00 - ${i}:30`, `${i}:30 - ${i + 1}:00`)
            }
        }
        console.log('>> booking info', bookingInfo, bookedTime, availableTime)
        return availableTime.filter((time) => !bookedTime.includes(time))
    }

    const onDateChange = (date) => {
        setSelectedDate(date)
    }

    const submitForm = () => {
        if((!selectedTime || !selectedDate)) return false;

        axios.post(URL + 'booking', {
            room_id: room?._id,
            booking_time: selectedTime,
            booking_date: new Date(selectedDate).toISOString(),
        }).then(() => {
            handleClose();
        });
    }

    useEffect(() => {
        setAvailableTime(getAvailableTime())
    }, [selectedDate, bookingInfo])

    useEffect(() => {
        fetchData()
    }, [room])

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{room?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DatePicker selected={selectedDate} minDate={new Date()} onChange={onDateChange} />
                <br />
                <br />
                <div className="time-slot-list">
                    {
                        availableTime.map((time: string, i: number) => {
                            return <div className="time-slots">
                                <input type="radio" name={'time'} checked={selectedTime == time} value={time} onChange={(e) => {
                                    setSelectedTime(e.target.value)}} />
                                {time}
                            </div>
                        })
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitForm}>
                    Book Room
                </Button>
            </Modal.Footer>
        </Modal></>
}