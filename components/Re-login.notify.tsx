"use client";
import { useRouter } from "@/i18n/routing";
import { routeProto } from "@/store/legacy store/route.slice";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
import { Button } from "@heroui/react";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const ReLoginNotify = () => {
  const { isAuthenticatedError } = useAppSelector(
    (state) => state.persistedReducer.auth
  );
  const route = useRouter();
  useEffect(() => {
    if (isAuthenticatedError) {
      toast(
        <>
          <p> Some thing went wrong, please sign in again</p>
          <Button
            className=" rounded-sm"
            onPress={() => route.push(routeProto.AUTH())}
          >
            Sign in
          </Button>
        </>,
        {
          position: "bottom-right",
          autoClose: false,
          type: "error",
          theme: "colored",
        }
      );
    }
  }, [isAuthenticatedError]);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ReLoginNotify;
