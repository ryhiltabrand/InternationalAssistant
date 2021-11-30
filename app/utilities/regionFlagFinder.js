export function regionFlag(region) {
    switch (region) {
        case "United States":
            return require('../assets/locations/locationCard/flags/united-states.png')
        case "China":
            return require('../assets/locations/locationCard/flags/china.png')
        case "Japan":
            return require('../assets/locations/locationCard/flags/japan.png')
        case "India":
            return require('../assets/locations/locationCard/flags/india.png')
        case "Philippines":
            return require('../assets/locations/locationCard/flags/philippines.png')
        default:
            return require('../assets/locations/locationCard/flags/european-union.png')
    }
}