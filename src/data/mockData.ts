import { GameItem, LeaderboardUser, TrophyBadge, MatchHistoryItem, UserProfile } from '../types';

export const PLAYZONE_LOGO = "https://lh3.googleusercontent.com/aida/AEtjO1U115nwsZsReNfsM2zudSUgmj0fkQqMg1d2-WUfka8Aaz0MCuq3h4drVFiqQYyIu4UwGXY8ieKEZhdmK-_Qg-X2XkshQbbPaiXRJGsxgQ3o2lRYRZ1NYSZpJUQYM6vvKShGwK8M-KHZ7vSG6PunJxZxIrx6iHvZ-qTlFSg-HNM5WlEMGZcRKVoFBHL_Aynoj0ZxQfocVkhs49QDwxTgJC3_jnLhoT62s3YljsRJsp-gq8ZEgu0jBj631jY";
export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuD1XoxrdKxI_nROTpDvjWTezEd3UneOMtl1mpaNksKU3lywALl_iG8XxnIRCYJ6syWOdNFnL4XU79zkvx0vVaxfmJz3bspNgo-M-uftZItWUtW_B0d5tGfZhKLDR0Ml5817pSfp5Lqnz3LONdBUgxkntEZXyjXCSxR-dGZAv6CkEdTc6nHXhRPVGbUsc5mT18a0f2wtjjVpvqC57uDZi2-AdNU2aZwn20JjMyEQvTmwEmxpM5LEMUry-g";

export const HERO_BANNER_BG = "https://lh3.googleusercontent.com/aida-public/AB6AXuA4ddlZRfAVGYA5KkfxT8aSeKHhC2Ns0eGxcAA_PRsuhYlVeFOecjvY4nvcmcxXBLriPScAGhFLua1Aq3x-7hEn3H5zjVNEBT5h5fMfl8Rr5zfLvm3Z3LCHgUuLGcHfO5t3QuH1y4zqvsZgSzYh8A_vHbXjxRYmibf960swgyKkS6IhnFxqoLHR8E-lvFD1QoyuKC9YgXNmSXR6ZzFG5wM3Asm70HGfeM7vSesT0EnQ1thhYa64G1iz8Q";

export const SPOTLIGHT_GAMES: GameItem[] = [
  {
    id: "neon-surge-2099",
    title: "Neon Surge 2099",
    subtitle: "Cyber Action • Fast Load",
    category: "CYBER ACTION",
    genre: "action",
    rating: 4.9,
    reviewCount: "18.4k",
    onlinePlayers: "14.2K Playing",
    onlineCountNum: 14200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3npoirxf8z3SxMWR57IxpBWgYETHR0m5_9JBdrHvANW63qerI-Oebbtl7vmHBruBWOy2rUmgCvN84PqHVjD9zUsG78UWGV7oBKxwrGljD_JpsW2qqgYyY3spRfLBPX6KgtxclYQmLTXnp1obp4FGBrQzUqwF7upBg3NiePCI0ys5tNxh9l49Ou4o5Li3K4bSE0iSoqno0Jco-lHvHb2kPWR1k_O4IoJDIv-B8Iqog9hWKoskZAGrbfg",
    tags: ["Cyber Action", "Fast Load", "60 FPS"],
    specs: { fps: "60 FPS", loadType: "Fast Load" },
    isInstant: true,
  },
  {
    id: "cyber-drift-tokyo",
    title: "Cyber Drift: Tokyo",
    subtitle: "Hyper Drift • Multi-Track",
    category: "HYPER DRIFT",
    genre: "racing",
    rating: 4.8,
    reviewCount: "11.2k",
    onlinePlayers: "9.8K Playing",
    onlineCountNum: 9800,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBX82xqs-nDOzCyvQNv9yIOS24K8LmzjQcuelJV1AM1HYbbP33X1OfON5AEa_OG4HMGwnN-ScYJrvOewff47oD20bklZ_wbbvLW9XJUktaWrIw-IY2-KIQgypwPdIpqlS5e3j4e623OPhqqTy-efN2lO3OX45fmA-TU-uqW6di28pTckXMQ9v3ZDy7vBIaU3TyIMRTEobJszmK4CJTx60i9Da7qek8vI8xnZxiDDt7HDZojgxtv5GT2w",
    tags: ["Hyper Drift", "Multi-Track", "120 Hz"],
    specs: { refreshRate: "120 Hz", loadType: "Multi-Track" },
    isInstant: true,
  },
  {
    id: "shadow-protocol",
    title: "Shadow Protocol",
    subtitle: "Stealth Ops • Top Rated",
    category: "STEALTH OPS",
    genre: "action",
    rating: 5.0,
    reviewCount: "31.6k",
    onlinePlayers: "21.5K Playing",
    onlineCountNum: 21500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5_7Gev89r9ptFy-4fkzY064vDkmJSqFw77H4AKV9f8z8k_GOgRd_RhaS9JxQ_u4Gbql6sBIMwjhlf3mEfqo-ZTYntpXvQ5djpjZziWoEqyvy_PxAchEZP2fctoangHIA_NGoBpQ6VqfdBbPNOIRDuDCUlSVRM4KS7b0vRQNqC7-3sx57u5m2wR7hnlUvAZltlUY78ep_4ruCvbXGEch8V7O2bSe3QnODTcZzfnew3NamDfh8W2bqNfw",
    tags: ["Stealth Ops", "Top Rated", "Co-Op"],
    specs: { loadType: "Top Rated", fps: "Co-Op" },
    isInstant: true,
  }
];

