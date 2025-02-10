"use client";
import SparklesText from "@/components/magicui/sparkles-text";
import {useRouter} from "@/i18n/routing";
import {routeProto} from "@/store/legacy store/route.slice";
import {Spinner} from "@heroui/react";
import {useEffect} from "react";

export default function HomePage() {
    const router = useRouter();

    // ! This is for api from backend
    // useEffect(() => {
    //   if (!localStorage.getItem('access_token')) {
    //     router.push('/auth/sign-in');
    //   }

    //   if (localStorage.getItem('access_token')) {
    //     mutate('get user profile', () =>
    //       axiosApi.userApi.getProfile().then((res) => res.data)
    //     )
    //       .then((res) => {
    //         if (res) {
    //           initProfile(res);

    //           router.push('/dashboard');
    //         }
    //       })
    //       .catch((err) => {
    //         router.push('/auth/sign-in');
    //       });
    //   }
    // }, [router]);

    useEffect(() => {
        router.push(routeProto.HOME());
    }, []);

    return (
        <div className=" min-h-screen w-full flex justify-center items-center">
            <SparklesText text="Welcome to LexiLearn+" className=" text-4xl"/>
            <Spinner/>
        </div>
    );
}
