import type { HistoryKey } from '../types/models';

export const hairTypes = ['Liso', 'Ondulado', 'Cacheado', 'Crespo', 'Muito crespo'];

export const curvatures = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C'];

export const thicknessOptions = ['Fino', 'Médio', 'Grosso'];

export const levelOptions = ['Baixa', 'Média', 'Alta'];

export const hairStates = ['Ressecado', 'Poroso', 'Quebradiço', 'Opaco', 'Sem vida'];

export const scalpTypes = ['Normal', 'Oleoso', 'Seco', 'Sensível'];

export const yesNoOptions = ['Sim', 'Não'];

export const historyItems: {key: HistoryKey;label: string;}[] = [
{ key: 'coloracao', label: 'Coloração anterior' },
{ key: 'relaxamento', label: 'Relaxamento' },
{ key: 'descoloracao', label: 'Descoloração' },
{ key: 'hena', label: 'Henê/Henna' },
{ key: 'progressiva', label: 'Progressiva' },
{ key: 'outros', label: 'Outros procedimentos' }];


export const statusOptions = [
{ value: 'ativo', label: 'Ativo' },
{ value: 'inativo', label: 'Inativo' }];