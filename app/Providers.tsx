// app/providers.tsx
"use client";
import MouseContextProvider from "@/context/mouse-context";
import createApolloClient from "@/lib/apolloClient";
import {useAppSelector} from "@/store/legacy store/hooks";
import {persistor, ProtoStore} from "@/store/Proto-slice/ProtoStore.slice";
import {ApolloProvider} from "@apollo/client";
import {HeroUIProvider} from "@heroui/react";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

export function ApolloCustomeProvider({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    const {auth} = useAppSelector((state) => state.persistedReducer);

    return (
        <ApolloProvider client={createApolloClient({token: auth.access_token})}>
            <PersistGate loading={null} persistor={persistor}>
                <Provider store={ProtoStore}>{children}</Provider>
            </PersistGate>
        </ApolloProvider>
    );
}

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            {/* <NextThemesProvider attribute="class" defaultTheme="dark"> */}

            <PersistGate loading={null} persistor={persistor}>
                <Provider store={ProtoStore}>
                    <MouseContextProvider>
                        <GoogleOAuthProvider
                            clientId={`${process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID}`}
                        >
                            {children}
                        </GoogleOAuthProvider>
                        {/* <ApolloCustomeProvider> */}
                        {/* </ApolloCustomeProvider> */}
                    </MouseContextProvider>
                </Provider>
            </PersistGate>
            {/* </NextThemesProvider> */}
        </HeroUIProvider>
    );
}
