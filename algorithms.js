import React from 'react';
import { location, permissions } from 'expo';

/*Get user location */
export class MapAlgorithms extends React.Component {

    state = {
     location,
     errorMessage: '',
    };

    componentWillMount() {
        this.getLocation();
    }

    getLocation = async() => {
        const { status } = await Permissions.askAsync(Permissions.Location)
        
        if (status !== 'granted'){
          console.log('Permission not granted!');

          this.setstate({errorMessage: 'Permission not granted'});

        }

        const currentLocation = await Location.getCurrentPositionAsync();

        this.setState({location})

    }




}