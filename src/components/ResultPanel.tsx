import * as React from "react";
import * as ReactDOM from "react-dom";

import "./resultPanel.scss";
import { GameResult } from "../valueObjects/gameResult";

export const ResultPanel: React.SFC<IResultPanelProps> = (props) => {
    if (props.result == null)
        return null;
    
    return(
        <div className={'result-panel'}>
            <div className={'row'}>
                <div className={'cell'}></div>
                <div className={'cell label'}>Audio</div>
                <div className={'cell label'}>Position</div>
                <div className={'cell label'}>Total</div>
            </div>
            <div className={'row'}>
                <div className={'cell left'}>Matches: </div>
                <div className={'cell label'}>{props.result.audioMatchCount}</div>
                <div className={'cell label'}>{props.result.positionMatchCount}</div>
                <div className={'cell label'}>{props.result.audioMatchCount + props.result.positionMatchCount}</div>
            </div>
            <div className={'row'}>
                <div className={'cell left'}>Misses: </div>
                <div className={'cell label'}>{props.result.audioMissCount}</div>
                <div className={'cell label'}>{props.result.positionMissCount}</div>
                <div className={'cell label'}>{props.result.audioMissCount + props.result.positionMissCount}</div>
            </div>
            <div className={'row'}>
                <div className={'cell'}></div>
                <div className={'cell label'}>{props.result.audioMatchPercentage}%</div>
                <div className={'cell label'}>{props.result.positionMatchPercentage}%</div>
                <div className={'cell label bold'}>{props.result.generalMatchPercentage}%</div>
            </div>
        </div>
    );
}

interface IResultPanelProps {
    result:GameResult;
}