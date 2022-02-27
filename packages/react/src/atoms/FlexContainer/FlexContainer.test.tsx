import React from "react";
import FlexContainer from "./FlexContainer";
import { render } from '@testing-library/react';


test('check if the div inside entered correctly', () => {
    const { getByTestId } = render(<FlexContainer><div data-testid='dseDiv'>some text</div></FlexContainer>);
    expect(getByTestId('dseDiv').innerHTML).toEqual("some text");
})