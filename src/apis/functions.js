import { useLocation } from "react-router-dom";

export const formatPagetitle = () => {
    const loc = useLocation();
    return loc.pathname.replace('/', '').replace('-', ' ');
}

export const tableCustomStyles = {
    headCells: {
      style: {
          fontSize: '15px',
          justifyContent: 'left',
          backgroundColor: localStorage.getItem('theme') === 'dark' ? '#1f2937' : '#f3f4f6',
          color: localStorage.getItem('theme') === 'dark' ? '#cccccc' : '#000',
          borderColor: 'none'
      },
    },
    rows: {
        style: {
            fontSize: '16px',
            backgroundColor: localStorage.getItem('theme') === 'dark' ? '#1f2937' : '#f3f4f6',
            color: localStorage.getItem('theme') === 'dark' ? '#d1d5db' : '#000',
        },
    },
    pagination: {
        style: {
            backgroundColor: localStorage.getItem('theme') === 'dark' ? '#1f2937' : '#f3f4f6',
            color: localStorage.getItem('theme') === 'dark' ? '#f3f4f6' : '#000',
        },
    },
  }


export const tokenExpired = (response) => {
    if(response !== null && response?.status === 'Token is Expired'){
        return true;
    }
    else{
        return false
    }
}


export const generatePagetitle = (resourcename) => {

    //resourcename && 
    var exisiting = localStorage.getItem('pagetitle') ? localStorage.getItem('pagetitle') : localStorage.setItem('pagetitle', resourcename);

    var data = exisiting && resourcename ? exisiting + ' - ' + resourcename : exisiting; 
    localStorage.setItem('pagetitle', data);
}


export const formatDate = (dt) => {

    const date = new Date(dt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
  
    return `${monthNames[month]} ${day}, ${year}`;
}


export const formatDateAndTime = (dt) => {

    const date = new Date(dt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${monthNames[month]} ${day}, ${year} ${hour}:${minutes}:${seconds}`;
}

export const formatTime = (dt) => {

    const date = new Date(dt);
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${hour}:${minutes}:${seconds}`;
}

export const alertColors = (val, alert, limit, trend) => {
    let color = 'text-blue-600';

    if(trend === 'increment'){
        if(val === limit || val > limit){
            color = 'bg-red-100 text-red-800';
        }
        else if(val > alert || val === alert){
            color = 'bg-orange-50 text-orange-400';
        }  
    }
    else{

        if( val === limit || val < limit){
            color = 'bg-red-100 text-red-800';
        } 
        else if(val < alert || val === alert){
            color = 'bg-orange-50 text-orange-400';
        } 
    }
    

    return color;
}


export const getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 

    today = yyyy+'-'+mm+'-'+dd;;
    return today;
}


export const getAssetDetailFieldValue = (detail, paramkey) => {
    let value;

    Object.keys(JSON.parse(detail)).map((key, i) => {
        if(key === paramkey){
            value = JSON.parse(detail)[key];
        }
    })

    return value;
}

export const formatNaira = (amount) => {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN"
    });
    return formatter.format(amount);
};

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const generateFiscalYear = () => {
    const currentYear = new Date().getFullYear();
    const dateRanges = [];

    for (let year = 2020; year <= currentYear; year++) {
        const startDate = new Date(year, 9, 1); // October 1st of the current year
        const endDate = new Date(year + 1, 8, 30); // September 30th of the next year
        dateRanges.push({ startDate, endDate });
    }

    return dateRanges;
}

export const pageRefresh = (setRefreshpage) => {
    setTimeout(() => setRefreshpage(Date.now(), 60000));
}

export const groupAllDataByWeek = (detail) => {
    const weeklyCounts = {};
    detail.forEach(item => {
        const date = moment(item.date_created);
        const startOfWeek = date.startOf('week').format('YYYY-MM-DD');
        weeklyCounts[startOfWeek] = (weeklyCounts[startOfWeek] || 0) + 1;
    });
    return weeklyCounts;
}

export const prepareLast28DaysData = (data) => {
    const today = moment();
    const october1 = moment('2024-10-01');
    const totalDays = today.diff(october1, 'days');

    const startDate = totalDays <= 28 ? october1 : today.clone().subtract(27, 'days');
    const dailyCounts = {};

    data.forEach(item => {
        const date = moment(item.date_created);
        if (date.isBetween(startDate, today, 'day', '[]')) {
            const day = date.format('YYYY-MM-DD');
            dailyCounts[day] = (dailyCounts[day] || 0) + 1;
        }
    });

    const labels = [];
    const counts = [];
    for (let i = 0; i <= today.diff(startDate, 'days'); i++) {
        const day = startDate.clone().add(i, 'days').format('YYYY-MM-DD');
        labels.push(day);
        counts.push(dailyCounts[day] || 0);
    }

    return { labels, counts };
}

/**export const generateFilledmapCordinates = (arr, key) => {
    return arr.reduce((result, currentValue) => {
      // Get the value of the property we want to group by (key)
      const groupKey = currentValue[key];
      
      // If the group doesn't exist in the result object, create it
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      
      // Push the current object into the correct group
      result[groupKey].push(
        {"cooridnates": [currentValue?.latitude,currentValue?.longitude]}
      );
      
      return result;
    }, {}); // Start with an empty object
  }*/

