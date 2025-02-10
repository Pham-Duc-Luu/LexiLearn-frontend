"use client";
import {cn} from "@/lib/utils";
import {setCollectioName, setCollectionDescription,} from "@/store/legacy store/collectionSlice";
import {useAppDispatch, useAppSelector} from "@/store/legacy store/hooks";
import {Card, CardHeader, Input} from "@heroui/react";
import {useTranslations} from "next-intl";
import React from "react";

export interface IHeaderProps {
    className?: string;
    onChange?: (title: string, description?: string) => void;
}

const Header = ({className, onChange}: IHeaderProps) => {
    const dispatch = useAppDispatch();
    const t = useTranslations("collection.create");

    const {collection} = useAppSelector((state) => state.persistedReducer);

    return (
        <div className=" relative">
            <Card className={cn(className)}>
                <CardHeader className=" m-6 text-xl font-bold">
                    {t("form.description")}
                </CardHeader>
                <Card className=" flex flex-col gap-4 m-6">
                    <Input
                        label={"Title"}
                        onChange={(e) => {
                            dispatch(setCollectioName(e.target.value));
                        }}
                        value={collection.name}
                        placeholder={t("form.title")}
                        variant="bordered"
                    ></Input>
                    <Input
                        value={collection.description}
                        label={"Descreption"}
                        onChange={(e) => {
                            dispatch(setCollectionDescription(e.target.value));
                        }}
                        placeholder={t("form.title")}
                        variant="bordered"
                    ></Input>
                </Card>
            </Card>
        </div>
    );
};

export default Header;
