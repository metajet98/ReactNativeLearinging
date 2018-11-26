/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import MapView from 'react-native-maps';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions} from 'react-native';
import LocationButton from './LocationButton.js'
var { width, height } = Dimensions.get('window')

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
  
    this.state = {
      region:{
              latitude: 13.764884,
              longitude: 100.538265,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
      },
      markers:[
        {num:1,latlng: {latitude: 13.764884, longitude: 100.538265},
          title: "Victory Monument" , description: "A large military monument in Bangkok, Thailand."},
        {num:2,latlng: {latitude: 13.763681, longitude: 100.538125},
          title: "Saxophone Club" , description: "A music pub for saxophone lover"},
        {num:3,latlng: {latitude: 13.764595, longitude: 100.537438},
          title: "Coco Depertment Store" , description: "Fashion Department Store"},
      ]
    };
    this.onRegionChange= this.onRegionChange.bind(this);
    this.moveMaptoLocation = this.moveMaptoLocation.bind(this);

  }

  onRegionChange(region)
  {
      this.setState({region});
  }

moveMaptoLocation(latlng,key) {
    this.refs.map.animateToRegion({
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
      ...latlng,
    }, 700);
    debugger;
     setTimeout(() => {
      console.log(this.refs, key);
      this.refs[key].showCallout();
    }, 1500);
  }

  render() {
    return (
      <View style={styles.container}>

          
          <MapView ref="map" style={styles.map} 
          showCompass={false}
          region= {this.state.region}
          mapType="hybrid">
            {this.state.markers.map((marker,i) => (
              <MapView.Marker 
                key={i}
                ref={i}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapView>
          <View style={styles.container}>
          {this.state.markers.map((marker, i) => (
            <LocationButton
              key={i}
              name={i}
              moveMaptoLocation={this.moveMaptoLocation}
              marker={marker}/>
          ))}
        </View>
      </View>  
        
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map:{
    width: width-100,
    height: height-200
  }
});


