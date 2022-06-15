import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import api from './Services/api';
import Carros from './Carros/carros';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carros: [],
      loading: true
    };
  }
  async componentDidMount() {
    const response = await api.get('');
    this.setState({
      carros: response.data,
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator color="#09A6FF" size={40} />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.carros}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Carros data={item} />}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App; 