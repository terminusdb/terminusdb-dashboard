import React, {useState} from "react"
import { SketchPicker } from 'react-color';

export const TDBReactColorPallet =(props) => {

    const [palletColor, setPalletColor] = useState("#000")
    
      function handleChangeComplete  (color) {
        setPalletColor(color.hex);
        if(props.setColor) props.setColor(color.rgb)
      }
    
        return (
          <SketchPicker
            color={palletColor}
            onChangeComplete={handleChangeComplete}
          />
        )
    
}