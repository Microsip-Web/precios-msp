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
    basic: 460,
    light: 510,
    pro: 645,
    premium: 925,
    corporate: 1765,
    corporateIncrement: 955,
  },
  {
    name: "Bancos",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d6b63dc4ce39fe6a5_Bancos.png",
    basic: 460,
    light: 510,
    pro: 645,
    premium: 925,
    corporate: 1765,
    corporateIncrement: 955,
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
    basic: 485,
    light: 550,
    pro: 685,
    premium: 985,
    corporate: 1820,
    corporateIncrement: 1030,
  },
  {
    name: "Inventarios",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f8034bdabc471b5fb_Inventarios.png",
    basic: 225,
    light: 350,
    pro: 400,
    premium: 645,
    corporate: 1565,
    corporateIncrement: 640,
    addon: [
      {
        parent: "Inventarios",
        name: "SICS",
        img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3c3b9badabf4f745ee_SICS.png",
        price: 270,
      },
    ],
  },
  {
    name: "Cuentas por cobrar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3f9683641b33b65bff_CPC.png",
    basic: 225,
    light: 350,
    pro: 400,
    premium: 645,
    corporate: 1565,
    corporateIncrement: 640,
  },
  {
    name: "Compras",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3d26dea33c918f1ae9_Compras.png",
    basic: 270,
    light: 420,
    pro: 525,
    premium: 755,
    corporate: 1740,
    corporateIncrement: 765,
  },
  {
    name: "Cuentas por pagar",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3dbcdf5f33d31b1694_CPP.png",
    basic: 225,
    light: 350,
    pro: 400,
    premium: 645,
    corporate: 1565,
    corporateIncrement: 640,
  },
  {
    name: "Punto de venta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc403ea3ffa471a1f91f_PDV.png",
    basic: 380,
    light: 510,
    pro: 730,
    premium: 1165,
    corporate: 2050,
    corporateIncrement: 1160,
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
    basic: 270,
    light: 420,
    pro: 525,
    premium: 755,
    corporate: 1742,
    corporateIncrement: 765,
  },
  {
    name: "En Ruta",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3c82f8006048d53f06_Ruta.png",
    basic: NaN, // n/a
    light: 389,
    pro: 525,
    premium: 803,
    corporate: 1477,
    corporateIncrement: 705,
  },
  {
    name: "Sync-E",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3ed7478c2a32652afe_Sync-e.png",
    basic: 310,
    light: 420,
    pro: 495,
    premium: 630,
    corporate: 970,
    corporateIncrement: 460,
  },
  {
    name: "CEO Móvil",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3fed8fad35ddc70c95_Ceo%20Movil.png",
    basic: NaN, // n/a
    light: 315,
    pro: 425,
    premium: 646,
    corporate: 904,
    corporateIncrement: 430,
  },
  {
    name: "Administrador de Sucursales",
    img: "https://cdn.prod.website-files.com/627983ccef617d453b9485ad/671bdc3ef0f36272a072746e_ADS.png",
    basic: NaN, // n/a
    light: 260,
    pro: 365,
    premium: 550,
    corporate: 950,
    corporateIncrement: 550,
  },
];
