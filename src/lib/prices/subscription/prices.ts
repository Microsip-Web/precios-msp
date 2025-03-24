interface Module {
  name: string;
  img: string;
  basic: number; // Plan "Básico"
  light: number; // Plan "Ligero"
  pro: number; // Plan "Pro"
  premium: number; // Plan "Premium"
  corporate: number; // Plan "Corporativo" (base price for 10 users)
  corporateIncrement: number; // Price added per +5 users above 10
  addon?: {
    parent: string;
    name: string;
    img: string;
    price: number;
  }[]; //name, image and price only;
}
export const subscriptionModulesAndPrices: Module[] = [
  {
    name: "Contabilidad electrónica",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3db30e414b44c1e59d_Contabilidad.png",
    basic: 415,
    light: 465,
    pro: 585,
    premium: 840,
    corporate: 1525,
    corporateIncrement: 865,
  },
  {
    name: "Bancos",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d6b63dc4ce39fe6a5_Bancos.png",
    basic: 415,
    light: 465,
    pro: 585,
    premium: 840,
    corporate: 1525,
    corporateIncrement: 865,
    addon: [
      {
        parent: "Bancos",
        name: "Movimientos Bancarios",
        img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d6b63dc4ce39fe6a5_Bancos.png",
        price: 400,
      },
    ],
  },
  {
    name: "Nómina",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc40052fc708e26dc8b8_Nomina.png",
    basic: 440,
    light: 500,
    pro: 620,
    premium: 895,
    corporate: 1570,
    corporateIncrement: 935,
  },
  {
    name: "Inventarios",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f8034bdabc471b5fb_Inventarios.png",
    basic: 205,
    light: 315,
    pro: 360,
    premium: 585,
    corporate: 1420,
    corporateIncrement: 580,
    addon: [
      {
        parent: "Inventarios",
        name: "SICS",
        img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f8034bdabc471b5fb_Inventarios.png",
        price: 260,
      },
    ],
  },
  {
    name: "Cuentas por cobrar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f9683641b33b65bff_CPC.png",
    basic: 205,
    light: 315,
    pro: 360,
    premium: 585,
    corporate: 1420,
    corporateIncrement: 580,
  },
  {
    name: "Compras",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d26dea33c918f1ae9_Compras.png",
    basic: 245,
    light: 380,
    pro: 475,
    premium: 685,
    corporate: 1580,
    corporateIncrement: 695,
  },
  {
    name: "Cuentas por pagar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3dbcdf5f33d31b1694_CPP.png",
    basic: 205,
    light: 315,
    pro: 360,
    premium: 585,
    corporate: 1420,
    corporateIncrement: 580,
  },
  {
    name: "Punto de venta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc403ea3ffa471a1f91f_PDV.png",
    basic: 345,
    light: 465,
    pro: 660,
    premium: 1055,
    corporate: 1860,
    corporateIncrement: 1050,
    addon: [
      {
        parent: "Punto de venta",
        name: "Facturador en línea",
        img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc403ea3ffa471a1f91f_PDV.png",
        price: 1000,
      },
    ],
  },
  {
    name: "Ventas",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3daa3851122ca3f51c_Ventas.png",
    basic: 245,
    light: 380,
    pro: 475,
    premium: 685,
    corporate: 1580,
    corporateIncrement: 695,
  },
  {
    name: "En Ruta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3c82f8006048d53f06_Ruta.png",
    basic: NaN, // n/a
    light: 370,
    pro: 500,
    premium: 765,
    corporate: 1340,
    corporateIncrement: 670,
  },
  {
    name: "Sync-E",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3ed7478c2a32652afe_Sync-e.png",
    basic: 295,
    light: 400,
    pro: 470,
    premium: 600,
    corporate: 880,
    corporateIncrement: 440,
  },
  {
    name: "CEO Móvil",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3fed8fad35ddc70c95_Ceo%20Movil.png",
    basic: NaN, // n/a
    light: 300,
    pro: 405,
    premium: 615,
    corporate: 820,
    corporateIncrement: 410,
  },
  {
    name: "Administrador de Sucursales",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3ef0f36272a072746e_ADS.png",
    basic: NaN, // n/a
    light: 250,
    pro: 350,
    premium: 500,
    corporate: 850,
    corporateIncrement: 500,
  },
];
