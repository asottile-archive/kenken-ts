type Preferences = {
    gameSize: number,
    hard: boolean,
}

const KEY = 'kenken:preferences';

export function preferences(): Preferences {
    let prefs;
    try {
        prefs = JSON.parse(localStorage.getItem(KEY) || '')
    } catch {
        prefs = {};
    }

    return {gameSize: prefs.gameSize || 4, hard: prefs.hard || false};
}

function setPreferences(prefs: Preferences) {
    localStorage.setItem(KEY, JSON.stringify(prefs));
}

export function setSize(size: number) {
    let prefs = preferences();
    prefs.gameSize = size;
    setPreferences(prefs);
}
