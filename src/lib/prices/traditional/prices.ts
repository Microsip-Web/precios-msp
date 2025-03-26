export interface ModulePrice {
  name: string;
  img: string;
  basic: number; // Plan "Básico"
  light: number; // Plan "Ligero"
  pro: number; // Plan "Pro"
  premium: number; // Plan "Premium"
  corporate: number; // Plan "Corporativo" (base price for 10 users)
  corporateIncrement: number; // Price added per +5 users above 10
}
export const tradicionalModulesAndPrices: ModulePrice[] = [
  {
    name: "Contabilidad electrónica",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3db30e414b44c1e59d_Contabilidad.png",
    basic: 7500,
    light: 9768,
    pro: 12264,
    premium: 17691,
    corporate: 36554,
    corporateIncrement: 17262,
  },
  {
    name: "Bancos",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d6b63dc4ce39fe6a5_Bancos.png",
    basic: 7500,
    light: 9768,
    pro: 12264,
    premium: 17691,
    corporate: 36554,
    corporateIncrement: 17262,
  },
  {
    name: "Nómina",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc40052fc708e26dc8b8_Nomina.png",
    basic: 7950,
    light: 10494,
    pro: 13038,
    premium: 18773,
    corporate: 37708,
    corporateIncrement: 18661,
  },
  {
    name: "Inventarios",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f8034bdabc471b5fb_Inventarios.png",
    basic: 3514,
    light: 5597,
    pro: 7515,
    premium: 12243,
    corporate: 29950,
    corporateIncrement: 11570,
  },
  {
    name: "Cuentas por cobrar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f9683641b33b65bff_CPC.png",
    basic: 3514,
    light: 5597,
    pro: 7515,
    premium: 12243,
    corporate: 29950,
    corporateIncrement: 11570,
  },
  {
    name: "Compras",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d26dea33c918f1ae9_Compras.png",
    basic: 4367,
    light: 7977,
    pro: 9980,
    premium: 14347,
    corporate: 33220,
    corporateIncrement: 13957,
  },
  {
    name: "Cuentas por pagar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3dbcdf5f33d31b1694_CPP.png",
    basic: 3514,
    light: 5597,
    pro: 7515,
    premium: 12243,
    corporate: 29950,
    corporateIncrement: 11570,
  },
  {
    name: "Punto de venta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc403ea3ffa471a1f91f_PDV.png",
    basic: 5549,
    light: 9768,
    pro: 13902,
    premium: 22186,
    corporate: 44637,
    corporateIncrement: 20996,
  },
  {
    name: "Ventas",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3daa3851122ca3f51c_Ventas.png",
    basic: 4367,
    light: 7977,
    pro: 9980,
    premium: 14347,
    corporate: 33220,
    corporateIncrement: 13957,
  },
  {
    name: "En Ruta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3c82f8006048d53f06_Ruta.png",
    basic: NaN, // n/a
    light: 7800,
    pro: 10500,
    premium: 16000,
    corporate: 32000,
    corporateIncrement: 16000,
  },
  {
    name: "Sync-E",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3ed7478c2a32652afe_Sync-e.png",
    basic: 5250,
    light: 8400,
    pro: 9800,
    premium: 12600,
    corporate: 21000,
    corporateIncrement: 12600,
  },
  {
    name: "CEO Móvil",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3fed8fad35ddc70c95_Ceo%20Movil.png",
    basic: NaN, // n/a
    light: 6300,
    pro: 8500,
    premium: 12900,
    corporate: 19600,
    corporateIncrement: 9800,
  },
  {
    name: "Administrador de Sucursales",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3ef0f36272a072746e_ADS.png",
    basic: NaN, // n/a
    light: 4500,
    pro: 6300,
    premium: 9000,
    corporate: 18000,
    corporateIncrement: 9000,
  },
];
