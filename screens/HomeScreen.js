import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import ListItems from '../components/ListItems'
import { auth ,db } from '../firebase'
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);
    const signOut=()=>{
        auth.signOut()
            .then(()=>{
                navigation.replace("Login");
            })
    }

    useEffect(() => {
        
        const unsubscribe = db.collection('chats').onSnapshot((snapshot)=>setChats(
            snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data()
            }))
        ))

        return unsubscribe;
    }, []);


    // console.log(auth?.currentUser?.photoURL);
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Signal",
            headerStyle : { backgroundColor:'#fff'},
            headerTitleStyle : { color:'black'},
            headerTintColor : "black",
            headerLeft:()=>(
                <View style={{marginLeft:20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight:()=>(
                <View style={styles.icons}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddChat')}>
                        <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]);

    const enterChat = (id,chatName)=>{
        navigation.navigate("Chat",{
            id,
            chatName
        })
    }

    return (
        <SafeAreaView>
           <ScrollView style={styles.container}>
               {
                chats.map(({id,data :{chatName}})=>(
                      <ListItems id={id} chatName={chatName} key={id} enterChat ={enterChat}/>
               ))}
           </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height:"100%",
    },
    icons:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:80,
        marginRight:20,
    },
})
