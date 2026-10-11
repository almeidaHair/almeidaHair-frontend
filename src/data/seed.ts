import type { Client, Evaluation, SeedUser } from '../types/models';

export const seedClients: Client[] = [
{
  id: 'c1',
  name: 'Mariana Souza Lima',
  birthDate: '1992-04-18',
  phone: '(11) 98765-4321',
  email: 'mariana@email.com',
  instagram: '@marisouzalima',
  address: 'Rua das Acácias, 120 — Vila Mariana, São Paulo/SP',
  howFound: 'Indicação de uma amiga',
  usualProcedures: 'Corte, hidratação e coloração',
  preferences: 'Prefere produtos sem sulfato e horários pela manhã',
  notes: 'Sensibilidade no couro cabeludo com amônia. Fazer teste de mecha antes de colorir.',
  firstVisit: '2026-03-14',
  status: 'ativo',
  lgpdConsentAt: '2026-03-14T10:00:00.000Z',
  createdAt: '2026-03-14T10:00:00.000Z'
},
{
  id: 'c2',
  name: 'Juliana Ferreira Alves',
  birthDate: '1988-11-02',
  phone: '(11) 97654-1122',
  email: 'juliana.alves@email.com',
  instagram: '@ju.ferreira',
  address: 'Av. Paulista, 900, ap. 52 — Bela Vista, São Paulo/SP',
  howFound: 'Instagram',
  usualProcedures: 'Cronograma capilar e escova',
  preferences: 'Gosta de finalização com volume',
  notes: '',
  firstVisit: '2026-07-05',
  status: 'ativo',
  lgpdConsentAt: '2026-07-05T14:00:00.000Z',
  createdAt: '2026-07-05T14:00:00.000Z'
},
{
  id: 'c3',
  name: 'Camila Rocha Mendes',
  birthDate: '1995-01-27',
  phone: '(11) 99812-3344',
  email: 'camila.rocha@email.com',
  instagram: '@camirocha',
  address: 'Rua Harmonia, 45 — Pinheiros, São Paulo/SP',
  howFound: 'Google',
  usualProcedures: 'Mechas e tonalização',
  preferences: 'Tons dourados, evita reflexos acinzentados',
  notes: '',
  firstVisit: '2026-08-10',
  status: 'ativo',
  lgpdConsentAt: '2026-08-10T09:30:00.000Z',
  createdAt: '2026-08-10T09:30:00.000Z'
},
{
  id: 'c4',
  name: 'Beatriz Nogueira',
  birthDate: '1979-06-09',
  phone: '(11) 96543-7788',
  email: 'bia.nogueira@email.com',
  instagram: '',
  address: 'Rua Augusta, 1500 — Consolação, São Paulo/SP',
  howFound: 'Passou em frente ao salão',
  usualProcedures: 'Corte',
  preferences: '',
  notes: 'Mudou-se para outra cidade.',
  firstVisit: '2025-11-20',
  status: 'inativo',
  lgpdConsentAt: '2025-11-20T16:00:00.000Z',
  createdAt: '2025-11-20T16:00:00.000Z'
},
{
  id: 'c5',
  name: 'Patrícia Almeida Costa',
  birthDate: '1990-09-15',
  phone: '(11) 95432-6655',
  email: 'patricia.costa@email.com',
  instagram: '@paty.costa',
  address: 'Rua Tabapuã, 300 — Itaim Bibi, São Paulo/SP',
  howFound: 'Indicação',
  usualProcedures: 'Progressiva e corte',
  preferences: 'Sem cheiro forte nos produtos',
  notes: '',
  firstVisit: '2026-05-22',
  status: 'ativo',
  lgpdConsentAt: '2026-05-22T11:00:00.000Z',
  createdAt: '2026-05-22T11:00:00.000Z'
},
{
  id: 'c6',
  name: 'Renata Oliveira Santos',
  birthDate: '1985-12-03',
  phone: '(11) 94321-9090',
  email: 'renata.santos@email.com',
  instagram: '@renataoliveira',
  address: 'Rua Cardeal Arcoverde, 210 — Pinheiros, São Paulo/SP',
  howFound: 'Instagram',
  usualProcedures: 'Tratamento para cachos',
  preferences: 'Finalização com fitagem',
  notes: '',
  firstVisit: '2026-09-02',
  status: 'ativo',
  lgpdConsentAt: '2026-09-02T15:00:00.000Z',
  createdAt: '2026-09-02T15:00:00.000Z'
}];


