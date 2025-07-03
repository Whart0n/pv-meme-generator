import React, { useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text as KonvaText, Transformer } from 'react-konva';
import useImage from 'use-image';
import { v4 as uuidv4 } from 'uuid';
import './MemeEditor.css';

const TextBox = ({ textProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaText
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...textProps}
        draggable
        onDragEnd={(e) => {
          onChange({ ...textProps, x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          onChange({
            ...textProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
            scaleX: 1,
            scaleY: 1,
            fontSize: node.fontSize() * node.scaleX(),
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} rotateEnabled={false} />}
    </>
  );
};

export default function MemeEditor({ imageSrc }) {
  const [image] = useImage(imageSrc);
  const [texts, setTexts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const stageRef = useRef();

  const addText = () => {
    setTexts([
      ...texts,
      {
        id: uuidv4(),
        text: 'Text',
        x: 50,
        y: 50,
        fontSize: 32,
        fill: '#ffffff',
        stroke: '#000',
        strokeWidth: 2,
      },
    ]);
  };

  const download = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="editor-wrapper">
      <div className="toolbar">
        <button onClick={addText}>Add Text</button>
        <button onClick={download}>Download PNG</button>
      </div>
      {image && (
        <Stage width={600} height={600} ref={stageRef} className="stage-canvas">
          <Layer>
            <KonvaImage image={image} width={600} height={600} />
            {texts.map((txt) => (
              <TextBox
                key={txt.id}
                textProps={txt}
                isSelected={txt.id === selectedId}
                onSelect={() => setSelectedId(txt.id)}
                onChange={(newAttrs) => {
                  const newTexts = texts.map((t) => (t.id === txt.id ? newAttrs : t));
                  setTexts(newTexts);
                }}
              />
            ))}
          </Layer>
        </Stage>
      )}
    </div>
  );
}
