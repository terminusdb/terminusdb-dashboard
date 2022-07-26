import React from 'react';
import {TOOLBAR_LABELS} from '../../constants/details-labels';
import {AiOutlineZoomIn, AiOutlineZoomOut} from "react-icons/ai"
import {MdCropFree} from "react-icons/md"

export const ModelMainHeaderComponent =(props)=>{

	const setZoomIn=()=>{
		props.setZoomEvent({type:'ZOOM_IN','zoom':Date.now()});

	}
	const setZoomOut=()=>{
		props.setZoomEvent({type:'ZOOM_OUT','zoom':Date.now()});

	}
	const setResetView=()=>{
		props.setZoomEvent({type:'RESET_ZOOM','zoom':Date.now()});
	}

 
	return <div className="d-flex flex-grow-1 justify-content-end pr-4 pt-2">		
				<div role="group" className="btn-group">
					<button title={TOOLBAR_LABELS.ZoomInTooltip}  type="button" className="btn btn-outline-light btn-lg border-0" onClick={setZoomIn}>
						<AiOutlineZoomIn size="1.6em"/>
					</button>
					<button title={TOOLBAR_LABELS.ZoomOutTooltip} type="button" className="btn btn-outline-light btn-lg border-0" onClick={setZoomOut}>
						<AiOutlineZoomOut size="1.6em"/>
					</button>
					<button title={TOOLBAR_LABELS.ResetViewPoint} type="button" className="btn btn-outline-light btn-lg border-0" onClick={setResetView}>
						<MdCropFree size="1.6em"/>
					</button>
				</div>
			</div>	
}
