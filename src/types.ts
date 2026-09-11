export type ScreenTab = 'home' | 'games' | 'arena' | 'ranks' | 'profile';

export interface GameItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  genre: 'action' | 'racing' | 'strategy' | 'arcade' | 'multiplayer';
  rating: number;
  reviewCount: string;
  onlinePlayers: string;
  onlineCountNum: number;
  image: string;
  tags: string[];
  specs?: {
    fps?: string;
    refreshRate?: string;
    loadType?: string;
  };
  highlightBadge?: string;
  isInstant: boolean;
  isFree?: boolean;
  isTrending?: boolean;
  isFavorite?: boolean;
  bounty?: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  level?: number;
  title?: string;
  score: number;
  scoreDisplay: string;
  avatar: string;
  wins?: number;
  matches?: number;
  winRate?: string;
  todayChange?: string;
}

export interface TrophyBadge {
  id: string;
  title: string;
  description: string;
  xp?: string;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  status: 'unlocked' | 'in-progress' | 'locked';
  dateUnlocked?: string;
  unlockedAt?: string;
  progressPercent?: number;
  progressText?: string;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  rarityPercent?: number;
  icon: string;
  category?: 'combat' | 'speed' | 'strategy' | 'exploration' | 'mastery';
  isPinned?: boolean;
}

export interface MatchHistoryItem {
  id: string;
  game?: string;
  gameName?: string;
  mode: string;
  timeAgo?: string;
  timestamp?: string;
  result: string;
  score: string | number;
  scoreDelta?: string;
  xpEarned?: string;
  colorDot?: string;
}

export interface UserProfile {
  username: string;
  avatar: string;
  rankTitle: string;
  tier: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  bio: string;
  points: number;
  coins: number;
  shards: number;
  stats: {
    matchesPlayed: number;
    winRate: number;
    kdRatio: number;
    mvpAwards: number;
    hoursPlayed: number;
  };
}

