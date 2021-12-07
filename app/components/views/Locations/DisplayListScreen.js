
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import React, { Component } from 'react';
import firebase from "../../../utilities/firebase";
import DropDownPicker from 'react-native-dropdown-picker';
import Dialog from "react-native-dialog";
import BottomSheet from 'react-native-bottomsheet-reanimated';
import { regionFlag } from "./../../../utilities/regionFlagFinder"
import { MapViewer } from "./MapViewer";
import { filtercat } from "../../shardedComponents/mapfilter"


//console.log("This is opening DisplayList");

export class DisplayList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //Flatlist 
      locationList: [],
      selectedLocationCard: null,
      //Drop down for SortBy
      sortBy: null,
      open: false,
      value: 'distance',
      items: [
        { label: 'Distance', value: 'distance' },
        { label: 'Name', value: 'name' },
        { label: 'Rating', value: 'rating' }
      ],
      //search box
      visible: false,
      searchQuery: null,
      //Review Sectin,
      commentVisible: false,
      commentContributor: '',
      commentContributorDescription: '',
      commentContributorRating: '',
      commentContributorRegion: '',
      locationDocID: [],
      commentList: [],
    };
    this.setValue = this.setValue.bind(this);
  }

  //dropdown options
  //check if dropdown is touch
  setOpen = (open) => {
    console.debug('opens dropdown')
    this.setState({
      open
    });
  }

  //shows what property is being sorted by in dropdown 
  setValue = (callback) => {
    console.debug('set Value')
    this.setState(state => (
      console.debug('the value being inputed is ', callback(state.value)),
      { value: callback(state.value) }
    )
    );
    /* setFilter(callback) */
  }

  // set location list property to wat is defined
  onLocationsReceived = (locationList) => {
    //console.log("The keys mason ", Object.keys(locationList))
    //console.log("What is in locationList ", locationList)

    this.setState(prevState => ({
      locationList: prevState.locationList = locationList
    }));
    //console.log(this.state.locationList);
  }


  //go through the location collection and put it in an array
  getLocations = () => {

    var locationList = [];

    console.log('mounted')
    firebase.firestore().collection('Locations')
      .get()
      .then(snapshot => {

        snapshot.forEach((doc) => {
          this.setState(prevState => ({
            locationDocID: [...prevState.locationDocID, [doc.data().name, doc.id]]
          }))
          locationList.push(doc.data());
        })
        console.debug('locationDocID: ', this.state.locationDocID)
        this.onLocationsReceived(locationList);
      })
      .catch(error => console.log(error))
  }


  // Match category to location. Will be use for filtering
  //Finds a matching location by defining the path to compare and defining the value for comparison
  matchLocations = (value1, value2) => {

    var locationList = [];

    console.log('mounted')
    firebase.firestore()
      .collection('Locations')
      .where(value1, '==', value2)
      .get()
      .then(snapshot => {

        snapshot.forEach((doc) => {
          locationList.push(doc.data());
        })

        this.onLocationsReceived(locationList);
      })
      .catch(error => console.log(error))
  }

  //rerender after mounting
  componentDidMount() {
    //Lists all locations
    this.getLocations();

    //this.MatchLocations("name","a");
  }

  setSearchQuery = (query) => {
    this.setState({
      searchQuery: query
    })
  }

  showSearchBox = () => {
    this.setState({
      visible: true
    });
  };

  cancelSearchBox = () => {
    this.setState({
      visible: false
    });
  };

  searchLocation = () => {
    console.debug('inside search locations the searchQuery is ', this.state.searchQuery)
    //change later for more better search function
    this.matchLocations('name', this.state.searchQuery)
    this.setState({
      visible: false
    });
  };

  //New plan pass the select items from the display to the mapviewer
  //Set's the name, rating, and address of the location
  SetMarker(item) {

    //--------------------------------------
    //Debug what's being passed
    var tempMarker = {
      name: item.name,
      address: item.address,
      contributor: item.contributor,
      category: item.category,
      rating: item.rating
    };

    console.log("tempMarker: ", tempMarker);
    //--------------------------------------

    this.props.navigation.navigate('MapViewer', {
      name: item.name,
      address: item.address,
      contributor: item.contributor,
      category: item.category,
      rating: item.rating
    });
  }

  LocationCard = ({ item }) => {
    var category = this.state.locationList[item].category
    var contributor = this.state.locationList[item].contributor
    var description = this.state.locationList[item].description
    var rating = this.state.locationList[item].rating
    var country = this.state.locationList[item].user_country
    var place = this.state.locationList[item].name
    // change when trying to figure out how to change bordercolor
    //      <Pressable onPress={() => { this.setSelectedLocation(item)}} styles={[styles.notSelectedLocationCard ,this.state.selectedLocationCard]}> */}
    return (
      <Pressable onPress={() => { this.toggleComment(), this.setupCommentSection(contributor, description, rating, country, place) }}>
        {/* crazy looking multi-layer ternary operation for backgroundColor */}
        <View
          style={[
            styles.locationCard,
            category === 'Restaurant' ? styles.restaurant :
              category === 'Park' ? styles.park :
                category === 'Communal' ? styles.communal :
                  category == 'Worship' ? styles.worship :
                    styles.unkown,
          ]}>
          <View style={styles.locationCardTop}>
            <View style={styles.locationTitleSection}>
              <Text style={styles.locationTitle}>
                {place}
              </Text>
            </View>
            <View style={styles.locatiotnRatingSection}>
              <ImageBackground source={require('./../../../assets/locations/locationCard/star.png')} style={styles.locationRatingStar}>
                {/* This needs to be the average of the ratings. Change function when created*/}
                <Text style={styles.locationRating}> {rating} </Text>
              </ImageBackground>
            </View>
            <View style={styles.locationRegionSection}>
              {/* Need function to grab user info base off name. database.js does have it but by UID*/}
              <Image source={regionFlag(country)} style={styles.locationRegion} />
            </View>
          </View>
          <View style={styles.locationCardBottom}>
            <View style={styles.locationContributorSection}>
              <Text style={styles.locationContributor}>Founded by {contributor}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    )
  }

  //If comment is visible
  toggleComment = (name, description, rating) => {
    this.setState((state) => ({
      commentVisible: !state.commentVisible,
      commentContributor: name,
      commentDescription: description,
      commentContributorRating: rating,
    }));
  };

  getId(place) {
    console.log('the inputed place is: ', place)

    for (var i = 0; i < this.state.locationDocID.length; i++) {
      if (this.state.locationDocID[i][0] == place) {
        return this.state.locationDocID[i][1]
      }
    }
    return null;
  }

  setupCommentSection = (name, description, rating, country, place) => {

    var commentList = []

    //get doc ID base off name of location

    var id = this.getId(place)

    console.debug('the id gotten is:', id)

    //grab and store comments to a list
    firebase.firestore().collection('Locations').doc(id).collection('comments')
      .get()
      .then(snapshot => {

        snapshot.forEach((doc) => {
          commentList.push(doc.data());
        })
        console.debug(commentList)

        //set states needed for the section
        this.setState(() => ({
          commentContributor: name,
          commentContributorDescription: description,
          commentContributorRating: rating,
          commentContributorRegion: country,
          commentList: commentList
        }));
      })
      .catch(error => console.log(error))
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "50%",
          backgroundColor: "#d9d9d9ff",
          alignSelf: 'center',
        }}
      />
    );
  }

  //Contributor Section
  contributorSection = () => {
    var contributor = this.state.commentContributor
    var description = this.state.commentContributorDescription
    var rating = this.state.commentContributorRating
    var country = this.state.commentContributorRegion


    return (
      <View style={styles.contributorSection}>
        <View style={styles.contributorLeftBase}>
          <View styles={styles.contributorTopLeftSection}>
            <View style={styles.contributorUser}>
              <Text style={styles.contributorUserText}> {contributor} </Text>
            </View>
            <View style={styles.contributorButtomLeftSection}>
              <Text style={styles.contributor}> {description} </Text>
            </View>
          </View>
        </View>
        <View style={styles.contributorMiddleBase}>
          <View style={styles.contributorRegionSection}>
            <Image source={regionFlag(country)} style={styles.contributorRegion} />
          </View>
        </View>
        <View style={styles.contributorRightBase}>
          <View style={styles.contributorRatingSection}>
            <ImageBackground source={require('./../../../assets/locations/locationCard/star.png')} style={styles.contributorRatingStar}>
              <Text style={styles.contributorRatingText}> {rating} </Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    )
  }

  //List of Comments Template
  commentSection = ({ item, index, separator }) => {
    var contributor = this.state.commentList[item].name
    var description = this.state.commentList[item].comment
    var rating = this.state.commentList[item].rating
    var country = this.state.commentList[item].user_country

    return (
      
      <View style={styles.commentCard}>
        <View style={styles.commentLeftBase}>
          <View styles={styles.commentTopLeftSection}>
            <View style={styles.commentUser}>
              <Text style={styles.commentUserText}> {contributor} </Text>
            </View>
            <View style={styles.commentButtomLeftSection}>
              <Text style={styles.comment}> {description} </Text>
            </View>
          </View>
        </View>
        <View style={styles.commentMiddleBase}>
          <View style={styles.commentRegionSection}>
            <Image source={regionFlag(country)} style={styles.commentRegion} />
          </View>
        </View>
        <View style={styles.commentRightBase}>
          <View style={styles.commentRatingSection}>
            <ImageBackground source={require('./../../../assets/locations/locationCard/star.png')} style={styles.commentRatingStar}>
              <Text style={styles.commentRatingText}> {rating} </Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    )
  }

  render() {
    //console.log(this.state.locationList[0].name)

    return (
      <View style={styles.mainContainer}>
        {/* Return to Map Viewer */}
        <View style={styles.topMenuBar}>
          {/* menu bar to filter by category */}
          <View style={styles.categoryBarSection}>
            <Pressable onPress={() => { this.getLocations() }}>
              <View style={[styles.filterButtonSection, styles.allFilterButton]}>
                <Text style={{/*[styles.filterButtonImage]*/}}> All </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => { this.matchLocations("category", "Restaurant") }}>
              <View style={[styles.filterButtonSection, , styles.restaurant]}>
                <Image source={require("./../../../assets/locations/categoryBar/chicken-leg.png")} style={[styles.filterButtonImage]} />
              </View>
            </Pressable>
            <Pressable onPress={() => { this.matchLocations("category", "Worship") }}>
              <View style={[styles.filterButtonSection, , styles.worship]}>
                <Image source={require("./../../../assets/locations/categoryBar/pray.png")} style={[styles.filterButtonImage]} />
              </View>
            </Pressable>
            <Pressable onPress={() => { this.matchLocations("category", "Park"); }}>
              <View style={[styles.filterButtonSection, styles.park]}>
                <Image source={require("./../../../assets/locations/categoryBar/park.png")} style={[styles.filterButtonImage]} />
              </View>
            </Pressable>
            <Pressable onPress={() => { this.matchLocations("category", "Communal") }}>
              <View style={[styles.filterButtonSection, , styles.communal]}>
                <Image source={require("./../../../assets/locations/categoryBar/group.png")} style={[styles.filterButtonImage]} />
              </View>
            </Pressable>
            <Pressable onPress={() => { this.showSearchBox() }}>
              <View style={[styles.filterButtonSection, styles.searchFilterButton]}>
                <Image source={require("./../../../assets/locations/categoryBar/magnifying-glass.png")} style={[styles.filterButtonImage]} />
              </View>
              <Dialog.Container visible={this.state.visible} onBackdropPress={this.cancelSearchBox}>
                <Dialog.Title>Location Search</Dialog.Title>
                <Dialog.Description>
                  Please enter name, region, or rating.
                </Dialog.Description>
                <Dialog.Input onChangeText={this.setSearchQuery} />
                <Dialog.Button label="Cancel" onPress={this.cancelSearchBox} />
                <Dialog.Button label="Search" onPress={this.searchLocation} />
              </Dialog.Container>
            </Pressable>
          </View>
          <View style={styles.mapSection}>
            <Pressable onPress={() => { this.props.navigation.navigate('MapViewer'); }}>
              <Image source={require("./../../../assets/locations/categoryBar/map.png")} style={styles.mapButton} />
            </Pressable>
          </View>
        </View>
        <View style={{padding: 4}}>
        <DropDownPicker
          style={styles.sortBy}
          open={this.state.open}
          value={this.state.value}
          items={this.state.items}
          setOpen={this.setOpen}
          setValue={this.setValue}
          setItems={this.setItems}
          dropDownContainerStyle={styles.sortByDropdown}
        />
         </View> 
        {/* Define list of places */}
        <View style={styles.locationList}>
          <FlatList
            data={Object.keys(this.state.locationList)}
            renderItem={this.LocationCard}
            // Not needed due to not changing border colors atm
            // extraData={this.state.selectedLocationCard}
            keyExtractor={(item) => this.state.locationList[item].name}
            fadingEdgeLength={15}
          />
        </View>
        {this.state.commentVisible ? (
          <BottomSheet
            keyboardAware
            bottomSheerColor="#FFFFFF"
            ref="BottomSheet"
            initialPosition={'35'} //200, 300
            snapPoints={['0%', '89%']}
            isBackDrop={false}
            isBackDropDismissByPress={true}
            isRoundBorderWithTipHeader={true}
            // backDropColor="red"
            // isModal
            containerStyle={styles.buttomDrawerArea}
            // tipStyle={{backgroundColor:"red"}}
            headerStyle={styles.buttomDrawerHeaderArea}
            // bodyStyle={{backgroundColor:"red",flex:1}}
            header={this.contributorSection()}

            body={
              <FlatList
                data={Object.keys(this.state.commentList)}
                renderItem={this.commentSection}
                ItemSeparatorComponent = { this.FlatListItemSeparator }
                keyExtractor={(item) => this.state.commentList[item].name}
                highlighted={true}
              // fadingEdgeLength={15}
              />
            }
          />
        ) : null}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* Visual Deubgging */
  findme: {
    backgroundColor: '#bc1390ba',
    borderWidth: 2
  },
  /* Main Container where everything is put in */
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff9e8ff'
  },
  //global styles
  restaurant: {
    backgroundColor: '#cc0000ff'
  },
  worship: {
    backgroundColor: '#3c78d8ff'
  },
  park: {
    backgroundColor: '#6aa84fff'
  },
  communal: {
    backgroundColor: '#674ea7ff',
  },
  unkown: {
    backgroundColor: 'white'
  },
  /* Top Menu Bar Styles */
  topMenuBar: {
    flex: 1,
    //padding: 1,
    //marginBottom: 30,
    //height: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  categoryBarSection: {
    flex: 2,
    //padding: 3,
    //justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: 25,


  },
  filterButtonSection: {
    flex: 1,
    width: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
  filterButtonImage: {
    flex: 1,
    // width: 25,
    // height: 25,
    aspectRatio: .75,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  allFilterButton: {
    backgroundColor: '#e69138ff',
  },
  searchFilterButton: {
    backgroundColor: '#6fa8dcff',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  mapSection: {
    flex: 1,
    padding: 3,
    // width: 50,
    // height: 50,
    alignItems: 'flex-end',
  },
  mapButton: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  /* Sort By Dropdown Styles */
  sortBy: {
    //flex: 1,
    alignContent:"center",
    justifyContent:"center",
    height: 40,
    width: 107,
    
  },
  sortByDropdown: {
    //flex: 1,
    //height: 40,
    width: 107
  },
  /* Location Card Styles */
  locationList: {
    flex: 10,
    //padding: 2,
    //marginTop: 5,
  },
  locationCard: {
    flex: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 2,
    height: 75,
  },
  // Will be used when bordercolor base off select will be used
  // selectedLocationCard: {
  //   borderColor: 'orange'
  // },
  // notSelectedLocationCard: {
  //   borderColor: 'black'
  // },
  locationCardTop: {
    flex: 1,
    flexDirection: 'row',
  },
  locationTitleSection: {
    flex: 2,
    alignItems: 'flex-start',
  },
  locationTitle: {
    fontSize: 17,
    color: 'white'
  },
  locationRatingSection: {
    flex: 1,
    alignItems: 'center',
  },
  locationRatingStar: {
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  locationRating: {
    //resizeMode: 'contain',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 5
  },
  locationRegionSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  locationRegion: {
    resizeMode: 'contain',
    width: 45,
    height: 45,
  },
  locationCardBottom: {
    flex: .3,
  },
  locationContributorSection: {
    //flex: 1,
    alignItems: 'flex-start',
  },
  locationContributor: {
    fontSize: 14,
    color: 'white',
  },
  /* Buttom Drawer Styles */
  buttomDrawerArea: {
    borderWidth: 2
  },
  buttomDrawerHeaderArea: {
    height: 100,
    borderBottomWidth: 2,
    borderColor: 'black'
  },
  /* Contributor Section */
  contributorSection: {
    flex: 1,
    flexDirection: 'row',
  },
  contributorList: {
    flex: 10,
    //padding: 2,
    //marginTop: 5,
  },
  contributorCard: {
    flex: 10,
    padding: 10,
    // marginVertical: 8,
    // marginHorizontal: 10,
    // borderWidth: 2,
    height: 75,
  },
  contributorLeftBase: {
    flex: 3,
    flexDirection: 'column',
    padding: 5,
  },
  contributorTopLeftSection: {
    flex: 1,
  },
  contributorUser: {
    flex: 1,
  },
  contributorUserText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  contributorButtomLeftSection: {
    flex: 1
  },
  contributor: {
    flex: 1,
    position: 'absolute',
    marginTop: 25,
  },
  contributorMiddleBase: {
    flex: 1
  },
  contributorRegionSection: {
    flex: 1,
  },
  contributorRegion: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  contributorRightBase: {
    flex: 1,
  },
  contributorRatingSection: {

  },
  contributorRatingStar: {
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  contributorRatingText: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 5
  },

  /* Comment List Styles */
  commentList: {
    flex: 10,
    //padding: 2,
    //marginTop: 5,
  },
  commentCard: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // marginVertical: 8,
    // marginHorizontal: 10,
    height: 75,
  },
  commentLeftBase: {
    flex: 3,
    flexDirection: 'column',
    padding: 5,
  },
  commentTopLeftSection: {
    flex: 1,
  },
  commentUser: {
    flex: 1,
  },
  commentUserText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  commentButtomLeftSection: {
    flex: 1
  },
  comment: {
    flex: 1,
    position: 'absolute',
    marginTop: 25,
  },
  commentMiddleBase: {
    flex: 1
  },
  commentRegionSection: {
    flex: 1,
  },
  commentRegion: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  commentRightBase: {
    flex: 1,
  },
  commentRatingSection: {

  },
  commentRatingStar: {
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  commentRatingText: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 5
  },

});