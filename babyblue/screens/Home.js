import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Image } from 'react-native'
import chip from '../images/chip.png'
class Home extends Component {
  state = {
  	userName: "Guy"
  }

  async componentDidMount() {
  	const userName = await AsyncStorage.getItem('userName')
  	this.setState({
  		userName
  	})
  }

  render () {
  	const {userName} = this.state

    return (
      <View style={styles.container}>
      	<Image source={chip} style={styles.imageHeader}/>
      	<View style={styles.welcomeTextContainer}>
        	<Text style={styles.text}>Hi {userName},</Text> 
        	<Text style={styles.text}>Welcome to your Poopy Time.</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white'
	},
	welcomeTextContainer: {
		flex: 1
	},
	text: {
		fontFamily: 'AvenirNext-Regular',
		fontSize: 16,
		textAlign: 'center'
	},
	imageHeader: {
		marginTop: 90,
		marginBottom: 20,
		height: 100,
		width: 100
	}
})

export default Home

