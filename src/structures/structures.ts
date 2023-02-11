export type Action = 'establish-trade-agreement'
    | 'provide-care'
    | 'hire-adventurers'
    | 'celebrate-holiday'
    | 'demolish'
    | 'quell-unrest'
    | 'rest-and-relax'
    | 'harvest-crops'
    | 'garrison-army'
    | 'recover-army'
    | 'recruit-army'
    | 'deploy-army'
    | 'train-army'
    | 'outfit-army'
    | 'establish-work-site-mine'
    | 'establish-work-site-lumber'
    | 'establish-work-site-quarry'
    | 'establish-work-site'
    | 'establish-farmland'
    | 'create-a-masterpiece'
    | 'fortify-hex'
    | 'go-fishing'
    | 'trade-commodities'
    | 'gather-lifestock'
    | 'purchase-commodities'
    | 'resolve-settlement-events'
    | 'improve-lifestyle'
    | 'craft-luxuries'
    | 'tap-treasury'
    | 'infiltration'
    | 'clandestine-business'
    | 'send-diplomatic-envoy'
    | 'request-foreign-aid'
    | 'supernatural-solution'
    | 'new-leadership'
    | 'pledge-of-fealty'
    | 'creative-solution'
    | 'build-structure'
    | 'repair-reputation-decay'
    | 'repair-reputation-corruption'
    | 'repair-reputation-crime'
    | 'repair-reputation-strife'
    | 'prognostication'
    | 'capital-investment'
    | 'collect-taxes'
    | 'build-roads'
    | 'clear-hex'
    | 'establish-settlement'
    | 'irrigation'
    | 'abandon-hex'
    | 'claim-hex'
    | 'relocate-capital'
    | 'manage-trade-agreements'
    ;

export type Skill = 'agriculture'
    | 'arts'
    | 'boating'
    | 'defense'
    | 'engineering'
    | 'exploration'
    | 'folklore'
    | 'industry'
    | 'intrigue'
    | 'magic'
    | 'politics'
    | 'scholarship'
    | 'statecraft'
    | 'trade'
    | 'warfare'
    | 'wilderness'
    ;

export const allSkills: Skill[] = [
    'agriculture',
    'arts',
    'boating',
    'defense',
    'engineering',
    'exploration',
    'folklore',
    'industry',
    'intrigue',
    'magic',
    'politics',
    'scholarship',
    'statecraft',
    'trade',
    'warfare',
    'wilderness',
];

export const actionSkills: Record<Action, (Skill)[] | ['*']> = {
    // agriculture
    'establish-farmland': ['agriculture'],
    'harvest-crops': ['agriculture'],
    // arts
    'craft-luxuries': ['arts'],
    'rest-and-relax': ['arts', 'boating', 'scholarship', 'trade', 'wilderness'],
    'quell-unrest': ['arts', 'folklore', 'intrigue', 'magic', 'politics', 'warfare'],
    'create-a-masterpiece': ['arts'],
    'repair-reputation-corruption': ['arts'],
    // boating
    'establish-trade-agreement': ['boating', 'magic', 'trade'],
    'go-fishing': ['boating'],
    // defense
    'fortify-hex': ['defense'],
    'provide-care': ['defense'],
    // engineering
    'build-roads': ['engineering'],
    'clear-hex': ['engineering', 'exploration'],
    'demolish': ['engineering'],
    'establish-settlement': ['engineering', 'industry', 'politics', 'scholarship'],
    'establish-work-site': ['engineering'],
    'establish-work-site-quarry': ['engineering'],
    'establish-work-site-lumber': ['engineering'],
    'establish-work-site-mine': ['engineering'],
    'irrigation': ['engineering'],
    'repair-reputation-decay': ['engineering'],
    // exploration
    'abandon-hex': ['exploration', 'wilderness'],
    'claim-hex': ['exploration', 'wilderness'],
    'hire-adventurers': ['exploration'],
    // folklore
    'celebrate-holiday': ['folklore'],
    // industry
    'relocate-capital': ['industry'],
    'trade-commodities': ['industry'],
    // intrigue
    'infiltration': ['intrigue'],
    'new-leadership': ['intrigue', 'politics', 'statecraft', 'warfare'],
    'clandestine-business': ['intrigue'],
    'pledge-of-fealty': ['intrigue', 'statecraft', 'warfare'],
    'repair-reputation-strife': ['intrigue'],
    // magic
    'supernatural-solution': ['magic'],
    'prognostication': ['magic'],
    // politics
    'improve-lifestyle': ['politics'],
    // scholarship
    'creative-solution': ['scholarship'],
    // statecraft
    'tap-treasury': ['statecraft'],
    'request-foreign-aid': ['statecraft'],
    'send-diplomatic-envoy': ['statecraft'],
    // trade
    'capital-investment': ['trade'],
    'manage-trade-agreements': ['trade'],
    'purchase-commodities': ['trade'],
    'collect-taxes': ['trade'],
    'repair-reputation-crime': ['trade'],
    // warfare
    'garrison-army': ['warfare'],
    'deploy-army': ['warfare'],
    'outfit-army': ['warfare'],
    'train-army': ['warfare'],
    'recover-army': ['warfare'],
    'recruit-army': ['warfare'],

    // wilderness
    'gather-lifestock': ['wilderness'],

    // other
    'resolve-settlement-events': ['*'],
    'build-structure': ['*'],

    // TODO: companion actions
};