export const TRENDING_GAMES: GameItem[] = [
  {
    id: "voxel-void",
    title: "Voxel Void",
    subtitle: "Retro arcade space fighter with vibrant purple lasers",
    category: "ARCADE",
    genre: "arcade",
    rating: 4.7,
    reviewCount: "5.2k",
    onlinePlayers: "5.2k",
    onlineCountNum: 5200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG07JxxhaiAvlgEaoq8_fb8-lxPYJBseIwi4LF9OmWdfXy8agbd-HnSpAk7qlE-wEGVNuq0gNi6yRfRoWLR4Odbrn6ggVjFwfVc5l87BkNd1TjELkZf22NrtAm9q96nrE5XRBLLS1KHnvE1GhGAizqcjV4rUbNpbQPQvk1Dh1K7mgDpvigsWTvh5I5dhrLCptE_X4M2-yWfUXlEK6pm68_Ko2ECpyafeQKD0Feubj-dmajuSETvx210g",
    tags: ["Arcade", "Retro", "Bullet Hell"],
    isInstant: true,
  },
  {
    id: "striker-quantum",
    title: "Striker Quantum",
    subtitle: "High-tech cyber football with mechanized players",
    category: "SPORTS",
    genre: "action",
    rating: 4.6,
    reviewCount: "8.9k",
    onlinePlayers: "8.9k",
    onlineCountNum: 8900,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGLBVClU9izZTX-PJbRdX8rpH_GlWbgK53ebW0U02y4917AsRS4XqBni4zu5fvZ30UB031VsI0woW3erCTzT_YFoL2K-Kcavjxp1eqM9Ewi0XK8YfT8ftt0MlwDYELSt0hCw3KPRD5l8QR6BdQNxdI77CchsRDfWK4HvOUqwGrydCpYRs6ML4TvL_BPq8aR6Ddl44g1VyA4LoOClihLMCZDHhdVRq04NmZY9HdybF7W6kDM4paTsb7nw",
    tags: ["Sports", "Esports", "Multiplayer"],
    isInstant: true,
    isFavorite: true,
  },
  {
    id: "solar-fleet-x",
    title: "Solar Fleet X",
    subtitle: "Deep space interstellar armada space dogfight",
    category: "SCI-FI",
    genre: "action",
    rating: 4.9,
    reviewCount: "11.1k",
    onlinePlayers: "11.1k",
    onlineCountNum: 11100,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6x3yHJc6TAjll4NonddNCUCmeRl-ylLzLgr-Q6SuiOfN4GDvkEEIuSGRoOi19Uy4trUdd3aQl4jtLwWYOaWa8-mxdSX6w_d8LwM4-NO4j0wGMOtro70j47S-9KeHZpvrEliJQmc9LVBl2NVr9IKCB6XvFfPO4NjTsQjeMkkY-g_yu2ppzwRY9CpUvag4-GKPwY_-JvQnaaB0JcpMwFuxUMrv2wd1nrc1qAFJBKE2EhIk4_b-wovxr1g",
    tags: ["Sci-Fi", "Space Sim", "PvP"],
    isInstant: true,
  },
  {
    id: "katana-zero-9",
    title: "Katana ZERO: 9",
    subtitle: "Cyberpunk ninja with dual glowing katana swords",
    category: "HACK&SLASH",
    genre: "action",
    rating: 4.8,
    reviewCount: "6.7k",
    onlinePlayers: "6.7k",
    onlineCountNum: 6700,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSKzE6uDeg_yFo9W0Y4OzMayvhbdt8nXpATLO1Rdjogf_rF5On8kJo936aqmLoohj34zYcRyhl4Fn7mAi3T2DaYpXjsrHs6jGD1Tf8ij7n-EA1ePdiWI0mU0RrhF3xNlCQL7OxpuYTigaygqEkLb4cVaiefZUBB0hFdFI9Gr_YaedfNzIiRYfcfkxZtZYIk_hS_5wdLczeKj00mLh3P7KLsBuKdrbaDrpyfJd3ncRYSdM8hw9KctwTeA",
    tags: ["Hack&Slash", "Cyber Ninja", "Boss Fights"],
    isInstant: true,
  }
];

export const NEW_DROPS: GameItem[] = [
  {
    id: "chroma-cube-4d",
    title: "Chroma Cube 4D",
    subtitle: "Spatial Puzzle • Multi-Tier",
    category: "PUZZLE",
    genre: "strategy",
    rating: 4.7,
    reviewCount: "1.2k",
    onlinePlayers: "1,240 Online",
    onlineCountNum: 1240,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcZFsqLdDd3KwdgUmfRF418eWBWpVEuOFTzT8iM0nw1eBNyg0ksk8sEWnSpojJW0MZ--5oiGgRxg4ZalculjaGA4S7lHxNUJ-UbiFv067EeAxenoxp957UxxSXIC7Br617kfYji0LSYFiK2YLAC5aRTlMlyAVJfY18VaNLCMHaji-QnJy12PDvZJH3xPbwLG5BYdTs635pm69B7QGkmAjaMNnP8mimBW1vQcfduXD4DUWhpzUJw00YaQ",
    tags: ["Spatial Puzzle", "Instant Play"],
    highlightBadge: "2d Left in Beta",
    isInstant: true,
  },
  {
    id: "orbital-velocity",
    title: "Orbital Velocity",
    subtitle: "Time Attack • Leaderboard",
    category: "RACING",
    genre: "racing",
    rating: 4.9,
    reviewCount: "3.8k",
    onlinePlayers: "3,890 Online",
    onlineCountNum: 3890,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7kwKSyu49JEU-F7Kj6L5Xb9P_Is1ahgkRt7thOqKnDxU-JXUVNGi9MBoTqF7_6Sxv-pjg2lNBYWIIgq-XsL-kX44SbjtEuBiIJYcvyUu5WkhrbA3Ot5C0Zwwss6KSSLu50pjxaRL6CP1TkZ0ywLC9BTIIfYdqX0rfAxDkp9NsrBaRlIzcOu-fr9Rbyol3gobeJ3S8CRtSA8UcGJDjMeNjEwjIg_YnmtwLqN940BoYxVxCjuCtOQNY5g",
    tags: ["Time Attack", "Cloud Save"],
    highlightBadge: "Season Drop",
    isInstant: true,
  }
];

