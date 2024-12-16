import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  Node as NodeFlow,
  type Edge,
} from "@xyflow/react";
import _ from "lodash";
import { v4 } from "uuid";
export type CustomNode = {
  text?: string;
};

export type CustomtNodeType = NodeFlow<
  CustomNode,
  "frontNode" | "meaningNode" | "exampleNode"
>;

export interface CardNodeProto {
  allNodes: CustomtNodeType[];
  edges: Edge[];
}

const initialState: CardNodeProto = {
  edges: [],
  allNodes: [
    {
      id: "front",
      position: { x: 0, y: 0 },
      data: { text: "" },
      type: "frontNode",
      dragHandle: ".drag-handle__custom",
    },
  ],
};

export const CardNodeProtoSlice = createSlice({
  initialState,
  name: "CardNodeProtoSlice",
  reducers: {
    // addMeaningNode: (state, payload?: PayloadAction<CustomNode>) => {
    //   // * post if there is a meaning node

    //   if (state.allNodes[1]) return;

    //   const MeaningNode: CustomtNodeType = {
    //     id: v4(),
    //     position: {
    //       x: state.allNodes[0].data.width
    //         ? state.allNodes[0].data.width * 3
    //         : 0,
    //       y: state.allNodes[0].position.y,
    //     },
    //     dragHandle: ".drag-handle__custom",
    //     data: {
    //       height: 0,
    //       width: 0,
    //       text: payload?.payload?.text || "",
    //     },
    //     type: "meaningNode",
    //   };
    //   state.allNodes.push(MeaningNode);

    //   state.connetions.push({
    //     id: v4(),
    //     animated: true,
    //     target: MeaningNode.id,
    //     source: state.allNodes[0].id,
    //   });
    // },
    addNode: (state, payload: PayloadAction<CustomtNodeType["type"]>) => {
      const newNode: CustomtNodeType = {
        id: v4(),
        position: {
          x:
            state.allNodes.length >= 2
              ? state.allNodes[state.allNodes.length - 1].position.x
              : state.allNodes[0].measured?.width! * 2,
          y:
            state.allNodes.length >= 2
              ? state.allNodes[state.allNodes.length - 1].position.y +
                state.allNodes[state.allNodes.length - 1].measured?.height! +
                100
              : 0,
        },
        dragHandle: ".drag-handle__custom",
        data: {
          text: "",
        },
        type: payload.payload,
      };

      const newEdge: Edge = {
        id: v4(),
        source: state.allNodes[0].id,
        target: newNode.id,
        animated: true,
      };

      state.edges.push(newEdge);
      state.allNodes.push(newNode);
    },
    deleteNode: (state, payload: PayloadAction<String>) => {
      state.allNodes &&
        _.remove(state.allNodes, function (node) {
          return node.id === payload.payload;
        });
      state.edges &&
        _.remove(state.edges, function (edge) {
          return (
            edge.target === payload.payload || edge.source === payload.payload
          );
        });
    },
    onNodesChange: (state, payload) => {
      state.allNodes = applyNodeChanges(payload.payload, state.allNodes);
    },
    onEdgesChange: (state, payload) => {
      state.edges = applyEdgeChanges(payload.payload, state.edges);
    },
    onConnect: (state, payload) => {
      state.edges = addEdge(payload.payload, state.edges);
    },
    setNode: (state, payload) => {
      state.allNodes = payload.payload;
    },
    setEdges: (state, payload) => {
      state.edges = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onNodesChange,
  addNode,
  onEdgesChange,
  onConnect,
  setEdges,
  deleteNode,
  setNode,
} = CardNodeProtoSlice.actions;

export default CardNodeProtoSlice.reducer;
