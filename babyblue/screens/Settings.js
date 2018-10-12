import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native'

class Settings extends Component {
  state = {}

  signout = async () => {
  	AsyncStorage.clear()
  	this.props.navigation.navigate('AuthLoading')
  }

  render () {
    return (
      <View style={styles.container}>
        <Button title="Sign Out" onPress={this.signout} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	}
})

export default Settings