export const CATALOG_GAMES: GameItem[] = [
  {
    id: "cyber-drift-velocity",
    title: "Cyber Drift: Velocity",
    subtitle: "Cyber Racing • High Octane Drift Simulation",
    category: "RACING",
    genre: "racing",
    rating: 4.9,
    reviewCount: "18.4k",
    onlinePlayers: "24,190 online",
    onlineCountNum: 24190,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcnXTrdrn31V1YHizC2YRHf-jhAbpqYUtEpDWCWbewchUjut2arVzG6Lqr475BATBR3D2SnjCyKeT2BuN25wOa2cE2mdOYAJJ7yvzFcxM_zxwLHbZKBiWxt11fSiPbemXkZp9RcBiz-90X4nA33zabne7O6zm69eC4nAuYFXZv6-8kegf5yGvUA183OH7O5Ul4XbZrlidQBgHReaXMMhOTQkUSwIgE7RLkLjJHYO8Hd92Fzxs3C3Q_Dw",
    tags: ["Cloud 120 FPS", "Cross-Progression", "Ranked Series S4"],
    highlightBadge: "Free Pass",
    isInstant: true,
    isFree: true,
  },
  {
    id: "neon-blade-zero",
    title: "Neon Blade: Zero",
    subtitle: "Sci-Fi Action • Hack & Slash Hackathon",
    category: "ACTION",
    genre: "action",
    rating: 4.8,
    reviewCount: "9.2k",
    onlinePlayers: "12,450 online",
    onlineCountNum: 12450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZC2tIAhLAFUusOME0pdknESKn-1-ooPSv9p4kwDMHZ0nUEWRbWz7mLt0NakHwlH-H5YQebeoS3m2PjSlG-gQzZVin_TUyyVIw-jcg1RkUjfGctQUYgxizB7IgHTYCCf-sZykbLgxZnWk6MntcCZ_Ne1EwuIugxALA9L9Cd43OMzkl6PPfFMM_4F8s948J86SM9BUQWCFeEv5zmc6tEPotFfz2d_lFWo_riLKoe3pICmutdVm0lZ4Maw",
    tags: ["Controller Ready", "Boss Rush Mode"],
    highlightBadge: "Premium Elite",
    isInstant: true,
  },
  {
    id: "quantum-chess-3d",
    title: "Quantum Chess 3D",
    subtitle: "Strategy • 4D Spatial Tactics & AI Engine",
    category: "STRATEGY",
    genre: "strategy",
    rating: 4.7,
    reviewCount: "3.1k",
    onlinePlayers: "5,210 online",
    onlineCountNum: 5210,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdyRZ-jLP2FYs8jKdygCIqFXwY-i4LJG08VbM9xcqHIhEgjL7n4DFXi0Nt0A4zu5as9SjOX2CeR27k5QPGQoUlRQbJAo96cxf88y8zF7MYatSfhj6j8859Fsn4Jb8qhZDG9-tuPy-RvCfD4N6ygd64yLMcYAyzxSK1yg9b-IpWd7_vymSt-oZI4e4KmiTha6IpShMK-hqTEJZVvCyr5-APVcIjCVUygYcsBgaheCYzs1cVAn84-C6p1A",
    tags: ["Elo Rated", "Neural Bot 2800"],
    highlightBadge: "Turn-Based",
    isInstant: true,
  },
  {
    id: "astro-raider-deep-space",
    title: "Astro Raider: Deep Space",
    subtitle: "Arcade Shooter • Bullet Hell Survival",
    category: "ARCADE",
    genre: "arcade",
    rating: 4.9,
    reviewCount: "42.1k",
    onlinePlayers: "31,800 online",
    onlineCountNum: 31800,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWi0KFDtYoGvmrUYesaPp05-dsck-WLCgFeEWD1vsAd9fdyEOx4m2pod7PdyPvqKZIgBNFkmoCcqj7BCtWVFqoCf6KD0GZhNYp78ej3QYHXAXMfjDbCifFfP7y-Fuw2AxveKzozes78IK12lu_uTkXcHKCmaZSqPbOJcsZvcmv5VnIiwvbo54UhiVCLeIFDy8BB8RfiuR0Kd99H9B5LjIJQZj7axjYRwSBAkwLZhH1XKWabI4TQJ__fw",
    tags: ["Co-op Squads", "Leaderboard Cup"],
    highlightBadge: "Trending #1",
    bounty: "$10,000 Bounty Live",
    isInstant: true,
    isTrending: true,
  },
  {
    id: "mecha-brawl-arena",
    title: "Mecha Brawl: Arena",
    subtitle: "Multiplayer Combat • Hero Brawler 3v3",
    category: "MULTIPLAYER",
    genre: "multiplayer",
    rating: 4.6,
    reviewCount: "11.5k",
    onlinePlayers: "19,040 online",
    onlineCountNum: 19040,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCBEMsMHq0vxAU3b8OJs29yUN3S199jwsqDvbjynyQUDC-vPugoWloDTv42FPZONHAogo6v-Hz57ZjDOlwkaI0EGA-M4lzsFRmPLh0oL9QoEQjkOc02mLwzjZwhVqsBhlAa_6y1O3aWK2TPp1_8C-BSqwfzqq1RrjmKTkIOEbomJ-WZsyKecpbTR7QV8Vq5XOjkv7b45RTX3I1RCq5w4H8yspxz_dXgObMLcfv4kB-t4jMY_6_4lCNaw",
    tags: ["Custom Loadouts", "Voice Chat"],
    highlightBadge: "3v3 Ranked",
    isInstant: false,
    isFree: true,
  }
];