export interface SimpleKingdomSkillRule {
    value: number;
    action: Action;
}

export interface KingdomSkillRule {
    value: number;
    skill: Skill;
    // e.g. ['action:quell-unrest']
    predicate?: string[];
}

export interface ItemLevelsRule {
    value: number;
    // e.g. ['item:trait:alchemical'] or ['item:trait:magic']
    predicate?: string[];
}

export interface SettlementEventsRule {
    value: number;
}

export interface Storage {
    ore: number;
    food: number;
    lumber: number;
    stone: number;
    luxuries: number;
}

export interface Structure {
    // if no id is given, fall back to name
    id?: string;
    name: string;
    notes?: string;
    preventItemLevelPenalty?: boolean;
    enableCapitalInvestment?: boolean,
    kingdomSkillRules?: KingdomSkillRule[];
    simpleKingdomSkillRules?: SimpleKingdomSkillRule[];
    availableItemsRules?: ItemLevelsRule[];
    settlementEventRules?: SettlementEventsRule[];
    storage?: Partial<Storage>;
    increaseLeadershipActivities?: boolean;
    consumptionReduction?: number;
    leadershipActivityMaxBonus?: boolean;
}

export interface SkillItemBonus {
    value: number;
    actions: Partial<Record<Action, number>>;
}

export interface SkillItemBonuses {
    agriculture: SkillItemBonus;
    arts: SkillItemBonus;
    boating: SkillItemBonus;
    defense: SkillItemBonus;
    engineering: SkillItemBonus;
    exploration: SkillItemBonus;
    folklore: SkillItemBonus;
    industry: SkillItemBonus;
    intrigue: SkillItemBonus;
    magic: SkillItemBonus;
    politics: SkillItemBonus;
    scholarship: SkillItemBonus;
    statecraft: SkillItemBonus;
    trade: SkillItemBonus;
    warfare: SkillItemBonus;
    wilderness: SkillItemBonus;
}

export interface ItemLevelBonuses {
    divine: number;
    alchemical: number;
    primal: number;
    occult: number;
    arcane: number;
    luxury: number;
    magical: number;
    other: number;
}

export interface StructureResult {
    allowCapitalInvestment: boolean;
    notes: string[];
    skillBonuses: SkillItemBonuses;
    itemLevelBonuses: ItemLevelBonuses;
    settlementEventBonus: number;
    storage: Storage;
    increaseLeadershipActivities: boolean;
    consumptionReduction: number;
    leadershipActivityMaxBonus: boolean;
}

function count<T>(items: T[], idFunction: (item: T) => string): Map<string, { count: number, item: T }> {
    return items.reduce((map, item) => {
        const id = idFunction(item);
        const count = (map.get(id)?.count ?? 0) + 1;
        return map.set(id, {count, item});
    }, new Map());
}

function getStructureId(structure: Structure): string {
    return structure.id ?? structure.name;
}

/**
 * Add up item bonuses of same structure
 */
