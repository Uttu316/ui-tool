import React from "react";
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  wrapShape
} from "react-shape-editor";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ResizeHandleComponent from "./ResizeHandleComponent";
const constrainMove = ({ x, y, width, height, vectorHeight, vectorWidth }) => {
  return {
    x: Math.round(Math.min(vectorWidth - width, Math.max(0, x))),
    y: Math.round(Math.min(vectorHeight - height, Math.max(0, y)))
  };
};

const constrainResize = ({
  movingCorner: { x: movingX, y: movingY },
  vectorHeight,
  vectorWidth
}) => {
  return {
    x: Math.round(Math.min(vectorWidth, Math.max(0, movingX))),
    y: Math.round(Math.min(vectorHeight, Math.max(0, movingY)))
  };
};

function arrayReplace(arr, index, item) {
  return [
    ...arr.slice(0, index),
    ...(Array.isArray(item) ? item : [item]),
    ...arr.slice(index + 1)
  ];
}

let idIterator = 1;
const initialState = {
  mouseX: null,
  mouseY: null
};
const SelectionBox = props => {
  const [vectorHeight, setVectorHeight] = React.useState(0);
  const [vectorWidth, setVectorWidth] = React.useState(0);
  const [state, setState] = React.useState(initialState);
  let indextoDel;
  const handleClick = event => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
  };
  const handleClose = () => {
    setState(initialState);
  };
  const handleDelete = () => {
    const index = props.itemsLeft.findIndex(x => x.id === indextoDel);
    console.log(index - 1, props.itemsLeft);
    const newLeftArray = arrayReplace(props.itemsLeft, index - 1, []);
    props.setItemsLeft(newLeftArray);
    const newRightArray = arrayReplace(props.itemsRight, index - 1, []);
    props.setItemsRight(newRightArray);
    setState(initialState);
  };
  const RectShape = wrapShape(({ width, height }) => (
    <rect
      onContextMenu={handleClick}
      style={{ cursor: "context-menu" }}
      width={width}
      height={height}
      fill="rgba(0,0,255,0.5)"
    />
  ));
  return (
    <ShapeEditor vectorWidth={vectorWidth} vectorHeight={vectorHeight}>
      <ImageLayer
        src={props.src}
        onLoad={({ naturalWidth, naturalHeight }) => {
          setVectorWidth(naturalWidth);
          setVectorHeight(naturalHeight);
        }}
      />

      {/*props.targetContainer === "right" && (
        <iframe src={"https://www.w3schools.com"} height="200" width="300" />
      )*/}
      <DrawLayer
        constrainResize={constrainResize}
        constrainMove={constrainMove}
        onAddShape={({ x, y, width, height }) => {
          x = 0;

          props.setItemsLeft([
            ...props.itemsLeft,
            { id: `id${idIterator}`, x, y, width, height }
          ]);
          props.setItemsRight([
            ...props.itemsRight,
            { id: `id${idIterator}`, x, y, width, height }
          ]);
          idIterator += 1;
        }}
      />

      {props.targetContainer === "left" &&
        props.itemsLeft.map((item, index) => {
          const { id, height, x, y } = item;
          return (
            <RectShape
              key={id}
              shapeId={id}
              height={height}
              width={vectorWidth}
              x={x}
              y={y}
              constrainResize={constrainResize}
              constrainMove={constrainMove}
              ResizeHandleComponent={ResizeHandleComponent}
              onFocus={(e, rect) => {
                indextoDel = rect.shapeId;
                console.log(rect.shapeId);
              }}
              onChange={newRect => {
                console.log(newRect, "newRect");

                const isAreaChanged = newRect.height !== height;
                const targetRectIndex = props.itemsRight.findIndex(
                  x => x.id === id
                );

                const rightTargetY = props.itemsRight[targetRectIndex].y;
                if (isAreaChanged) {
                  const newLArray = arrayReplace(props.itemsLeft, index, {
                    ...item,
                    ...newRect
                  });
                  console.log(newLArray, "scalednewLarray");

                  props.setItemsLeft(newLArray);
                  if (rightTargetY !== y) {
                    const newRArray = arrayReplace(props.itemsRight, index, {
                      ...item,
                      ...newRect
                    });
                    if (y !== newRect.y) {
                      newRArray[targetRectIndex].y =
                        rightTargetY - Math.abs(newRect.y - y);
                    } else {
                      newRArray[targetRectIndex].y = rightTargetY;
                    }
                    console.log(newRArray, "onlyscalednewRarray");
                    props.setItemsRight(newRArray);
                  } else {
                    props.setItemsLeft(newLArray);

                    const newRArray = arrayReplace(props.itemsRight, index, {
                      ...item,
                      ...newRect
                    });
                    console.log(newRArray, "scalednewRarray");
                    props.setItemsRight(newRArray);
                  }
                } else if (newRect.y !== y) {
                  const newLArray = arrayReplace(props.itemsLeft, index, {
                    ...item,
                    ...newRect
                  });
                  console.log(newLArray, "DraggednewLarray");

                  props.setItemsLeft(newLArray);
                }
              }}
              onDelete={() => {
                if (props.targetContainer === "left") {
                  const newLeftArray = arrayReplace(props.itemsLeft, index, []);
                  props.setItemsLeft(newLeftArray);
                  const newRightArray = arrayReplace(
                    props.itemsRight,
                    index,
                    []
                  );
                  props.setItemsRight(newRightArray);
                }
              }}
            />
          );
        })}
      {props.targetContainer === "right" &&
        props.itemsRight.map((item, index) => {
          const { id, height, x, y } = item;
          return (
            <RectShape
              key={id}
              shapeId={id}
              height={height}
              width={vectorWidth}
              x={x}
              y={y}
              constrainResize={constrainResize}
              constrainMove={constrainMove}
              ResizeHandleComponent={ResizeHandleComponent}
              onChange={newRect => {
                console.log(newRect, "newRect");
                const isAreaChanged = newRect.height !== height;
                if (newRect.y !== y && !isAreaChanged) {
                  const newRArray = arrayReplace(props.itemsRight, index, {
                    ...item,
                    ...newRect
                  });
                  console.log(newRArray, "DraggednewRarray");
                  props.setItemsRight(newRArray);
                }
              }}
              onDelete={() => {
                if (props.targetContainer === "left") {
                  const newLeftArray = arrayReplace(props.itemsLeft, index, []);
                  props.setItemsLeft(newLeftArray);
                  const newRightArray = arrayReplace(
                    props.itemsRight,
                    index,
                    []
                  );
                  props.setItemsRight(newRightArray);
                }
              }}
            />
          );
        })}
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => handleDelete()}>Delete</MenuItem>
      </Menu>
    </ShapeEditor>
  );
};
export default SelectionBox;