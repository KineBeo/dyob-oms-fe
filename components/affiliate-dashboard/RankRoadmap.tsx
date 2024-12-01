import React from 'react';
import { 
  Card, 
  Avatar, 
  Chip, 
  Tooltip 
} from "@nextui-org/react";
import { 
  Users, 
  Star, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Crown 
} from 'lucide-react';

export enum UserRank {
  GUEST = 'GUEST',
  NVKD = 'NVKD',
  // TPKD = 'TPKD',
  // GDKD = 'GDKD',
  // GDV = 'GDV',
  // GDKV = 'GDKV',
}

const RANK_PRIORITY = {
    [UserRank.GUEST]: 0,
    [UserRank.NVKD]: 1,
    // [UserRank.TPKD]: 2,
    // [UserRank.GDKD]: 3,
    // [UserRank.GDV]: 4,
    // [UserRank.GDKV]: 5,
  };

const RANK_DETAILS: Record<UserRank, { icon: React.ElementType, description: string, color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" }> = {
  [UserRank.GUEST]: {
    icon: Users,
    description: 'NGƯỜI TIÊU DÙNG',
    color: 'default',
  },
  [UserRank.NVKD]: {
    icon: Star,
    description: 'NHÂN VIÊN KD',
    color: 'primary',
  },
  // [UserRank.TPKD]: {
  //   icon: TrendingUp,
  //   description: 'TRƯỞNG PHÒNG KD',
  //   color: 'secondary',
  // },
  // [UserRank.GDKD]: {
  //   icon: ShieldCheck,
  //   description: 'GIÁM ĐỐC KINH DOANH',
  //   color: 'success',
  // },
  // [UserRank.GDV]: {
  //   icon: Zap,
  //   description: 'GIÁM ĐỐC VÙNG',
  //   color: 'warning',
  // },
  // [UserRank.GDKV]: {
  //   icon: Crown,
  //   description: 'GIÁM ĐỐC KINH DOANH',
  //   color: 'danger',
  // },
};

const RANK_ORDER = Object.values(UserRank);

interface RankRoadmapProps {
  currentRank: UserRank;
}

const RankRoadmap: React.FC<RankRoadmapProps> = ({ currentRank }) => {
    const currentRankPriority = RANK_PRIORITY[currentRank];

  return (
    <Card className="p-2 mobile:p-4 tablet:p-6 bg-white shadow-lg">
      <div className="flex flex-col mobile:flex-col tablet:flex-row mini-laptop:flex-row laptop:flex-row desktop:flex-row 
        items-center justify-between 
        mobile:space-y-4 tablet:space-y-0 tablet:space-x-2 
        mini-laptop:space-x-4 laptop:space-x-4 desktop:space-x-6 
        relative">
        {RANK_ORDER.map((rank, index) => {
          const { icon: RankIcon, description, color } = RANK_DETAILS[rank];
           const rankPriority = RANK_PRIORITY[rank];
          const isPassed = rankPriority <= currentRankPriority;
          const isCurrent = rank === currentRank;

          return (
            <div 
              key={rank} 
              className="flex flex-col items-center relative w-full 
                mobile:w-full 
                tablet:flex-1 
                mini-laptop:flex-1 
                laptop:flex-1 
                desktop:flex-1"
            >


              {/* Rank Badge */}
              <Tooltip 
                content={description} 
                placement="top"
                color={color}
              >
                <div className="flex flex-col items-center">
                  <Avatar 
                    icon={<RankIcon />} 
                    size="lg"
                    color={isPassed ? color : 'default'}
                    className={`
                      border-4 
                      ${isCurrent ? `border-${color}` : 'border-transparent'}
                      ${!isPassed ? 'opacity-50' : ''}
                      mobile:w-12 mobile:h-12
                      tablet:w-14 tablet:h-14
                      mini-laptop:w-16 mini-laptop:h-16
                      laptop:w-16 laptop:h-16
                      desktop:w-20 desktop:h-20
                    `}
                  />
                  <Chip 
                    color={isPassed ? color : 'default'}
                    variant={isCurrent ? 'solid' : 'light'}
                    className="mt-2 
                      mobile:text-xs 
                      tablet:text-sm 
                      mini-laptop:text-sm 
                      laptop:text-base 
                      desktop:text-base"
                  >
                    {rank}
                  </Chip>
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RankRoadmap;