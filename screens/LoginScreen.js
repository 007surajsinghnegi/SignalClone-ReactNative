import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button , Input , Image} from 'react-native-elements';
import {  StyleSheet, Text, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    
    const[email,setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    useEffect(() => {
        
        const unsubscribe =auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("Home")
            }
        });

        return unsubscribe;
    }, [])
    const signIn = ()=>{
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Image 
            source={{
                uri:'https://www.rd.com/wp-content/uploads/2021/01/signal-logo-via-apps.apple_.com_.jpg?fit=700,734',
            }}
            style={{height:180, width:200, borderRadius: 8}}
            />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus 
                    type="email"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}    
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    type="password"
                    value={password}
                    onChangeText={(text)=>setPassword(text)} 
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
            <Button containerStyle={styles.button} onPress={()=>navigation.navigate('Register')} type="outline" title="Register"/>
            {/* Add this if u need some extra padding from the keyboard <View style={{height: 100}}/> */}
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10,
    },
})
