export class BookingModel{
    public bookingDate : string;
    public bookedBy : string;
    public bookedHall : string;
    public status : string;

    constructor(bookingDate: string, bookedBy: string, bookedHall: string, status:string)
    {
        this.bookingDate = bookingDate;
        this.bookedBy = bookedBy;
        this.bookedHall = bookedHall;
        this.status = status;
    }
}