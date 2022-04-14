import {getUser} from "../../api/user";
import UserCard from "./index";
import {render, screen, waitFor} from "@testing-library/react";

// this is a factory returns stub user object (imitation of response)
const mockUserFactory = (userId) => {
    return {
        userId,
        name: "Julia Avasyan",
        position: "Software Developer",
    }
}

// mock module to prevent api-calls during running unit-tests
jest.mock('../../api/user', () => {
    return {
        /*  return a new getUser function instead of original. */
        getUser: jest
            .fn() // it's a watcher. It allows us to use matcher like toBeCalledTimes in our tests
            .mockImplementation( // it's a mock implementation. It will be used in tests instead of original
                (id) => Promise.resolve(mockUserFactory(id))
            )
    }
})


describe('UserCard', () => {
    test("api call on mount", async () => {
        const stubUserId = '123';
        // render component with react testing library
        render(<UserCard userId={stubUserId}/>);
        // waiting for the end of the render
        await waitFor(() => {
            // check, that rendered component contains name of our stub user
            expect(screen.findByText(mockUserFactory(stubUserId).name)).not.toBeNull()
        })
        // check, that api-wrapper was called
        expect(getUser).toBeCalledTimes(1);
        // check, that parameter was sended to api-wrapper
        expect(getUser).toBeCalledWith(stubUserId);
    })
})