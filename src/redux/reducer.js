import {
  PAD,
  PPA,
  PERROR,
  GERROR,
  PAM,
  RESETERROR,
  PBO,
  PCA,
  PCH,
  PDI,
  PIL,
  PSE,
  PSK,
  PST,
  PVX,
  PXL,
  PXLN,
  RU,
  GUS,
  VACIAR_USE,
  GETPAG,
  PAGINA,
  POSTPRODUCTO,
  GETPRODUCTO,
  LOGOUT,
  GETUSER,
  GETUSERIDNAME,
  GETUSERBI,
  POSTCOMMENT,
  GETALLQUINCENA,
  GETBIQUINCENA,
  POSTPORCENTAJE,
  GETALLPORCENTAJE,
  GETPORCENTAJEBYID,
  UPDATEPORCENTAJE,
  DELETEPORCENTAJE,
  POSTUBICACION,
  GETALLUBICACION,
  GETUBICACIONBYID,
  UPDATEUBICACION,
  DELETEUBICACION,
  SEARCHPRODUCTO,
  QUINCENAUSERS,
  QUINCENAHOME,
  DARKMODE,
  ROJOS,
  GETROJOS,
  GETUSERNAME,
  UPDATEUSERNAME,
  DELETEUSERNAME,
  DELETEPRESTAMOS,
  UPDATEPRESTAMOS,
  GETPRESTAMOBYID,
  DELETEVENTA,
  UPDATEVENTA,
  GETVENTABYID,
  SESION,
  ERROR,
  ID,
} from "./actionsTypes.js";

const initialState = {
  spg: [],
  allUserIdName: [],
  userB: {},
  user: {},
  pagina: "",
  paginas: [],
  producto: "",
  productos: [],
  comment: [],
  quincenas: [],
  quincenaUser: [],
  quincenaHome: [],
  porcentajes: [],
  porcentaje: {},
  ubicaciones: [],
  ubicacion: {},
  userName: {},
  prestamo: {},
  venta: {},
  rojo: [],
  perror: "",
  gerror: "",
  darkMode: "",
  initSession: "",
  token: "",
  Error: '',
  Id: ''
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
    return {
    ...state,
    Error: action.payload,
    };
    
    case PERROR:
      return {
        ...state,
        perror: action.payload,
      };
    case GERROR:
      return {
        ...state,
        gerror: action.payload,
      };
    case ID:
      return {
        ...state,
        Id: action.payload,
      };
    case RESETERROR:
      return {
        ...state,
        Error: action.payload,
        gerror: action.payload,
        spg: [],
        quincenaUser: action.payload,
        quincenaHome: action.payload,
      };
    case DARKMODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    case SESION:
      return {
        ...state,
        initSession: action.payload.success,
        token: action.payload.token,
      };

    //post corte adult
    case PAD:
      return {
        ...state,
        spg: action.payload,
      };
    //post partcial
    case PPA:
      return {
        ...state,
        spg: action.payload,
      };
    // post amateur
    case PAM:
      return {
        ...state,
        spg: action.payload,
      };
    //post bonga
    case PBO:
      return {
        ...state,
        spg: action.payload,
      };
    //post cam4
    case PCA:
      return {
        ...state,
        spg: action.payload,
      };
    //post chatur
    case PCH:
      return {
        ...state,
        spg: action.payload,
      };
    //post dirty
    case PDI:
      return {
        ...state,
        spg: action.payload,
      };
    //post isLive
    case PIL:
      return {
        ...state,
        spg: action.payload,
      };
    //post sender
    case PSE:
      return {
        ...state,
        spg: action.payload,
      };
    //post skype
    case PSK:
      return {
        ...state,
        spg: action.payload,
      };
    //post stripchat
    case PST:
      return {
        ...state,
        spg: action.payload,
      };
    //post vs
    case PVX:
      return {
        ...state,
        spg: action.payload,
      };
    //post xlove
    case PXL:
      return {
        ...state,
        spg: action.payload,
      };
    //post xlove
    case PXLN:
      return {
        ...state,
        spg: action.payload,
      };

    case RU:
      return {
        ...state,
        user: action.payload,
      };

    case GUS:
      return {
        ...state,
        user: action.payload,
      };

    case VACIAR_USE:
      return {
        ...state,
        user: action.payload,
      };

    case GETUSER:
      return {
        ...state,
        allUser: action.payload,
      };

    case GETUSERIDNAME:
      return {
        ...state,
        allUserIdName: action.payload,
      };

    case GETUSERBI:
      return {
        ...state,
        userB: action.payload,
      };

    case PAGINA:
      return {
        ...state,
        pagina: action.payload,
      };

    case GETPAG:
      return {
        ...state,
        paginas: action.payload,
      };

    case POSTPRODUCTO:
      return {
        ...state,
        producto: action.payload,
      };

    case SEARCHPRODUCTO:
      return {
        ...state,
        productos: action.payload,
      };

    case GETPRODUCTO:
      return {
        ...state,
        productos: action.payload,
      };

    case POSTCOMMENT:
      return {
        ...state,
        comment: action.payload,
      };

    case GETALLQUINCENA:
      return {
        ...state,
        quincenas: action.payload,
      };

    case GETBIQUINCENA:
      return {
        ...state,
        quincena: action.payload,
      };

    case POSTPORCENTAJE:
      return {
        ...state,
        porcentaje: action.payload,
      };

    case GETALLPORCENTAJE:
      return {
        ...state,
        porcentajes: action.payload,
      };

    case GETPORCENTAJEBYID:
      return {
        ...state,
        porcentaje: action.payload,
      };

    case UPDATEPORCENTAJE:
      return {
        ...state,
        porcentaje: action.payload,
      };

    case DELETEPORCENTAJE:
      return {
        ...state,
        porcentaje: action.payload,
      };

    //? para la ubicacion
    case POSTUBICACION:
      return {
        ...state,
        ubicacion: action.payload,
      };

    case GETALLUBICACION:
      return {
        ...state,
        ubicaciones: action.payload,
      };

    case GETUBICACIONBYID:
      return {
        ...state,
        ubicacion: action.payload,
      };

    case UPDATEUBICACION:
      return {
        ...state,
        ubicacion: action.payload,
      };

    case DELETEUBICACION:
      return {
        ...state,
        ubicacion: action.payload,
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    case QUINCENAUSERS:
      return {
        ...state,
        quincenaUser: action.payload,
      };

    case QUINCENAHOME:
      return {
        ...state,
        quincenaHome: action.payload,
      };

    case ROJOS:
      return {
        ...state,
        rojo: action.payload,
      };

    case GETROJOS:
      return {
        ...state,
        rojo: action.payload,
      };
    //* getUserNameById
    case GETUSERNAME:
      return {
        ...state,
        userName: action.payload,
      };
    case UPDATEUSERNAME:
      return {
        ...state,
        userName: action.payload,
      };
    case DELETEUSERNAME:
      return {
        ...state,
        userName: action.payload,
      };

    case DELETEPRESTAMOS:
      return {
        ...state,
        prestamo: action.payload,
      };
    case UPDATEPRESTAMOS:
      return {
        ...state,
        prestamo: action.payload,
      };
    case DELETEVENTA:
      return {
        ...state,
        venta: action.payload,
      };
    case UPDATEVENTA:
      return {
        ...state,
        venta: action.payload,
      };
    case GETPRESTAMOBYID:
      return {
        ...state,
        prestamo: action.payload,
      };
    case GETVENTABYID:
      return {
        ...state,
        venta: action.payload,
      };

    default:
      return state;
  }
};