export const generateFilledmapCordinates = (arr, lgas) => {
    let mapArr = [];

    lgas.map(lga => {
        
        let coord = [];
                
        arr.map(item => {
            if(item?.lga === lga.lga && item?.longitude !== 0 && item?.longitude !== "0"){
                const lon = parseFloat(item.longitude);
                const lat = parseFloat(item.latitude);
                coord.push([lon, lat])
            }
        })

        const count = coord.length;

        const endcoord = coord[0];
        coord.push(endcoord);

        let lgaObj = {
            "type": "Feature",
            "properties": { "name": lga.lga, "value": count },
            "geometry": {
                "type": "Polygon",
                "coordinates": [coord]
            }
        }
        
        if(count > 0){
            mapArr.push(lgaObj)
        } 
    }) 
    return mapArr
}

export const generateMarkers = (stateDetail) => {
    let mkrdata = [];
    if(stateDetail !== null){
        stateDetail?.stateDetail.map((sd, index) => {
            mkrdata.push({
                id: index,
                position: {
                    lat: parseFloat(sd?.latitude),
                    lng: parseFloat(sd?.longitude)
                }
            })
        })
    }
    return mkrdata;
}

export const generateFilledmapMarkers = (stateDetail) => {
    let mkrdata = [];
    if(stateDetail !== null){
        stateDetail?.stateDetail.map((sd, index) => {
            if(sd?.record_status === 'Linked'){
                mkrdata.push({
                    id: index,
                    position: {
                        lat: parseFloat(sd?.latitude),
                        lng: parseFloat(sd?.longitude)
                    }
                })
            }
        })
    }
    //console.log(mkrdata);
    return mkrdata;
}

export const loadGeoJsonData = () => {
    const geojsonUrl = '/assets/data.geojson';

    //let result = [];
    // Use the fetch API to load the GeoJSON file
    fetch(geojsonUrl)
    .then(response => {
        // Check if the response is OK (status code 200)
        if (!response.ok) {
        throw new Error('Failed to load GeoJSON file');
        }
        return response.json();  // Parse the response as JSON
    })
    .then(geojsonData => {
        // Successfully loaded the GeoJSON data
        console.log(geojsonData);
        // You can now work with the GeoJSON data
        // Example: Access the features of the GeoJSON
        const features = geojsonData.features;
        return features;
    })
    .catch(error => {
        // Handle any errors
        console.error('Error reading GeoJSON file:', error);
    });
}

export const generateRanges = (number, divisor) => {
    const ranges = [];
    const range = Math.round(number/divisor);
    
    for (let i = 1; i <= number; i += range) {
      const start = i;
      const end = i + range - 1 <= number ? i + range - 1 : number;
      ranges.push(`${start},${end}`);
    }
  
    return ranges;
  }


  export const generateShades = (color, numShades = 8) => {
    // Convert hex color to HSL
    const hsl = hexToHSL(color);
    
    const shades = [];
    const step = 100 / (numShades - 1); // Step between each shade
  
    for (let i = 0; i < numShades; i++) {
      // Calculate new lightness for each shade
      const newLightness = Math.max(0, Math.min(100, hsl[2] - i * step));
      const newHSL = `hsl(${hsl[0]}, ${hsl[1]}%, ${newLightness}%)`;
      shades.push(newHSL);
    }
  
    return shades;
  }


  // Helper function to convert hex to HSL
export const hexToHSL = (hex) => {
    // Remove the '#' if present
    hex = hex.replace('#', '');
    
    // Parse hex color to RGB values
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
  
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    // Convert to HSL format
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
  
    return [h, s, l];
  }


  export const getColor = (arrOfRanges, wardCount) => {
    let color;

    //const colors = ['#fff5cb', '#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026', '#5e001c'];

    //const colors = ['#4d4d4d', '#878787', '#bababa', 'e0e0e0', '#ffffff', 'fddbc7', 'f4a582', '#d6604d', '#b2182b']

    //const colors = ['#FFD3B1', '#FFCBA2', '#FFC291', '#FFB782', '#FFAD72', '#FFA062', '#FF9752', '#FF8C3F', '#FF7929', '#FF690F']

    const colors = ['#f4d36c', '#f8be61', '#f8a950', '#f5963d', '#f3812c', '#e96e25', '#dc6029', '#cc532a', '#b74a2b', '#a2422f']

    arrOfRanges.map((rng, index) => {
        const converted = rng.split(",");
        if(wardCount >= parseInt(converted[0]) && wardCount <= parseInt(converted[1])){
            color = colors[index]
        }
    })

    return color
  }
  

  export const getTotalWardPositives = (arr) => {
    //let total = 0;

    /**arr && arr.wardCounts.map(wc => {
        total += wc.count
    })*/

    return arr.wardCount[0].count;
}

export const generateAvatar = (text) => {
    return text.split(' ')
    .filter(word => word)
    .map(word => word[0]
    .toUpperCase())
    .join('');
}

export const formatErrorMessage = (obj) => {
    return JSON.stringify(obj)
        .replaceAll('"','')
        .replaceAll('{', '')
        .replaceAll('}', '')
        .replaceAll('error', '')
        .replaceAll('errors', '')
        .replaceAll(':', '')
}
