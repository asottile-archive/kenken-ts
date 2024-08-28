import { clearStats, getStats, importStats } from './stats';

export function menu(
        button: HTMLElement,
        menuDialog: HTMLDialogElement,
        statsDialog: HTMLDialogElement,
        aboutDialog: HTMLDialogElement,
) {
    menuDialog.querySelector('.stats-link')!.addEventListener('click', () => {
        menuDialog.close();
        statsDialog.showModal();
    });
    statsDialog.querySelector('.clear')!.addEventListener('click', () => {
        if (confirm('are you sure?')) {
            clearStats();
            alert('stats cleared!');
            // TODO: need to clear current game state
            statsDialog.close();
        }
    });

    const exportLink = menuDialog.querySelector('.export-link a')!;

    const importFile: HTMLInputElement = menuDialog.querySelector('.import-link input')!;
    importFile.addEventListener('click', (e) => e.stopPropagation());
    importFile.addEventListener('change', () => {
        if (!importFile.files) {
            return;
        }
        const [file] = importFile.files;
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const contents = (reader.result || '').toString();
                try {
                    importStats(contents);
                } catch (e) {
                    alert(`error importing stats: ${e}`);
                    return;
                }
                // TODO: need to clear the current game state
                alert('statistics imported successfully!');
                menuDialog.close();
            });
            reader.readAsText(file);
        }
    });
    menuDialog.querySelector('.import-link')!.addEventListener('click', () => importFile.click());

    menuDialog.querySelector('.about-link')!.addEventListener('click', () => {
        menuDialog.close();
        aboutDialog.showModal();
    });

    button.addEventListener('click', () => {
        menuDialog.showModal()

        const blob = new Blob([JSON.stringify(getStats())], {type: 'application/json'});
        exportLink.setAttribute('href', URL.createObjectURL(blob));
    });
}
