import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { IoMdGlobe } from "react-icons/io";
import { RiCheckboxCircleLine } from "react-icons/ri";

export default function OurDestinyCard() {
    return (
        <Card className="m-2 w-fit rounded-none">
            <CardHeader className="justify-between px-6">
                <p className="text-lg font-semibold">NextUI</p>
                    <IoMdGlobe className="text-[#7A0505]"/>
            </CardHeader>
            <Divider className="bg-[#7A0505] w-4/5 place-self-center " />
            <CardBody>
                <div className="justify-start px-2 ">
                    <div className="flex my-4 gap-1">
                        <RiCheckboxCircleLine className="size-fit text-[#7A0505] "/>
                        <p className="text-xs capitalize w-fit font-medium"> lay dao phat lam con duong phat trien </p>
                    </div>
                    <div className="flex my-4 gap-1">
                        <RiCheckboxCircleLine className="size-fit text-[#7A0505] " />
                        <p className="text-xs capitalize w-fit font-medium"> lay dao phat lam con duong phat trien </p>
                    </div>
                    <div className="flex my-4 gap-1">
                        <RiCheckboxCircleLine className="size-fit text-[#7A0505] " />
                        <p className="text-xs capitalize w-fit font-medium"> lay dao phat lam con duong phat trien </p>
                    </div>
                    <div className="flex my-4 gap-1">
                        <RiCheckboxCircleLine className="size-fit text-[#7A0505] " />
                        <p className="text-xs capitalize w-fit font-medium"> lay dao phat lam con duong phat trien </p>
                    </div>
                    <div className="flex my-4 gap-1 ">
                        <RiCheckboxCircleLine className="size-fit text-[#7A0505] " />
                        <p className="text-xs capitalize w-fit font-medium"> lay dao phat lam con duong phat trien </p>
                    </div>
                </div>
            </CardBody>
            <Divider className="bg-[#7A0505] h-1 mt-8" />
        </Card>
    )
}