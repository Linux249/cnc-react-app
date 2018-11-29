import {
    PLAYER_CHANGE_LOADING,
    PLAYER_CHANGE_WORLD,
    PLAYER_UPDATE_BASES,
    PLAYER_UPDATE,
    PLAYER_UPDATE_ALLIANCE_ID, REPLACE_BASE_FROM_URL,
} from '../constants/actionTypes';
import { api_url } from '../../config';

export function changeWorld(world) {
    return async (dispatch, getStore) => {
        await dispatch({
            type: PLAYER_CHANGE_WORLD,
            w: world.worldId,
        });
        dispatch(changeLoading(true));

        // todo requqest player data
        const url = api_url + '/player?player=' + world.player_id + '&world=' + world.worldId;
        const player = await fetch(url, {
            headers: new Headers({
                Authorization: 'Bearer  ' + getStore().auth.token,
            }),
        }).then(res => res.json());
        console.log({ player });
        player.bases && dispatch(updateBases(player.bases));
        player.allianceId && dispatch(updateAllianceId(player.allianceId));
        dispatch(changeLoading(false));
    };
}

export const updateBases = bases => {
    return (dispatch, getStore) => {

        const { selectedBase } = getStore().player;
        const base = bases[selectedBase]

        dispatch({
            type: PLAYER_UPDATE_BASES,
            bases,
        })
        dispatch({
            type: REPLACE_BASE_FROM_URL,
            url: base.layout
        })
    };
};

export const updateAllianceId = allianceId => {
    return {
        type: PLAYER_UPDATE_ALLIANCE_ID,
        allianceId,
    };
};

export const updatePlayer = user => {
    return (dispatch, getState) => {
        dispatch({
            type: PLAYER_UPDATE,
            name: user.player,
            worlds: user.worlds,
        });
        // check if the world id changed - usefully for initial loading kick
        const { selectedWorld, w } = getState().player;
        const world = user.worlds[selectedWorld];
        if (world && w !== world.worldId) dispatch(changeWorld(world));
    };
};

export function changeLoading(loading) {
    return {
        type: PLAYER_CHANGE_LOADING,
        loading,
    };
}
