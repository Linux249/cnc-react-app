import styled from 'styled-components';
import { alarm } from './constants';

export default styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    padding: 10px;
    margin-bottom: 15px;

    box-sizing: border-box;
    background-color: ${alarm};

    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    color: #fff;
    font-weight: 700;
    font-size: 0.8rem;
`;
