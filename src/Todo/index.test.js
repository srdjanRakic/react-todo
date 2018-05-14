
import React from 'react';
import { shallow } from 'enzyme';
import ToDo from './';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

describe("ToDo Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <ToDo />
                </Provider>
            ).exists()
        ).toBe(true);
    });
});