function groupStructures(structures: Structure[], maxItemBonus: number): Structure[] {
    const structureOccurrences = count(structures, s => getStructureId(s));
    return Array.from(structureOccurrences.values())
        .map((data) => {
            const structure = data.item;
            const result: Structure = {
                ...structure,
                kingdomSkillRules: structure?.kingdomSkillRules?.map(rule => {
                    return {
                        ...rule,
                        value: Math.min(rule.value * data.count, maxItemBonus),
                    };
                }),
                availableItemsRules: structure?.availableItemsRules?.map(rule => {
                    return {
                        ...rule,
                        value: Math.min(rule.value * data.count, maxItemBonus),
                    };
                }),
                settlementEventRules: structure?.settlementEventRules?.map(rule => {
                    return {
                        ...rule,
                        value: Math.min(rule.value * data.count, maxItemBonus),
                    };
                }),
            };
            return result;
        });
}

function applySkillBonusRules(result: SkillItemBonuses, structures: Structure[]): void {
    // apply skills
    structures.forEach(structure => {
        structure.kingdomSkillRules?.forEach(rule => {
            const skill = result[rule.skill];
            if (!rule.predicate) {
                if (rule.value > skill.value) {
                    skill.value = rule.value;
                }
            }
        });
    });
    // apply actions
    structures.forEach(structure => {
        structure.kingdomSkillRules?.forEach(rule => {
            const skill = result[rule.skill];
            const predicate = rule.predicate;
            if (predicate) {
                const action = predicate[0].replaceAll('action:', '') as Action;
                if (rule.value > skill.value &&
                    rule.value > (skill.actions[action] ?? 0)) {
                    skill.actions[action] = rule.value;
                }
            }
        });
    });
}

function calculateItemLevelBonus(
    defaultPenalty: number,
    globallyStackingBonuses: number,
    value: number,
    maxItemLevelBonus: number
): number {
    return Math.min(value + globallyStackingBonuses + defaultPenalty, maxItemLevelBonus);
}

function applyItemLevelRules(itemLevelBonuses: ItemLevelBonuses, structures: Structure[], maxItemLevelBonus: number): void {
    const defaultPenalty = structures.some(structure => structure.preventItemLevelPenalty === true) ? 0 : -2;

    // apply base values that stack with everything
    const globallyStackingBonuses = Math.min(
        structures
            .flatMap(structures => structures.availableItemsRules ?? [])
            .filter(rule => rule.predicate === undefined || rule.predicate.length === 0)
            .map(rule => rule.value)
            .reduce((a, b) => a + b, 0),
        maxItemLevelBonus
    );

    const defaultBonus = calculateItemLevelBonus(defaultPenalty, globallyStackingBonuses, 0, maxItemLevelBonus);
    (Object.keys(itemLevelBonuses) as (keyof ItemLevelBonuses)[]).forEach((key) => {
        itemLevelBonuses[key] = defaultBonus;
    });

    // magical overrides primal, divine, arcane, occult
    structures.forEach(structure => {
        structure.availableItemsRules?.forEach(rule => {
            const predicate = rule.predicate;
            if (predicate?.[0] === 'item:trait:magical') {
                const value = calculateItemLevelBonus(defaultPenalty, globallyStackingBonuses, rule.value, maxItemLevelBonus);
                const types = ['magical', 'divine', 'occult', 'primal', 'arcane'] as (keyof ItemLevelBonuses)[];
                types.forEach(type => {
                    if (value > itemLevelBonuses[type]) {
                        itemLevelBonuses[type] = value;
                    }
                });
            }
        });
    });

    structures.forEach(structure => {
        structure.availableItemsRules?.forEach(rule => {
            const predicate = rule.predicate;
            if (predicate) {
                const value = calculateItemLevelBonus(defaultPenalty, globallyStackingBonuses, rule.value, maxItemLevelBonus);
                const type = predicate[0].replaceAll('item:trait:', '') as keyof ItemLevelBonuses;
                if (value > itemLevelBonuses[type]) {
                    itemLevelBonuses[type] = value;
                }
            }
        });
    });
}

function applySettlementEventBonuses(result: StructureResult, structures: Structure[]): void {
    structures.forEach(structure => {
        structure.settlementEventRules?.forEach(rule => {
            if (rule.value > result.settlementEventBonus) {
                result.settlementEventBonus = rule.value;
            }
        });
    });
}

