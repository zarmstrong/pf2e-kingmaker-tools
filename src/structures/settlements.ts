import {
    ActionBonuses,

    ItemLevelBonuses, SkillItemBonuses,
    SettlementData,
} from './structures';
import {getNumberSetting, setSetting} from '../settings';
import {getMergedData, saveViewedSceneData} from './scene';
import {getKingdomData, getKingdomSize, saveKingdomSize} from './kingdom';




interface SettlementOptions {
    game: Game;
}

interface SettlementFormData {
    kingdomSize: number;
    settlementType: string;
    settlementLevel: number;
}

interface LabeledData<T = string> {
    label: string;
    value: T;
}

interface SkillBonusData extends LabeledData<number> {
    actions: LabeledData<number>[];
}

class SettlementApp extends FormApplication<FormApplicationOptions & SettlementOptions, object, null> {
    static override get defaultOptions(): FormApplicationOptions {
        const options = super.defaultOptions;
        options.id = 'settlement-app';
        options.title = 'Settlement';
        options.template = 'modules/pf2e-kingmaker-tools/templates/settlement.html';
        options.submitOnChange = true;
        options.closeOnSubmit = false;
        options.classes = ['kingmaker-tools-app', 'settlement-app'];
        options.width = 500;
        return options;
    }

    private readonly game: Game;

    constructor(object: null, options: Partial<FormApplicationOptions> & SettlementOptions) {
        super(object, options);
        this.game = options.game;
    }

    override getData(options?: Partial<FormApplicationOptions>): object {
        const isGM = this.game.user?.isGM ?? false;
        const isUser = !isGM;
        const data = getMergedData(this.game)!;
        const structures = data.settlement;
        const sceneData = data.scenedData;
        const settlementLevel = sceneData.settlementLevel || 1;
        const storage = this.getStorage(structures);
        return {
            ...super.getData(options),
            ...structures.config,
            ...sceneData,
            consumption: structures.consumption,
            capitalInvestmentPossible: structures.allowCapitalInvestment ? 'yes' : 'no',
            settlementEventBonus: structures.settlementEventBonus,
            notes: structures.notes,
            showNotes: structures.notes.length > 0,
            leadershipActivities: structures.increaseLeadershipActivities ? 3 : 2,
            settlementTypes: ['-', 'Settlement', 'Capital'],
            availableItems: this.getAvailableItems(settlementLevel, structures.itemLevelBonuses),
            storage,
            showStorage: Object.keys(storage).length > 0,
            skillItemBonuses: this.getSkillBonuses(structures.skillBonuses),
            isGM,
            isUser,
        };
    }

    override async _updateObject(event: Event, formData: SettlementFormData): Promise<void> {
        await saveKingdomSize(this.game, formData.kingdomSize);
        await saveViewedSceneData(this.game, {
            settlementLevel: formData.settlementLevel,
            settlementType: formData.settlementType,
        });
        this.render();
    }

    public sceneChange(): void {
        this.render();
    }

    override activateListeners(html: JQuery): void {
        super.activateListeners(html);
        Hooks.on('canvasReady', this.sceneChange.bind(this));
        Hooks.on('createToken', this.sceneChange.bind(this));
        Hooks.on('deleteToken', this.sceneChange.bind(this));
    }

    override close(options?: FormApplication.CloseOptions): Promise<void> {
        Hooks.off('canvasReady', this.sceneChange);
        Hooks.off('createToken', this.sceneChange);
        Hooks.off('deleteToken', this.sceneChange);
        return super.close(options);
    }

    private capitalize(word: string): string {
        return word[0].toUpperCase() + word.substring(1);
    }

    private unslugifyAction(word: string): string {
        return word
            .replaceAll('action:', '')
            .split('-')
            .map(part => this.capitalize(part))
            .join(' ');
    }

    private getAvailableItems(settlementLevel: number, itemLevelBonuses: ItemLevelBonuses): LabeledData<number>[] {
        return Object.entries(itemLevelBonuses)
            .map(([type, bonus]) => {
                return {
                    label: this.capitalize(type),
                    value: Math.max(0, settlementLevel + bonus),
                };
            });
    }

    private getStorage(structures: SettlementData): LabeledData[] {
        return Object.entries(structures.storage)
            .filter(([, bonus]) => bonus > 0)
            .map(([type, bonus]) => {
                return {
                    label: this.capitalize(type),
                    value: bonus,
                };
            });
    }

    private getSkillBonuses(skillBonuses: SkillItemBonuses): SkillBonusData[] {
        return Object.entries(skillBonuses)
            .map(([skill, bonus]) => {
                return {
                    label: this.capitalize(skill),
                    value: bonus.value,
                    actions: (Object.entries(bonus.actions) as ([keyof ActionBonuses, number])[])
                        .map(([action, value]) => {
                            return {
                                label: this.unslugifyAction(action),
                                value: value,
                            };
                        }),
                };
            });
    }
}

export async function showStructureBonuses(game: Game): Promise<void> {
    new SettlementApp(null, {game}).render(true);
}

function editTemplate(structureData: object | undefined): string {
    const root = document.createElement('form');
    const textarea = document.createElement('textarea');
    textarea.name = 'json';
    textarea.innerText = structureData ? JSON.stringify(structureData) : '';
    root.appendChild(textarea);
    return root.outerHTML;
}

export async function showStructureEditDialog(game: Game, actor: Actor): Promise<void> {
    const structureData = actor!.getFlag('pf2e-kingmaker-tools', 'structureData') ?? undefined;
    console.log(structureData);
    new Dialog({
        title: 'Edit Structure Data',
        content: editTemplate(structureData),
        buttons: {
            roll: {
                icon: '<i class="fa-solid fa-save"></i>',
                label: 'Save',
                callback: async (html): Promise<void> => {
                    const $html = html as HTMLElement;
                    const json = $html.querySelector('textarea[name=json]') as HTMLInputElement;
                    const value = json.value.trim() === '' ? null : JSON.parse(json.value);
                    console.log(value);
                    await actor.setFlag('pf2e-kingmaker-tools', 'structureData', value);
                },
            },
        },
        default: 'roll',
    }, {
        jQuery: false,
    }).render(true, {width: 400, classes: ['edit-structure-json', 'kingmaker-tools-app']});
}
