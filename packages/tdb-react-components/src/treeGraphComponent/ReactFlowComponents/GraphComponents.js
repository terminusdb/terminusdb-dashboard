import React from 'react';
import Stack from "react-bootstrap/Stack"
import * as style from "./styles"

export const PanelLegend = () => {
  return <Stack direction='horizontal' gap={2}>
    <Stack direction='horizontal' gap={2}>
      <div style={style.selected_style}></div>  
      <div className='fst-italic text-muted small'>Selected Document</div>
    </Stack>
    <Stack direction='horizontal' gap={2}>
      <div style={style.enum__style}></div>  
      <div className='fst-italic text-muted small'>Enums</div>
    </Stack>
    <Stack direction='horizontal' gap={2}>
      <div style={style.document__style}></div>  
      <div className='fst-italic text-muted small'>Documents</div>
    </Stack>
    <Stack direction='horizontal' gap={2}>
      <div style={style.subdocument_style}></div>  
      <div className='fst-italic text-muted small'>SubDocuments</div>
    </Stack>
  </Stack>
}