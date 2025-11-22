export const PORTUGUESE_DISTRICTS = [
  'Aveiro',
  'Beja',
  'Braga',
  'Bragança',
  'Castelo Branco',
  'Coimbra',
  'Évora',
  'Faro',
  'Guarda',
  'Leiria',
  'Lisboa',
  'Portalegre',
  'Porto',
  'Santarém',
  'Setúbal',
  'Viana do Castelo',
  'Vila Real',
  'Viseu',
  'Açores',
  'Madeira'
];

export const DISTRICT_DETAILS = {
  'Aveiro': {
    code: 'AVR',
    region: 'Centro',
    cities: ['Aveiro', 'Ovar', 'Águeda', 'Ílhavo', 'Oliveira de Azeméis', 'Espinho']
  },
  'Beja': {
    code: 'BEJ',
    region: 'Alentejo',
    cities: ['Beja', 'Castro Verde', 'Serpa', 'Moura', 'Odemira', 'Aljustrel']
  },
  'Braga': {
    code: 'BRG',
    region: 'Norte',
    cities: ['Braga', 'Guimarães', 'Barcelos', 'Famalicão', 'Esposende', 'Amares']
  },
  'Bragança': {
    code: 'BRN',
    region: 'Norte',
    cities: ['Bragança', 'Mirandela', 'Macedo de Cavaleiros', 'Miranda do Douro']
  },
  'Castelo Branco': {
    code: 'CBR',
    region: 'Centro',
    cities: ['Castelo Branco', 'Covilhã', 'Fundão', 'Belmonte', 'Sertã']
  },
  'Coimbra': {
    code: 'CMB',
    region: 'Centro',
    cities: ['Coimbra', 'Figueira da Foz', 'Cantanhede', 'Lousã', 'Montemor-o-Velho']
  },
  'Évora': {
    code: 'EVR',
    region: 'Alentejo',
    cities: ['Évora', 'Estremoz', 'Montemor-o-Novo', 'Vendas Novas', 'Arraiolos']
  },
  'Faro': {
    code: 'FAR',
    region: 'Algarve',
    cities: ['Faro', 'Portimão', 'Loulé', 'Albufeira', 'Lagos', 'Tavira', 'Olhão', 'Vila Real de Santo António']
  },
  'Guarda': {
    code: 'GRD',
    region: 'Centro',
    cities: ['Guarda', 'Seia', 'Gouveia', 'Manteigas', 'Trancoso']
  },
  'Leiria': {
    code: 'LEI',
    region: 'Centro',
    cities: ['Leiria', 'Marinha Grande', 'Alcobaça', 'Nazaré', 'Caldas da Rainha', 'Pombal']
  },
  'Lisboa': {
    code: 'LIS',
    region: 'Lisboa',
    cities: ['Lisboa', 'Sintra', 'Cascais', 'Loures', 'Oeiras', 'Amadora', 'Odivelas', 'Vila Franca de Xira', 'Mafra']
  },
  'Portalegre': {
    code: 'PTL',
    region: 'Alentejo',
    cities: ['Portalegre', 'Elvas', 'Ponte de Sor', 'Campo Maior', 'Nisa']
  },
  'Porto': {
    code: 'PRT',
    region: 'Norte',
    cities: ['Porto', 'Vila Nova de Gaia', 'Matosinhos', 'Gondomar', 'Maia', 'Valongo', 'Póvoa de Varzim', 'Santo Tirso']
  },
  'Santarém': {
    code: 'STR',
    region: 'Centro',
    cities: ['Santarém', 'Torres Novas', 'Entroncamento', 'Tomar', 'Almeirim', 'Rio Maior']
  },
  'Setúbal': {
    code: 'STB',
    region: 'Lisboa',
    cities: ['Setúbal', 'Almada', 'Barreiro', 'Seixal', 'Sesimbra', 'Montijo', 'Alcochete']
  },
  'Viana do Castelo': {
    code: 'VCT',
    region: 'Norte',
    cities: ['Viana do Castelo', 'Ponte de Lima', 'Caminha', 'Valença', 'Arcos de Valdevez']
  },
  'Vila Real': {
    code: 'VRL',
    region: 'Norte',
    cities: ['Vila Real', 'Chaves', 'Peso da Régua', 'Lamego', 'Mondim de Basto']
  },
  'Viseu': {
    code: 'VIS',
    region: 'Centro',
    cities: ['Viseu', 'Lamego', 'Tondela', 'São Pedro do Sul', 'Santa Comba Dão']
  },
  'Açores': {
    code: 'AZR',
    region: 'Açores',
    cities: ['Ponta Delgada', 'Angra do Heroísmo', 'Horta', 'Ribeira Grande']
  },
  'Madeira': {
    code: 'MDR',
    region: 'Madeira',
    cities: ['Funchal', 'Câmara de Lobos', 'Machico', 'Santa Cruz', 'Caniço']
  }
};

export const getDistrictInfo = (districtName) => {
  return DISTRICT_DETAILS[districtName] || null;
};

export const getCitiesByDistrict = (districtName) => {
  const district = DISTRICT_DETAILS[districtName];
  return district ? district.cities : [];
};

export const getRegionByDistrict = (districtName) => {
  const district = DISTRICT_DETAILS[districtName];
  return district ? district.region : null;
};
