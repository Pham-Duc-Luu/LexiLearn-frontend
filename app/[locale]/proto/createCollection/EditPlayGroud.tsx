"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type NodeTypes,
  type DefaultEdgeOptions,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "@/lib/utils";
import { v4 } from "uuid";
import * as _ from "lodash";
import {
  CustomNode,
  CustomtNodeType,
  onConnect,
  onEdgesChange,
  onNodesChange,
  updateNode,
  updateNodes,
} from "@/store/CardNode.proto.slice";
import CustomFrontNode from "./CustomFrontNode";

import CustomMeaninNode from "./CustomMeaningNode";
import { useAppDispatch, useAppSelector } from "@/store/ProtoStore";
import CustomExampleNode from "./CustomExampleNode";
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
  const dispatch = useAppDispatch();
  const { allNodes, edges } = useAppSelector((state) => state.CardNode);
  const AddExamplesNode = () => {};

  const nodeTypes = useMemo(
    () => ({
      frontNode: CustomFrontNode,
      meaningNode: CustomMeaninNode,
      exampleNode: CustomExampleNode,
    }),
    []
  );

  return (
    <div className={cn(className, "w-full h-full bg-white")}>
      <ReactFlow
        nodes={allNodes}
        edges={edges}
        onNodesChange={(nodes) => {
          dispatch(onNodesChange(nodes));
        }}
        onEdgesChange={(nodes) => {
          dispatch(onEdgesChange(nodes));
        }}
        onConnect={(nodes) => {
          dispatch(onConnect(nodes));
        }}
        nodeTypes={nodeTypes}
        fitView={true}
        // nodesConnectable={true}
        panOnDrag={false}
        // zoomOnScroll={false}
        // panOnScroll={false}
        // zoomOnDoubleClick={false}
      >
        <MiniMap zoomable pannable /> <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default EditPlayGroud;
