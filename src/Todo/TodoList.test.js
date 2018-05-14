import React from 'react';
import { shallow } from 'enzyme';
import TodoList from './TodoList';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

describe("TodoList Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <TodoList />
                </Provider>
            ).exists()
        ).toBe(true);
    });
});