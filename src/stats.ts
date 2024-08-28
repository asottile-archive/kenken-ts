type SizeStats = {
    gamesWon: number,
    gamesPlayed: number,
    winTime: number,
    bestTime: number | null,
    bestDate: string | null,
};

function assertIsSizeStats(obj: any): asserts obj is SizeStats {
    if (typeof obj.gamesWon !== 'number') {
        throw new TypeError('gamesWon is not a number');
    }
    if (typeof obj.gamesPlayed !== 'number') {
        throw new TypeError('gamesPlayed is not a number');
    }
    if (typeof obj.winTime !== 'number') {
        throw new TypeError('winTime is not a number');
    }
    if (obj.bestTime !== null && typeof obj.bestTime !== 'number') {
        throw new TypeError('bestTime is not a number or null');
    }
    if (obj.bestDate !== null && typeof obj.bestDate !== 'string') {
        throw new TypeError('bestDate is not a string or null');
    }
}

function defaultSizeStats(): SizeStats {
    return {
        gamesWon: 0,
        gamesPlayed: 0,
        winTime: 0,
        bestTime: null,
        bestDate: null,
    }
}

type Stats = {
    normal: SizeStats[],
    hard: SizeStats[],
};

function assertIsStats(obj: any): asserts obj is Stats {
    if (!Array.isArray(obj.normal) || obj.normal.length !== 6) {
        throw new TypeError('normal: not an array of length 6');
    }
    if (!Array.isArray(obj.hard) || obj.hard.length !== 6) {
        throw new TypeError('hard: not an array of length 6');
    }
    obj.normal.forEach(assertIsSizeStats);
    obj.hard.forEach(assertIsSizeStats);
}

function defaultStats(): Stats {
    return {
        normal: Array.from({length: 6}, defaultSizeStats),
        hard: Array.from({length: 6}, defaultSizeStats),
    }
}

const KEY = 'kenken:statistics';

function statsFromString(s: string): Stats {
    let stats = JSON.parse(s);
    assertIsStats(stats);
    return stats;
}

export function clearStats() {
    localStorage.removeItem(KEY);
}

export function getStats(): Stats {
    try {
        return statsFromString(localStorage.getItem(KEY) || '');
    } catch (e) {
        console.log('discarding stats due to error', e);
        return defaultStats();
    }
}

export function importStats(s: string) {
    let stats = statsFromString(s);
    assertIsStats(stats);
    localStorage.setItem(KEY, JSON.stringify(stats));
}
