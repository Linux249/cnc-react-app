import React from 'react';
import { connect } from 'react-redux';
import { changeBaseLvl, changeFraction } from '../store/actions/base';
import keys from '../util/keys';
import Menu from '../style/BuildingMenu';
import Area from '../style/Area';
import Button from '../style/Button';
import styled from 'styled-components';
import imgs from '../img/imgs';
import { useDrag } from 'react-dnd';
import MenuItemStyle from '../style/BuildingMenuItem';
import Input from '../style/Input';

const Row = styled.div`
    display: flex;
`;
const Right = styled.div`
    display: flex;
    justify-content: flex-end;
`;

function MenuItem(props) {
    const { faction, type, area } = props;
    const img = imgs[area][faction][type];

    const [, drag] = useDrag({
        item: { type: area, bType: type, new: true },
    });
    return (
        <MenuItemStyle ref={drag}>
            <img src={img} alt={type} />
            <div>{type}</div>
        </MenuItemStyle>
    );
}

function BuildingMenu(props) {
    const { changeFraction, faction, area, lvl } = props;
    const items = keys[area][faction].map(type => {
        // const lvl = type !== 't' && type !== 'c' ? props.lvl : undefined;
        return <MenuItem faction={faction} type={type} area={area} key={type} />;
    });

    function handleChangeLvl(lvl) {
        props.changeLvl(lvl < 1 ? 1 : lvl > 65 ? 65 : Math.round(lvl));
    }
    return (
        <Right>
            <div>
                <Area>
                    <Row>
                        <Button active={faction === 'N'} onClick={() => changeFraction('N')}>
                            NOD
                        </Button>
                        <Button active={faction === 'G'} onClick={() => changeFraction('G')}>
                            GDI
                        </Button>
                        <Button active={faction === 'F'} onClick={() => changeFraction('F')}>
                            FOR
                        </Button>
                        <Input
                            small
                            onChange={({ target }) => handleChangeLvl(target.value)}
                            value={lvl}
                            type="number"
                            min={0}
                            max={65}
                        />
                    </Row>
                    <Menu>{items}</Menu>
                </Area>
            </div>
        </Right>
    );
}

function mapStateToProps(state) {
    return {
        faction: state.base.faction,
        lvl: state.base.baseLvl,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changeLvl: lvl => dispatch(changeBaseLvl(lvl)),
        changeFraction: fraction => dispatch(changeFraction(fraction)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingMenu);
