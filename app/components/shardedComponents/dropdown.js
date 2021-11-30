import * as React from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

export default class IAdropdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }
    componentDidMount() {
      
    }
    componentWillUnmount() {}

  
    clearState = () => {
      this.setState({

      });
    };
     myFunction = () => {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
    render() {
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
              var dropdowns = document.getElementsByClassName("dropdown-content");
              var i;
              for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
                }
              }
            }
          } 
      return (
        <View>
           <button onclick={this.myFunction} class="dropbtn">Dropdown</button> 
           
        </View>
      );
    }
  }

