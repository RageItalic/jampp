import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import {Content, Form, Item, Input, Icon} from 'native-base'
import poo from '../images/poo.png'

export default class SignUp extends Component {
	static navigationOptions = {
		header: null
	}

  state = {
  	name: "",
  	email: "",
  	password: ""
  }

  handleName = name => {
  	this.setState({
  		name
  	})
  }

  handleEmail = email => {
  	this.setState({
  		email
  	})
  }

  handlePass = password => {
  	this.setState({
  		password
  	})
  }

  render () {
    return (
      <View style={styles.container}>
      	<View style={styles.center}>
	      	<Image source={poo} style={styles.imageHeader}/>
	      	<Text style={styles.text}>Arrey Tatti Tera Naam Kya Hai?</Text>
	      </View>
	      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding" enabled>
      		<Form>
      			<Item rounded style={styles.input}>
      			 	<Icon active name='person' style={styles.icon} />
	            <Input 
	            	placeholder='Johnny Appleseed'
	            	placeholderTextColor="#fff"
			          autoCapitalize="none"
			          onChangeText={this.handleName}
			          style={{color: 'white'}}
	            />
	          </Item>
            <Item rounded style={styles.input}>
            	<Icon active name='mail' style={styles.icon} />
	            <Input 
	            	placeholder='Johnny@apple.com'
	            	placeholderTextColor = "#fff"
			          autoCapitalize = "none"
			          onChangeText = {this.handleEmail}
			          style={{color: 'white'}}
	            />
	          </Item>
	          <Item rounded style={styles.input}>
	            <Icon active name='lock' style={styles.icon}/>
	            <Input 
	            	secureTextEntry={true}
	            	placeholder='Password'
	            	placeholderTextColor = "#fff"
			          autoCapitalize = "none"
			          onChangeText = {this.handlePass}
			          style={{color: 'white'}}
	            />
	          </Item>
	          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
	          	<Text
	          		onPress={() => this.props.navigation.popToTop()}
	          		style={styles.text}
	          	>
	          		Go Back
							</Text>
	          	<Text 
			        	onPress={this.signUp}
			        	style={styles.text}
			        >
			          Sign Up
			        </Text>
	          </View>
          </Form>
	      </KeyboardAvoidingView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ee6352'
	},
	inputContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	input: {
    borderColor: '#fff',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 30,
    marginLeft: 30
  },
	imageHeader: {
		marginTop: 90,
		height: 100,
		width: 100
	},
	text: {
		fontFamily: 'AvenirNext-Regular',
		fontSize: 19,
		color: 'white',
		textAlign: 'center'
	},
	icon: {
		color: 'white', 
		marginLeft: 5
	},
	center: {
		alignItems: 'center'
	}
})
