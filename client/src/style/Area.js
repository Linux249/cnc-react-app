import styled from 'styled-components';
import { shadow, backgroundColor, border, borderRadius } from './constants';

export const Area = styled.div`
    position: relative;
    //display: flex;
    //flex-flow: column;
    //flex-wrap: wrap;
    // background-color: ${backgroundColor};
    border: ${border};
    border-radius: ${borderRadius};
    box-shadow: ${shadow};

    height: fit-content;
    //width: fit-content;

    padding: ${({ small }) => (small ? '2px' : '7px')};
    margin: 5px;
`;

export default Area;
