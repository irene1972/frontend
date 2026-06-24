import { IconVariant } from  './icon.config'

/** Bootstrap Styles */
/** HTML Elements Interface */
// Define los distintos elementos del HTML que cambian según la variante y el estado del componente
interface HtmlElements {
  container?: string;
  icon?:      string;
  label?:     string;
}

//type IconStylesMap = Record<IconVariant, HtmlElements>;
type IconStylesMap = Record<IconVariant, HtmlElements>;

/** Component Style*/
const STYLE_SHAPE_CIRCLE = `d-flex align-items-center justify-content-center rounded-circle`;
const STYLE_SHAPE_SQUARE = `d-flex align-items-center justify-content-center rounded-2`;

export const STYLES: IconStylesMap= {
    'error-403': {
        container: STYLE_SHAPE_CIRCLE,  
        icon: 'bi bi-lock',                         
        label: '403' 
    },
    'error-404': { 
        container: STYLE_SHAPE_CIRCLE, 
        icon: 'bi bi-search',                 
        label: '404' 
    },
    'error-500': { 
        container: STYLE_SHAPE_CIRCLE,
        icon: 'bi bi-exclamation-triangle',        
        label: '500' 
    },
    check: { 
        container: STYLE_SHAPE_CIRCLE,
        icon: 'bi bi-check',                   
    },
    trash: { 
        container: STYLE_SHAPE_CIRCLE,
        icon: 'bi bi-trash3',                   
    },
    reload: { 
        container: STYLE_SHAPE_CIRCLE,
        icon: 'bi bi-arrow-counterclockwise',                   
    },
    rise: { 
        container: STYLE_SHAPE_SQUARE,
        icon: 'bi bi-graph-up-arrow',                   
    },
    flag: { 
        container: STYLE_SHAPE_SQUARE,
        icon: 'bi bi-flag',                   
    },
    people: { 
        container: STYLE_SHAPE_SQUARE,
        icon: 'bi bi-people',                   
    },
    person: { 
        container: STYLE_SHAPE_SQUARE,
        icon: 'bi bi-person',                   
    },
    cube: { 
        container: STYLE_SHAPE_SQUARE,
        icon: 'bi bi-box',                   
    },
    graph: { 
        container: STYLE_SHAPE_SQUARE,
        icon: 'bi bi-bar-chart-line',                   
    },
    tag: { 
        container: STYLE_SHAPE_SQUARE,
        icon: 'bi bi-tag',                   
    },
    clock: { 
        container: STYLE_SHAPE_SQUARE,
        icon: 'bi bi-clock',                   
    },
    camera: { 
        container: STYLE_SHAPE_SQUARE,
        icon: 'bi bi-camera',                   
    },
    'camera-round': { 
        container: STYLE_SHAPE_CIRCLE,
        icon: 'bi bi-camera',                   
    },
    heart: { 
        icon: 'bi bi-heart-fill',                   
    },
    profile: { 
        container: STYLE_SHAPE_CIRCLE                 
    },
    'profile-primary-circle': { 
        container: STYLE_SHAPE_CIRCLE                  
    },
    'profile-primary-square': { 
        container: STYLE_SHAPE_SQUARE                   
    },
    star: { 
        icon: 'bi bi-star-fill'                  
    },
    'star-inactived': { 
        icon: 'bi bi-star-fill'                  
    },
    counter: { 
        container: STYLE_SHAPE_CIRCLE            
    }
};