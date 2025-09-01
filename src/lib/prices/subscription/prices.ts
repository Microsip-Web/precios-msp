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
    basic: 436,
    light: 488,
    pro: 614,
    premium: 882,
    corporate: 1681,
    corporateIncrement: 908,
  },
  {
    name: "Bancos",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d6b63dc4ce39fe6a5_Bancos.png",
    basic: 436,
    light: 488,
    pro: 614,
    premium: 882,
    corporate: 1681,
    corporateIncrement: 908,
    addon: [
      {
        parent: "Bancos",
        name: "Movimientos Bancarios",
        img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/67f54fcba7c15ac6753e3040_Movimientos%20Bancarios%20(1).png",
        price: 400,
      },
    ],
  },
  {
    name: "Nómina",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc40052fc708e26dc8b8_Nomina.png",
    basic: 462,
    light: 525,
    pro: 651,
    premium: 940,
    corporate: 1731,
    corporateIncrement: 982,
  },
  {
    name: "Inventarios",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f8034bdabc471b5fb_Inventarios.png",
    basic: 215,
    light: 331,
    pro: 378,
    premium: 614,
    corporate: 1491,
    corporateIncrement: 609,
    addon: [
      {
        parent: "Inventarios",
        name: "SICS",
        img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3c3b9badabf4f745ee_SICS.png",
        price: 260,
      },
    ],
  },
  {
    name: "Cuentas por cobrar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f9683641b33b65bff_CPC.png",
    basic: 215,
    light: 331,
    pro: 378,
    premium: 614,
    corporate: 1491,
    corporateIncrement: 609,
  },
  {
    name: "Compras",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d26dea33c918f1ae9_Compras.png",
    basic: 257,
    light: 399,
    pro: 499,
    premium: 719,
    corporate: 1659,
    corporateIncrement: 730,
  },
  {
    name: "Cuentas por pagar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3dbcdf5f33d31b1694_CPP.png",
    basic: 215,
    light: 331,
    pro: 378,
    premium: 614,
    corporate: 1491,
    corporateIncrement: 609,
  },
  {
    name: "Punto de venta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc403ea3ffa471a1f91f_PDV.png",
    basic: 362,
    light: 488,
    pro: 693,
    premium: 1108,
    corporate: 1953,
    corporateIncrement: 1202,
    addon: [
      {
        parent: "Punto de venta",
        name: "Facturador en línea",
        img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/67f54fcb3be4a4c7da4064da_Facturador%20en%20Linea%20(1).png",
        price: 1000,
      },
    ],
  },
  {
    name: "Ventas",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3daa3851122ca3f51c_Ventas.png",
    basic: 257,
    light: 399,
    pro: 499,
    premium: 719,
    corporate: 1659,
    corporateIncrement: 730,
  },
  {
    name: "En Ruta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3c82f8006048d53f06_Ruta.png",
    basic: NaN, // n/a
    light: 389,
    pro: 525,
    premium: 803,
    corporate: 1477,
    corporateIncrement: 704,
  },
  {
    name: "Sync-E",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3ed7478c2a32652afe_Sync-e.png",
    basic: 310,
    light: 420,
    pro: 494,
    premium: 630,
    corporate: 970,
    corporateIncrement: 462,
  },
  {
    name: "CEO Móvil",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3fed8fad35ddc70c95_Ceo%20Movil.png",
    basic: NaN, // n/a
    light: 315,
    pro: 425,
    premium: 646,
    corporate: 904,
    corporateIncrement: 431,
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
