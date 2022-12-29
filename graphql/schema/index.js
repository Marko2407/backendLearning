const {buildSchema} = require('graphql')

module.exports = buildSchema(`
        type Event{
            _id: ID!
            title: String!
            description : String!
            price: Float!
            date: String!
            creator: User!
        }

         type User{
            _id: ID!
            email: String!
            password : String
            createdEvents: [Event!]
            refreshToken: String
        }

        type AuthData{
            userId: ID!
            token: String!
            refreshToken: String!
            tokenExpired: Int!
        }

        type Token{
            token: String!
            expired: Int!
        }

        type Booking{
             _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updateAt: String!
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput{
            email: String!
            password: String!
        }

        type RootQuery{
            events: [Event!]!
            user: User!
            bookings: [Booking!]!
            login(email: String!, password: String!):AuthData!
        }
        type RootMutation{
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
            bookEvent(eventId: ID): Booking!
            cancelBooking(bookingId: ID): Event!
            newAccessToken(userId: String!,refreshToken: String): Token!
        }
    schema{
        query: RootQuery
        mutation:RootMutation
}
`);