export const seedEvaluations: Evaluation[] = [
{
  id: 'e1',
  clientId: 'c1',
  date: '2026-03-14',
  sharedWithClient: true,
  hair: {
    types: ['Ondulado'],
    curvatures: ['2B'],
    thickness: 'Médio',
    density: 'Média',
    porosity: 'Alta',
    elasticity: 'Baixa',
    elasticityNotes: 'Fios rompem com facilidade quando molhados',
    states: ['Ressecado', 'Poroso'],
    stateOther: ''
  },
  scalp: { types: ['Sensível'], flaking: 'Não', notes: 'Leve vermelhidão na região da nuca' },
  history: {
    coloracao: { done: true, detail: 'Castanho médio, há 8 meses' },
    descoloracao: { done: false, detail: '' },
    progressiva: { done: true, detail: 'Há 1 ano' },
    relaxamento: { done: false, detail: '' },
    hena: { done: false, detail: '' },
    outros: { done: false, detail: '' }
  },
  professional: {
    goal: 'Recuperar o brilho e a definição das ondas',
    diagnosis:
    'Fios com porosidade alta e baixa elasticidade, resultado de química acumulada. Necessitam de reposição de massa antes de nova coloração.',
    recommendedProcedure: 'Cronograma de reconstrução por 4 semanas',
    strandTest: 'Sim',
    strandResult: 'Elasticidade baixa — evitar descoloração',
    notes: 'Reavaliar em 30 dias.'
  },
  authorName: 'Fernanda Almeida',
  createdAt: '2026-03-14T11:00:00.000Z'
},
{
  id: 'e2',
  clientId: 'c1',
  date: '2026-08-22',
  sharedWithClient: true,
  hair: {
    types: ['Ondulado'],
    curvatures: ['2B', '2C'],
    thickness: 'Médio',
    density: 'Média',
    porosity: 'Média',
    elasticity: 'Média',
    elasticityNotes: '',
    states: ['Ressecado'],
    stateOther: 'Pontas duplas'
  },
  scalp: { types: ['Normal'], flaking: 'Não', notes: '' },
  history: {
    coloracao: { done: true, detail: 'Retoque de raiz em junho' },
    descoloracao: { done: false, detail: '' },
    progressiva: { done: false, detail: '' },
    relaxamento: { done: false, detail: '' },
    hena: { done: false, detail: '' },
    outros: { done: true, detail: 'Cronograma de reconstrução concluído' }
  },
  professional: {
    goal: 'Manter a saúde dos fios e tirar as pontas',
    diagnosis:
    'Boa evolução após a reconstrução: porosidade e elasticidade normalizadas. Pontas ainda ressecadas.',
    recommendedProcedure: 'Corte de 3 cm e nutrição quinzenal',
    strandTest: 'Não',
    strandResult: '',
    notes: 'Liberada para coloração sem amônia.'
  },
  authorName: 'Fernanda Almeida',
  createdAt: '2026-08-22T10:30:00.000Z'
},
{
  id: 'e3',
  clientId: 'c2',
  date: '2026-07-05',
  sharedWithClient: true,
  hair: {
    types: ['Cacheado'],
    curvatures: ['3A', '3B'],
    thickness: 'Fino',
    density: 'Alta',
    porosity: 'Média',
    elasticity: 'Alta',
    elasticityNotes: '',
    states: ['Opaco'],
    stateOther: ''
  },
  scalp: { types: ['Oleoso'], flaking: 'Sim', notes: 'Descamação leve no topo' },
  history: {
    coloracao: { done: false, detail: '' },
    descoloracao: { done: false, detail: '' },
    progressiva: { done: false, detail: '' },
    relaxamento: { done: false, detail: '' },
    hena: { done: true, detail: 'Henna natural há 2 anos' },
    outros: { done: false, detail: '' }
  },
  professional: {
    goal: 'Cachos mais definidos e com brilho',
    diagnosis: 'Cachos saudáveis com perda de brilho e couro cabeludo oleoso com leve descamação.',
    recommendedProcedure: 'Detox capilar e hidratação com finalização',
    strandTest: 'Não',
    strandResult: '',
    notes: ''
  },
  authorName: 'Fernanda Almeida',
  createdAt: '2026-07-05T15:00:00.000Z'
},
{
  id: 'e4',
  clientId: 'c1',
  date: '2026-09-30',
  sharedWithClient: false,
  hair: {
    types: ['Ondulado'],
    curvatures: ['2B'],
    thickness: 'Médio',
    density: 'Média',
    porosity: 'Média',
    elasticity: 'Média',
    elasticityNotes: '',
    states: [],
    stateOther: ''
  },
  scalp: { types: ['Normal'], flaking: 'Não', notes: '' },
  history: {
    coloracao: { done: true, detail: 'Coloração sem amônia em setembro' },
    descoloracao: { done: false, detail: '' },
    progressiva: { done: false, detail: '' },
    relaxamento: { done: false, detail: '' },
    hena: { done: false, detail: '' },
    outros: { done: false, detail: '' }
  },
  professional: {
    goal: 'Acompanhamento pós-coloração',
    diagnosis: 'Rascunho: avaliar fixação da cor na próxima visita antes de compartilhar.',
    recommendedProcedure: 'Matização em 20 dias',
    strandTest: 'Não',
    strandResult: '',
    notes: 'Uso interno.'
  },
  authorName: 'Fernanda Almeida',
  createdAt: '2026-09-30T09:00:00.000Z'
}];


export const seedUsers: SeedUser[] = [
{ id: 'u-admin', email: 'admin@almeidahair.com', name: 'Fernanda Almeida', role: 'admin', password: 'admin123' },
{ id: 'u-c1', email: 'mariana@email.com', name: 'Mariana Souza Lima', role: 'client', clientId: 'c1', password: 'cliente123' },
{ id: 'u-c2', email: 'juliana.alves@email.com', name: 'Juliana Ferreira Alves', role: 'client', clientId: 'c2', password: 'cliente123' },
{ id: 'u-c3', email: 'camila.rocha@email.com', name: 'Camila Rocha Mendes', role: 'client', clientId: 'c3', password: 'cliente123' },
{ id: 'u-c4', email: 'bia.nogueira@email.com', name: 'Beatriz Nogueira', role: 'client', clientId: 'c4', password: 'cliente123' },
{ id: 'u-c5', email: 'patricia.costa@email.com', name: 'Patrícia Almeida Costa', role: 'client', clientId: 'c5', password: 'cliente123' },
{ id: 'u-c6', email: 'renata.santos@email.com', name: 'Renata Oliveira Santos', role: 'client', clientId: 'c6', password: 'cliente123' }];


export const demoAccounts = [
{ label: 'Administrador', email: 'admin@almeidahair.com', password: 'admin123' },
{ label: 'Cliente', email: 'mariana@email.com', password: 'cliente123' }];