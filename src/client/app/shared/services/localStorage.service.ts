import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService{
    saveHall(data)
    {
        
        console.log("Event Details:", data);
        //var eventDetail = [];
        let halls = localStorage.getItem('halls')? JSON.parse(localStorage.getItem('halls')): [];
        halls.push(data);
        localStorage.setItem('halls', JSON.stringify(halls));
        
        

        //console.log("Locat Storage is :", localStorage.getItem("Event Details"))
    }

    getEvents()
    {

        return JSON.parse(localStorage.getItem("halls"));
    }

    saveBooking(data)
    {
        let bookings = localStorage.getItem('booking')? JSON.parse(localStorage.getItem('booking')): [];
        bookings.push(data);
        localStorage.setItem('booking', JSON.stringify(bookings));
    }

    editBooking(id)
    {
        let booking = JSON.parse(localStorage.getItem('booking'));
        let halls = JSON.parse(localStorage.getItem('halls'));

        let newBooking = []
        debugger
        console.log("Booking",booking);
        console.log("Halls", halls);
         for (let item of booking)
         {
             if (item._id == id)
             {
                console.log(item);
             }
             else{
             newBooking.push(item);
             }
             localStorage.setItem('booking', JSON.stringify(newBooking));
             
         }
    }
    getBooking()
    {
        return JSON.parse(localStorage.getItem("booking"));
    }

    bookEvent(event)
    {
        console.log("Event");
        

    }

}