export const TOP_PODIUM: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Vortex_King",
    title: "Grandmaster",
    score: 984200,
    scoreDisplay: "984,200",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQnOZDSNzifZIG_kIsX5LM_Kehz-J9iMig89xyWLnH2tHkS2KOok7e8jeynMSEZGHMfSMMqWmpWZVKo2LUE5ftZ1_ju5O05ZX6MsYSSvslWP8E8IqJ01mqOH83RZVdSMulrpA39p5DhiNbjtWM93go8ZvUoxgt3qo7Z4prv5kpM4bvO-EmxHo_5AUJ2jksWRCynMHCpWQ7X2RipYTd3iF-2t7mqCcXJaaXbzqS7BVDdB4bwPbwLBkQpA",
    wins: 1420,
    winRate: "78% WR"
  },
  {
    rank: 2,
    name: "Nova_Strike",
    title: "Master",
    score: 921500,
    scoreDisplay: "921.5K",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVrP1o6xxam-ERa8Xf0HcHLhsBFjgkzGG53EFtzPC4B4JRB3SLd5GC7H40jGSlJ-YOJom5ti18Up83Qq0a6gecRChsnD3s1j-k6-Uhyqa7ALFcoeUhn5uGfAQuKFm_gWES7J33xr8mnD9i-RIH743NcQlvbnud4sbSLhjrE_Sruw33WVTdaeAuLnVP7adeGXLdEMe5tXzbYJgonUT-6ms1nja0kLhNr5Bbm7oJXonNbJIZXPWgmMUWKQ",
    wins: 1180,
  },
  {
    rank: 3,
    name: "ShadowKitsune",
    title: "Master",
    score: 885100,
    scoreDisplay: "885.1K",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8HkiQyJ4zHVahuNIvrUi3Vj2J0pp-CsZ4iod3bWx58RFLsav4UoAzM7s4QOmgYXscSQ1AAEtv4vvTXYXu-FM_jcyVv0j6ZQ3TE6-pX7_yuSEYfKRlL-UL-zTyW13Q6w4PcWUUTqlIL22be7_qSsuChpyukfC94OQxiweHo_FNYEA-9TuWGDBou-qxIANKkVO2z1l1TpSdj9_B9WU6hi_vHU8QUAy0gss2vkikjKPDdOzaz8FWZU0CiA",
    wins: 994,
  }
];

export const MY_STANDING: LeaderboardUser = {
  rank: 42,
  name: "Phantom_Byte",
  title: "Cyber Elite",
  score: 412800,
  scoreDisplay: "412,800 PTS • Top 2.4%",
  todayChange: "+35 TODAY",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA95Kcw0EnG9wyjfekl_opjSj71ZKbK3MODQ_gCoxdiCc2F8ayd-mM72mK4QZiEV1ioDJlIGv_5-geUFBq-mECtFsIvyNTqHILDPWO4PX0AQqmeYwKmPzApYrHk-h_rc4f27KsIu2uG3d7zxLuwQsWEh0Gjk7Pm4KpEbceWjY3Zv9aT4bXyEfF2Bk7GQ7SGeQ9r3umg3hpZsERtXtHNJOibRXO-z0ExSZLg6Lf4vOC2UKQbI3lpn_VVQ"
};

export const RANKS_4_TO_10: LeaderboardUser[] = [
  {
    rank: 4,
    name: "Apex_Ghost",
    level: 74,
    matches: 890,
    wins: 642,
    score: 852900,
    scoreDisplay: "852,900",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuASC0SbraK8mM-QkU4P8lr9ubmzW0zywyjtqKj5LmeLPXa-CKR3eNdmJ6PxoeoQ6k4a7XlYo3n4YVXJrCENyx2SUIHXQKbF5PzVOlAWr7kDRoQ6akggXhcd29xC-2eKoYzaT1TaHfL4-0vIYvlI11ubDMoy_INSXlZg64jX6CDqR3CCWmDEPNXvWs_kYBOeXdoBvQUm0cbx1DhShlj1rDSZ2DZS3oMGyE9IW0WRliM1LQkIWfk3mIgXag"
  },
  {
    rank: 5,
    name: "Zero_Day",
    level: 68,
    matches: 812,
    wins: 591,
    score: 831450,
    scoreDisplay: "831,450",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3UHguKVt_Pr1NdO_ZrAoRezQ67eR9Oj9kf1PkwT7-Jds04IBrpw_o0Ch3n_c4sWEYFR2ztaHkd9qHcofsgp4WxR0z3ySj8VHNfK6M2L5O2OnB7uGcWniX3Z4_pDDCm6mIBvr0uzXNhRBiHSC4K4XvsisPWfrCTrT6VMpDgdqJWkLuMn1Iacmf_4Hvev1LXDwNCShBp8JweZ4V3I-1pDSV9yo70RYcOCiz617Hu5yG6htxOok62Kh5Sw"
  },
  {
    rank: 6,
    name: "Titanium_Pulse",
    level: 65,
    matches: 770,
    wins: 529,
    score: 794100,
    scoreDisplay: "794,100",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZbiXqEICsehtvw6TAL1aKOJpa9QtxivrmzXNn5SDj90YSj0zIpNAVwsXxpfV96ZpmUx8IONbLN1-SpAtH-4WEgBJHxqtiL-8T54HsjEnLuSEQi26-oixt6tqqqxiImVnJY1L0o5bqEgwgrO0-qDODqFnIjhozKmnpp560vX7DuGu-LI1sd62WaxIc83On6Z0BmCxrFHu-ebOGOXYHJCY-SZfFTny7ahDg-hpj-VqBy2zvuMOVoeTISg"
  },
  {
    rank: 7,
    name: "Ronin_99",
    level: 63,
    matches: 744,
    wins: 498,
    score: 766800,
    scoreDisplay: "766,800",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY4VcJroXZUpvPKzUo3psdwulHTr4CmIc50B4jDjvbLTUcSc9qkgNtNOOeQPFA6HFj4BaaIt0I4ZFHVFmp24SduGUW5qlDE3nnnIhMs2Pl03C0iqXeXkGKhH6QTJ1crrwrZD0AkNqr_x4MZmAli64miO9X7wzc220wTmO2HZZoX_aGQ6-s3x3iL3MJj9E7Eg-DuvQUs0hRXtl2IU6aMTio0NKHqoor8ZThnXzSNwAhBdWbgdUS6gEq5A"
  },
  {
    rank: 8,
    name: "Kestrel_X",
    level: 61,
    matches: 690,
    wins: 470,
    score: 742300,
    scoreDisplay: "742,300",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_4FiSn9fITdX7bOWiDGIejUj-YDKSEkduLQRKfKHjbNqmB29u2J3d3_Ymq7RsoGQZx94zSQrCwGV5aieE6JEx9a8ZFFC8sAGEomPGCCsykQT8kMBfEu_HGcq7XEcnOqT1Ol8-hbngKKfw6VmJ3JZtKgBXgK0-ccEoIbJCSFPCP9klrgc1H64eyoAi43oIPOWOzdhExIFBMhdyo5Z9ZhcfWYEE9fObBYiZDOpAzQZq58g3hJqRZNX7Ww"
  },
  {
    rank: 9,
    name: "Hyper_Glitched",
    level: 59,
    matches: 658,
    wins: 442,
    score: 719500,
    scoreDisplay: "719,500",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp-UulVMTTaIfzj_qsfizyYLXM52vdM0dz1bvUAIEfSMZN-aVa6Qra_4sBo_PkJK7nXfqtE8pi1MXm7Tujq6X3hRyxoofxuFg3mg-1xsiWv10GOynUV9HDJGslp4Nelkq7Svz2D3HioseajVYbUO57E6JdRCL1tGOG0N3nF8SxkyMtUEbrHTAieYdTcwMd4TVIxynHc_YYBZ3POPjHXBMlYY5W0HGnAYteDHDl1nfToYXEUHRAnWhMYg"
  },
  {
    rank: 10,
    name: "Borealis_Core",
    level: 58,
    matches: 620,
    wins: 418,
    score: 698000,
    scoreDisplay: "698,000",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXKYQwlm-wv79KRTiAEnFOBcvg_OwUkZfMuMuTQI1KSWHHstTBe6JlMf8HU3UZvKbrfwjt6fgmtzgSnMCefvI1XbDNcG2-cL4kIcPKluUydWgGO9YJFiHj7Zw_mXB1iQgiIOAk17wLtf4gk0h_b1VG53FgTTQCVtrorqRCIJv-FgI-bx4V9NP36htMnh6_ATHBlQKZOnCUIzHF-iWoCHN3KE2EmpP4gGW2XU5YTsFy7RXNTV6AO8USNA"
  }
];

