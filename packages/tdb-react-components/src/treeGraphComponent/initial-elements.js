import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes = [

  {
    id: '4',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: {
      selects: {
        'handle-0': 'smoothstep',
        'handle-1': 'smoothstep',
      },
    },
  },
  {
    id: '5',
    type: 'output',
    data: {
      label: '5',
    },
    className: 'circle',
    style: {
      background: '#2B6CB0',
      color: 'white',
    },
    position: { x: 400, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    type: 'output',
    style: {
      background: '#63B3ED',
      color: 'white',
      width: 100,
    },
    data: {
      label: '6',
    },
    position: { x: 400, y: 325 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }
];

export const edges = [
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'smoothstep',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
