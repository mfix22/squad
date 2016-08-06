export class Event {
	_id: number;
	name: string;
    title           : string;
    meetingSpots    : [{
        requestedUserID: number;
        requestedUserName: string;
        status: number;
        location: {
            long: number;
            lat: number;
            address: string;
            city: string;
            state: string;
            zip: number;
            country: string;
        }
    }];
		meetingTimes: [{
      startTime    : Date;
      endTime 	 : Date;
    }];
    description  : string
    dateCreated  : Date;
    attendees    : [{
        id      :   String;
        creator :   Boolean;
    }];
}