export const FAVORITE_ARENAS: GameItem[] = [
  {
    id: "cyber-drift",
    title: "Cyber Drift",
    subtitle: "Record: 4:12.08 • Tier A",
    category: "ARCADE",
    genre: "racing",
    rating: 4.9,
    reviewCount: "18.4k",
    onlinePlayers: "24.1k",
    onlineCountNum: 24100,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhJMUU0f1E7yvfD7l6ISFzUo9aD8W86d6g95LZHclEByVUB9sgEXuUtK3Db7RH0AlbnIq83PWVhQUdJiIBL-rJwK8eluPEa4hHNGFmZJlSXj0MFLrsuXmwIZ1yndAcLZiFOeuVnqftBMdUpJf0vKvOFOgGsu6GKiqgfvMX-KqXYYn5Vadfai_rmYJ-8bS7Itw7Gi0QsRS6-48P2FnnNYddffSpGV87PA4yabzQfHjX_vPytGdzEmJ9QA",
    tags: ["Record: 4:12.08", "Tier A"],
    isInstant: true,
  },
  {
    id: "neon-blade",
    title: "Neon Blade",
    subtitle: "Rank: Platinum III • 92 Wins",
    category: "SLASHER",
    genre: "action",
    rating: 4.8,
    reviewCount: "9.2k",
    onlinePlayers: "12.4k",
    onlineCountNum: 12400,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANUqceYPFpIP6kL-0K3R7GIECtNPl5fiLRyj-OIZ0fdWHl8dY20Njt2sEmQ3Thj5LLXbXjqSHSodWun6x3nb38stkoRjJWLCXPeg1ercqXV4Jnemo-Zbydx-a1PhA9r-cZNUAxKIXGhKgAhr6QyQyXcEyR_2dlUTcKDdM5hiMrxmAnzhwoRUICfNr4HlTeN1syJegQYu8TR2q3XRkmO8hjf4NpJB6-rVHwLrx3qFZj0Ba52tU3KE3CTg",
    tags: ["Rank: Platinum III", "92 Wins"],
    isInstant: true,
  },
  {
    id: "quantum-chess",
    title: "Quantum Chess",
    subtitle: "Rating: 2150 ELO • Grandmaster",
    category: "STRATEGY",
    genre: "strategy",
    rating: 4.7,
    reviewCount: "3.1k",
    onlinePlayers: "5.2k",
    onlineCountNum: 5200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxoKTW1tf4BQVKez_wt1AXjyZR9aozTMSqG31xNCjf3BSEBedAAHl6Dso7xyo1nY70-2tTH2lsO8oyUZ5XJK3oS_6mo2yD0SxfJyDEDRwfejTvQUgRtWnSClYQqW6RBH3jF41NVKVpdQzNZkiipoxMnjuEQnEYVwwCEKW8smvcLW2tmcnMcq5QvrIlxwOcyh_Kr4rGIFMmx7vMjvPNrrYQTzRIoEF4Jj-6-8nX9Jjh8A5s3B4IRHkNFQ",
    tags: ["Rating: 2150 ELO", "Grandmaster"],
    isInstant: true,
  }
];

export const TROPHIES: TrophyBadge[] = [
  {
    id: "first-blood",
    title: "First Blood",
    description: "Secured first battle victory",
    xp: "+250 XP",
    status: "unlocked",
    dateUnlocked: "Unlocked Jan 02",
    progressPercent: 100,
    icon: "swords"
  },
  {
    id: "10-games",
    title: "10 Games Played",
    description: "Initiate combat simulation cycles",
    xp: "+500 XP",
    status: "unlocked",
    dateUnlocked: "Unlocked Jan 05",
    progressPercent: 100,
    icon: "sports_esports"
  },
  {
    id: "winning-streak-10",
    title: "Winning Streak x10",
    description: "10 consecutive flawless arena victories",
    xp: "+1,200 XP",
    status: "unlocked",
    dateUnlocked: "Unlocked Jan 14",
    progressPercent: 100,
    icon: "local_fire_department"
  },
  {
    id: "high-scorer",
    title: "High Scorer 50k+",
    description: "Crossed threshold into the hall of fame",
    xp: "+2,000 XP",
    status: "unlocked",
    dateUnlocked: "Unlocked Jan 28",
    progressPercent: 100,
    icon: "stars"
  },
  {
    id: "cyber-master",
    title: "Cyber Master",
    description: "Complete 100 Cyber Zone hacks",
    xp: "+5,000 XP",
    status: "in-progress",
    progressPercent: 85,
    icon: "neurology"
  },
  {
    id: "unstoppable",
    title: "Unstoppable",
    description: "Reach global Rank 1 in Arena showdown",
    xp: "+10,000 XP",
    status: "locked",
    progressPercent: 0,
    icon: "lock"
  }
];

