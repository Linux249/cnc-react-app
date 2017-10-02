import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replaceBuilding  } from './../actions/base'
import { changeFraction } from './../actions/menu'
import { buildingKeys } from './../util/buildings'
import './../style/BuildingMenu.css'


class BuildingMenu extends Component {

    render() {
        const { changeFraction, faction } = this.props

        return (
            <div className="BuildingMenu" >
                <div className="fraction">
                    <div className="fractionButton" onClick={() => changeFraction("nod")}>
                        NOD
                    </div>
                    <div className="fractionButton" onClick={() => changeFraction("gdi")}>
                        GDI
                    </div>
                </div>

                {buildingKeys.map((b) => {
                    const img = require("./../img/buildings/"+ faction + "/"+ b + ".png")
                    return (
                        <div
                            className="BuildingMenuItem"
                            key={b}
                         //   onClick={() => changeBuild(from, b, lvl)}
                        >
                            <img src={img} alt={b} />
                            <div>{b}</div>
                        </div>
                  )
                })}
            </div>
        )
    }


}
function mapStateToProps(state) {
    return {
       // lvl: state.buildings[state.menu.from].lvl || state.menu.lvl,
        faction: state.base.faction
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        replaceBuilding: (building) => dispatch(replaceBuilding(building)),
        changeFraction: fraction => dispatch(changeFraction(fraction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingMenu)
