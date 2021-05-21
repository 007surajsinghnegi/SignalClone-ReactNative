import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input,Icon ,Button } from 'react-native-elements';
import { db } from '../firebase';
const AddChatScreen = ({navigation}) => {

    const [input, setInput] = useState('');

     useLayoutEffect(() => {
        navigation.setOptions({
            title:"Add a new Chat"
        });
    }, [navigation]);

    const createChat = async ()=>{
        await db.collection('chats').add({
            chatName:input
        })
        .then(()=>{
            navigation.goBack();
        })
        .catch((error)=>alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a chat name" 
                value={input}
                onChangeText={(text)=>setInput(text)}    
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black"/>
                } 
                onSubmitEditing={createChat}
            />
            <Button onPress={createChat} title="Create New Chat"/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        height:"100%",
        backgroundColor: '#fff',
        padding:30
      }
})
