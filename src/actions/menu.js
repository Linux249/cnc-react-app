
export function showBuildingMenu(from) {
    return {
        type: 'SHOW_BUILDING_MENU',
        from
    }
}

export function hideBuildingMenu() {
    return {
        type: 'HIDE_BUILDING_MENU'
    }
}

export function changeFraction(fraction) {
    return {
        type: 'CHANGE_FRACTION',
        fraction
    }
}