export const MATCH_FEED: MatchHistoryItem[] = [
  {
    id: "m-1",
    game: "Cyber Space Runner",
    mode: "Survival Ranked",
    timeAgo: "12 mins ago",
    result: "42,890 PTS",
    score: "42,890 PTS",
    xpEarned: "+450 XP",
    colorDot: "bg-emerald-400"
  },
  {
    id: "m-2",
    game: "Neon Blade",
    mode: "1v1 Duel Arena",
    timeAgo: "2 hours ago",
    result: "VICTORY",
    score: "VICTORY",
    xpEarned: "+380 XP",
    colorDot: "bg-secondary"
  },
  {
    id: "m-3",
    game: "Cyber Drift",
    mode: "Time Attack",
    timeAgo: "Yesterday",
    result: "2nd Place",
    score: "2nd Place",
    xpEarned: "+190 XP",
    colorDot: "bg-outline"
  }
];

export const ARENA_MINI_GAMES = [
  {
    id: "cyber-runner",
    name: "Cyber Runner",
    category: "Arcade Shooter",
    tag: "ARCADE v2.4",
    tagColor: "bg-secondary-container/60 text-secondary-fixed",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6x3yHJc6TAjll4NonddNCUCmeRl-ylLzLgr-Q6SuiOfN4GDvkEEIuSGRoOi19Uy4trUdd3aQl4jtLwWYOaWa8-mxdSX6w_d8LwM4-NO4j0wGMOtro70j47S-9KeHZpvrEliJQmc9LVBl2NVr9IKCB6XvFfPO4NjTsQjeMkkY-g_yu2ppzwRY9CpUvag4-GKPwY_-JvQnaaB0JcpMwFuxUMrv2wd1nrc1qAFJBKE2EhIk4_b-wovxr1g",
  },
  {
    id: "snake-cyber",
    name: "Snake Cyber",
    category: "Arcade",
    tag: "FAST",
    tagColor: "bg-primary-container text-on-primary-fixed",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeiPS5vqXsLSqDMHWPczNt9f00U0vVlpjJtokWk1DtkioZSg89hOm6sFHREk9TiHVvgNmloGzLn39LAUM3wp1nNWGBU_-DA0qEB_uVu01JBQWHRo4i-dVQBfwllN_UNwkzokxCFn-QGlcZdMF-Dxpa6ZHqbS0LPLWgm5iCqM2QcM3qkOvGbZ_iN9Xp9WW50dZhu_TcXlkY4ZhtpwGqxX-t86Ik1cV8Lar6eYmVodVm9ZU5954Kot5H1A",
  },
  {
    id: "neon-matrix-3x",
    name: "Neon Matrix 3X",
    category: "Puzzle",
    tag: "PVP",
    tagColor: "bg-secondary-container text-secondary-fixed",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmnDWjW_S10Yg3wElbOLNXPktDfbYzksQcRf8_Rbe6es-IaLw7G9OJI5r_Fo8XUFuh4QUOIL_HaAKT7N9Ok8CiYJXVhdWa9-TJh7qFkJIOYO3cXA_326N8MBuaVhrn6hjjCkaPyz0P3Bji3KT33-NdM466INMrtD8Sfw5L1jDTVV169p7M-A-pMi0StMr78pAESb5RF-DRUsJ6H8EPG_1my96vGeDdgawiIVsnHXa2IDBVjyEGq9-8Yg",
  },
  {
    id: "quantum-memory",
    name: "Quantum Memory",
    category: "Cognitive",
    tag: "BRAIN",
    tagColor: "bg-surface-container-highest text-primary-fixed",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXOV7wmKi1iTzauw_JN7-l_i9j4GLxipkqi3rpVk0AxdoS6ZUqcJ1BMnws1NnV3TYFxtqataWnsnbWo-t8RpLqouMQQnHaWHObMWYhB20yB1nl7RGC0fWfQqP9-RPvEOAILf9MZ4Z0je1tkw9vrrJotlfLqqTBmNl8UaVei9e872SeIKev93_zwJ_aD_dBTJsx0ZCW2pZdOkqOXnne0v4_sHW1mrRieNY8QK0eZEJp1gURpxlar4tupA",
  },
  {
    id: "flappy-drone",
    name: "Flappy Drone",
    category: "Reflex",
    tag: "HARD",
    tagColor: "bg-surface-container-highest text-secondary-fixed",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxCUXQTRQ97aPesvK_Ez9810tgIo7OWU6kvViF1-di1ifaWN73rvqErZ9Z7x6yf8hGYlBvZuOGsB8y7VpPtK6nuHHCH22RFPcyP9WtL9i1_HRrZ6QLIZq82trALMpcegE056g0qN_z2ayT-MSGeIzwU5dOD16V69mVsG1NDUbfLfQ9MnOkUIUmPPYRLf2soRe1hbWGJ3CDGWJ0lAGMY9S5JgTBabIOqK5DOe9bWXIP41yCNOfwGP9XHg",
  }
];

export const CURRENT_USER_PROFILE: UserProfile = {
  username: "Phantom_Byte",
  avatar: USER_AVATAR,
  rankTitle: "Cyber Netrunner",
  tier: "S-Rank Elite",
  level: 42,
  xp: 8450,
  nextLevelXp: 10000,
  bio: "Zero packet loss. 100% precision.",
  points: 142800,
  coins: 14850,
  shards: 240,
  stats: {
    matchesPlayed: 1420,
    winRate: 64.2,
    kdRatio: 3.42,
    mvpAwards: 218,
    hoursPlayed: 348
  }
};

