"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Image } from '@nextui-org/react';

interface VideoInfo {
    videoId: string;
    title: string;
}

interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
    isMain?: boolean;
    isActive: boolean;
    onVideoClick: (videoId: string) => void;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
    videoId,
    title = 'YouTube video player',
    isMain = false,
    isActive,
    onVideoClick,
}) => {
    const videoUrl = isActive
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
        : `https://www.youtube.com/embed/${videoId}?autoplay=0`;

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div
            className={`w-full cursor-pointer 
                ${isMain
                    ? 'mobile:col-span-1 mobile:row-span-1 tablet:col-span-1 tablet:row-span-1 col-span-2 row-span-2'
                :   'aspect-video'}`
            }
            onClick={() => onVideoClick(videoId)}
        >
            <div className="relative pt-[56.25%] w-full">
                {isActive ? (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={videoUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <Image
                            src={thumbnailUrl}
                            alt={title}
                            className="static w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="flex justify-center items-center bg-black bg-opacity-60 rounded-full w-16 h-16 hover:bg-red-500 transition-all duration-300">
                                <div className="ml-1 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-white w-0 h-0" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const OtherVideos: React.FC<{ videos: VideoInfo[], initialVideoId?: string }> = ({
    videos,
    initialVideoId
}) => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(initialVideoId || null);
    const [mainVideo, setMainVideo] = useState<VideoInfo | null>(null);
    const [sideVideos, setSideVideos] = useState<VideoInfo[]>([]);

    useEffect(() => {
        if (videos.length > 0) {
            // Chọn video chính là video đầu tiên hoặc video được chỉ định ban đầu
            const initialMainVideo = initialVideoId
                ? videos.find(v => v.videoId === initialVideoId) || videos[0]
                : videos[0];

            // Loại bỏ video chính khỏi danh sách các video phụ
            const remainingVideos = videos.filter(v => v.videoId !== initialMainVideo.videoId);

            // Chọn các video ngẫu nhiên để hiển thị bên cạnh
            const randomSideVideos = remainingVideos
                .sort(() => 0.5 - Math.random())
                .slice(0, 4); // Giới hạn 4 video phụ

            setMainVideo(initialMainVideo);
            setSideVideos(randomSideVideos);
        }
    }, [videos, initialVideoId]);

    const handleVideoClick = (videoId: string): void => {
        // Nếu click vào video đang active thì tắt, ngược lại thì bật video mới
        setActiveVideoId(videoId === activeVideoId ? null : videoId);
    };

    return (
        <div className="mx-auto px-4 py-8 max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
            <h1 className="mb-2 font-bold font-robotoslab text-[#7A0505] text-3xl text-center mobile:text-2xl tablet:text-2xl">
                ĐÔNG Y ÔNG BỤT ĐỒNG HÀNH CÙNG MỌI NGƯỜI
            </h1>
            <div className="bg-[#D7A444] mx-auto mb-8 w-24 h-1"></div>

            {mainVideo && (
                <div className="grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-1 mini-laptop:grid-cols-3 laptop:grid-cols-3 desktop:grid-cols-3 gap-4">
                    <div className="mobile:col-span-1 tablet:col-span-1 mini-laptop:col-span-2 laptop:col-span-2 desktop:col-span-2">
                        <YouTubeEmbed
                            videoId={mainVideo.videoId}
                            title={mainVideo.title}
                            isMain={true}
                            isActive={activeVideoId === mainVideo.videoId}
                            onVideoClick={handleVideoClick}
                        />
                        <p className="mt-2 text-xl mobile:text-base tablet:text-lg font-medium">{mainVideo.title}</p>
                    </div>

                    <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-2 mobile:gap-4 tablet:gap-4">
                        {sideVideos.map((video, index) => (
                            <div key={index} className="grid grid-cols-2 items-start gap-2
                            mobile:grid-cols-1
                            tablet:grid-cols-1
                            
                            ">
                                <YouTubeEmbed
                                    videoId={video.videoId}
                                    title={video.title}
                                    isActive={activeVideoId === video.videoId}
                                    onVideoClick={handleVideoClick}
                                />
                                <p className="mt-1 text-sm font-medium desktop:mt-0">{video.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OtherVideos;