function simplifyRules(rules: SimpleKingdomSkillRule[]): KingdomSkillRule[] {
    return rules.flatMap(rule => {
        const action = rule.action;
        const skills = actionSkills[action];
        const flattenedSkills = skills[0] === '*' ? allSkills : skills as Skill[];
        return flattenedSkills.map(skill => {
            return {
                value: rule.value,
                skill,
                predicate: [`action:${action}`],
            };
        });
    });
}

function unionizeStructures(structures: Structure[]): Structure[] {
    return structures.map(structure => {
        const simplifiedRules = simplifyRules(structure.simpleKingdomSkillRules ?? []);
        return {
            ...structure,
            kingdomSkillRules: [...(structure.kingdomSkillRules ?? []), ...simplifiedRules],
        };
    });
}

function applyStorageIncreases(storage: Storage, structures: Structure[]): void {
    structures
        .filter(structures => structures.storage)
        .forEach(structure => {
            const keys = ['ore', 'lumber', 'food', 'stone', 'luxuries'] as (keyof Storage)[];
            keys.forEach(key => {
                const structureStorage = structure.storage;
                if (structureStorage && key in structureStorage) {
                    storage[key] += structureStorage[key] ?? 0;
                }
            });
        });
}

function applyConsumptionReduction(result: StructureResult, structures: Structure[]): void {
    const consumptionPerUniqueBuilding = new Map<string, number>();
    structures
        .filter(structure => structure.consumptionReduction)
        .forEach(structure => {
            const id = getStructureId(structure);
            const existingReduction = consumptionPerUniqueBuilding.get(id);
            const newReduction = structure?.consumptionReduction ?? 0;
            if (existingReduction === undefined || existingReduction < newReduction) {
                consumptionPerUniqueBuilding.set(id, newReduction);
            }
        });
    result.consumptionReduction = Array.from(consumptionPerUniqueBuilding.values())
        .reduce((a, b) => a + b, 0);
}

/**
 * Calculate all Bonuses of a settlement
 * @param structures
 * @param maxItemBonus
 */
export function evaluate(structures: Structure[], maxItemBonus: number): StructureResult {
    const allowCapitalInvestment = structures.some(structure => structure.enableCapitalInvestment === true);
    const notes = Array.from(new Set(structures.flatMap(result => result.notes ?? [])));
    const result: StructureResult = {
        allowCapitalInvestment,
        notes,
        skillBonuses: {
            agriculture: {value: 0, actions: {}},
            arts: {value: 0, actions: {}},
            boating: {value: 0, actions: {}},
            defense: {value: 0, actions: {}},
            engineering: {value: 0, actions: {}},
            exploration: {value: 0, actions: {}},
            folklore: {value: 0, actions: {}},
            industry: {value: 0, actions: {}},
            intrigue: {value: 0, actions: {}},
            magic: {value: 0, actions: {}},
            politics: {value: 0, actions: {}},
            scholarship: {value: 0, actions: {}},
            statecraft: {value: 0, actions: {}},
            trade: {value: 0, actions: {}},
            warfare: {value: 0, actions: {}},
            wilderness: {value: 0, actions: {}},
        },
        itemLevelBonuses: {
            divine: 0,
            alchemical: 0,
            primal: 0,
            occult: 0,
            arcane: 0,
            luxury: 0,
            magical: 0,
            other: 0,
        },
        settlementEventBonus: 0,
        storage: {
            ore: 0,
            food: 0,
            lumber: 0,
            luxuries: 0,
            stone: 0,
        },
        increaseLeadershipActivities: structures.some(structure => structure.increaseLeadershipActivities === true),
        leadershipActivityMaxBonus: structures.some(structure => structure.leadershipActivityMaxBonus === true),
        consumptionReduction: 0,
    };
    const unionizedStructures = unionizeStructures(structures);
    applyConsumptionReduction(result, structures);
    applyStorageIncreases(result.storage, structures);
    const groupedStructures = groupStructures(unionizedStructures, maxItemBonus);
    applySettlementEventBonuses(result, groupedStructures);
    applySkillBonusRules(result.skillBonuses, groupedStructures);
    applyItemLevelRules(result.itemLevelBonuses, groupedStructures, maxItemBonus);
    return result;
}