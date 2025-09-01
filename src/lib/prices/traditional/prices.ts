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
    basic: 8024,
    light: 10452,
    pro: 13123,
    premium: 18930,
    corporate: 39113,
    corporateIncrement: 18470,
  },
  {
    name: "Bancos",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d6b63dc4ce39fe6a5_Bancos.png",
    basic: 8024,
    light: 10452,
    pro: 13123,
    premium: 18930,
    corporate: 39113,
    corporateIncrement: 18470,
  },
  {
    name: "Nómina",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc40052fc708e26dc8b8_Nomina.png",
    basic: 8507,
    light: 11229,
    pro: 13951,
    premium: 20087,
    corporate: 40348,
    corporateIncrement: 19968,
  },
  {
    name: "Inventarios",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f8034bdabc471b5fb_Inventarios.png",
    basic: 3760,
    light: 6288,
    pro: 8041,
    premium: 13100,
    corporate: 32047,
    corporateIncrement: 12380,
  },
  {
    name: "Cuentas por cobrar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f9683641b33b65bff_CPC.png",
    basic: 3760,
    light: 6288,
    pro: 8041,
    premium: 13100,
    corporate: 32047,
    corporateIncrement: 12380,
  },
  {
    name: "Compras",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d26dea33c918f1ae9_Compras.png",
    basic: 4673,
    light: 8535,
    pro: 10678,
    premium: 15351,
    corporate: 35546,
    corporateIncrement: 14934,
  },
  {
    name: "Cuentas por pagar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3dbcdf5f33d31b1694_CPP.png",
    basic: 3760,
    light: 6288,
    pro: 8041,
    premium: 13100,
    corporate: 32047,
    corporateIncrement: 12380,
  },
  {
    name: "Punto de venta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc403ea3ffa471a1f91f_PDV.png",
    basic: 6234,
    light: 10452,
    pro: 14875,
    premium: 23739,
    corporate: 47761,
    corporateIncrement: 22466,
  },
  {
    name: "Ventas",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3daa3851122ca3f51c_Ventas.png",
    basic: 4673,
    light: 8535,
    pro: 10678,
    premium: 15351,
    corporate: 35546,
    corporateIncrement: 14934,
  },
  {
    name: "En Ruta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3c82f8006048d53f06_Ruta.png",
    basic: NaN, // n/a
    light: 8346,
    pro: 11235,
    premium: 17120,
    corporate: 34240,
    corporateIncrement: 17120,
  },
  {
    name: "Sync-E",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3ed7478c2a32652afe_Sync-e.png",
    basic: 5618,
    light: 8988,
    pro: 10486,
    premium: 13482,
    corporate: 22470,
    corporateIncrement: 13482,
  },
  {
    name: "CEO Móvil",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3fed8fad35ddc70c95_Ceo%20Movil.png",
    basic: NaN, // n/a
    light: 6741,
    pro: 9095,
    premium: 13803,
    corporate: 20972,
    corporateIncrement: 10486,
  },
  {
    name: "Administrador de Sucursales",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3ef0f36272a072746e_ADS.png",
    basic: NaN, // n/a
    light: 4815,
    pro: 6741,
    premium: 9630,
    corporate: 19260,
    corporateIncrement: 9630,
  },
];
