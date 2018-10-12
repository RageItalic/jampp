import React, { PropTypes, Component } from 'react'
import { View, Text, Button, StyleSheet, Alert, TouchableHighlight, Image } from 'react-native'
import poo from '../images/poo.png'

export default class Welcome extends Component {
	static navigationOptions = {
		header: null
	}

  state = {}

  render () {
    return (
      <View style={styles.container}>
      	<Image source={poo} style={styles.imageHeader}/>
        <View style={styles.buttonContainer}>
        	<Text 
        		onPress={() => this.props.navigation.navigate('SignIn')} 
        		style={styles.button}
        	>
        		Sign In
        	</Text>
        	<Text 
        		onPress={() => this.props.navigation.navigate('SignUp')} 
        		style={styles.button}
        	>
        		Sign Up
        	</Text>
      	</View>
      	<Text style={styles.text}>
      		Poopy Tatti Time.
      	</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: null,
		width: null,
		alignItems: 'center',
		backgroundColor: '#0ad3ff'
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		marginBottom: 40
	},
	button: {
		fontFamily: 'AvenirNext-Regular',
		fontSize: 20,
		color: 'white',
    margin: 10,
    textAlign: 'center',
	},
	text: {
		fontSize: 20,
		fontFamily: 'AvenirNext-Regular',
		color: 'white',
		textAlign: 'center',
		marginBottom: 90
	},
	imageHeader: {
		marginTop: 90,
		height: 100,
		width: 100
	}
})
