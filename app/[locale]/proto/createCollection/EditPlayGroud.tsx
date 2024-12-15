"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  BackgroundVariant,
  useViewport,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "@/lib/utils";
import CustomFrontNode from "./CustomFrontNode";
import CustomMeaninNode from "./CustomMeaningNode";
import { v4 } from "uuid";
interface EditPlayGroudProps {
  className?: string;
}
// const initialNodes = [
//   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
// ];

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const snapGrid = [20, 20];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const EditPlayGroud = ({ className }: EditPlayGroudProps) => {
  const reactFlow = useReactFlow();
  const AddMeaningNode = () => {
    // IMPORTANT : create a new node
    const newNode = {
      id: `meaning-${v4()}`,
      position: { x: nodes[0].data.width * 4, y: 0 },
      data: {},
      // Specify the custom class acting as a drag handle
      type: "meaningNode",
    };

    // * add a new node to the view
    setNodes([...nodes, newNode]);

    // * add the connection to the main node
    setEdges([...edges, { id: `` }]);
  };

  const AddExamplesNode = () => {};
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "front",
      // Specify the custom class acting as a drag handle
      position: { x: 0, y: 0 },
      data: {
        height: 0,
        width: 0,
        onAddExamplesNode: AddExamplesNode,
        onAddMeaningNode: AddMeaningNode,
      },
      // Specify the custom class acting as a drag handle
      type: "frontNode",
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = {
    frontNode: CustomFrontNode,
    meaningNode: CustomMeaninNode,
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );
  useEffect(() => {
    reactFlow.fitView({ duration: 500 });
    console.log(nodes);
  }, [nodes]);

  useEffect(() => {
    console.log(edges);
  }, [edges]);

  return (
    <div className={cn(className, "w-full h-full bg-white")}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView={true}
        // nodesConnectable={true}
        nodesDraggable={false}
        panOnDrag={false}
        // zoomOnScroll={false}
        // panOnScroll={false}
        // zoomOnDoubleClick={false}
        snapToGrid={true}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default EditPlayGroud;
