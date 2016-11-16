## Models

### Admin

```json
{
  "id": "someAuthorToken",
  "eventId": "sid"
}
```

### Event

```json

{
  "id": "sure",
  "title": "some title",
  "description": "some description",
  "location": "some location",
  "duration": 12343,
  "emails" : [
    "test@test.com",
    "boaty@mcboatface.coms"
  ],
  "options": {
      "startTime": "count"
  }
}

```

# Endpoints

## /event

### post :

create new event. Owned by logged in user if available.

<br>

__Request__:

```json

{
    "title": "some title",
    "description": "some description",
    "location": "some location",
    "duration": 12343,
    "emails" : [
      "test@test.com",
      "boaty@mcboatface.coms"
    ],
    "options": [
      {
        "startTime": 12321242132
      }
    ]

}

```

__Response__:

An `Event`

###
