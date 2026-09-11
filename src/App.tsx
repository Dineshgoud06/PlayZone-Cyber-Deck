/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenTab, GameItem } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { GamesView } from './components/GamesView';
import { ArenaView } from './components/ArenaView';
import { RanksView } from './components/RanksView';
import { ProfileView } from './components/ProfileView';
import { GameLauncherModal } from './components/GameLauncherModal';
import { SearchModal } from './components/SearchModal';
import { NotificationsModal } from './components/NotificationsModal';
import { TopUpModal } from './components/TopUpModal';
import { playClickSound } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('home');
  const [selectedGameForModal, setSelectedGameForModal] = useState<GameItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [coins, setCoins] = useState(14850);
  const [userLevel] = useState(42);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const handleTabChange = (tab: ScreenTab) => {
    playClickSound();
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchGame = (game: GameItem) => {
    setSelectedGameForModal(game);
  };

  const handleLaunchArena = (_gameId?: string) => {
    setSelectedGameForModal(null);
    setCurrentTab('arena');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

  return (
    <div className="min-h-screen bg-[#0d0e13] text-[#e3e1e9] font-body-md flex flex-col selection:bg-[#00f0ff] selection:text-[#00363a]">
      {/* Top Fixed Header */}
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={unreadNotifications}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full pt-18 sm:pt-20">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleTabChange}
            onLaunchGame={handleLaunchGame}
            onOpenTopUp={() => setIsTopUpOpen(true)}
            coins={coins}
            userLevel={userLevel}
          />
        )}

        {currentTab === 'games' && (
          <GamesView
            onLaunchGame={handleLaunchGame}
          />
        )}

        {currentTab === 'arena' && (
          <ArenaView />
        )}

        {currentTab === 'ranks' && (
          <RanksView />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            coins={coins}
            onOpenTopUp={() => setIsTopUpOpen(true)}
          />
        )}
      </main>

      {/* Bottom Floating Navigation */}
      <BottomNav
        activeTab={currentTab}
        onTabChange={handleTabChange}
      />

      {/* Modals */}
      <GameLauncherModal
        game={selectedGameForModal}
        onClose={() => setSelectedGameForModal(null)}
        onLaunchArena={handleLaunchArena}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectGame={handleLaunchGame}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClearUnread={() => setUnreadNotifications(0)}
      />

      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        currentCoins={coins}
        onAddCoins={handleAddCoins}
      />
    </div>
  );
}

