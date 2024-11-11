"use client";
import { Divider } from "@nextui-org/react";
import React, { useState } from "react";
import { FaFileAlt, FaDownload } from "react-icons/fa";

interface Document {
  id: number;
  title: string;
  date: string;
  filePath: string;
}

interface LegalDocProps {
  documents: Document[];
}

const ITEMS_PER_PAGE = 6;

export default function LegalDoc({ documents }: LegalDocProps) {
  const [downloading, setDownloading] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(documents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDocuments = documents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDownload = async (doc: Document) => {
    try {
      setDownloading(doc.id);
      const fileName = doc.filePath.split('/').pop() || 'document.pdf';
      const link = document.createElement('a');
      link.href = doc.filePath;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="mx-auto px-4 pt-4 pb-12 w-full max-w-4xl desktop:max-w-5xl">
      <div className="flex flex-col justify-center items-center mb-6 mobile:mb-4 tablet:mb-4 w-full">
        <p className="p-2 font-bold font-robotoslab text-[#4A2511] text-4xl text-center mobile:text-3xl tablet:text-3xl">
          Hồ sơ pháp lý
        </p>
        <Divider className="bg-[#D7A444] w-24 h-1" />
      </div>

      <div className="desktop:px-12 laptop:px-8 gap-8 mobile:gap-4 grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 w-full">
        {currentDocuments.map((doc) => (
          <div
            key={doc.id}
            className="border-gray-200 bg-white hover:shadow-md border rounded-lg transition-shadow overflow-hidden"
          >
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-3">
                <FaFileAlt className="flex-shrink-0 w-5 h-5 text-[#7A0505]" />
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                  <p className="text-gray-600 text-sm">Ngày đăng {doc.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 px-2">
                <button
                  onClick={() => handleDownload(doc)}
                  disabled={downloading === doc.id}
                  className={`p-2 ${downloading === doc.id
                      ? 'bg-gray-400'
                      : 'bg-[#7A0505] hover:bg-[#A52A2A]'
                    } text-white rounded transition-colors`}
                >
                  <FaDownload className={`w-4 h-4 ${downloading === doc.id ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-8 h-8 rounded-full ${pageNum === currentPage
                  ? 'bg-[#7A0505] text-white'
                  : 'bg-[#FFF7ED] text-[#7A0505] hover:bg-[#7A0505] hover:text-white'
                } transition-colors`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}