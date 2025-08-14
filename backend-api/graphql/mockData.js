const users = [
  {
    id: "1",
    username: "JohnDoe",
    email: "john@example.com",
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-05T15:30:00Z"),
    programs: [
      {
        id: "101",
        name: "Strength Training",
        visibility: "PUBLIC",
        createdAt: new Date("2025-01-02T09:00:00Z"),
        updatedAt: new Date("2025-01-04T11:00:00Z"),
        owner: {
          id: "1",
          username: "JohnDoe",
          email: "john@example.com"
        },
        workouts: [
          {
            id: "201",
            name: "Leg Day",
            visibility: "PRIVATE",
            createdAt: new Date("2025-01-03T08:00:00Z"),
            updatedAt: new Date("2025-01-03T12:00:00Z"),
            owner: {
              id: "1",
              username: "JohnDoe",
              email: "john@example.com"
            },
            exercises: [
              {
                id: "301",
                name: "Squat",
                visibility: "PUBLIC",
                createdAt: new Date("2025-01-03T08:15:00Z"),
                updatedAt: new Date("2025-01-03T08:45:00Z"),
                owner: {
                  id: "1",
                  username: "JohnDoe",
                  email: "john@example.com"
                }
              },
              {
                id: "302",
                name: "Lunge",
                visibility: "PUBLIC",
                createdAt: new Date("2025-01-03T09:00:00Z"),
                updatedAt: new Date("2025-01-03T09:20:00Z"),
                owner: {
                  id: "1",
                  username: "JohnDoe",
                  email: "john@example.com"
                }
              }
            ]
          }
        ]
      }
    ],
    workouts: [
      {
        id: "201",
        name: "Leg Day",
        visibility: "PRIVATE",
        createdAt: new Date("2025-01-03T08:00:00Z"),
        updatedAt: new Date("2025-01-03T12:00:00Z"),
        owner: {
          id: "1",
          username: "JohnDoe",
          email: "john@example.com"
        },
        exercises: [
          {
            id: "301",
            name: "Squat",
            visibility: "PUBLIC",
            createdAt: new Date("2025-01-03T08:15:00Z"),
            updatedAt: new Date("2025-01-03T08:45:00Z"),
            owner: {
              id: "1",
              username: "JohnDoe",
              email: "john@example.com"
            }
          },
          {
            id: "302",
            name: "Lunge",
            visibility: "PUBLIC",
            createdAt: new Date("2025-01-03T09:00:00Z"),
            updatedAt: new Date("2025-01-03T09:20:00Z"),
            owner: {
              id: "1",
              username: "JohnDoe",
              email: "john@example.com"
            }
          }
        ]
      }
    ],
    exercises: [
      {
        id: "301",
        name: "Squat",
        visibility: "PUBLIC",
        createdAt: new Date("2025-01-03T08:15:00Z"),
        updatedAt: new Date("2025-01-03T08:45:00Z"),
        owner: {
          id: "1",
          username: "JohnDoe",
          email: "john@example.com"
        }
      },
      {
        id: "302",
        name: "Lunge",
        visibility: "PUBLIC",
        createdAt: new Date("2025-01-03T09:00:00Z"),
        updatedAt: new Date("2025-01-03T09:20:00Z"),
        owner: {
          id: "1",
          username: "JohnDoe",
          email: "john@example.com"
        }
      }
    ]
  },
  {
    id: "2",
    username: "JaneSmith",
    email: "jane@example.com",
    createdAt: new Date("2025-01-10T10:00:00Z"),
    updatedAt: new Date("2025-01-12T14:30:00Z"),
    programs: [],
    workouts: [],
    exercises: []
  }
];

export default users;
