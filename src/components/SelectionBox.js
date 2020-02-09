import React from 'react';
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  wrapShape,
} from 'react-shape-editor';

function arrayReplace(arr, index, item) {
  return [
    ...arr.slice(0, index),
    ...(Array.isArray(item) ? item : [item]),
    ...arr.slice(index + 1),
  ];
}

const RectShape = wrapShape(({ width, height }) => (
  <rect width={width} height={height} fill="rgba(0,0,255,0.5)" />
));

let idIterator = 1;
export default class SelectionBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsLeft: [
        //{ id: '1', x: 0, y: 10, width: 50, height: 25 },
        //{ id: '2', x: 120, y: 0, width: 20, height: 75 },
      ],
      itemsRight:[],

      vectorWidth: 0,
      vectorHeight: 0,
    };
  }

  render() {
    const { itemsLeft,itemsRight, vectorWidth, vectorHeight } = this.state;
    console.log(itemsLeft,itemsRight)
    return (
     
        <ShapeEditor vectorWidth={vectorWidth} vectorHeight={vectorHeight} style={{position:"relative",top:12,left:0}}>
          <ImageLayer
            src={this.props.src}
            onLoad={({ naturalWidth, naturalHeight }) => {
              this.setState({
                vectorWidth: naturalWidth,
                vectorHeight: naturalHeight,
              });
            }}
            
          />
          <DrawLayer
            onAddShape={({ x, y, width, height }) => {
              this.setState(state => ({
                itemsLeft: [
                  ...state.itemsLeft,
                  { id: `id${idIterator}`, x, y, width, height },
                ],
                itemsRight: [
                  ...state.itemsRight,
                  { id: `id${idIterator}`, x, y, width, height },
                ],
                 
              }));
              idIterator += 1;
            }}



          />

          {this.props.targetContainer==="left" && itemsLeft.map((item, index) => {
            const { id, height, width, x, y } = item;
            return (
              <RectShape
                key={id}
                shapeId={id}
                height={height}
                width={width}
                x={x}
                y={y}

                onChange={newRect => {
                  this.setState(state => ({
                    itemsLeft: arrayReplace(state.itemsLeft, index, {
                      ...item,
                      ...newRect,
                    }),
                  }));
                }}
                onDelete={() => {
                  this.setState(state => ({
                    itemsLeft: arrayReplace(state.itemsLeft, index, []),
                    itemsRight: arrayReplace(state.itemsRight, index, []),
                  }));
                }}
              />
            );
          })}
          {this.props.targetContainer==="right" && itemsRight.map((item, index) => {
            const { id, height, width, x, y } = item;
            return (
              <RectShape
                key={id}
                shapeId={id}
                height={height}
                width={width}
                x={x}
                y={y}

                onChange={newRect => {
                  this.setState(state => ({
                    itemsRight: arrayReplace(state.itemsRight, index, {
                      ...item,
                      ...newRect,
                    }),
                  }));
                }}
                onDelete={() => {
                  this.setState(state => ({
                    itemsLeft: arrayReplace(state.itemsLeft, index, []),
                    itemsRight: arrayReplace(state.itemsRight, index, []),
                  }));
                }}
              />
            );
          })}
        </ShapeEditor>
      
    );
  }
}