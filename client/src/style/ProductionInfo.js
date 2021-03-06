import styled from 'styled-components';

export default styled.div`
    //    position: relative ;
    display: flex;
    //justify-content: space-between;
    //align-content: space-around;
    // flex-wrap: wrap;

    margin-bottom: 10px;

    & > div > img {
        margin-right: 5px;
    }
    & > div {
        display: flex;
        align-items: center;
        flex: 1;
    }

    & > div:hover {
        box-shadow: 0 4px 8px 0 rgba(30, 136, 229, 0.2), 0 6px 20px 0 rgba(30, 136, 229, 0.19);
    }
`;