export const LEADERBOARD_TOP_THREE = [
  {
    rank: 2,
    username: "V0ID_WALKER",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVrP1o6xxam-ERa8Xf0HcHLhsBFjgkzGG53EFtzPC4B4JRB3SLd5GC7H40jGSlJ-YOJom5ti18Up83Qq0a6gecRChsnD3s1j-k6-Uhyqa7ALFcoeUhn5uGfAQuKFm_gWES7J33xr8mnD9i-RIH743NcQlvbnud4sbSLhjrE_Sruw33WVTdaeAuLnVP7adeGXLdEMe5tXzbYJgonUT-6ms1nja0kLhNr5Bbm7oJXonNbJIZXPWgmMUWKQ",
    points: 312400,
    winRate: 84,
    level: 89,
    trend: "+1"
  },
  {
    rank: 1,
    username: "K4T4N4_X",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQnOZDSNzifZIG_kIsX5LM_Kehz-J9iMig89xyWLnH2tHkS2KOok7e8jeynMSEZGHMfSMMqWmpWZVKo2LUE5ftZ1_ju5O05ZX6MsYSSvslWP8E8IqJ01mqOH83RZVdSMulrpA39p5DhiNbjtWM93go8ZvUoxgt3qo7Z4prv5kpM4bvO-EmxHo_5AUJ2jksWRCynMHCpWQ7X2RipYTd3iF-2t7mqCcXJaaXbzqS7BVDdB4bwPbwLBkQpA",
    points: 348920,
    winRate: 91,
    level: 95,
    trend: "+3"
  },
  {
    rank: 3,
    username: "NEO_SHADOW",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8HkiQyJ4zHVahuNIvrUi3Vj2J0pp-CsZ4iod3bWx58RFLsav4UoAzM7s4QOmgYXscSQ1AAEtv4vvTXYXu-FM_jcyVv0j6ZQ3TE6-pX7_yuSEYfKRlL-UL-zTyW13Q6w4PcWUUTqlIL22be7_qSsuChpyukfC94OQxiweHo_FNYEA-9TuWGDBou-qxIANKkVO2z1l1TpSdj9_B9WU6hi_vHU8QUAy0gss2vkikjKPDdOzaz8FWZU0CiA",
    points: 298150,
    winRate: 79,
    level: 82,
    trend: "=0"
  }
];

export const LEADERBOARD_RUNNERS = [
  {
    rank: 4,
    username: "CYBER_PUNK_99",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuASC0SbraK8mM-QkU4P8lr9ubmzW0zywyjtqKj5LmeLPXa-CKR3eNdmJ6PxoeoQ6k4a7XlYo3n4YVXJrCENyx2SUIHXQKbF5PzVOlAWr7kDRoQ6akggXhcd29xC-2eKoYzaT1TaHfL4-0vIYvlI11ubDMoy_INSXlZg64jX6CDqR3CCWmDEPNXvWs_kYBOeXdoBvQUm0cbx1DhShlj1rDSZ2DZS3oMGyE9IW0WRliM1LQkIWfk3mIgXag",
    points: 284300,
    winRate: 76,
    level: 76,
    trend: "+2 positions"
  },
  {
    rank: 5,
    username: "PIXEL_M4N",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3UHguKVt_Pr1NdO_ZrAoRezQ67eR9Oj9kf1PkwT7-Jds04IBrpw_o0Ch3n_c4sWEYFR2ztaHkd9qHcofsgp4WxR0z3ySj8VHNfK6M2L5O2OnB7uGcWniX3Z4_pDDCm6mIBvr0uzXNhRBiHSC4K4XvsisPWfrCTrT6VMpDgdqJWkLuMn1Iacmf_4Hvev1LXDwNCShBp8JweZ4V3I-1pDSV9yo70RYcOCiz617Hu5yG6htxOok62Kh5Sw",
    points: 267890,
    winRate: 72,
    level: 68,
    trend: "-1 position"
  },
  {
    rank: 6,
    username: "GLITCH_RUNNER",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZbiXqEICsehtvw6TAL1aKOJpa9QtxivrmzXNn5SDj90YSj0zIpNAVwsXxpfV96ZpmUx8IONbLN1-SpAtH-4WEgBJHxqtiL-8T54HsjEnLuSEQi26-oixt6tqqqxiImVnJY1L0o5bqEgwgrO0-qDODqFnIjhozKmnpp560vX7DuGu-LI1sd62WaxIc83On6Z0BmCxrFHu-ebOGOXYHJCY-SZfFTny7ahDg-hpj-VqBy2zvuMOVoeTISg",
    points: 251200,
    winRate: 69,
    level: 64,
    trend: "+4 positions"
  },
  {
    rank: 7,
    username: "SYNTH_WAVE_99",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY4VcJroXZUpvPKzUo3psdwulHTr4CmIc50B4jDjvbLTUcSc9qkgNtNOOeQPFA6HFj4BaaIt0I4ZFHVFmp24SduGUW5qlDE3nnnIhMs2Pl03C0iqXeXkGKhH6QTJ1crrwrZD0AkNqr_x4MZmAli64miO9X7wzc220wTmO2HZZoX_aGQ6-s3x3iL3MJj9E7Eg-DuvQUs0hRXtl2IU6aMTio0NKHqoor8ZThnXzSNwAhBdWbgdUS6gEq5A",
    points: 239800,
    winRate: 68,
    level: 61,
    trend: "steady"
  },
  {
    rank: 8,
    username: "DATA_GHOST",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_4FiSn9fITdX7bOWiDGIejUj-YDKSEkduLQRKfKHjbNqmB29u2J3d3_Ymq7RsoGQZx94zSQrCwGV5aieE6JEx9a8ZFFC8sAGEomPGCCsykQT8kMBfEu_HGcq7XEcnOqT1Ol8-hbngKKfw6VmJ3JZtKgBXgK0-ccEoIbJCSFPCP9klrgc1H64eyoAi43oIPOWOzdhExIFBMhdyo5Z9ZhcfWYEE9fObBYiZDOpAzQZq58g3hJqRZNX7Ww",
    points: 228450,
    winRate: 65,
    level: 59,
    trend: "+1 position"
  }
];

