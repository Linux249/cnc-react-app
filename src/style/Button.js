import styled from 'styled-components';
import { shadow, backgroundColor, border, borderRadius } from './constants';

export const Button = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${backgroundColor};
    border: ${border};
    border-radius: ${borderRadius};
    box-shadow: ${shadow};

    ${({ active }) => (active ? 'border-color: red;' : '')} //margin: 2px;
    padding: 5px 12px;
    margin: 1px 2px;

    &:hover {
        box-shadow: 0 4px 8px 0 rgba(30, 136, 229, 0.2), 0 6px 20px 0 rgba(30, 136, 229, 0.19);
    }

    &:active {
        box-shadow: 0 2px 10px rgba(150, 150, 150, 0.1);
    }
`;
export default Button;
