import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';



export default function App() {
  const [data, setData] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
 

  const fetchData = async() =>{
    try{
      const res = await fetch('https://testnets-api.opensea.io/api/v1/assets');
      const myData = await res.json();
      setData(myData.assets)
    }
    catch(error){
      console.log(error);
    }
  }

  if(selectedItem == null)
  {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.touch}
          onPress ={fetchData}>
            <Text style={styles.text}>Load</Text>
        </TouchableOpacity>
        
        <FlatList
          data={data}
          keyExtractor = {(item) => item.id.toString()}
          renderItem = {({item}) =>{
            return(
              <TouchableOpacity onPress={ () => setSelectedItem(item)} style={styles.item}>
                <View>
                  <Image 
                    style = {styles.image}
                    source={{uri:  `${item.image_url}`}}/>
                  <Text style = {styles.textName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    );

  }
  else{
    return(
      <View style={[styles.container, {marginTop: 30}]}>
        <Image style={styles.image} source={{uri:  `${selectedItem.image_url}`}}/>
        <Text style={styles.textName}>{selectedItem.name}</Text>
        <Text style={styles.text}>{selectedItem.description}</Text>
        <TouchableOpacity style={styles.touch}
          onPress = {() => setSelectedItem(null)}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touch:{
    width:100,
    height:40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 30,
    backgroundColor: '#ffff00'
  }, 
  image:{
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 20
  },
  text:{
    textAlign: 'center',
    fontSize: 20
  }, 
  item:{
    margin:20
  },
  textName:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
