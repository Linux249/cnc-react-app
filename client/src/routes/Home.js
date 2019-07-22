import React from 'react';
import BuildingMenu from '../containers/BuildingMenu';
import UrlInfo from '../components/UrlLoader';
import Share from '../components/Share';
import Base from '../components/Base';
import Column from '../style/Column';
import Body from '../style/Body';
import Army from '../components/Army';
import Defense from '../components/Defense';
import ResetArea from '../containers/ResetArea';

export default () => (
    <Column center>
        <Body>
            <BuildingMenu area="buildings" />
            <Base />
            <div>
                <ResetArea />
                <Share />
                <UrlInfo />
            </div>
            <BuildingMenu area="defense" />
            <Defense />
            <div />
            <BuildingMenu area="army" />
            <Army />
        </Body>
    </Column>
);
