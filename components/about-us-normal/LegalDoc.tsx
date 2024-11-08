"use client";
import { Divider } from "@nextui-org/react";
import React from "react";
import { FaFileAlt, FaDownload } from "react-icons/fa";

const documents = [
  {
    id: 1,
    title: "Hồ sơ công bố sản phẩm An vị Khang Ông Bụt",
    date: "27/09/2024",
  },
  {
    id: 2,
    title: "Hồ sơ công bố sản phẩm An vị Khang Ông Bụt",
    date: "27/09/2024",
  },
  {
    id: 3,
    title: "Hồ sơ công bố sản phẩm An vị Khang Ông Bụt",
    date: "27/09/2024",
  },
  {
    id: 4,
    title: "Hồ sơ công bố sản phẩm An vị Khang Ông Bụt",
    date: "27/09/2024",
  },
  {
    id: 5,
    title: "Hồ sơ công bố sản phẩm An vị Khang Ông Bụt",
    date: "27/09/2024",
  },
  {
    id: 6,
    title: "Hồ sơ công bố sản phẩm An vị Khang Ông Bụt",
    date: "27/09/2024",
  },
];

export default function LegalDoct() {
  return (
    <div className="w-full max-w-4xl desktop:max-w-5xl mx-auto px-4 pt-4 pb-12">
      <div className="w-full mobile:mb-4 tablet:mb-4 mb-6 items-center justify-center flex flex-col">
        <p className="mobile:text-3xl tablet:text-3xl text-4xl font-robotoslab font-bold text-center p-2 text-[#4A2511]">
          Hồ sơ pháp lý
        </p>
        <Divider className="w-24 h-1 bg-[#D7A444]" />
      </div>

      <div className="laptop:px-8 desktop:px-12 grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 w-full mobile:gap-4 gap-8 ">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <FaFileAlt className="text-[#7A0505] w-5 h-5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                  <p className="text-sm">Ngày đăng {doc.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 px-2">
                <button className="p-2 bg-[#7A0505] text-white rounded hover:bg-[#A52A2A] transition-colors">
                  <FaDownload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-center mt-8 space-x-2 pb-4">
        <button className="w-8 h-8 rounded-full bg-[#8B0000] text-white">
          1
        </button>
        <button className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-colors">
          2
        </button>
      </div> */}
    </div>
  );
}