export const TROPHY_BADGES: TrophyBadge[] = [
  {
    id: "neon-overlord",
    title: "Neon Overlord",
    description: "Defeat 100 cyber bosses across single session arcade runs",
    tier: "gold",
    status: "unlocked",
    xp: "+2,500 XP",
    rarity: "Epic",
    rarityPercent: 3.8,
    category: "combat",
    icon: "military_tech",
    unlockedAt: "3d ago",
    dateUnlocked: "Unlocked 3d ago",
    progressPercent: 100,
    progressText: "100/100 Bosses",
    isPinned: true
  },
  {
    id: "velocity-god",
    title: "Velocity God",
    description: "Achieve sub-1:00 lap time in Cyber Drift: Tokyo",
    tier: "platinum",
    status: "unlocked",
    xp: "+5,000 XP",
    rarity: "Legendary",
    rarityPercent: 1.2,
    category: "speed",
    icon: "sports_motorsports",
    unlockedAt: "1w ago",
    dateUnlocked: "Unlocked 1w ago",
    progressPercent: 100,
    progressText: "00:58.42 Lap",
    isPinned: true
  },
  {
    id: "cyber-ace",
    title: "Cyber Ace",
    description: "10 consecutive flawless Arena simulator victories",
    tier: "diamond",
    status: "unlocked",
    xp: "+7,500 XP",
    rarity: "Legendary",
    rarityPercent: 0.9,
    category: "combat",
    icon: "stars",
    unlockedAt: "2w ago",
    dateUnlocked: "Unlocked 2w ago",
    progressPercent: 100,
    progressText: "10/10 Flawless Wins",
    isPinned: true
  },
  {
    id: "grand-champion",
    title: "Grand Champion",
    description: "Finished Season 3 in the Global Top 100 tier",
    tier: "gold",
    status: "unlocked",
    xp: "+3,000 XP",
    rarity: "Epic",
    rarityPercent: 2.1,
    category: "mastery",
    icon: "trophy",
    unlockedAt: "1mo ago",
    dateUnlocked: "Unlocked 1mo ago",
    progressPercent: 100,
    progressText: "Season 3 Final Rank #42",
    isPinned: false
  },
  {
    id: "first-blood",
    title: "First Blood",
    description: "Secured first competitive kill in Ranked Series",
    tier: "silver",
    status: "unlocked",
    xp: "+750 XP",
    rarity: "Common",
    rarityPercent: 48.6,
    category: "combat",
    icon: "swords",
    unlockedAt: "2mo ago",
    dateUnlocked: "Unlocked 2mo ago",
    progressPercent: 100,
    progressText: "Ranked Series 01",
    isPinned: false
  },
  {
    id: "glitch-master",
    title: "Glitch Master",
    description: "Discovered hidden developer warp gate in Sector 07",
    tier: "bronze",
    status: "unlocked",
    xp: "+500 XP",
    rarity: "Rare",
    rarityPercent: 9.4,
    category: "exploration",
    icon: "bug_report",
    unlockedAt: "3mo ago",
    dateUnlocked: "Unlocked 3mo ago",
    progressPercent: 100,
    progressText: "Sector 07 Warp Gateway",
    isPinned: false
  },
  {
    id: "pixel-tactician",
    title: "Pixel Tactician",
    description: "Win 25 matches with zero shield regenerations consumed",
    tier: "silver",
    status: "unlocked",
    xp: "+1,200 XP",
    rarity: "Rare",
    rarityPercent: 8.1,
    category: "strategy",
    icon: "psychology",
    unlockedAt: "4mo ago",
    dateUnlocked: "Unlocked 4mo ago",
    progressPercent: 100,
    progressText: "25/25 Pure Wins",
    isPinned: false
  },
  {
    id: "overclocked-pilot",
    title: "Overclocked Pilot",
    description: "Maintain 120 FPS continuous stream for 5 consecutive hours",
    tier: "gold",
    status: "unlocked",
    xp: "+2,000 XP",
    rarity: "Epic",
    rarityPercent: 4.5,
    category: "mastery",
    icon: "bolt",
    unlockedAt: "5mo ago",
    dateUnlocked: "Unlocked 5mo ago",
    progressPercent: 100,
    progressText: "5h 12m Rig Telemetry",
    isPinned: false
  },
  {
    id: "neural-singularity",
    title: "Neural Singularity",
    description: "Surpass 1,000,000 total score points in the Cyber Runner Arena",
    tier: "diamond",
    status: "in-progress",
    xp: "+10,000 XP",
    rarity: "Legendary",
    rarityPercent: 0.4,
    category: "mastery",
    icon: "neurology",
    progressPercent: 78,
    progressText: "784,500 / 1,000,000 PTS",
    isPinned: false
  },
  {
    id: "apex-predator",
    title: "Apex Predator",
    description: "Eliminate 500 enemy drones with laser combo streaks",
    tier: "platinum",
    status: "in-progress",
    xp: "+4,500 XP",
    rarity: "Epic",
    rarityPercent: 5.2,
    category: "combat",
    icon: "radar",
    progressPercent: 64,
    progressText: "320 / 500 Drones",
    isPinned: false
  },
  {
    id: "quantum-transcendence",
    title: "Quantum Transcendence",
    description: "Ascend to Global Rank #1 in any official weekly seasonal cup",
    tier: "diamond",
    status: "locked",
    xp: "+15,000 XP",
    rarity: "Legendary",
    rarityPercent: 0.1,
    category: "mastery",
    icon: "lock",
    progressPercent: 0,
    progressText: "Current Rank #42",
    isPinned: false
  }
];

export const MATCH_HISTORY: MatchHistoryItem[] = [
  {
    id: "m-1",
    gameName: "Cyber Runner Arcade",
    mode: "Sector 07 Survival",
    timestamp: "12m ago",
    result: "Victory",
    score: 42890,
    scoreDelta: "+250 PTS"
  },
  {
    id: "m-2",
    gameName: "Cyber Drift: Tokyo",
    mode: "Hyper Drift Grand Prix",
    timestamp: "2h ago",
    result: "Victory",
    score: 38400,
    scoreDelta: "+420 PTS"
  },
  {
    id: "m-3",
    gameName: "Striker Quantum",
    mode: "Ranked 3v3 Arena",
    timestamp: "5h ago",
    result: "Defeat",
    score: 18200,
    scoreDelta: "-80 PTS"
  },
  {
    id: "m-4",
    gameName: "Solar Fleet X",
    mode: "Interstellar Armada Dogfight",
    timestamp: "Yesterday",
    result: "Victory",
    score: 51200,
    scoreDelta: "+310 PTS"
  }
];

